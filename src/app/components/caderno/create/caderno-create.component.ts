import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Caderno } from 'src/app/models/caderno.models';
import { CadernoService } from 'src/app/services/caderno/caderno.service';

@Component({
  selector: 'app-caderno-create',
  templateUrl: './caderno-create.component.html',
  styleUrls: ['./caderno-create.component.css']
})
export class CadernoCreateComponent implements OnInit {


  caderno: Caderno;

  constructor(private router:Router, private cadernoService: CadernoService) {
    this.caderno = new Caderno();
  }

  ngOnInit(): void {
  }

  goToIndex(): void{
    this.router.navigateByUrl("cadernos/caderno-index");
  }

  post(): void{
    console.log("passou no post create.component");
    this.cadernoService.post(this.caderno)
    .pipe(
      take(1)
    )
    .subscribe(data => {
      this.caderno = data
    })
    console.log(this.caderno);
  }
}
