import { request } from '@/utils/request'

export function getAllPracticum () {
  return request('get', 'practicum', '')
}

export function addPracticum (practicumName, courseId) {
  return request('post', 'practicum', 'practicumname=' + practicumName + '&idcourse=' + courseId)
}

export function updatePracticum (practicum) {
  return request('put', 'practicum/' + practicum.id, practicum)
}

export function deletePracticum (practicum) {
  return request('delete', 'practicum/' + practicum.id + '')
}

export function fetchCandidateAssistance (search) {
  return request('get', 'user/search/coordinator/' + search)
}
