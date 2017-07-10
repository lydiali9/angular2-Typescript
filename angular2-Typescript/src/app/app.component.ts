import { Component } from '@angular/core';
import { Hero } from './hero';

import { HeroService } from './hero.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [HeroService]
})

export class AppComponent {
    title = 'Tour of Heroes';
    heroes: Hero[];
    selectedHero: Hero;

    constructor(private heroService: HeroService) { }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
     
    ngOnInit(): void {
        this.getHeroes();
    }
     
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
}
