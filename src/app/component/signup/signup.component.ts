import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  type: string="password";
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder){ }

 ngOnInit(): void {
  this.signupForm = this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    username:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
  })
     
 }
 hideShowPass(){
  this.isText=!this.isText;
  this.isText? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
  this.isText? this.type="text" : this.type="password";

 }
   onSignUp(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
      //send obj to database
    }
    else{
      ValidateForm.validateAllFormFileds(this.signupForm);
      alert("Your form is invalide")
    }
   }
}
