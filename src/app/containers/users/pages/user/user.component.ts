import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { SearchFiltersComponent } from '../../../../components/search-filters/search-filters.component';
import { Breadcrumb } from '../../../../components/breadcrumbs/breadcrumbs.model';
import { UserService } from '@services/user/user.service';
import { User } from '@services/user/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { KiloMegaPipe } from '../../../../shared/pipe/mega.pipe';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    NgForOf,
    NgIf,
    PaginationComponent,
    RouterLink,
    SearchFiltersComponent,
    DatePipe,
    KiloMegaPipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Users',
      link: '/users'
    }
  ];

  id?: string;
  user?: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.breadcrumbs.push({
      title: 'User details',
      link: `/users/${this.id}`,
      isActive: true
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    if (this.id) {
      this.userService.getUserDetails(this.id).subscribe((user: User | null) => {
        if (user) this.user = user;

        this.spinner.hide();
      });
    }
  }
}
