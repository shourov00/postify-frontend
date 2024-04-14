import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, SidebarComponent, NgForOf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input()
  appTitle: string = '';

  @Output() collapseValue = new EventEmitter<boolean>();

  @Input()
  isCollapse: boolean = false;

  constructor() {}
}
