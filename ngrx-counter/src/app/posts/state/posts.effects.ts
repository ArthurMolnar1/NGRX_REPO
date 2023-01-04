import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { map, mergeMap, switchMap, tap } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { PostsService } from "src/app/services/posts.service";
import { AppState } from "src/app/store/app.state";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";

@Injectable()
export class PostsEffects {
    constructor(
        private actions$: Actions,
        private postsService: PostsService,
        private store: Store<AppState>,
        private router: Router
    ) { }

    loadPosts$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadPosts),
                mergeMap((action) => {
                    return this.postsService.getPosts().pipe(
                        map((posts) => {
                            return loadPostsSuccess({ posts })
                        })
                    )
                })
            )
        }
    )

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap(action => {
                return this.postsService.addPost(action.post).pipe(
                    map((data: { name: string }) => {
                        const post = { ...action.post, id: data.name };
                        return addPostSuccess({ post, redirect: true });
                    })
                )
            })
        )
    })

    postRedirect$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(...[addPostSuccess]),
                tap((action) => {
                    if (action.redirect) {
                        this.router.navigate(['/posts'])
                    }
                })
            )
        },
        { dispatch: false }
    );

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postsService.updatePost(action.post).pipe(
                    map((data: Post) => {
                        return updatePostSuccess({ post: action.post })
                    })
                );
            })
        )
    })

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postsService.deletePost(action.id).pipe(
                    map((data: null) => {
                        return deletePostSuccess({ id: action.id })
                    })
                );
            })
        )
    })
}