import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SortDirection } from '@angular/material/sort';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  btnClick$ = new Subject();
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(
    sort: string,
    order: SortDirection,
    page: number
  ): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }

  handleClick(item: any) {
    this.btnClick$.next(item);
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  updated_at: any;
  number: string;
  state: string;
  title: string;
}
