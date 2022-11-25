import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';


export interface User{
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}


  getAll(): Observable<any>{
   return this.http.get(this.baseUrl+'/get-all');
  }

  create(person: User): Observable<any>{
    console.log(person)
    return this.http.post(this.baseUrl +'/create', person);
   }

   update(person: User): Observable<any>{
    console.log(person)
    return this.http.put('/update', person);
   }

}
