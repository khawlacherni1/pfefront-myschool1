import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {


  // private baseUrl = 'http://localhost:8080/api/classes';
  private baseUrl = '/api/classes';
  choixmenu: string = 'A';
  list: any = [];
  public formData !: FormGroup;
  constructor(private http: HttpClient) { }


  getData(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getNumero() {
    return this.http.get(`${this.baseUrl}/7`);
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
  getClasse(code : string): Observable<any> {
    alert(code);
    return this.http.get(`${this.baseUrl}/all/code`);
  }
}
