import { Component, OnInit } from '@angular/core';
import { Videogame } from '../../models/videogame.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VideogamesService } from '../../services/videogames.service';

@Component({
  selector: 'app-single-videogame',
  templateUrl: './single-videogame.component.html',
  styleUrls: ['./single-videogame.component.scss']
})
export class SingleVideogameComponent implements OnInit {

  videogame: Videogame;

  constructor(	private route: ActivatedRoute, 
  				private videogamesService: VideogamesService,
              	private router: Router) {}

  ngOnInit() {
    this.videogame = new Videogame('', '');
    const id = this.route.snapshot.params['id'];
    this.videogamesService.getSingleVideogame(+id).then(
      (videogame: Videogame) => {
        this.videogame = videogame;
      }
    );
  }

  onBack() {
    this.router.navigate(['/videogames']);
  }
}