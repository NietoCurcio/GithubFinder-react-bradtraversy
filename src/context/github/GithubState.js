// actions
// with context here besides actions have initalState as well
import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

let githubToken;
// the global variables in env.local, we not use this in production
// we want to deploy the build folder, after npm run build

if (process.env.NODE_ENV !== 'production') {
  githubToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
  // use normal variable, lookfor a global variable call github_token
  githubToken = process.env.GITHUB_TOKEN;
}

const GithubState = (props) => {
  const initalState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initalState);

  // Search users
  const searchUsers = async (text) => {
    setLoading();
    // console.log(text); only in browser too
    const uri = encodeURI(`https://api.github.com/search/users?q=${text}`);
    const headers = {
      Authorization: `token ${githubToken}`,
    };
    const res = await axios.get(uri, { headers });
    // console.log(res.data);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get user
  const getUser = async (username) => {
    setLoading();
    const uri = encodeURI(`https://api.github.com/users/${username}`);
    const headers = {
      Authorization: `token ${githubToken}`,
    };
    const res = await axios.get(uri, { headers });

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get repos
  const getUserRepos = async (username) => {
    setLoading();

    const uri = encodeURI(
      `https://api.github.com/users/${username}/repos?per_parge=5&sort=created:asc`
    );
    const headers = {
      Authorization: `token ${githubToken}`,
    };

    const res = await axios.get(uri, { headers }); // await VERY IMPORTANT, because without await
    // the application will try fetch data that we don't have yet

    dispatch({ type: GET_REPOS, payload: res.data });
  };

  // Clear users
  const clearUsers = (e) => dispatch({ type: CLEAR_USERS });

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        // available to entire app
      }}
    >
      {props.children}
      {/* wrapp the entire app in this provider */}
    </GithubContext.Provider>
  );
};

export default GithubState;
