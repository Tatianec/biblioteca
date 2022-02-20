import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Doce } from "src/app/models/doce.models";

@Injectable({
    providedIn: 'root'
})

export class DoceService{

    private uri: string = "https://localhost:44393/api/doces/";

    constructor(private request: HttpClient){

        console.log("passou no service")
    }
    
    getAll():Observable<Doce[]>{
        console.log("doceDervice.getAll");
        return this.request.get<Doce[]>(this.uri);
    }

    delete(id:number):Observable<Doce>{
        const uri: string = this.uri + id;
        console.log(id);
        return this.request.delete<Doce>(uri);
    }

    post(doce: Doce):Observable<Doce>{
        console.log("passou no save com observable");
        return this.request.post<Doce>(this.uri, doce);
    }

    getById(id: number):Observable<Doce>{
        console.log("passou no getbyid doce")
        const uri: string = this.uri + id;
        console.log(uri);
        return this.request.get<Doce>(uri);
    }

    getByDescricao(descricao: string):Observable<Doce[]>{
        console.log("passou no getbyDescricao")
        const uri: string = `${this.uri}?descricao=${descricao}`;
        console.log(uri);
        return this.request.get<Doce[]>(uri);
      } 

    put(doce:Doce): Observable<Doce>{
        console.log("id doce: " + doce.Id);
        const uri: string = this.uri + doce.Id;
        console.log(uri);
        return this.request.put<Doce>(uri, doce); 
    }
    
}