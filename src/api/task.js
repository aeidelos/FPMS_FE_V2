import { request } from '@/utils/request'

export function addTask (task) {
  return request('post', 'task/', task)
}

export function updateTask (task) {
  return request('put', 'task/' + task.id, task)
}

export function deleteTask (task) {
  return request('delete', 'task/' + task.id)
}

export function getAllTaskByPracticum (practicumId) {
  return request('get', 'task/practicum/' + practicumId + '/current')
}

export function getAllTaskByPracticumPast (practicumId) {
  return request('get', 'task/practicum/' + practicumId + '/past')
}

export function getAllTaskByPractican (practicanId) {
  return request('get', 'task/practican/' + practicanId + '/current')
}

export function getAllTaskByPracticanPast (practicanId) {
  return request('get', 'task/practican/' + practicanId + '/past')
}

export function getAllTaskByClassroom (classroomId) {
  return request('get', 'task/mix/' + classroomId + '/current')
}

export function getAllTaskByClassroomPast (classroomId) {
  return request('get', 'task/mix/' + classroomId + '/past')
}
