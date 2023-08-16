import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModreglementService {

  // private baseUrl = 'http://localhost:8081/api/modreglements';
  private baseUrl = '/api/modreglements';
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

  updatedata(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: string): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
