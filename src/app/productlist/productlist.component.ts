import { WindowService } from './../window.service';
import { Component,ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})


export class ProductListComponent implements OnInit {

  dataSource:object;
 

 
  length: number;
  pageSize: number;
  num: number = 1;
  

 pageEvent: PageEvent;
 searchform: FormGroup;
 SearchD = "";
displayedColumns: string[] = ['id', 'name', 'minorder', 'maxorder', 'price'];
 
  host: string = environment.serverpath;
  token = sessionStorage.getItem("token");


  constructor(private router: Router, private http: HttpClient, public service: WindowService) {
    this.searchform = new FormGroup({
      search: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.tablelist(this.num);
  }

 tablelist(num){
    return this.http.get(this.host + '/api/v1/fish/?page='+num, { headers: new HttpHeaders().set('Authorization',this.token) }).subscribe(
      rslt => {
        this.dataSource = rslt["results"];
      
        this.pageSize =  rslt["page_size"];
        this.length = rslt["count"];
        this.num = rslt["num_pages"];
      },
      err => {
        console.log(err.message);
      }
    );
  }
  Submit() {
    let data = this.searchform.value;
    return this.http.get(this.host + '/api/v1/fish/?page=' + this.num + '&search=' + data.search, { headers: new HttpHeaders().set('Authorization', this.token) }).subscribe(

    );
  }
tableI(event){
    console.log(this.pageEvent.pageIndex);
    this.num = this.pageEvent.pageIndex +1;
    this.tablelist(this.num);
  
  };
 
  
  
}

