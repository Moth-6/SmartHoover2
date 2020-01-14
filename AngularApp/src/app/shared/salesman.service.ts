import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { toPromise } from 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise'

import {Salesman} from './salesman.model';
//import {HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalesmanService {
  selectedSalesman:Salesman;
  salesmen:Salesman[];
  readonly baseURL = 'http://localhost:3000/salesman'

  constructor(private http: HttpClient) {    }

  postSalesman(salesman :Salesman){
    return this.http.post(this.baseURL,salesman);
  }
  getSalesmanList(){
    return this.http.get(this.baseURL);
  }
  deleteSalesman(id:string){
    return this.http.delete(this.baseURL+"/"+id);
  }
}
