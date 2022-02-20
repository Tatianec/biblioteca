import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caderno } from 'src/app/models/caderno.models';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadernoService {

  private uri: string = "https://localhost:44393/api/cadernos/";

  constructor(private request: HttpClient) {

    console.log("passou no service")
   }

   getAll():Observable<Caderno[]>{
     console.log("cadernoService.getAll");
     return this.request.get<Caderno[]>(this.uri);
   }

   post(caderno: Caderno):Observable<Caderno>{
    console.log("passou no save com observable");
    return this.request.post<Caderno>(this.uri, caderno);
   }

   delete(id:number):Observable<Caderno>{
    const endpoint: string = this.uri + id;
    console.log(id);
    console.log(endpoint);
    return this.request.delete<Caderno>(endpoint);
   }

   getById(id: number){
    console.log("passou no getbyid")
    const endpoint: string = this.uri + id;
    console.log(endpoint);
    return this.request.get<Caderno>(endpoint);
  } 
  
  getByTitulo(titulo: string){
    console.log("passou no getbyid")
    const endpoint: string = `${this.uri}?titulo=${titulo}`;
    console.log(endpoint);
    return this.request.get<Caderno[]>(endpoint);
  } 

   put(caderno:Caderno): Observable<Caderno>{
    console.log("id caderno: " + caderno.Id);
    const endpoint: string = this.uri + caderno.Id;
    console.log(endpoint);
    return this.request.put<Caderno>(endpoint, caderno);
  }

}
