<template>
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-sm-6 col-lg-3">
          <div class="card text-white bg-primary">
            <div class="card-body pb-0">
              <div class="btn-group float-right">
              </div>
              <h4 class="mb-0"> {{ dashboard.active_task }}</h4>
              <p>Laporan Minggu Ini</p>
            </div>
              <div class="chart-wrapper px-3" style="height:70px;"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                <canvas id="card-chart1" class="chart chartjs-render-monitor" height="70" width="371" style="display: block; width: 371px; height: 70px;"></canvas>
              </div>
            </div>
          </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card text-white bg-info">
            <div class="card-body pb-0">
              <h4 class="mb-0"> {{ dashboard.average_plagiarism * 100 }} %</h4>
              <p>Rerata Plagiasi</p>
            </div>
            <div class="chart-wrapper px-3" style="height:70px;"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
              <canvas id="card-chart2" class="chart chartjs-render-monitor" height="70" width="371" style="display: block; width: 371px; height: 70px;"></canvas>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card text-white bg-warning">
            <div class="card-body pb-0">
              <div class="btn-group float-right">
            </div>
            <h4 class="mb-0"> {{ dashboard.classroom }}</h4>
            <p>Praktikum yang Diikuti</p>
            </div>
            <div class="chart-wrapper" style="height:70px;"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
              <canvas id="card-chart3" class="chart chartjs-render-monitor" height="70" width="403" style="display: block; width: 403px; height: 70px;"></canvas>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card text-white bg-danger">
            <div class="card-body pb-0">
            <h4 class="mb-0">{{ dashboard.plagiarized }}</h4>
            <p>Terdeteksi Plagiasi</p>
            </div>
            <div class="chart-wrapper px-3" style="height:70px;"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
            <canvas id="card-chart4" class="chart chartjs-render-monitor" height="70" width="371" style="display: block; width: 371px; height: 70px;"></canvas>
            </div>
          </div>
        </div>
      </div>
    <div class="row">
        <div class="col-sm-12 col-lg-7" v-if="dashboardState('kalab')">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-7">
                  <h4 class="card-title mb-0">Announcement</h4>
                <div class="small text-muted"></div>
                <br>
                </div>
                <div class="col-sm-12 d-none d-md-block">
                  <div class="card">
                    <div class="card-body">
                      <h3>Title</h3><span class="pull-right">Date</span> <br>
                      <p>Content</p>
                    </div>
                  </div>
                </div>
            </div>

              <div class="" style="height:300px;margin-top:40px;">
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-7" v-else-if="dashboardState('mhs')">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-7">
                  <h4 class="card-title mb-0">Announcement</h4>
                <br>
                </div>
                <div class="col-sm-12 d-none d-md-block">
                  <div class="card" v-for="announcement in getDashboardState.announcement">
                    <div class="card-body">
                      <h3>{{ announcement.title }}</h3>
                      <span class="pull-left">{{ announcement.classroom.practicum.name }}</span><span class="pull-right">{{ announcement.createdDate }}</span> <br>
                      <p v-html="announcement.description"></p>
                    </div>
                  </div>
                </div>
            </div>

              <div class="" style="height:300px;margin-top:40px;">
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-5" v-if="dashboardState('kalab')">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-7">
                  <h4 class="card-title mb-0">Enrollment Kelas</h4>
                <div class="small text-muted"></div>
                </div>

                <div class="col-sm-7 d-none d-md-block">
              </div>
            </div>
              <div class="" style="height:300px;margin-top:40px;"></div>
              </div>
            </div>
          </div>
        <div class="col-sm-12 col-lg-5" v-else-if="dashboardState('mhs')">
          <div class="card" style="height:200px;">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-7">
                  <h4 class="card-title mb-0">Enrollment Kelas</h4>
                <div class="small text-muted"></div>
                </div>
                <div class="row"  style="margin-top:50px; margin-left:50px;">
                  <div class="col-sm-12 col-md-7">
                  <input type="text" class="form-control" placeholder="Kode Enrollment" v-model="enroll.key">
                </div>
                <div class="col-sm-12 col-md-5"><button class="btn btn-primary btn-block" @click="checkClassEnrollment">Cari</button></div>
                </div>
            </div>
              <div class="" style="height:300px;margin-top:40px;"></div>
              
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { getDashboard as getDashboardAPI } from '@/api/assignment'
import { getByEnrollmentKey, updateClassroom } from '@/api/classroom'
import { confirmationAlert, successAlert } from '@/utils/alert'
export default {
  name: 'dashboard',
  mounted () {
    this.user = this.$store.getters.user
  },
  data () {
    return {
      user: {},
      dashboard: {},
      enroll: {
        key: ''
      },
      update: 0
    }
  },
  computed: {
    getDashboardState () {
      return this.dashboard
    },
    getStore () {
      return this.$store.getters.user
    },
    getUserState () {
      return this.user
    },
    getDashboard () {
      getDashboardAPI(this.user)
        .then(response => {
          this.dashboard = response.data
        })
    }
  },
  updated () {
    if (this.update === 0) {
      this.getDashboard()
      this.update = 1
    }
  },
  methods: {
    dashboardState (role) {
      var permitted = false
      Object(this.user.roles).forEach(r => {
        if (role === r.initial) {
          permitted = true
        } else {
          return false
        }
      })
      return permitted
    },
    checkClassEnrollment () {
      getByEnrollmentKey(this.enroll.key, this.user.id)
        .then(response => {
          if (response.data !== undefined) {
            let msg = 'Apakah anda yakin akan bergabung dengan kelas ' + response.data.name + '?'
            confirmationAlert('Kelas ditemukan', msg,
              () => {
                var classroom = response.data
                classroom.practican.push(this.user)
                updateClassroom(classroom)
                  .then(response => {
                    successAlert('Anda berhasil bergabung di kelas ' + classroom.name)
                    this.enroll.key = ''
                  })
              }
            )
          }
        })
    }
  }
}
</script>
