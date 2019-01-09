<template>
    <div>
        <div class="container bg-white double_rounded align-middle login_a">
            <div class="row py-5">
                <div class="col-lg-6 mt-0">
                    <form @submit.prevent="reset" align="center" class="mt-0">
                        <img class="logo mx-auto d-block" src="/img/logo.png" alt="logo">
                        <div class="form-group mb-4">
                            <label class="float-left mb-0 ml-3 color_login_a">Email</label>
                            <div class="input-group mb-1">
                                <input class="form-control input-border" v-model="form.email" type="email" placeholder="example@softfusion.com">
                                <div class="input-group-prepend">
                                    <div class="input-group-text text-primary"><i class="os-icon os-icon-user"></i>
                                    </div>
                                </div>
                            </div>
                            <span v-if="errors.email" class="ml-3 text-danger float-left">{{ errors.email }}</span>
                        </div>
                        <div class="form-group mb-4">
                            <label class="float-left mb-0 ml-3 color_login_a">New password</label>
                            <div class="input-group mb-1">
                                <input class="form-control  input-border" v-model="form.password" type="password" placeholder="●●●●●●●●●●●●">
                                <div class="input-group-prepend">
                                    <div class="input-group-text text-primary"><i class="os-icon os-icon-lock"></i>
                                    </div>
                                </div>
                            </div>
                            <span v-if="errors.password" class="ml-3 text-danger float-left">{{ errors.password }}</span>
                        </div>
                        <div class="form-group mb-4">
                            <label class="float-left color_login_a mb-0 ml-3">Confirm password</label>
                            <div class="input-group mb-1">
                                <input class="form-control input-border" v-model="form.password_confirmation" type="password" placeholder="●●●●●●●●●●●●">
                                <div class="input-group-prepend">
                                    <div class="input-group-text text-primary"><i class="os-icon os-icon-lock"></i>
                                    </div>
                                </div>
                            </div>
                            <span v-if="errors.password_confirmation" class="ml-3 text-danger float-left">{{ errors.password_confirmation }}</span>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg btn-block full_rounded mt-5">
                            <font-awesome-icon v-if="loading" icon="circle-notch" class="btn-icon" spin />
                            Reset Password
                        </button>
                        <transition name="fade">
                            <div class="mt-4" v-if="success">
                                <div class="alert alert-success fade show" role="alert">
                                    {{ success }}
                                    <button type="button" class="close" @click="close_alert">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </transition>
                        <router-link to="login" class="btn mt-3 btn-sm btn-block full_rounded">
                            Return to login
                        </router-link>
                        <transition name="fade">
                            <div class="mt-4" v-if="errors.credentials">
                                <div class="alert alert-danger fade show" role="alert">
                                    {{ errors.credentials }}
                                    <button type="button" class="close" @click="close_alert">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </transition>
                    </form>
                </div>
                <div class="col-lg-6 mt-0 tutorials border-left border-light hidden-sm hidden-xs">
                    <h2 class="mt-0 text-primary mb-4 text-center text-uppercase">Tips</h2>
                    <div class="row">
                        <div class="col-1 p-0"><p class="big_number color_login_a">1</p></div>
                        <div class="col-11">
                            <h5 class="text-primary font-weight-normal">I want to set up JIRA Software</h5>
                            <p class="color_login_a">Install Jira Software, set up a project and team, and make common
                                customizations.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1 p-0"><p class="big_number color_login_a">2</p></div>
                        <div class="col-11">
                            <h5 class="text-primary font-weight-normal">I lead a software team</h5>
                            <p class="color_login_a">Start planning and organizing work, add new members to your team,
                                and track team progress.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1 p-0"><p class="big_number color_login_a">3</p></div>
                        <div class="col-11">
                            <h5 class="text-primary font-weight-normal">I use JIRA Software with other products</h5>
                            <p class="color_login_a">Start planning and organizing work, add new members to your team,
                                and track team progress.</p>
                        </div>
                    </div>
                    <help></help>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import help from './_parts/help'
import findKey from 'lodash/findKey'

export default {
  data () {
    return {
      form: {
        email: null,
        password: null,
        password_confirmation: null,
        token: null
      },
      errors: {
        email: false,
        password: false,
        password_confirmation: false,
        credentials: false
      },
      success: false,
      loading: false
    }
  },
  watch: {
    'form.email': function (value) {
      let app = this
      app.errors.credentials = false

      if (!value) {
        app.errors.email = 'Email required.'
      } else if (!app.validEmail(value)) {
        app.errors.email = 'Valid email required.'
      } else {
        app.errors.email = false
      }
    },
    'form.password': function (value) {
      let app = this
      app.errors.credentials = false
      if (!value) {
        app.errors.password = 'Pasword required.'
      } else if (value.length < 6) {
        app.errors.password = 'Pasword require min 6 characters.'
      } else {
        app.errors.password = false
      }
    },
    'form.password_confirmation': function (value) {
      let app = this
      if (app.form.password != value) {
        app.errors.password_confirmation = 'Yours passwords are not identical.'
      } else {
        app.errors.password_confirmation = false
      }
    }
  },
  mounted: function () {
    this.form.token = findKey(this.$route.query, function (item) {
      return item == null
    })
  },
  methods: {
    reset: function () {
      let app = this
      if (app.validform()) {
        app.loading = true
        axios.post('password/reset', app.form)
          .then(function (response) {
            app.loading = false
            app.success = response.data.data.message
            setTimeout(function () {
              app.$router.push({name: 'login'})
            }, 1500)
          })
          .catch(function (error) {
            app.loading = false
            let errors = error.response
            app.errors.credentials = errors.data.error

            if (!errors.data.code == 422) {
              app.errors.email = 'Try with other email.'
            }
          })
      }
    },
    validform: function () {
      let app = this

      if (!app.form.password) {
        app.errors.password = 'Pasword required.'
      }

      if (!app.form.password_confirmation) {
        app.errors.password_confirmation = 'Confirmation Password required.'
      }

      if (!app.form.email) {
        app.errors.email = 'Email required.'
      }

      if (!app.validEmail(app.form.email)) {
        app.errors.email = 'Valid Email required.'
      }

      if (!app.errors.password && !app.errors.email && app.form.password_confirmation == app.form.password) {
        return true
      }

      return false
    },
    validEmail: function (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    close_alert: function () {
      let app = this
      app.errors.credentials = false
    }
  },
  components: {
    'help': help
  }
}
</script>
<style scoped>

</style>
