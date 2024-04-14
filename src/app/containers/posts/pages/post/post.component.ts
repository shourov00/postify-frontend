import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [BreadcrumbsComponent, NgForOf, NgIf, PaginationComponent, RouterLink, SearchFiltersComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
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
    private userService: UserService,
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
  }

  ngOnInit(): void {
    this.spinner.show();
    this.loadUsers();

    if (this.id) {
      this.postService.getPostDetails(this.id).subscribe((post: Post) => {
        this.titleService.setTitle(`Postify - ${post.title}`);
        this.post = post;
        this.spinner.hide();
      });
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  findUserById(userId: number): User | null {
    return this.userService.findUserById(userId, this.users);
  }
}
