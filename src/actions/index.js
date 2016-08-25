import * as weatherApi from '../api/weather/weather';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

if (process.env.BROWSER) {
    window.weatherApi = weatherApi;
}

function fetchPostsFailure(error) {
    return {
        type: FETCH_POSTS_FAILURE,
        error: error
    };
}

function fetchPostsSuccess(data) {
    return {
        type: FETCH_POSTS_SUCCESS,
        receivedAt: Date.now(),
        data
    };
}

function fetchPosts() {
    return dispatch => {
        dispatch({
            type: FETCH_POSTS
        });
        return weatherApi.fetchForecast()
            .then(
                data => dispatch(fetchPostsSuccess(data)),
                error => dispatch(fetchPostsFailure(error))
            );
    };
}

function shouldFetchPosts(state) {
    const posts = state.posts;
    if (posts.data.length || posts.isFetching) {
        return false;
    }
    return true;
}

export function fetchPostsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState())) {
            return dispatch(fetchPosts());
        }
    };
}
