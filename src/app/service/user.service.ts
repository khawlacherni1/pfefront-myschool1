import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DatePipe } from '@angular/common';

import { FormBuilder, FormGroup, FormControl,ReactiveFormsModule,Validators}
  from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';
  list:  any=[];
  islogin = false;
  admin = false;
  rit = false;
  rfi = false;
  etudiant = false;
  enseignant = false;
  host :string = 'http://localhost:8080';
  choixmenu : string  = 'A';
  name : string = "Foulen";
  public formData !:  FormGroup;
  constructor(private http: HttpClient,private datePipe: DatePipe) { }
  login(username: string) {
    return this.http.get(`${this.baseUrl}/auth/${username}`);
  }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createData(info: Object): Observable<Object> {
    alert("add user 0000000");
    return this.http.post(`${this.baseUrl}`, info);
  }

  updatedata(id: number, info : object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, info);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  resetPassword(token : string, pwd : string) {

    return this.http.get(`${this.baseUrl}/rest/${token}/${pwd}`);
   }

   forgetPassword(email :string,pwd :string) {

    return this.http.get(`${this.baseUrl}/verif/${email}/${pwd}`);
   }
  }
