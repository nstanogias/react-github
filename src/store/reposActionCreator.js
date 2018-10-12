import * as types from './reducers/actionTypes';
import * as creds from '../credentials';

const fetchReposSuccess = (repos, username, count) => {
  return {
    type: types.FETCH_REPOS_SUCCESS,
    repos,
    username,
    count
  }
};

const fetchReposFail = (error) => {
  return {
    type: types.FETCH_REPOS_FAIL,
    error
  }
};

const clear = () => {
  return {
    type: types.CLEAR_STATE
  }
};

export const clearState = () => {
  return dispatch => {
    dispatch(clear());
  }
};

export const fetchRepos = (dataa) => {
  return dispatch => {
    fetch(
      `https://api.github.com/users/${dataa.user}/repos?per_page=${dataa.count}&sort=${dataa.sort}&client_id=${creds.CLIENT_ID}&client_secret=${creds.CLIENT_SECRET}`
    )
      .then((response) => {
        if(response.status === 200) {
          console.log("SUCCESS");
          return response.json()
        }
        else if(!response.ok){
          console.log("SOMETHING WENT WRONG");
          throw new Error(response.status);
        }
      })
      .then(data => {
        console.log(data);
        const repos = [];
        for ( let id in data ) {
          repos.push({
            ...data[id],
            id: id
          });
        }
        dispatch(fetchReposSuccess(repos, dataa.user, dataa.count));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchReposFail(err));
      });
  }
};