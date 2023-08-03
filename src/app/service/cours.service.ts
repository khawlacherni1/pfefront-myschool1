import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  // private baseUrl = 'http://localhost:8081/api/cours';
  private baseUrl = '/api/cours';
  choixmenu: string = 'A';
  list: any = [];
  public formData !: FormGroup;
  constructor(private http: HttpClient) { }


  getData(id: string): Observable<Object> {
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

  getClasse(matricule : string): Observable<any> {
    alert(matricule);
     return this.http.get(`${this.baseUrl}/cl/${matricule}`);
  }

  getMatiere(matricule : string,classe : string): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/${matricule}/${classe}`);
  }
}


