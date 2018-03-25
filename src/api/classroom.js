import { requestAPI as request } from '@/utils/request'

export function getAllClassroomByPracticum (practicum) {
  return request('get', '/classroom/practicum/' + practicum.id)
}

export function getAllClassroomByAssistance (assistance) {
  return request('get', '/classroom/assistance/' + assistance)
}

export function getAllClassroomByPractican (practican) {
  return request('get', 'classroom/practican/' + practican)
}

export function addClassroom (classroom) {
  return request('post', 'classroom', classroom)
}

export function updateClassroom (classroom) {
  return request('put', 'classroom/' + classroom.id, classroom)
}

export function deleteClassroom (classroom) {
  return request('delete', 'classroom/' + classroom.id)
}

export function getByEnrollmentKey (enrollmentKey, id) {
  return request('get', 'classroom/enroll/' + enrollmentKey + '/' + id)
}

export function fetchCandidateAssistance (classroom, query) {
  return request('get', 'user/search/assistance/' + classroom.id + '/' + query)
}
