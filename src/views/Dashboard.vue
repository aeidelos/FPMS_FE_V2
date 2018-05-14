<template>
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-sm-6 col-lg-3">
          <div class="card text-white bg-primary">
            <div class="card-body pb-0">
              <div class="btn-group float-right">
              </div>
              <h4 class="mb-0"> {{ dashboard.active_task }}</h4>
              <p>Tugas Minggu Ini</p>
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
          <div class="card p-3" style="min-height:300px;">
            <div class="">
              <p class="pl-3 pr-3"><h4><i class="fa fa-calendar"></i> Tugas hari ini</h4></p>
              <div class="">
                <hr class="">
                <p>Daftar tugas praktikum yang harus dikumpulkan dalam 24 jam yang akan datang.</p>
                <ul class="icons-list">
                  <div v-if="dashboard.task.length == 0">
                    <li><i class="icon-notebook bg-default"></i>
                      <div class="desc">
                        <div class="title">Tidak ada tugas aktif</div>
                        <small>Waktu pengerjaan</small>
                        </div>
                        <div class="value">
                          <div class="small text-muted">Sisa waktu</div>
                          <strong>- Jam</strong>
                        </div>
                    </li>  
                  </div>
                  <div v-else>
                    <li v-for="task in dashboard.task"><i class="icon-notebook bg-primary"></i>
                    <div class="desc">
                      <div class="title">{{ task.title }}</div>
                      <small>{{ task.createdDate }} - {{ task.dueDate}}</small>
                      </div>
                      <div class="value">
                        <div class="small text-muted">Sisa waktu</div>
                        <strong>3 Jam</strong>
                      </div>
                    </li>  
                  </div>                  
                </ul>
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
          <div class="card pt-3 pr-4 pl-4 pb-0 ">
            <div class="card-body pb-0">
              <div class="row">
                <div class="">
                  <h4 class="card-title mb-0"><i class="fa fa-user-plus"></i> Enrollment Kelas</h4>
                <div class="small text-muted"></div>
                </div>
                <div class="row mb-0 p-4">
                  <p>Silahkan masukkan kode enrollment yang diberikan asisten. <br> 
                    Kode enrollment berupa 5 karakter acak kombinasi huruf abjad dan nomor. </p>
                <div class="col-sm-12 col-md-7 mt-5 mb-2">
                  <input type="text" class="form-control" placeholder="Kode Enrollment" v-model="enroll.key">
                  </div>
                  <div class="col-sm-12 col-md-5 mt-5"><button class="btn btn-primary btn-block" @click="checkClassEnrollment"><i class="fa fa-search"></i> Cari</button></div>
                </div>
            </div>
              
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { getDashboard as getDashboardAPI } from '@/api/assignment'
import { getByEnrollmentKey, updateClassroom } from '@/api/classroom'
import { confirmationAlert, successAlert, warningAlert } from '@/utils/alert'
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
                var user = this.user
                user.role = this.user.roles
                delete user.roles
                delete user.username
                classroom.practican.push(user)
                updateClassroom(classroom)
                  .then(response => {
                    successAlert('Anda berhasil bergabung di kelas ' + classroom.name)
                    this.enroll.key = ''
                  })
                  .catch(error => {
                    warningAlert('Gagal bergabung dalam kelas praktikum: ' + error)
                  })
              }
            )
          }
        })
        .catch(error => {
          console.log(error)
          warningAlert('Gagal masuk ke kelas : ' + error.response.data.message)
        })
    }
  }
}
</script>
