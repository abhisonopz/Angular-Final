import { WindowService } from './../window.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {


  OtpForm: FormGroup;
  savedetail: object;
  host: string = environment.serverpath;

  login: object;
  token = sessionStorage.getItem( "access" );

  constructor(private router: Router, private http: HttpClient, public service: WindowService) {
    this.OtpForm = new FormGroup({
      number: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let data = this.OtpForm.value;
    let fdata = this.savedetail =
    {
      "username": this.service.phone,
      "password": data.number
    }

    
    return this.http.post(this.host + '/api/v1/user/get_access_token/', fdata).subscribe(
      rslt => {

        this.login = rslt;
        sessionStorage.setItem( "token", this.login[ "access" ]);
        this.router.navigate(['productlist']);
      },
      err => {
        console.log(err.message);
      }
    );


  }


}
