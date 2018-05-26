import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UploadDialogComponent } from '../dialogs/upload-dialog/upload-dialog.component';
import { PostCardDialogComponent } from '../dialogs/post-card-dialog/post-card-dialog.component';
import { Observable } from 'rxjs/observable';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userData:userSchema;
  userData2:userSchema;
  friendStatus:Observable<friendSchema[]>;
  buttonText1:string = "Add Friend";
  friendDetails:friendSchema;
  pending:boolean = false;
  friendDocId:string;
  
  profileData:Observable<userSchema>;

  constructor(public dialog: MatDialog, private router:ActivatedRoute, private afs:AngularFirestore,private authService:AuthService) {
    this.router.params.subscribe(params=>{
      this.profileData = this.afs.collection('users').doc(params.id).valueChanges();
      this.profileData.subscribe(result=>{
        this.userData2 = result as userSchema;
        this.userData2.id = params.id;
        this.userData = JSON.parse(localStorage.getItem("userCredentials"));

        this.authService.userData.subscribe(result=>{
           if(result.displayName != null){
           this.userData = result;
           }
         })
        
         this.checkFriend(this.userData.id,this.userData2.id);
      })
    })
   
 
     
   }

  openDialog(){
    let dialogRef = this.dialog.open(PostCardDialogComponent,{
      width:'600px',
      data :{
        userName:'priyath',
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
  ngOnInit() {
   

  }

  checkFriend(id1:string,id2:string){
    if(id1 > id2){
      let temp = id1;
      id1 = id2;
      id2 = temp;
    }
    console.log(id1,id2);
    this.afs.collection('friends',ref=>ref.where('id1','==',id1).where('id2','==',id2)).snapshotChanges().subscribe(data=>{
      if(data.length !=0){
       data.map(a=>{
          let result = a.payload.doc.data() as friendSchema;
          this.friendDocId = a.payload.doc.id; 
          if(result.status=='accepted'){
            this.buttonText1 = "Remove Friend";
            this.pending = false;
          }else{
            this.buttonText1 = "Pending";
            this.pending = true;
          }

       });
      }else{
        this.buttonText1 = "Add Friend";
        this.pending = false;
      }
      

    });
  }

  buttonAction1(){
    if(this.buttonText1 == "Add Friend"){ 
      let data1 = this.userData;
      let data2 = this.userData2;
      if(this.userData.id > this.userData2){
        let temp = data1;
        data1 = data2;
        data2 = temp;
      }
      this.friendDetails = {
        id1:data1.id,
        id2:data2.id,
        displayName1:data1.displayName,
        displayName2:data2.displayName,
        photoURL1:data1.photoURL,
        photoURL2:data2.photoURL,
        email1:data1.email,
        email2:data2.email,
        status:"accepted",
      }
      let id = this.afs.createId();
      this.afs.collection('friends').doc(id).set(this.friendDetails);
    }else{
      this.afs.collection('friends').doc(this.friendDocId).delete();
    }
  }

}

interface userSchema{
  id?:string;
  displayName?:string;
  photoURL?:string;
  email?:string;
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
