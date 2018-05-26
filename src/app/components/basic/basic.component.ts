import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  auth:string;
  user:userSchema;
  viewHeader:boolean = false;

  constructor(public authService:AuthService,public router:Router) {
    this.auth = localStorage.getItem('auth');
    if(this.auth!='true'){
      console.log("the user is not authenticated");
      //this.router.navigate(['/login']);
    }else{
      console.log("user authenticated");
    }
  }

  ngOnInit() {
    this.authService.userData.subscribe(data=>{
      if(data == null){
        this.viewHeader = false;
      }else{
        this.viewHeader = true;
      }
    });

  }

}


interface userSchema{
  displayName?:string,
  photoURL?:string,
  email?:string,
  id?:string
}
