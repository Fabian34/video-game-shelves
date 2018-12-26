import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideogamesService } from '../services/videogames.service';
import { Videogame } from '../models/videogame.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogame-list',
  templateUrl: './videogame-list.component.html',
  styleUrls: ['./videogame-list.component.scss']
})
export class VideogameListComponent implements OnInit, OnDestroy {

  videogames: Videogame[];
  videogamesSubscription: Subscription;

  constructor(private videogamesService: VideogamesService, private router: Router) {}

  ngOnInit() {
    this.videogamesSubscription = this.videogamesService.videogamesSubject.subscribe(
      (videogames: Videogame[]) => {
        this.videogames = videogames;
      }
    );
    this.videogamesService.emitVideogames();
  }

  onNewVideogame() {
    this.router.navigate(['/videogames', 'new']);
  }

  onDeleteVideogame(videogame: Videogame) {
    this.videogamesService.removeVideogame(videogame);
  }

  onViewVideogame(id: number) {
    this.router.navigate(['/videogames', 'view', id]);
  }
  
  ngOnDestroy() {
    this.videogamesSubscription.unsubscribe();
  }
}