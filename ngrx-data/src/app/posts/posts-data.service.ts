import { Observable, map } from 'rxjs';
import { Post } from './../models/post.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Update } from '@ngrx/entity';

@Injectable()
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<Post[]> {
    return this.http
      .get(`https://vue-completecourse.firebaseio.com/posts.json`)
      .pipe(
        map((data: any) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  add(post: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(
        `https://vue-completecourse.firebaseio.com/posts.json`,
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  }

  update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      `https://vue-completecourse.firebaseio.com/posts/${post.id}.json`,
      { ...post.changes }
    );
  }

  delete(id: any): Observable<string> {
    return this.http.delete<Post>(
      `https://vue-completecourse.firebaseio.com/posts/${id}.json`,
    ).pipe(map(data => {
      return id;
    }));
  }
}
