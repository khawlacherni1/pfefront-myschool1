import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DatePipe } from '@angular/common';

import { FormBuilder, FormGroup, FormControl,ReactiveFormsModule,Validators}
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8080/api/events';
  list:  any=[];
  islogin = false;
  admin = false;
  rit = false;
  rfi = false;
  agent = false;
  enseignant = false;
  host :string = 'http://localhost:8080';
  choixmenu : string  = 'A';

  public formData !:  FormGroup;
  constructor(private http: HttpClient,private datePipe: DatePipe) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getNumero(ann : number) {
    return this.http.get(`${this.baseUrl}/7/${ann}`);
  }
  createData(info: Object): Observable<Object> {

    return this.http.post(`${this.baseUrl}`, info);
  }

  updatedata( value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  }
