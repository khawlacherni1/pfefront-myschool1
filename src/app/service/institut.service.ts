import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InstitutService {
  private baseUrl = '/api/instituts';
  choixmenu: string = 'A';
  list: any = [];
  public formData !: FormGroup;
  constructor(private http: HttpClient) { }


  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  getCode() {
    return this.http.get(`${this.baseUrl}/7`);
  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }

  saveData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/S`, info);
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
  exporToPdf()
  {
    alert("pdf service");
    return this.http.get(`${this.baseUrl}/report`);
  }

  getExcelData(){
    return this.http.get<any>(`${this.baseUrl}/export/excel`, { responseType: 'arraybuffer' as 'json' });
  }
}
