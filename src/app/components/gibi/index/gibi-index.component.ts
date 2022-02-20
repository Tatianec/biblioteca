import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Gibi } from 'src/app/models/gibi.models';
import { GibiService } from 'src/app/services/gibi/gibi.service';

@Component({
  selector: 'app-gibi-index',
  templateUrl: './gibi-index.component.html',
  styleUrls: ['./gibi-index.component.css']
})
export class GibiIndexComponent implements OnInit {

  gibis:Gibi[];
  searchId: string;
  searchTitulo: string;

  constructor(private router:Router,private gibiService: GibiService ,private route: ActivatedRoute) {

    this.gibis = new Array<Gibi>();
    this.searchId = "";
    this.searchTitulo = "";
   }

  ngOnInit(): void {
  }

  goToEdit(id:number):void{
    this.router.navigate(["gibis/gibi-edit",id]);
  } 

  clearList():void{
    this.gibis = [];
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
        this.getByDescricao(this.searchTitulo);
        console.log("getByTitulo")
        return;
      }
      else
      this.getAll();
  }

  getAll(): void{

    this.gibiService.getAll()
      .subscribe((gibis) => {
        this.gibis = gibis;
        console.log(this.gibis)
      });
      console.log(this.gibis);
      console.log("gibiIndexComponent.getAllVoid");
  }

  getByDescricao(titulo:string): void{
    this.gibiService.getByTitulo(titulo)
      .pipe(
        take(1)
      )
      .subscribe((gibis) => {
        this.gibis = gibis;
        console.log(this.gibis)
      });
      console.log(this.gibis);
      console.log("getByTitulo.getAllVoid");
  }

  getById(id:number): void{
    this.gibiService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe((data) => {
      if(data != null)
      this.gibis.push(data);
    });
  }

  goToCreate(): void{
    this.router.navigateByUrl("gibis/gibi-create");
  } 
   
  goToIndex(): void{
    this.router.navigateByUrl("gibis/gibi-index");
  }

  delete(id:number): void{
    console.log("passou no delete");
    if(confirm(`Deseja excluir o gibi ${id}?`)){
      this.gibiService.delete(id)
      .subscribe(() => {
        this.getAll();
      });
      console.log(`Gibi ${id} excluido!`);
    }
  }


}
