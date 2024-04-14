import { Component, Input } from '@angular/core';
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
  @Input()
  appTitle: string = '';

  appVersion: string;
  menuApp: Menu[];

  constructor(private router: Router) {
    this.menuApp = MenuApp;
    this.appVersion = '1.0.0';
  }

  isLinkActive(url: string): boolean {
    const pathname = this.router.url;
    return pathname === url || (url !== '/' && pathname.includes(url));
  }
}
