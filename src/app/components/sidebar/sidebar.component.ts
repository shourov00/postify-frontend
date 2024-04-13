import { Component } from '@angular/core';
import { Menu, MenuApp } from '../../shared/models/Menu';
import { NgClass, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  appVersion: string;
  menuApp: Menu[];

  constructor(private router: Router) {
    this.menuApp = MenuApp;
    this.appVersion = '1.0.1';
  }

  isLinkActive(url: string): boolean {
    return this.router.url.includes(url);
  }
}
