const getters = {
  token: state => state.user.token,
  user: state => state.user.SIGNED,
  practicum_as_headlab: state => state.practicum.AS_HEADLAB,
  practicum_as_coordinator: state => state.practicum.AS_COORDINATOR,
  classroom_as_practican_list: state => state.classroom.PRACTICAN.classrooms,
  classroom_as_practican: state => state.classroom.PRACTICAN.classrooms
}

export default getters
