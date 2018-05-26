import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {Routes} from '@angular/router'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
  
  authState : any = null;
  userDocument:AngularFirestoreDocument<userSchema>;
  userCollection:AngularFirestoreCollection<userSchema>; 
  currentUser:userSchema; 
  private userCredentials = new BehaviorSubject<userSchema>({
    displayName:null,
    email:null,
    photoURL:null,
    id:null
  });

  userData = this.userCredentials.asObservable();



  constructor(private afAuth:AngularFireAuth,private afs:AngularFirestore) {
    this.afs.firestore.settings({timestampsInSnapshots: true});
    this.afAuth.authState.subscribe((auth)=>{
      this.authState = auth

    })
    
   }

   socialLogin(provider){
     return this.afAuth.auth.signInWithPopup(provider)
      .then((credential)=>{
        this.authState = credential.user;
        this.updateUser();
      })

      
   }
   googleLogin(){
     const provider = new firebase.auth.GoogleAuthProvider();
      return this.socialLogin(provider);
   }

   signOut(){
     localStorage.removeItem('auth');
     localStorage.removeItem('userCredentials');
     return this.afAuth.auth.signOut();
   }
  
  updateUser(){
    const user:userSchema = {
      photoURL:this.authState.photoURL,
      displayName:this.authState.displayName,
      email:this.authState.email
    }
   
    localStorage.setItem('auth','true');
    localStorage.setItem('userCredentials',JSON.stringify(user));
    this.currentUser = user;
    //this.afs.collection('users').doc(this.authState.email).set(user);
    this.afs.collection('users',ref=>ref.where('email','==',user.email)).snapshotChanges().subscribe(result=>{
      if(result.length == 0){
        let id = this.afs.createId();
        this.afs.collection('users').doc(id).set(user);
        this.userCredentials.next({
          displayName:user.displayName,
          photoURL:user.photoURL,
          email:user.email,
          id:id
          
        });
        user.id = id;
      }else{
        result.map(a=>{
          const data = a.payload.doc.data() as userSchema;
          data.id = a.payload.doc.id;
          this.userCredentials.next(data);
          user.id = data.id;
        })
      }
      localStorage.setItem('userCredentials',JSON.stringify(user));
    });
  }

  getCurrentUser(){
    return this.currentUser;
  }
}

interface userSchema{
  id?:string,
  displayName?:string,
  photoURL?:string,
  email?:string
}