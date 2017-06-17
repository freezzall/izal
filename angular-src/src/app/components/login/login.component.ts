import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username: String;
password: String;

  constructor(
  private flashMessage:FlashMessagesService, 
  private authService:AuthService,
  private router:Router
  ) { }

  ngOnInit() {
  }
  
  onLoginSubmit(){
    const user = {
        username: this.username,
        password: this.password
    }
    
    //Login User
   this.authService.authenticateUser(user).subscribe(data=>{
    console.log(data);
    if(data.success){
        this.authService.storeUserData(data.token, data.user);
        
        this.flashMessage.show('Login Success . . .', {
            cssClass: 'alert-success text-center', 
            timeout:5000
        });
        
        this.router.navigate(['/dashboard']);
    }else{
        this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger text-center', 
            timeout:5000
        });
        
        this.router.navigate(['/login']);
    }
   });
   
  }

}
