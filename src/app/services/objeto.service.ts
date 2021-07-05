import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  url: string = 'http://localhost:3000/api/usuarios/';

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(this.url);
  }

  getUsuario(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  guadarUsuario(usuario: Usuarios): Observable<any>{
    return this.http.post(this.url, usuario);
  }

  putUsuario(id: string, usuario: Usuarios): Observable<any>{
    return this.http.put(this.url + id, usuario);
  }

  deleteUsuario(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

}
