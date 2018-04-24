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

export function runCode (document) {
  return request('get', 'file/compile/' + document.id)
}

export function setGrade (idDocument, grade) {
  return request('post', '/assignment/grade/set', 'idDocument=' + idDocument + '&grade=' + grade)
}

export function getDashboard (user) {
  return request('get', 'assignment/dashboard/' + user.id)
}

export function getExportedGrade (classroom) {
  return request('get', 'assignment/export/' + classroom.id)
}
