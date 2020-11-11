// reducer
export function auth(state = {status: 'logged out', value: 'guest'}, action) {
    switch (action.type) {
      case 'LOGIN':
        return Object.assign({}, state, {
          status: 'logged in',
          value: action.value
        })
      case 'LOGOUT':
        return Object.assign({}, state, {
          status: 'logged out',
          value: action.value
        })
      default:
        return state;
    }
  }