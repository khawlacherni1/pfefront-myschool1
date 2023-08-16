import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LabsenceService {
  private baseUrl = '/api/labsences';

  constructor(private http: HttpClient) { }

 getAll(id: number): Observable<Object> {
   return this.http.get(`${this.baseUrl}/${id}`);
 }
}
