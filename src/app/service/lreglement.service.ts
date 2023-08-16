import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class LreglementService {
  private baseUrl = '/api/lreglements';

  constructor(private http: HttpClient) { }

 getAll(id: number): Observable<Object> {
   return this.http.get(`${this.baseUrl}/${id}`);
 }
}
