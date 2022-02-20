import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Caderno } from 'src/app/models/caderno.models';
import { CadernoService } from 'src/app/services/caderno/caderno.service';

@Component({
  selector: 'app-caderno-edit',
  templateUrl: './caderno-edit.component.html',
  styleUrls: ['./caderno-edit.component.css']
})
export class CadernoEditComponent implements OnInit {

  caderno:Caderno;

  constructor(private router:Router, private cadernoService: CadernoService, private activateRoute: ActivatedRoute) 
  {  

    this.caderno = new Caderno();

  }

  ngOnInit(): void { 
    const id: number = Number(this.activateRoute.snapshot.paramMap.get("id"));
    this.getById(id);
  }

  getById(id:number){
    this.cadernoService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe((data) => {
      this.caderno = data;
    });
  }

  goToIndex(): void{
    this.router.navigateByUrl("cadernos/caderno-index");
  }

  put(): void{
    this.cadernoService.put(this.caderno)
    .pipe(
      take(1)
    )
    .subscribe(() => {
      this.goToIndex();
    })
    console.log(this.caderno);
  }

}
