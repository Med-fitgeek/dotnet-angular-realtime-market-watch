import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { TickerComponent } from '../../components/ticker/ticker.component';
import { FeaturesSectionComponent } from '../../components/features-section/features-section.component';
import { CtaComponent } from '../../components/cta/cta.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, TickerComponent, FeaturesSectionComponent, CtaComponent],
  template: `
    <app-hero />
    <app-ticker />
    <app-features-section />
    <app-cta />
  `
})
export class LandingComponent {}