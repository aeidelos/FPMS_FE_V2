import { request } from '@/utils/request'

export function getAllCourses () {
  return request('get', 'course', '')
}

export function deleteCourse (idCourse) {
  return request('delete', 'course/' + idCourse, '')
}

export function addCourse (coursename, coursecode) {
  var course = 'coursename=' + coursename + '&coursecode=' + coursecode
  return request('post', 'course', course)
}

export function updateCourse (courseid, coursename, coursecode) {
  var course = {
    'courseName': coursename,
    'courseCode': coursecode
  }
  return request('put', 'course/' + courseid, course)
}
