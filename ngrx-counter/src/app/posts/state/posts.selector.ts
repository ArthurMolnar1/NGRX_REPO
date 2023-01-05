import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRoute } from 'src/app/router/router.selector';
import { RouterStateUrl } from 'src/app/router/custom-serializer';

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
    return state.posts;
})

export const getPostById = createSelector(getPosts, getCurrentRoute, (posts, route: RouterStateUrl) => {
    return posts ? posts.find((post) => post.id === route.params['id']) : null;
    }
);
