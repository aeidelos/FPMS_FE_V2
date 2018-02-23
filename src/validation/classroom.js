export function validateAdd (classroom) {
  return classroom.name !== '' && classroom.name !== null && classroom.practicum !== null &&
    classroom.practicum !== undefined && classroom.practicum !== ''
}

export function validateUpdate (classroom) {
  return validateAdd(classroom) && classroom.id !== null && classroom.id !== '' && classroom.id !== undefined
}
