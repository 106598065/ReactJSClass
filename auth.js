import { ASYNC } from 'redux-amrc';

/**
 * 這個action建立函式將會自動建立 LOAD 和 LOAD_SUCCESS 這兩個 action,
 * state.async.[key] 將會變為 'success'
 */
function success() {
  return {
    [ASYNC]: {
      key: 'key',
      promise: () => Promise.resolve('success')
    }
  }
}
function fail() {
    return {
      [ASYNC]: {
        key: 'key',
        promise: () => Promise.reject('fail')
      }
    }
  }