import { Component, OnInit } from '@angular/core';
import { NgForm} from "@angular/forms";
import {SalesmanService} from "../shared/salesman.service";
import { Salesman } from "../shared/salesman.model";
import {BehaviorSubject} from "rxjs";

import * as FormData from 'form-data';
import { request } from 'http';


import {RecordsService} from "../shared/records.service";
import {RecordsComponent} from "../records/records.component";
import {Records} from "../shared/records.model";
import {DataService} from "../data.service";
import { Router } from '@angular/router'

declare var M : any;

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.css'],
  providers:[SalesmanService,DataService]

})
export class SalesmanComponent implements OnInit {

  message:string;
  constructor(private salesmanService:SalesmanService,private data:DataService,private router: Router) { }
  selectedSalesman : number;

  ngOnInit() {
    this.resetForm();
    this.refreshSalesmanList();

    this.data.messageSource.subscribe(message => {
      this.message = message
      console.log("salesman receive : "+ message)
    })
  }
  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.salesmanService.selectedSalesman={
      id:null,
      name:"",
      department:"",
      yearOfPerformance:null
    }
  }
  onSubmit(form:NgForm){

    this.salesmanService.postSalesman(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshSalesmanList();
      M.toast({html:'Submitted successfully.',classes:'rounded light-green'});
    });
  }
  onEdit(form:NgForm,id){
    this.salesmanService.editSalesman(form.value,id).subscribe((res) => {
      this.resetForm(form);
      this.refreshSalesmanList();
      M.toast({html:'Updated successfully.',classes:'rounded light-green'});
    });
  }
  refreshSalesmanList(){
    this.salesmanService.getSalesmanList().subscribe((res)=>{
      this.salesmanService.salesmen = res as Salesman[];
    });
  }
  onDelete(id,form){
    if(confirm('Are you sure you want to delete this data?')==true){

      this.salesmanService.deleteSalesman(id).subscribe((res)=>{
        this.refreshSalesmanList();
        this.resetForm(form);
        M.toast({html:'Deleted successfully',classes:'rounded light-green'});

      });

    }
  }

  setSelectedId(id:string){
    this.message = id;
    this.data.changeMessage(this.message);
  }
  onSelect(records){
    this.router.navigate(['/records',records.id]);
  }


}
