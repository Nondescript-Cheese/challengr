export const FETCHING_USERS = 'FETCHING_USERS'
export const FETCHED_USERS = 'FETCHED_USERS'

export const fetchingAllUsers = () => {
  return {
    type: FETCHING_USERS
  }
}

export const fetchedAllUsers = (users) => {
  console.log('action fetchedAllUsers is fired with data: ', users);
  return {
    type: FETCHED_USERS,
    payload: users
  }
}

export const fetchAllUsers = () => {
  return dispatch => {
  	dispatch(fetchingAllUsers);
  	return fetch('http://localhost:3000/getAllUsers/')
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch(fetchedAllUsers(response));
    })
    .catch(error => {
      console.warn(error);
    })

  }
}