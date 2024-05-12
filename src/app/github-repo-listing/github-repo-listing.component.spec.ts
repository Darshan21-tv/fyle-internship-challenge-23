import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { GithubRepoService } from '../github-repo.service';
import { Repository } from '../repository'; // Import the Repository interface
import { GithubRepoListingComponent } from './github-repo-listing.component';

describe('GithubRepoListingComponent', () => {
  let component: GithubRepoListingComponent;
  let fixture: ComponentFixture<GithubRepoListingComponent>;
  let mockGithubRepoService: jasmine.SpyObj<GithubRepoService>; // Define type

  beforeEach(async () => {
    mockGithubRepoService = jasmine.createSpyObj('GithubRepoService', ['getRepositories']); // Define type

    await TestBed.configureTestingModule({
      declarations: [GithubRepoListingComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule],
      providers: [{ provide: GithubRepoService, useValue: mockGithubRepoService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubRepoListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRepositories and update repositories', async () => {
    const repos: Repository[] = [
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
    mockGithubRepoService.getRepositories.and.returnValue(of(repos));

    component.username = 'testuser';
    await component.searchRepositories();

    expect(component.loading).toBe(false);
    expect(component.repositories).toEqual(repos);
  });
});
