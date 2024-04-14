import { Component, inject, OnInit } from '@angular/core';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.model';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { User } from '@services/user/user.model';
import { UserService } from '@services/user/user.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { RouterLink } from '@angular/router';
import { CoreFacade } from '@store/core/core.facade';
import { UsersFacade } from '@store/users/users.facade';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    NgClass,
    FormsModule,
    NgForOf,
    NgIf,
    NgxSpinnerModule,
    PaginationComponent,
    SearchFiltersComponent,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private readonly usersFacade: UsersFacade = inject(UsersFacade);

  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Users',
      link: '/users',
      isActive: true
    }
  ];

  users: User[] = [];

  constructor() {
    this.usersFacade.users$.subscribe((users: User[]) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  trackByUser(index: number, item: User): number {
    return item.id;
  }
}
