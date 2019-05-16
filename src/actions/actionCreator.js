const SET_USER = 'SET_USER'

const ActionCreator = {
  setUser: (userInfo) => ({
    type: SET_USER,
    userInfo
  })
}

export default ActionCreator
