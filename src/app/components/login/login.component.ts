import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../../services/auth.service'
import {Router} from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  buttonText:string;
  questionText:string;
  question2:string;
  question1:string;
  questionText2:string;
  public signUp:boolean;
  signUpPassword:string;
  signUpPassword2:string;
  constructor(public authService:AuthService,public router:Router) { }

  ngOnInit() {
    this.signUp = true;
    this.buttonText = "Sign Up";
    this.question1 = "Dont have an account??";
    this.question2 = " Already have an Accont??";
    this.questionText2 = "Sign In";
    this.questionText = this.question2;
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"),
  ]);

  passwordFormControl2 = new FormControl('', [
    Validators.required,
    Validators.pattern("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"),
    
  ]);

  matcher = new MyErrorStateMatcher();
  authState:any;

  toogle(){
    if(this.signUp == true){
      this.signUp = false;
      this.questionText2 = "Sign Up";
      this.buttonText = "Sign In";
      this.questionText = this.question1;
    }else{
      this.signUp = true;
      this.questionText2 = "Sign In";
      this.buttonText = "Sign Up";
      this.questionText = this.question2;
    }
  }

  googleSignIn(){
   
      this.authService.googleLogin().then(()=>{
        if(localStorage.getItem('auth')=='true')
          this.router.navigate(['/home']);
        
      });
    
   
    
   
  }

}
