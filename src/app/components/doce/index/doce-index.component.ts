import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Doce } from 'src/app/models/doce.models';
import { DoceService } from 'src/app/services/doce/doce.service';


@Component({
  selector: 'app-doce-index',
  templateUrl: './doce-index.component.html',
  styleUrls: ['./doce-index.component.css']
})

export class DoceIndexComponent implements OnInit {

  doces:Doce[];
  searchId: string;
  searchDescricao: string;

  constructor(private router:Router,private doceService: DoceService ,private route: ActivatedRoute) {

    this.doces = new Array<Doce>();
    this.searchId = "";
    this.searchDescricao = "";
   }

  ngOnInit(): void {
  }

  goToEdit(id:number):void{
    this.router.navigate(["doces/doce-edit",id]);
  } 

  clearList():void{
    this.doces = [];
  }

  get(): void{

    this.clearList();

      if(this.searchId !== ""){
        const id: number = Number(this.searchId);
        this.getById(id);
        console.log("getById");
        return;
      }
      else if(this.searchDescricao !== ""){
        this.getByDescricao(this.searchDescricao);
        console.log("getByDescricao")
        return;
      }
      else
      this.getAll();
  }

  getAll(): void{

    this.doceService.getAll()
      .subscribe((doces) => {
        this.doces = doces;
        console.log(this.doces)
      });
      console.log(this.doces);
      console.log("doceIndexComponent.getAllVoid");
  }

  getByDescricao(descricao:string): void{
    this.doceService.getByDescricao(descricao)
      .pipe(
        take(1)
      )
      .subscribe((doces) => {
        this.doces = doces;
        console.log(this.doces)
      });
      console.log(this.doces);
      console.log("getByDescricao.getAllVoid");
  }

  getById(id:number): void{
    this.doceService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe((data) => {
      if(data != null)
      this.doces.push(data);
    });
  }

  goToCreate(): void{
    this.router.navigateByUrl("doces/doce-create");
  } 
   
  goToIndex(): void{
    this.router.navigateByUrl("doces/doce-index");
  }

  delete(id:number): void{
    console.log("passou no delete");
    if(confirm(`Deseja excluir o doce ${id}?`)){
      this.doceService.delete(id)
      .subscribe(() => {
        this.getAll();
      });
      console.log(`Doce ${id} excluido!`);
    }
  }

}
