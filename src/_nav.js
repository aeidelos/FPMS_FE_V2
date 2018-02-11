export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Praktikum',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Kelasku',
      icon: 'icon-cursor',
      url: '/classroom'
    },
    {
      title: true,
      name: 'Asistensi',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      title: true,
      name: 'Koordinator',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      title: true,
      name: 'Laboratorium',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Laboratorium',
      icon: 'icon-cursor',
      url: '/laboratory',
      children: [
        {
          name: 'Praktikum',
          icon: 'icon-cursor',
          url: '/laboratory/practicum'
        },
        {
          name: 'Mata Kuliah',
          icon: 'icon-cursor',
          url: '/laboratory/course'
        },
        {
          name: 'Laporan',
          icon: 'icon-cursor',
          url: '/laboratory/report'
        }
      ]
    }
  ]
}
