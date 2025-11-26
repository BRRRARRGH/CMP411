import { Component } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.html',
  styleUrls: ['./heroes.css']
})
export class HeroesComponent {
  hero = 'Windstorm';
}
