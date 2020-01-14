import { Component, OnInit } from '@angular/core';

import {RecordsService} from "../shared/records.service";
import {Records} from "../shared/records.model";


import {BehaviorSubject} from "rxjs";
import {SalesmanService} from "../shared/salesman.service";
import {DataService} from "../shared/data.service";


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [RecordsService,DataService]
})
export class RecordsComponent implements OnInit {
  message:string;
  constructor(private recordsService: RecordsService,private data:DataService) { }

  ngOnInit() {
    this.refreshRecordsList();
    this.data.messageSource.subscribe(message => {
      console.log("records receiving : " + message)
      this.message = message;
      this.refreshRecordsList();
    })
  }
  refreshRecordsList(){
    this.recordsService.getRecordsList(this.data.messageSource.value).subscribe((res)=>{
      this.recordsService.recordsList = res as Records[];
    });
  }



}
