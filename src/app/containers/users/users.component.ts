import { Component, inject, OnInit } from '@angular/core';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.model';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { User } from '@services/user/user.model';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { RouterLink } from '@angular/router';
import { UsersFacade } from '@store/users/users.facade';
import { ToastrService } from 'ngx-toastr';

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
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  readonly usersFacade: UsersFacade = inject(UsersFacade);

  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Users',
      link: '/users',
      isActive: true
    }
  ];

  constructor(private toastr: ToastrService) {
    this.usersFacade.error$.subscribe((error: string | null) => {
      if (error) {
        this.toastr.error(error);
      }
    });
  }

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  trackByUser(index: number, item: User): number {
    return item.id;
  }
}
