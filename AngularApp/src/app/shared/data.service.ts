import{Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DataService{

  /*private*/ messageSource = new BehaviorSubject<string>("4");
  currentMessage = this.messageSource.asObservable();

  constructor(){ }

  changeMessage(message:string){
    console.log("sending : "+message)
    this.messageSource.next(message);
  }

}
