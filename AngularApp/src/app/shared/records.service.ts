import { Injectable } from '@angular/core';
import {Records} from "./records.model";
import { HttpClient } from '@angular/common/http';
import {Salesman} from "./salesman.model";
import {SalesmanService} from "./salesman.service";




@Injectable({
  providedIn: 'root'
})

export class RecordsService {

  recordsList:Records[];
  readonly baseURL = 'http://localhost:3000/evaluationrecord'

  constructor(private http: HttpClient) { }

  getRecordsList(id){
    return this.http.get(this.baseURL+"/"+id);
  }
  /*
  postRecord(salesman :Salesman){
    return this.http.post(this.baseURL,salesman);
  }
  deleteRecord(id:string){
    return this.http.delete(this.baseURL+"/"+id);
  }
  */

}
