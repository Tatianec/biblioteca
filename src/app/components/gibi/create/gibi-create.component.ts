import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Gibi } from 'src/app/models/gibi.models';
import { GibiService } from 'src/app/services/gibi/gibi.service';

@Component({
  selector: 'app-gibi-create',
  templateUrl: './gibi-create.component.html',
  styleUrls: ['./gibi-create.component.css']
})
export class GibiCreateComponent implements OnInit {


  gibi: Gibi;

  constructor(private router:Router, private gibiService: GibiService) { 

    this.gibi = new Gibi();

  }
  ngOnInit(): void {
  }

  goToIndex(): void{
    this.router.navigateByUrl("gibis/gibi-index");
  }

  post(): void{
    console.log("passou no gibi/post create.component");
    this.gibiService.post(this.gibi)
    .pipe(
      take(1)
    )
    .subscribe(data => {
      this.gibi = data
      this.goToIndex();
    })
    console.log(this.gibi);
  }
}
