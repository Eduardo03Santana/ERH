import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from '../../environments/environment'
import { Funcionario } from '../models/funcionario';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor(private http: HttpClient) {

  }

  baseUrl: string = `${environment.apiUrl}`;

  getAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseUrl}/Funcionarios`);
  }
  add(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.baseUrl}/AddFuncionario`, funcionario);
  }
  uploadPicture(picture: any) {
    let formData = new FormData;
    formData.append('file', picture);
    return this.http.post(`${this.baseUrl}/AddFuncionarioPicture`, formData);
  }
  update(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.baseUrl}/UpdateFuncionario`, funcionario);
  }
  delete(funcionario: Funcionario): Observable<Object> {
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: funcionario,
    }
    return this.http.delete(`${this.baseUrl}/DeleteFuncionario`, options);
  }
}
