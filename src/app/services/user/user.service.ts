import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '@services/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers = (): Observable<User[]> => {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe();
  };

  findUserById(userId: number, users: User[]): User | null {
    return users.find((item: User) => item.id === userId) || null;
  }
}
