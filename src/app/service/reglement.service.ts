import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ReglementService {
  private baseUrl = '/api/reglements';
  choixmenu: string = 'A';
  list: any = [];
  listReglement: any = [];
  id : any;
  Label  = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin','Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre','Decembre'];

  public formData !: FormGroup;
  constructor(private http: HttpClient) { }


  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getNumero() {
    return this.http.get(`${this.baseUrl}/7`);
  }

  getReglement(d1: String, d2: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/${d1}/${d2}`);
  }

  getMontant(annee : number, mois :number) {

    return this.http.get(`${this.baseUrl}/${annee}/${mois}`);
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

  getRegDate(d1 :Date, d2 :Date):  Observable<any> {
    return this.http.get(`${this.baseUrl}/R//${d1}/${d2}`);
  }
  getRegEtudiant(mat : string, d1 :Date, d2 :Date):  Observable<any> {
    return this.http.get(`${this.baseUrl}/E/${mat}/${d1}/${d2}`);
  }
}
