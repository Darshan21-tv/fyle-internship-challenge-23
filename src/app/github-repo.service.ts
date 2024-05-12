import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from './repository'; // Import the Repository interface

@Injectable({
  providedIn: 'root'
})
export class GithubRepoService {
  constructor(private http: HttpClient) { }

  getRepositories(username: string, page: number, perPage: number): Observable<Repository[]> {
    return this.http.get<Repository[]>(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
  }
}
