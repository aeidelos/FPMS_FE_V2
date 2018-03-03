import { request } from '@/utils/request'

export function getAssignmentInformation (assignment, user) {
  return request('get', 'file/information/' + assignment.id + '/' + user.id)
}

export function uploadAssignment (assignment, user, form) {
  return request('post', 'assignment/p/' + assignment.id + '/' + user.id, form, 'File berhasil disimpan', 'Gagal mengupload file')
}
