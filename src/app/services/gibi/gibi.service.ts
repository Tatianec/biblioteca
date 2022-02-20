import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gibi } from '../../models/gibi.models';

@Injectable({
  providedIn: 'root'
})
export class GibiService {

  private uri: string = "https://localhost:44393/api/gibis/";

  constructor(private request: HttpClient){

      console.log("passou no service")
  }
  
  getAll():Observable<Gibi[]>{
      console.log("gibiService.getAll");
      return this.request.get<Gibi[]>(this.uri);
  }
  delete(id:number):Observable<Gibi>{
    const uri: string = this.uri + id;
    console.log(id);
    return this.request.delete<Gibi>(uri);
}

post(gibi: Gibi):Observable<Gibi>{
    console.log("passou no save com observable");
    return this.request.post<Gibi>(this.uri, gibi);
}

getById(id: number):Observable<Gibi>{
    console.log("passou no getbyid Gibi")
    const uri: string = this.uri + id;
    console.log(uri);
    return this.request.get<Gibi>(uri);
}

getByTitulo(titulo: string):Observable<Gibi[]>{
    console.log("passou no getbyTitulo")
    const uri: string = `${this.uri}?titulo=${titulo}`;
    console.log(uri);
    return this.request.get<Gibi[]>(uri);
  } 

put(gibi:Gibi): Observable<Gibi>{
    console.log("id Gibi: " + gibi.Id);
    const uri: string = this.uri + gibi.Id;
    console.log(uri);
    return this.request.put<Gibi>(uri, gibi); 
}
}
