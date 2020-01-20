import { Component } from '@angular/core';
import {DataService} from "./data.service";
import {RecordsComponent} from "./records/records.component";
import {SalesmanComponent} from "./salesman/salesman.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[RecordsComponent,SalesmanComponent]
})
export class AppComponent {
  title = 'AngularApp';

}
