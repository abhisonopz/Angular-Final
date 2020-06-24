import { WindowService } from './../window.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formdata: object;
  host: string= environment.serverpath;
  
  constructor(private router:Router ,private http:HttpClient, public service:WindowService) {
    this.loginForm = new FormGroup({
      phone: new FormControl('')
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    let data = this.loginForm.value;
    let fdata = this.formdata = 
    {
      "phone":"+91"+ data.phone
    }
    
    return this.http.post(this.host + '/api/v1/user/get_otp/', fdata).subscribe(
      res => {
        
        this.service.phone = fdata.phone;
        this.service.otp = res;
        this.router.navigate(['otp']);
        
      },
      err => {
        console.log(err.message);
      });
  }
  
}
