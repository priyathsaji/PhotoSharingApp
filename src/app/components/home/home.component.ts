import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { ShareBottomSheetComponent } from '../bottom-sheets/share-bottom-sheet/share-bottom-sheet.component';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:userSchema;
  viewHeader:boolean = false;
  photoURL:string = "/assets/userAvatar.png";
  feeds:Observable<any>;

  constructor(private bottomSheet:MatBottomSheet,private authService:AuthService,private afs:AngularFirestore) { }

  userCredentials:userSchema;
  ngOnInit() {
    this.userCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    if(this.userCredentials.photoURL!=null){
      this.photoURL = this.userCredentials.photoURL;
    }
    this.authService.userData.subscribe(data=>{
      if(data.photoURL!=null){
        this.photoURL = data.photoURL
      }
    });

    this.feeds = this.afs.collection("feeds",ref=>ref.where('recipientId','==',this.userCredentials.id)).valueChanges();

  }

  getCurrentUser(){
    return this.userCredentials.displayName;
  
  }

  getPhotoUrl(){
    return this.photoURL;

  }

  openBottomSheet(){
    this.bottomSheet.open(ShareBottomSheetComponent,{
      data:{names:'priyath'}
    });
  }


}


interface userSchema{
  displayName?:string,
  photoURL?:string,
  email?:string,
  id?:string
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
  postDescription?:string;
  postVisibility?:string;
  postLikes?:number;
  postDownloadUrl?:string;
  postComments?:number;
}