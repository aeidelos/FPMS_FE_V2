import { request, requestDownload } from '@/utils/request'

export function getAssignmentInformation (assignment, user) {
  return request('get', 'file/information/' + assignment.id + '/' + user.id)
}

export function uploadAssignment (assignment, user, form) {
  return request('post', 'assignment/p/' + assignment.id + '/' + user.id, form, 'File berhasil disimpan', 'Gagal mengupload file')
}

export function getDocument (document) {
  return requestDownload('file/assignment/' + document.id)
}

export function getDocumentByClassroom (task, classroom) {
  if (classroom === null) {
    return request('get', '/assignment/classroom/' + task.id + '/null')
  } else {
    return request('get', '/assignment/classroom/' + task.id + '/' + classroom.id)
  }
}
