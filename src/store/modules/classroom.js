import { getUser } from '@/utils/auth'
import { request } from '@/utils/request'

const classroom = {
  state: {
    PRACTICAN: {
      classrooms: {},
      size: 0
    },
    ASSISTANCE: {
      classrooms: {},
      size: 0
    },
    COORDINATOR: {
      classrooms: {},
      size: 0
    }
  },
  mutations: {
    SET_PRACTICAN: (state, classroom) => {
      state.PRACTICAN.classrooms[classroom.id] = classroom
    },
    SET_PRACTICAN_SIZE: (state, size) => {
      state.PRACTICAN.size = size
    },
    SET_ASSISTANCE: (state, classroom) => {
      state.ASSISTANCE.classrooms[classroom.id] = classroom
    },
    SET_ASSISTANCE_SIZE: (state, size) => {
      state.ASSISTANCE.size = size
    },
    SET_COORDINATOR: (state, classroom) => {
      state.COORDINATOR.classrooms[classroom.id] = classroom
    }
  },
  actions: {
    SET_CLASSROOM_PRACTICAN: ({commit}) => {
      request('get', 'classroom/practican/' + getUser(), '')
        .then((response) => {
          response.object.classrooms.forEach(element => {
            commit('SET_PRACTICAN', element)
          })
          commit('SET_PRACTICAN_SIZE', response.object.classrooms.length)
        })
    }
  }
}

export default classroom
