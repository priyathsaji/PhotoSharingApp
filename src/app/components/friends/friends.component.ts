import { Component, OnInit } from '@angular/core';
import {AngularFirestoreDocument,AngularFirestoreCollection,AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friendsCollection:AngularFirestoreCollection<any>;
  friendsObservable:Observable<friendSchema[]>;
  friends1:Observable<friendDisplaySchema[]>;
  friends2:Observable<friendDisplaySchema[]>;
  currentUser:userSchema;
  constructor(private afs:AngularFirestore, private authService:AuthService) { 
    this.currentUser = JSON.parse(localStorage.getItem('userCredentials'));
    this.authService.userData.subscribe(result=>{
        if(result.displayName!=null){
          this.currentUser = result;
        }

        this.friends1 = this.afs.collection('friends',ref=>ref.where('id1','==',this.currentUser.id)).snapshotChanges().pipe(map(result=>result.map(a=>{
            const data = a.payload.doc.data() as friendSchema;
            let friend:friendDisplaySchema = {
              friendEmail:data.email1,
              friendPhotoUrl:data.photoURL1,
              friendName:data.displayName1,
              friendId:data.id1,
            };
            if(data.id1 == this.currentUser.id){
              friend.friendEmail = data.email2;
              friend.friendPhotoUrl = data.photoURL2;
              friend.friendName = data.displayName2;
              friend.friendId = data.id2;
            }
            return friend as friendDisplaySchema;
          })));
          this.friends2 = this.afs.collection('friends',ref=>ref.where('id2','==',this.currentUser.id)).snapshotChanges().pipe(map(result=>result.map(a=>{
            const data = a.payload.doc.data() as friendSchema;
            let friend:friendDisplaySchema = {
              friendEmail:data.email1,
              friendPhotoUrl:data.photoURL1,
              friendName:data.displayName1,
              friendId:data.id1,
            };
            if(data.id1 == this.currentUser.id){
              friend.friendEmail = data.email2;
              friend.friendPhotoUrl = data.photoURL2;
              friend.friendName = data.displayName2;
              friend.friendId = data.id2;
            }
            return friend as friendDisplaySchema;
          })));



        this.friends1.subscribe(result=>console.log(result));
        this.friends2.subscribe(result=>console.log(result));
    });
  }

  ngOnInit() {}

  removeFriend(email:string){
    console.log(email);
  }

}

interface friendDisplaySchema{
  friendId?:string;
  friendName?:string,
  friendEmail?:string,
  friendPhotoUrl?:string
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