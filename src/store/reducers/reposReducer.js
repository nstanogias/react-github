import {FETCH_REPOS_SUCCESS, FETCH_REPOS_FAIL, CLEAR_STATE} from "./actionTypes";

const initialState = {
  username: '',
  repos: [],
  requestFailed: false,
  success: false,
  count: 20,
  error: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        repos: [action.repos],
        username: action.username,
        count: action.count,
        success: true,
        requestFailed: false
      };
    case FETCH_REPOS_FAIL:
      return {
        ...state,
        repos: [],
        username: '',
        count: 20,
        success: false,
        requestFailed: true,
        error: action.error
      };
    case CLEAR_STATE:
      return {
        ...state,
        repos: [],
        username: '',
        count: 20,
        success: false,
        requestFailed: false,
        error: ''
      };
    default:
      return state;
  }
}