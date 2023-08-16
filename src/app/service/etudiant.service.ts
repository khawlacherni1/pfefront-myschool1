import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private baseUrl = 'http://localhost:8080/api/etudiants';
  host: string = 'http://localhost:8080';
  addimg : String = 'N';
  choixmenu: string = 'A';
  list: any = [];
  public formData !: FormGroup;
  constructor(private http: HttpClient) { }


  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getEtudiant(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/E/${id}`);
  }
  getMatricule(ann :number) {

    return this.http.get(`${this.baseUrl}/7/${ann}`);
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

  getList(code : string): Observable<any> {

    return this.http.get(`${this.baseUrl}/cl/${code}`);
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
