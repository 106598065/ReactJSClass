// store
import auth from '../auth/auth.js'
const { createStore } = Redux;

export const store = createStore(auth);