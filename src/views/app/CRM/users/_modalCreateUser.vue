<template>
    <modals @selected="selected" title="Create User" :options="modal.users" :show-search="modal.search" :show-create="modal.create" v-if="showModals" :showModals.sync="showModals">
        <template slot="bodyCreate">
            <form class="col-12 px-0 create-form">
                <div class="mt-5 row align-items-center">
                    <span class="ti-user mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Name:</label>
                    <input placeholder="User Name" name="name" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" :class="{'is-invalid': errors.name }" v-model="user.name" required>
                    <span v-if="errors.name" class="ml-3 text-danger float-right">{{ errors.name }}</span>
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="ti-email mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                    <input placeholder="User Email" name="email" type="email" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" :class="{'is-invalid': errors.email }" @change="checkEmail" v-model="user.email" required>
                    <span v-if="errors.email" class="ml-3 text-danger float-right">{{ errors.email }}</span>
                </div>
                <div v-if="emailAlreadyExist" class="my-4 border p-3">
                    <div class="text-center">¡Wait! An user already exists with this email address
                        <router-link :to="{ name: 'users-id', params: { id: user.id }}">{{user.email}}
                        </router-link>
                    </div>
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="ti-mobile mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Phone Number:</label>
                    <the-mask placeholder="User Phone Number" name="phone" :mask="'(###)-###-####'" v-model="user.phone" type="tel" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent"/>
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="ti-calendar mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Birthday:</label>
                    <datepicker placeholder="User Birthdate" type="date" name="birthdate" class="col-12 text-p px-0" v-model="user.birthDate" :format="'M-d-yyyy'" :input-class="'small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent birth-input'"></datepicker>
                    <span v-if="errors.birthDate" class="ml-3 text-danger float-right">{{ msg }}</span>
                </div>

                <div class="mt-4 row align-items-center">
                    <span class="ti-star mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Roles:</label>
                    <v-select placeholder="User Roles" class="col-12 px-0 info-select" :class="{'is-invalid': errors.role }" :value.sync="user.role" :options="roles"></v-select>
                    <span v-if="errors.role" class="ml-3 text-danger float-right">{{ errors.role }}</span>
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="ti-location-pin mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Address:</label>
                    <input placeholder="User Address" name="address" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" v-model="user.address">
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="ti-map-alt mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Zip Code:</label>
                    <input placeholder="User Zip Code" name="zipcode" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" v-model="user.zipcode_id" @change="zipcode">
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="ti-direction mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">City:</label>
                    <input placeholder="User City" readonly class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent disabled" v-model="user.city">
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="ti-flag-alt mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">State:</label>
                    <input placeholder="State" readonly class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent disabled" v-model="user.state">
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="ti-credit-card mr-1 text-primary font-size-3"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Social Security:</label>
                    <the-mask placeholder="User Social Security" name="ssn" type="tel" v-model="user.social_security" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent form-control" :mask="'###-##-####'"/>
                </div>

                <div class="my-5 py-5"></div>

            </form>
        </template>
        <template slot="buttonCreate">
            <button :disabled="saving" type="submit" @click.prevent="create" class="btn-primary rounded-0 py-2 px-3 small text-white float-md-right float-left d-flex align-items-center mr-md-0 mr-3">
                <font-awesome-icon v-if="saving" icon="circle-notch" class="min-w-60 my-1" spin/>
                <template v-if="!saving"><span class="ti-user mr-1"></span>Create User</template>
            </button>
        </template>
    </modals>
</template>

<script>
import modals from './../../../helpers/modals/modals'
import api from './../../../../config/api'

export default {
  components: {modals},
  name: 'modalCreateUser',
  props: {
    showSearch: Boolean,
    showCreate: Boolean
  },
  data () {
    return {
      user: {
        name: null,
        email: '',
        phone: '',
        zipcode_id: '',
        address: '',
        city: '',
        state: '',
        social_security: '',
        birthDate: '',
        role: ''
      },
      roles: [],
      contact: {},
      saving: false,
      modal: {users: [], search: this.showSearch, create: this.showCreate},
      emailAlreadyExist: false,
      showModals: true,
      userAlreadyExist: null,
      errors: {email: null, name: null, role: null, birthDate: false},
      msg: 'This field is required'
    }
  },
  watch: {
    showModals (value) {
      if (!value) this.$emit('closeModal')
    },
    'user.name': function () {
      this.errors.name = null
    },
    'user.email': function () {
      this.errors.email = null
    },
    'user.role': function () {
      this.errors.role = null
    },
    'user.birthDate' (value) {
      if (this.getAge(value) < 18) {
        this.errors.birthDate = true
        this.msg = 'Age under 18'
        $('.birth-input').addClass('is-invalid')
      } else if (this.user.birthDate) {
        this.errors.birthDate = false
        $('.birth-input').removeClass('is-invalid')
      }
    }
  },
  methods: {
    validForm () {
      let validate = true
      if (!this.user.name) {
        this.errors.name = 'This field is required.'
        validate = false
      }
      if (!this.user.role) {
        this.errors.role = 'This field is required.'
        validate = false
      }

      if (!this.validEmail(this.user.email)) {
        this.errors.email = 'Valid email required.'
        validate = false
      }

      if (this.emailAlreadyExist) {
        this.errors.email = 'This email already exist.'
        validate = false
      }

      // validar fecha de nacimiento

      if (this.getAge(this.user.birthDate) < 18) {
        this.errors.birthDate = true
        this.msg = 'Age under 18'
        $('.birth-input').addClass('is-invalid')
        validate = false
      } else if (!this.user.birthDate) {
        this.errors.birthDate = this.msg
        $('.birth-input').addClass('is-invalid')
        validate = false
      }

      return validate
    },
    checkEmail () {
      if (this.validEmail(this.user.email)) {
        this.errors.email = false
        api.Contacts().checkEmail(this.user).then(() => {
          this.emailAlreadyExist = false
        }).catch(error => {
          this.user = error.response.data.error.data
          this.emailAlreadyExist = true
        })
      } else {
        this.emailAlreadyExist = false
      }
    },
    getAge (value) {
      var today = new Date()
      var birthDate = new Date(value)
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      console.log(age)
      return age
    },
    create () {
      if (this.validForm()) {
        this.saving = true
        api.Users().create(this.user).then(response => {
          console.log(response.data)
          this.$router.push({name: 'users-id', params: {id: response.data.data.id}})
          this.showCreate = false
          this.$store.commit('set_blur', false)
          api.SuccessResponse(response)
          this.saving = false
        }).catch(error => {
          this.saving = false
          api.ErrorResponse(error)
        })
      }
    },
    zipcode (value) {
      api.Zipcodes().getOne(value.target.value).then(response => {
        this.user.city = response.data.data.city.name
        this.user.state = response.data.data.city.state.name
      })
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    selected (value) {
      console.log('event selected', value)
      this.$emit('selected', value)
    }
  },

  mounted () {
    if (this.showSearch) {
      api.Users().getAll().then(response => this.modal.users = response.data.data)
    } else {
      api.Roles().getAll().then(response => this.roles = response.data.data)
    }
  }
}
</script>

<style>
</style>
