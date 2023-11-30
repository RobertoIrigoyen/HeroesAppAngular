import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(500),
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      ).subscribe(hero => {
        if (!hero) return this.router.navigate(['/heroes/list']);
        console.log({ hero });
        return this.hero = hero;
      })
  }

  goBack() {
    this.router.navigateByUrl('/heroes/list')
  }
}
