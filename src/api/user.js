import { requestPublic, request } from '@/utils/request'

export function register (user) {
  return requestPublic('post', 'register/', user)
}

export function update (user) {
  return request('put', 'user/' + user.id, user)
}

export function changePassword (userId, oldPassword, newPassword) {
  return request('post', 'user/password', 'userId=' + userId + '&oldPassword=' + oldPassword + '&newPassword=' + newPassword)
}
