import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { UploadDialogComponent } from '../dialogs/upload-dialog/upload-dialog.component';
import { AngularFirestoreDocument,AngularFirestoreCollection,AngularFirestore} from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-myspace',
  templateUrl: './myspace.component.html',
  styleUrls: ['./myspace.component.css']
})
export class MyspaceComponent implements OnInit {

  photoUrl:string = '/assets/userAvatar.png';
  buttonText:string = 'Sign Out';
  profileData:any;
  constructor(private authService:AuthService,private dialog:MatDialog,private afs:AngularFirestore,private storage:AngularFireStorage) { 
    this.profileData = JSON.parse(localStorage.getItem('userCredentials'));
    this.authService.userData.subscribe(result=>{
      if(result.displayName!=null){
        this.profileData = result;
      }
    })
  }

  feeds:Observable<any>;
  ngOnInit() {

    this.feeds = this.afs.collection('posts',ref=>ref.where('ownerId','==',this.profileData.id)).valueChanges();

  }
  
  getPhotoUrl(){
    return this.photoUrl;
  }

  upload(){
    let dialogRef = this.dialog.open(UploadDialogComponent,{
          data:{
            ownerName:this.profileData.displayName,
            ownerId:this.profileData.id,
            ownerPhotoUrl:this.profileData.photoURL,
          }
        }
      );

  dialogRef.afterClosed().subscribe(result=>{
    if(result!=null){
      console.log(result);
      const data = result as postSchema;
      let id = this.afs.createId();
      data.postId = id;
      data.postComments = 0;
      data.postLikes = 0;
      this.storage.ref(data.fileName).getDownloadURL().subscribe(downloadUrl=>{
        console.log(downloadUrl);
        data.postDownloadUrl = downloadUrl;
        this.afs.collection('posts').doc(id).set(data);
        this.afs.collection('friends',ref=>ref.where('id1','==',this.profileData.id)).valueChanges().subscribe(friends=>{
          if(friends.length!=0){
            friends.forEach(element => {
              let feed = data as feedSchema;
              feed.recipientId = element.id2;
              this.afs.collection('feeds').add(feed);
            });
          }
        })
        this.afs.collection('friends',ref=>ref.where('id2','==',this.profileData.id)).valueChanges().subscribe(friends=>{
          if(friends.length!=0){
            friends.forEach(element => {
              let feed = data as feedSchema;
              feed.recipientId = element.id1;
              this.afs.collection('feeds').add(feed);
            });
          }
        })

      })
      
    }

  })
  }



}


interface feedSchema{
  postSchema,
  recipientId:string;
}

interface postSchema{
  fileName?:string;
  postId?:string;
  ownerId?:string;
  ownerName?:string;
  ownerPhotoUrl?:string;
  postDescription?:string;
  postVisibility?:string;
  postLikes?:number;
  postDownloadUrl?:string;
  postComments?:number;
}


interface friendSchema{
  id1?:string;
  id2?:string;
  displayName1?:string;
  displayName2?:string;
  email1?:string;
  email2?:string;
  status?:string;
  photoURL1?:string;
  photoURL2?:string;
}