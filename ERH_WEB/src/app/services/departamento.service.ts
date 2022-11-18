import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from '../../environments/environment'
import { Departamento } from '../models/departamento';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  constructor(private http: HttpClient) {
  }

  baseUrl = `${environment.apiUrl}`;

  getAll(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.baseUrl}/Departamentos`);
  }
  add(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.baseUrl}/AddDepartamento`, departamento);
  }
  update(departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.baseUrl}/UpdateDepartamento`, departamento);
  }
  delete(departamento: Departamento): Observable<Object> {
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: departamento,
    }
    return this.http.delete(`${this.baseUrl}/DeleteDepartamento`, options);
  }





  /*getById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.baseUrl}/${id}`);
  }*/
}
