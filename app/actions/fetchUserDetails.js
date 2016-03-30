export const GETTING_USER = 'GETTING_USER'
export const GOT_USER = 'GOT_USER'
import { getChallenges } from './index'
import { fetchAllUsers } from './fetchUsers'

import { Actions } from 'react-native-router-flux'

export const gettingUser = () => {
  return {
    type: GETTING_USER,
  }
}

export const gotUser = (user) => {
  return {
    type: GOT_USER,
    user
  }
}

export const getUserDispatcher = (userToken, userId) => {
  return dispatch => {
    dispatch(gettingUser())

    return fetch('https://graph.facebook.com/v2.3/'+userId+'?fields=name,email&access_token='+userToken)
    .then((data) => {
      return data.json()
    })
    .then((response) => {
      console.log('this is the response from facebook', response)
      let currentUser = {
        username: response.name
      }
      return fetch('http://159.203.239.224:3000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUser)
      })
      .then((data) => {
        return data.json()
      })
      .then((response) => {
        let userInfo = {
          id: response.id,
          username: response.username
        }
        dispatch(gotUser(userInfo));
        //Re-directing the user
        Actions.myChallenges();
        return userInfo
      })
      .then((userInfo) => {
        dispatch(getChallenges(userInfo.id))
        dispatch(fetchAllUsers())
      })
      .catch((error) => {
        console.warn(error)
      })
    })
  } 
}