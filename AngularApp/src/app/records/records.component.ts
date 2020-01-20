import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {RecordsService} from "../shared/records.service";
import {Records} from "../shared/records.model";


import {BehaviorSubject} from "rxjs";
import {SalesmanService} from "../shared/salesman.service";
import {DataService} from "../data.service";
import { ActivatedRoute } from "@angular/router";
import {Salesman} from "../shared/salesman.model";

declare var M : any;
@Component({

  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [RecordsService,DataService]
})

export class RecordsComponent implements OnInit {
  message:string;
  constructor(private recordsService: RecordsService, private data:DataService,private route:ActivatedRoute) { }
  public salesmanId;
  //public currentId = this.salesmanId.asObservable();
  ngOnInit() {
    this.resetForm();
    this.resetSalesmanDetails();
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.route.url.subscribe(message => {console.log("param " + message);this.refreshRecordsList();})
    this.salesmanId = id;

    this.data.currentMessage.subscribe(message => {
      console.log("records receiving : " + message)
      this.message = message;
      this.refreshRecordsList();
    })

    this.refreshSalesmanDetails();
    this.refreshRecordsList();
    this.refreshHrmBonus();


  }
  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.recordsService.selectedRecord={
      id:null,
      gid:null,
      attribute:"",
      targetValue:null,
      actualValue:null,
      bonus:""
    }
  }
  refreshRecordsList(){
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.salesmanId = id;
    this.recordsService.getRecordsList(this.salesmanId).subscribe((res)=>{
      this.recordsService.recordsList = res as Records[];
    });
    this.refreshSalesmanDetails();
    this.refreshHrmBonus();

  }
  recordsChangeMessage(){
    this.data.changeMessage("HELLO");
  }

  onSubmit(form:NgForm){
    this.recordsService.postRecord(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.refreshRecordsList();
      M.toast({html:'Record added.',classes:'rounded light-green'});
    });
  }

  onDelete(id,gid){
    if(confirm('Are you sure you want to delete this evaluation record?')==true){

      this.recordsService.deleteSalesman(id,gid).subscribe((res)=>{
        this.refreshRecordsList();
        M.toast({html:'Deleted successfully',classes:'rounded light-green'});

      });
    }
    this.refreshRecordsList();
  }
  onEdit(form:NgForm,id,gid){
    this.recordsService.editRecord(form.value,id,gid).subscribe((res) => {
      //this.resetForm(form);
      this.refreshRecordsList();
      M.toast({html:'Updated successfully!',classes:'rounded light-green'});
    });
  }
  refreshSalesmanDetails(){

    this.recordsService.getSalesmanDetails(this.salesmanId).subscribe((res)=>{
      this.recordsService.salesman = res as Salesman;
    });
  }
  resetSalesmanDetails(){
    this.recordsService.salesman={
      id:null,
      name:null,
      department:"",
      yearOfPerformance:null
    };
  }

  refreshHrmBonus(){
    this.recordsService.getHrmBonus(this.salesmanId).subscribe((res)=>{
      this.recordsService.bonus = res as string;
    });
  }

  approveHrmBonus(){
    let value = this.recordsService.getTotalBonus();
    console.log("::::: VALUE :::::: "+value)
    this.recordsService.postHrmBonus(this.salesmanId,value).subscribe((res)=>{
      console.log(res);
      M.toast({html:'Bonus approved!',classes:'rounded light-green'});
      this.refreshHrmBonus();
    });


  }
}
