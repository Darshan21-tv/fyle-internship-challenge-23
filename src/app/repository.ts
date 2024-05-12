// repository.ts
  export interface Repository {
    id: number;
    name: string;
    full_name: string;
    owner: {
      login: string;
    };
    description: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    html_url: string;
  }
  