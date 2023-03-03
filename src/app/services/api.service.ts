import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.interface';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/listaClientes';

  constructor(private http: HttpClient) {}

  registrarCliente<User>(clientRegister: User) {
    return this.http
      .post(`${this.baseUrl}`, clientRegister)
      .pipe(catchError((err) => err));
  }

  obtenerClientes() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
  obtenerCliente(cliente: number) {
    return this.http.get<User>(`${this.baseUrl}/${cliente}`);
  }
  editarCliente(id: number, user: User) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }
  eliminarCliente(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }
}
