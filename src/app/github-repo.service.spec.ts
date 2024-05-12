// github-repo.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubRepoService } from './github-repo.service';
import { Repository } from './repository'; // Import the Repository interface
import { GithubRepoListingComponent } from './github-repo-listing/github-repo-listing.component'; // Import the component

describe('GithubRepoService', () => {
  let service: GithubRepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubRepoService],
      declarations: [GithubRepoListingComponent] // Add the component to the declarations array
    });
    service = TestBed.inject(GithubRepoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve repositories', () => {
    const dummyRepos: Repository[] = [
      { 
        id: 1, 
        name: 'Repo 1', 
        description: 'Description 1', 
        html_url: 'http://repo1.com',
        full_name: 'User1/Repo1',
        owner: { login: 'User1' },
        stargazers_count: 10,
        watchers_count: 5,
        forks_count: 3
      },
      { 
        id: 2, 
        name: 'Repo 2', 
        description: 'Description 2', 
        html_url: 'http://repo2.com',
        full_name: 'User2/Repo2',
        owner: { login: 'User2' },
        stargazers_count: 20,
        watchers_count: 15,
        forks_count: 7
      }
    ];

    service.getRepositories('testuser', 1, 10).subscribe((repos: Repository[]) => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(dummyRepos);
    });

    const req = httpMock.expectOne('https://api.github.com/users/testuser/repos?page=1&per_page=10');
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepos);
  });
});
