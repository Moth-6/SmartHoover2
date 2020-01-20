import { Injectable } from '@angular/core';
import {Records} from "./records.model";
import { HttpClient } from '@angular/common/http';
import {Salesman} from "./salesman.model";
import {SalesmanService} from "./salesman.service";




  @Injectable({
    providedIn: 'root'
  })

  export class RecordsService {
    selectedRecord:Records;
    recordsList:Records[];
    salesman:Salesman;
    bonus:string;
    readonly baseURL = 'http://localhost:3000/evaluationrecord'

    constructor(private http: HttpClient) { }

    getRecordsList(id){
      return this.http.get(this.baseURL+"/"+id);
    }
    postRecord(record:Records){
      return this.http.post(this.baseURL+"/"+this.salesman.id+"/"+this.getNextGid(),record);
    }
    deleteSalesman(id,gid){
      return this.http.delete(this.baseURL+"/"+id+"/"+gid);
    }
    editRecord(record:Records,id,gid){
      return this.http.put(this.baseURL+"/"+id.toString()+"/"+gid.toString(),record);
    }
    getSalesmanDetails(id){
      return this.http.get('http://localhost:3000/salesman/'+id.toString());
    }

    getHrmBonus(id){
      return this.http.get("http://localhost:3000/evaluationrecord/employee/"+id.toString()+"/bonus");
    }

    postHrmBonus(id,value){
      return this.http.post("http://localhost:3000/evaluationrecord/employee/"+id.toString()+"/bonus/"+value,"");
    }

    getTotalBonus(){
      if(this.recordsList!=null){
        var total = 0.0;
        for(var i=0;i<this.recordsList.length;i++){
          total += parseFloat(this.recordsList[i].bonus)
        }
        return total;
      }
      return 0.0;
    }

    getNextGid(){
      if(this.recordsList!=null){
        var maxid=0;
        for(var i=0;i<this.recordsList.length;i++){
          if(this.recordsList[i].gid > maxid){
            maxid = this.recordsList[i].gid
          }
        }
        return ++maxid;
      }
      return 1;
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
