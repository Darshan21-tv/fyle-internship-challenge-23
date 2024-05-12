import { Component, OnInit, ViewChild } from '@angular/core';
import { GithubRepoService } from '../github-repo.service';
import { Repository } from '../repository'; // Correct the import path
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-github-repo-listing',
  templateUrl: './github-repo-listing.component.html',
  styleUrls: ['./github-repo-listing.component.css']
})
export class GithubRepoListingComponent implements OnInit {
  username: string = '';
  loading: boolean = false;
  repositories: Repository[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  
  dataSource: Repository[] = [];
  displayedColumns: string[] = ['name', 'description', 'html_url']; // Define displayed columns

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Add ! after paginator

  constructor(private githubRepoService: GithubRepoService) { }

  ngOnInit(): void {
    this.getRepositories();
  }

  searchRepositories() {
    this.getRepositories();
  }

  getRepositories() {
    this.loading = true;
    this.githubRepoService.getRepositories(this.username, this.currentPage, this.pageSize).subscribe(
      (repos: Repository[]) => { // Explicitly specify the type of data
        this.repositories = repos;
        this.totalItems = repos.length;
        this.dataSource = repos; // Assign data to dataSource
        this.loading = false;
      },
      error => {
        console.error('Error loading repositories:', error);
        this.loading = false;
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getRepositories();
  }
}
