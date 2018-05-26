import { Component, OnInit, EventEmitter,Input,Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router, private afs:AngularFirestore) { }
  auth:boolean = false;
  search:boolean = false;
  userCredentials:userSchema;
  suggestionResults:any;
  searchValue:string = '';
  photoUrl:string = "/assets/userAvatar.png"
  color:string = 'primary';


  @Output() loadEvent = new EventEmitter<string>();

  ngOnInit() {
    
    this.userCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    if(this.userCredentials.photoURL !=null){
      this.photoUrl = this.userCredentials.photoURL;
      this.auth = true;
    }
    this.authService.userData.subscribe(data=>{
      if(data.photoURL!=null){
        this.photoUrl = data.photoURL;
        this.auth = true;
      }
    })
  }

  getPhotoUrl(){
    return this.photoUrl;
  }
  

  signOut(){
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  searchToogle(){
    if(this.search == true){
      this.search = false;
      this.color = "primary";
    }else{
      this.search = true;
      this.color = "accent";
    }
  }

  isSearch():boolean{
    return this.search;
  }

  suggestions(){
    this.suggestionResults = this.afs.collection('users',ref => ref 
      .orderBy('displayName')
      .startAt(this.searchValue.toLowerCase())
      .endAt(this.searchValue.toLowerCase()+"\uf8ff")
      .limit(10))
      .snapshotChanges().map(result=>{return result.map(a=>{
        const data = a.payload.doc.data() as userSchema;
        data.id = a.payload.doc.id;
        return data;
      })
      })

  }

  
  viewUser($event){
    this.loadEvent.emit($event.option.value);
    this.search = false;
    this.searchValue = '';
    this.router.navigate(['/viewProfile',$event.option.value.id]);
  }

  viewNotifications(){
    this.router.navigate(['/notifications']);
  }
  viewHome(){
    this.router.navigate(['/home']);
  }
  viewMyspace(){
    if(this.auth == true){
      this.router.navigate(['/myspace']);
    }
  }
}


interface userSchema{
  displayName?:string,
  photoURL?:string,
  email?:string,
  id?:string,
}