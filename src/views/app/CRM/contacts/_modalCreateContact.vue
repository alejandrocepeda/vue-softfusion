<template>
    <modals @selected="selected" title="Create Contact" :options="modal.contacts" :show-search="modal.search" :show-create="modal.create" v-if="showModals" :showModals.sync="showModals">
        <template slot="bodyCreate">
            <form class="col-12 px-0 create-form">
                <div class="mt-5 row align-items-center">
                    <span class="ti-user mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Name:</label>
                    <input placeholder="Contact Name" name="name" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" :class="{'is-invalid': errors.name }" v-model="contact.name" required>
                    <span v-if="errors.name" class="ml-3 text-danger float-right">{{ errors.name }}</span>

                </div>
                <div class="mt-4 row align-items-center">
                    <span class="mr-0 font-size-3 ti-email mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                    <input placeholder="Contact Email" name="email" type="email" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" :class="{'is-invalid': errors.email }" @change="checkEmail" v-model="contact.email" required>
                    <span v-if="errors.email" class="ml-3 text-danger float-right">{{ errors.email }}</span>
                </div>
                <div v-if="emailAlreadyExist" class="my-4 border p-3">
                    <div class="text-center">¡Wait! A contact already exists with this email address
                        <router-link :to="{ name: 'contacts-id', params: { id: contact.id }}">{{contact.email}}
                        </router-link>
                    </div>
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="font-size-3 ti-mobile mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Phone Number:</label>
                    <the-mask placeholder="Contact Phone Number" name="phone" :mask="'(###)-###-####'" v-model="contact.phone" type="tel" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent"/>
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="font-size-3 ti-calendar mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Date of Birth:</label>
                    <datepicker placeholder="Contact Birthdate" type="date" name="birthdate" class="col-12 px-0" v-model="contact.birthdate" :format="'M-d-yyyy'" :input-class="'small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent birth-input'"></datepicker>
                    <span v-if="errors.birthDate" class="ml-3 text-danger float-right">{{msg}}</span>
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="font-size-3 ti-location-pin mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Address:</label>
                    <input placeholder="Contact Address" name="address" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" v-model="contact.address">
                </div>

                <div class="mt-4 row align-items-center">
                    <span class="font-size-3 ti-map-alt mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Zip Code:</label>
                    <input placeholder="Contact Zip Code" name="zipcode" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" v-model="contact.zipcode_id" @change="zipcode">
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="font-size-3 ti-direction mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">City:</label>
                    <input placeholder="Contact City" readonly class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" v-model="contact.city">
                </div>
                <div class="mt-4 row align-items-center">
                    <span class="font-size-3 ti-flag-alt mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">State:</label>
                    <input placeholder="Contact State" readonly class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" v-model="contact.state">
                </div>

                <div class="mt-4 row align-items-center">
                    <span class="font-size-3 ti-credit-card mr-1 text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Social Security:</label>
                    <the-mask placeholder="Contact Social Security" name="ssn" type="tel" v-model="contact.social_security" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent" :mask="'###-##-####'"/>
                </div>

                <div class="my-5 py-5"></div>

            </form>
        </template>
        <template slot="buttonCreate">
            <button :disabled="saving" type="submit" @click.prevent="create" class="btn-primary rounded-0 py-2 px-3 small text-white float-md-right float-left d-flex align-items-center mr-md-0 mr-3">
                <font-awesome-icon v-if="saving" icon="circle-notch" class="min-w-60 my-1" spin/>
                <template v-if="!saving"><span class="ti-user mr-1"></span>Create Contact</template>
            </button>
        </template>
    </modals>
</template>

<script>
import modals from './../../../helpers/modals/modals'
import api from './../../../../config/api'

export default {
  components: {modals},
  name: 'modalCreateContact',
  props: {
    showSearch: Boolean,
    showCreate: Boolean
  },
  data () {
    return {
      contact: {
        name: null,
        email: '',
        phone: '',
        zipcode_id: '',
        address: '',
        city: '',
        state: '',
        social_security: '',
        birthdate: ''
      },

      saving: false,
      modal: {contacts: [], search: this.showSearch, create: this.showCreate},
      emailAlreadyExist: false,
      showModals: true,
      contactAlreadyExist: null,
      errors: {email: null, name: null, birthDate: false},
      msg: 'this Field is required'
    }
  },
  watch: {
    showModals (value) {
      if (!value) this.$emit('closeModal')
    },
    'contact.name': function () {
      this.errors.name = null
    },
    'contact.email': function () {
      this.errors.email = null
    },
    'contact.birthdate' (value) {
      if (this.getAge(value) < 18) {
        this.errors.birthDate = true
        this.msg = 'Age under 18'
        $('.birth-input').addClass('is-invalid')
      } else if (this.contact.birthdate) {
        this.errors.birthDate = false
        $('.birth-input').removeClass('is-invalid')
      }
    }
  },
  methods: {
    validForm () {
      let validate = true
      if (!this.contact.name) {
        this.errors.name = 'This field is required.'
        validate = false
      }

      if (!this.validEmail(this.contact.email)) {
        this.errors.email = 'Valid email required.'
        validate = false
      }

      if (this.emailAlreadyExist) {
        this.errors.email = 'This email already exist.'
        validate = false
      }

      // valiar fecha de nacimiento
      if (this.getAge(this.contact.birthdate) < 18) {
        this.errors.birthDate = true
        this.msg = 'Age under 18'
        $('.birth-input').addClass('is-invalid')
        validate = false
      } else {
        $('.birth-input').removeClass('is-invalid')
        this.errors.birthDate = false
      }

      if (!this.contact.birthdate) {
        this.errors.birthDate = true
        $('.birth-input').addClass('is-invalid')
        validate = false
      }

      return validate
    },
    checkEmail () {
      if (this.validEmail(this.contact.email)) {
        this.errors.email = false
        api.Contacts().checkEmail(this.contact).then(() => {
          this.emailAlreadyExist = false
        }).catch(error => {
          this.contact = error.response.data.error.data
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
      return age
    },
    create () {
      if (this.validForm()) {
        this.saving = true
        api.Contacts().create(this.contact).then(response => {
          this.$router.push({name: 'contacts-id', params: {id: response.data.data.id}})
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
        this.contact.city = response.data.data.city.name
        this.contact.state = response.data.data.city.state.name
      })
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    selected (value) {
      this.$emit('selected', value)
    }
  },
  mounted () {
    if (this.showSearch) {
      api.Contacts().getAll().then(response => this.modal.contacts = response.data.data)
    }
  }
}
</script>

<style scoped>

</style>
