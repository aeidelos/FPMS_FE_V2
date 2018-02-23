export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
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
      icon: 'icon-cursor',
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
      icon: 'icon-cursor',
      url: '/classroom',
      children: [
        {
          name: 'Kelas',
          icon: 'icon-cursor',
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
      icon: 'icon-cursor',
      url: '/coordinator',
      children: [
        {
          name: 'Tugas & Kegiatan',
          icon: 'icon-cursor',
          url: '/task/coordinator',
          roles: 'koas'
        },
        {
          name: 'Kelas',
          icon: 'icon-cursor',
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
      icon: 'icon-cursor',
      url: '/laboratory',
      roles: 'kalab',
      children: [
        {
          name: 'Praktikum',
          icon: 'icon-cursor',
          url: '/laboratory/practicum',
          roles: 'kalab'
        },
        {
          name: 'Mata Kuliah',
          icon: 'icon-cursor',
          url: '/laboratory/course',
          roles: 'kalab'
        },
        {
          name: 'Laporan',
          icon: 'icon-cursor',
          url: '/laboratory/report',
          roles: 'kalab'
        }
      ]
    }
  ]
}
