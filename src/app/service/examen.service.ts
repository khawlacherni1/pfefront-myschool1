import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }   from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private baseUrl = 'http://localhost:8080/api/examens';
  parametre: any = {};
  host: string = 'http://localhost:8080';
  choixmenu: string = 'A';
  list: any = [];
  public formData !: FormGroup;
  constructor(private http: HttpClient, ) { }
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  getNumero(annee : any) {
    return this.http.get(`${this.baseUrl}/7/${annee}`);
  }

  createData(formData: FormData): Observable<any> {

    // commentaire
    return this.http.post(`${this.baseUrl}`, formData);
  }

  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
  }
}
