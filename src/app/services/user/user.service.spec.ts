import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { ApiService } from '@services/api/api.service';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { User } from '@services/user/user.model';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { Post } from '@services/post/post.model';
import { Album } from '@services/album/album.model';

describe('UserService', () => {
  let userService: UserService;
  let apiServiceSpy: jest.Mocked<ApiService>;

  beforeEach(() => {
    const apiServiceSpyObj = {
      getBody: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [UserService, { provide: ApiService, useValue: apiServiceSpyObj }]
    });
    userService = TestBed.inject(UserService);
    apiServiceSpy = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return an array of users', () => {
      const users: User[] = USERS;
      apiServiceSpy.getBody.mockReturnValue(of(users));

      userService.getUsers().subscribe(result => {
        expect(result).toEqual(users);
      });
    });
  });

  describe('getUserDetails', () => {
    it('should return user details with posts and albums', () => {
      const userId = faker.string.uuid();
      const user: User = createRandomUser();
      const posts: Post[] = Array.from({ length: 3 }, createRandomPost);
      const albums: Album[] = Array.from({ length: 3 }, createRandomAlbum);

      apiServiceSpy.getBody
        .mockReturnValueOnce(of(user))
        .mockReturnValueOnce(of(posts))
        .mockReturnValueOnce(of(albums));

      userService.getUserDetails(userId).subscribe(result => {
        expect(result).toEqual({ ...user, posts, albums });
      });
    });
  });
});

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 5
});

function createRandomUser(): User {
  return {
    id: faker.number.int(),
    name: faker.internet.displayName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.string.uuid()
  };
}

function createRandomPost(): Post {
  return {
    id: faker.number.int(),
    userId: faker.number.int(),
    title: faker.internet.userName(),
    body: faker.internet.displayName(),
    createdAt: new Date(),
    likeCount: faker.number.int(),
    views: faker.number.int(),
    shareCount: faker.number.int()
  };
}

function createRandomAlbum(): Album {
  return {
    id: faker.number.int(),
    userId: faker.number.int(),
    title: faker.internet.userName()
  };
}
