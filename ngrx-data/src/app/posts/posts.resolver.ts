import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, first, tap } from 'rxjs';
import { PostService } from './post.service';

@Injectable()
export class PostsResolver implements Resolve<boolean> {
  constructor(private PostService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.PostService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.PostService.getAll();
        }
      }),
      first()
    );
  }
}
