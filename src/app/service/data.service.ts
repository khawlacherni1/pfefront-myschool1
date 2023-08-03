import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = '/api/stats';
  
  constructor(private http: HttpClient,
    public datePipe : DatePipe) { }
  Date =this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  annee = parseInt((Date).toString().substring(0, 4));
  
   
  Label  = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin','Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre','Decembre'];
  getAll() {
    return this.http.get(`${this.baseUrl}`);
  }

}

