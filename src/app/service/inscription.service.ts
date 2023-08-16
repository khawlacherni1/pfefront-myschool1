import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  inscription: any;
  id : any;
  annee : any;
  // private baseUrl = 'http://localhost:8080/api/inscriptions';
  private baseUrl = '/api/inscriptions';
  choixmenu: string = 'A';
  list: any = [];
  public formData !: FormGroup;
  constructor(private http: HttpClient) { }


  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getNumero(ann : number) {

    return this.http.get(`${this.baseUrl}/7/${ann}`);
  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }

  updatedata(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getAllByID(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/ALL/${id}`);
  }
}
