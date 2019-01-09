<template>
    <div>
        <div class="container bg-white double_rounded align-middle login_a">
            <div class="row pb-5">
                <div class="col-lg-6 mt-5">
                    <form @submit.prevent="login" align="center" class="mt-lg-2" autocomplete="on">
                        <img class="logo mx-auto d-block" alt="logo" :src="logo_img">
                        <div class="form-group mb-4">
                            <label class="float-left color_login_a mb-0 ml-3">Email</label>
                            <div class="input-group mb-1" :class="{'is-danger': errors.email }">
                                <input class="form-control input-border" v-model="form.email" type="email" placeholder="example@softfusion.com">
                                <div class="input-group-prepend">
                                    <div class="input-group-text text-primary">
                                        <i class="ti-user mr-1"></i>
                                    </div>
                                </div>
                            </div>
                            <span v-if="errors.email" class="ml-3 text-danger float-left">{{ errors.email }}</span>
                        </div>
                        <div class="form-group mb-4">
                            <label class="float-left color_login_a mb-0 ml-3">Password</label>
                            <div class="input-group mb-1" :class="{'is-danger': errors.password }">
                                <input class="form-control input-border" v-model="form.password" type="password" placeholder="●●●●●●●●●●●●">
                                <div class="input-group-prepend">
                                    <div class="input-group-text text-primary"><i class="ti-lock mr-1"></i>
                                    </div>
                                </div>
                            </div>
                            <span v-if="errors.password" class="ml-3 text-danger float-left">{{ errors.password }}</span>
                            <router-link class="float-right  text-primary mr-3 font-weight-heavy small" to="email">
                                Forgot your password?
                            </router-link>
                        </div>
                        <button type="submit" class="mt-6 btn btn-primary btn-lg btn-block full_rounded">
                            <font-awesome-icon v-if="loading" icon="circle-notch" class="btn-icon" spin/>
                            Login
                        </button>
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
                <div class="border-left border-light col-lg-6 d-lg-block d-none hidden-sm hidden-xs mt-5 tutorials">
                    <h2 class="mt-2 text-primary mb-4 text-center text-uppercase">Tips</h2>
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
        <!--<div class="row mx-auto mt-4 appear container">
            <div class="col-12">
                <h2 class="small-title text-center text-white mt-md-5 mt-4">Need Help?</h2>
            </div>
            <div class="col-12">
                <h2 class="small-title text-center text-white mt-2 font-weight-normal">
                    <i class="os-icon os-icon-phone"></i> 1-866-257-2973</h2>
                <p class="text-center text-white mt-3"><i class="os-icon os-icon-email-2-at2"></i> info@softfusion.com |
                    <i class="os-icon os-icon-help-circle"></i> FAQ</p>
            </div>
        </div>-->
    </div>
</template>
<script>
import help from './_parts/help'
import {login} from '../../config/auth'
import logo from './../../assets/logo.png'

export default {
  data () {
    return {
      logo_img: logo,
      form: {
        email: null,
        password: null
      },
      errors: {
        email: false,
        password: false,
        credentials: false
      },
      loading: false
    }
  },
  components: {
    'help': help
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
      if (value) {
        app.errors.password = false
      } else {
        app.errors.password = 'Pasword required.'
      }
    }
  },

  methods: {

    login: function () {
      let app = this

      if (app.validform()) {
        app.loading = true

        axios.post('oauth/login', app.form)
          .then(function (response) {
            app.loading = false
            login(response.data.data.access_token)
            let redirect = app.$route.query.redirect
            if (redirect) {
              app.$router.push(redirect)
            } else {
              app.$router.push({name: 'home'})
            }
          })
          .catch(function (error) {
            app.loading = false
            let errors = error.response
            app.errors.credentials = errors.data.error
          })
      }
    },
    validform: function () {
      let app = this

      if (!app.form.password) {
        app.errors.password = 'Pasword required.'
      }

      if (!app.form.email) {
        app.errors.email = 'Email required.'
      }

      if (!app.errors.email && !app.errors.password && app.validEmail(app.form.email)) {
        return true
      }

      return false
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    close_alert: function () {
      let app = this
      app.errors.credentials = false
    }
  }
}
</script>
<style scoped>

</style>
