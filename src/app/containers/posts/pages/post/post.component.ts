import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { SearchFiltersComponent } from '../../../../components/search-filters/search-filters.component';
import { Breadcrumb } from '../../../../components/breadcrumbs/breadcrumbs.model';
import { PostService } from '@services/post/post.service';
import { User } from '@services/user/user.model';
import { Post } from '@services/post/post.model';
import { UserService } from '@services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import {UsersFacade} from "@store/users/users.facade";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [BreadcrumbsComponent, NgForOf, NgIf, PaginationComponent, RouterLink, SearchFiltersComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  private readonly usersFacade: UsersFacade = inject(UsersFacade);

  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Posts',
      link: '/posts'
    }
  ];

  id?: string;
  post?: Post;
  users: User[] = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private titleService: Title
  ) {
    this.id = this.route.snapshot.params['id'];
    this.breadcrumbs.push({
      title: 'Post details',
      link: `/posts/${this.id}`,
      isActive: true
    });

    this.usersFacade.users$.subscribe((users: User[]) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.usersFacade.loadUsers();

    if (this.id) {
      this.spinner.show();
      this.postService.getPostDetails(this.id).subscribe((post: Post) => {
        this.titleService.setTitle(`Postify - ${post.title}`);
        this.post = post;
        this.spinner.hide();
      });
    }
  }

  findUserById(userId: number): User | null {
    return this.users.find((item: User) => item.id === userId) || null;
  }
}
