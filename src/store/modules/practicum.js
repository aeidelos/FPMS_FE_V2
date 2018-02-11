const practicum = {
  state: {
    AS_COORDINATOR: {
      practicums: {}
    },
    AS_HEADLAB: {
      practicums: {}
    }
  },
  mutations: {
    SET_COORDINATOR: (state, practicum) => {
      state.AS_COORDINATOR.practicums[practicum.id] = practicum
    },
    SET_HEADLAB: (state, practicum) => {
      state.AS_HEADLAB.practicums[practicum.id] = practicum
    }
  }
}

export default practicum
