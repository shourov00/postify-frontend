import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss'
})
export class WelcomeCardComponent {}
