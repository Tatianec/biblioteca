import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Caderno } from 'src/app/models/caderno.models';
import { CadernoService } from 'src/app/services/caderno/caderno.service';

@Component({
  selector: 'app-caderno-index',
  templateUrl: './caderno-index.component.html',
  styleUrls: ['./caderno-index.component.css']
})
export class CadernoIndexComponent implements OnInit {

  cadernos:Caderno[];
  searchId: string;
  searchTitulo: string; 

  constructor(private router:Router, private cadernoService: CadernoService, private route: ActivatedRoute) { 

    this.cadernos = new Array<Caderno>();
    this.searchId = "";
    this.searchTitulo = "";

  }

  ngOnInit(): void {
    
  }

  goToCreate(): void{
    this.router.navigateByUrl("cadernos/caderno-create");
  }  

  goToEdit(id:number):void{
    this.router.navigate(["cadernos/caderno-edit",id]);
  } 

  clearList():void{
    this.cadernos = [];
  }

  get(): void{

    this.clearList();

      if(this.searchId !== ""){
        const id: number = Number(this.searchId);
        this.getById(id);
        console.log("getById");
        return;
      }
      else if(this.searchTitulo !== ""){
        this.getByTitulo(this.searchTitulo);
        console.log("getByTitulo")
        return;
      }
      else
      this.getAll();
  }

  getAll(): void{

    console.log("cadernoIndex")
    this.cadernoService.getAll()
      .subscribe((cadernos) => {
        this.cadernos = cadernos;
        console.log(this.cadernos)
      });
      console.log(this.cadernos);
      console.log("cadernoIndexComponent.getAllVoid");
  }
  
  getById(id:number): void{
    this.cadernoService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe((data) => {
      if(data != null)
      this.cadernos.push(data);
    });
  }

  getByTitulo(titulo:string): void{
    console.log("cadernoIndex")
    this.cadernoService.getByTitulo(titulo)
      .subscribe((cadernos) => {
        this.cadernos = cadernos;
        console.log(this.cadernos)
      });
      console.log(this.cadernos);
      console.log("getByTitulo.getAllVoid");
  }

  delete(id:number): void{
    console.log("passou no delete");
    if(confirm(`Deseja excluir o caderno ${id}?`)){
      this.cadernoService.delete(id)
        .subscribe(() => {
          this.get();
        });
      console.log(`Caderno ${id} excluido!`);
    }
  }

}
