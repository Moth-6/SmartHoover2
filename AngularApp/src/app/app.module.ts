import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesmanComponent } from './salesman/salesman.component';
import {FormsModule} from "@angular/forms";
import { RecordsComponent } from './records/records.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesmanComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
