<template>
    <div>
        <div class="container bg-white double_rounded align-middle login_a">
            <div class="row py-5">
                <div class="col-lg-6 mt-0">
                    <form @submit.prevent="reset" align="center" class="mt-0" autocomplete="on">
                        <img class="logo mx-auto d-block" src="/img/logo.png" alt="logo">
                       <!-- <p class="color_login_a appear mb-5">Write your Username and wait a confirmation email.</p>-->
                        <div class="form-group mb-4">
                            <label class="float-left color_login_a mb-0 ml-3">Email</label>
                            <div class="input-group mb-1" :class="{'is-danger': errors.email }">
                                <input class="form-control input-border" v-model="form.email" type="email" placeholder="example@softfusion.com">
                                <div class="input-group-prepend">
                                    <div class="input-group-text text-primary"><i class="os-icon os-icon-user"></i>
                                    </div>
                                </div>
                            </div>
                            <span v-if="errors.email" class="ml-3 text-danger float-left">{{ errors.email }}</span>
                        </div>
                        <button type="submit" class="btn mt-5 mb-4 btn-primary btn-lg btn-block full_rounded ">
                            <font-awesome-icon v-if="loading" icon="circle-notch" class="btn-icon" spin />
                            Reset password
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
                        <router-link to="login" class="btn mt-3 btn-sm btn-block full_rounded ">
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

                    <help></help>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import help from './_parts/help'

export default {
  data () {
    return {
      form: {
        email: null
      },
      errors: {
        email: false,
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
      app.errors.email = false
    }
  },
  methods: {
    reset: function () {
      let app = this

      if (app.validform()) {
        app.loading = true
        axios.post('password/email', app.form)
          .then(function (response) {
            app.loading = false
            app.success = response.data.data.message
            app.form.email = null
            app.errors.email = false
          })
          .catch(function (error) {
            app.loading = false
            let errors = error.response
            app.errors.credentials = errors.data.error
            app.errors.email = 'Try again with other Email'
          })
      }
    },
    validform: function () {
      let app = this

      if (!app.form.email) {
        app.errors.email = 'Email required.'
      }

      if (!app.validEmail(app.form.email)) {
        app.errors.email = 'Valid Email required.'
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
  },
  components: {
    'help': help
  }
}
</script>
<style scoped>

</style>
