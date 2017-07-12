import 'rxjs/add/operator/switchMap';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';

@Component({
   selector: 'hero-detail',
   templateUrl: './hero-detail.component.html',
   styleUrls: [ './hero-detail.component.scss' ]
})

export class HeroDetailComponent {
    hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
            .subscribe(hero => this.hero = hero);
    }

    goBack(): void {
        this.location.back();
    }
}
