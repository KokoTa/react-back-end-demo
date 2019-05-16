const defaultValue = {
  userInfo: {} // ! 注意状态树在刷新后就重置了，可以保存在 sessionStorage/localStorage 中
}

function Global (state = defaultValue, action) {
  switch (action.type) {
    case 'SET_USER':
      state.userInfo = action.userInfo
      return state
    default:
      return state
  }
}

export default Global
