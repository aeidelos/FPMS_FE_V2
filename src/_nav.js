export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-home',
      roles: 'all'
    },
    {
      title: true,
      name: 'Praktikum',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      },
      roles: 'mhs'
    },
    {
      name: 'Praktikum',
      icon: 'icon-note',
      url: '/classroom/practican',
      roles: 'mhs'
    },
    {
      title: true,
      name: 'Asistensi',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      },
      roles: 'asprak'
    },
    {
      name: 'Asistensi',
      icon: 'icon-folder',
      url: '/classroom',
      children: [
        {
          name: 'Kelas',
          icon: 'icon-arrow-right',
          url: '/classroom/assistance'
        }
      ],
      roles: 'asprak'
    },
    {
      title: true,
      name: 'Koordinator',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      },
      roles: 'koas'
    },
    {
      name: 'Koordinator',
      icon: 'icon-folder',
      url: '/coordinator',
      children: [
        {
          name: 'Tugas & Kegiatan',
          icon: 'icon-arrow-right',
          url: '/task/coordinator',
          roles: 'koas'
        },
        {
          name: 'Kelas',
          icon: 'icon-arrow-right',
          url: '/classroom/coordinator',
          roles: 'koas'
        }
      ],
      roles: 'koas'
    },
    {
      title: true,
      name: 'Laboratorium',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      },
      roles: 'kalab'
    },
    {
      name: 'Laboratorium',
      icon: 'icon-folder',
      url: '/laboratory',
      roles: 'kalab',
      children: [
        {
          name: 'Praktikum',
          icon: 'icon-grid',
          url: '/laboratory/practicum',
          roles: 'kalab'
        },
        {
          name: 'Mata Kuliah',
          icon: 'icon-grid',
          url: '/laboratory/course',
          roles: 'kalab'
        }
      ]
    }
  ]
}
