<template>
    <modals title="User Preview" :showCreate="true" :showModals.sync="showModals">
        <template slot="bodyCreate">

            <div class="information information-preview">

                    <!--Box lead info-->
                    <div class="col-12 bg-white border mb-4 border-bottom-3 ">
                        <div class="mb-4 row mx-0">
                            <div class="col-12 small border-bottom pb-3">
                                <a href="javascript:;" data-toggle="collapse" data-target=".lead-info" class="card-link link-collapse collapsed">
                                    <h6 class="mt-3 mb-0">
                                        <span class="ti-briefcase mr-1"></span>User ID: U-{{user.id}}
                                        <span class="ti-angle-right text-default float-right arrow-collapse mt-1"></span>
                                    </h6>
                                </a>
                            </div>

                            <!--Box lead info collapsed-->
                            <loading class="col" v-if="loading"></loading>
                            <div v-else class="col collapse  lead-info border-bottom">
                                <div class="row">
                                    <div class="col-auto">
                                        <div class="text-center position-relative">
                                            <progressive-img :aspect-ratio="1" :src="user.photo" class="rounded-circle my-3 img-thumbnail info-img"/>
                                            <div data-toggle="modal" data-target=".modal-image-upload" class="change-image cursor-pointer full_rounded h-100 mw-100 opacity-modal-primary p-4 progressive-image-main top z-index-1">
                                                <p class="mb-0 small text-white">Change Image</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col pl-0 pr-3">
                                        <div class="col-12 small px-0">
                                            <h6 class="mb-2 text-primary mt-3 field">
                                                <span class="small ti-pencil position-absolute"></span>
                                                <input @change="updateUsers" readonly placeholder="Contact name" class="text-primary border-0 w-100 text-capitalize" v-model="user.name">
                                            </h6>
                                        </div>
                                        <div class="col-12 small px-0">
                                            <p class="mb-2 field">
                                                <span class="small ti-pencil position-absolute collapse-edit"></span>
                                                <the-mask :mask="'(###)-###-####'" type="tel" placeholder="Phone Number" class="text-default border-0 w-100" @change="updateContact" v-model="contact.phone"/>
                                            </p>
                                        </div>
                                        <div class="col-12 small px-0">
                                            <p class="field">
                                                <span class="small ti-pencil position-absolute collapse-edit"></span>
                                                <input readonly @change="updateUsers"  placeholder="Email" class="text-default border-0 w-100"  v-model="user.email">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--End lead info collapsed-->

                            <!--Box lead info not collapsed-->

                            <div class="collapse show col-12 lead-info info-collapse ">
                                <div class="text-center my-2 position-relative">
                                      <img width="120" height="120" :src="user.photo" class="rounded-circle my-3 img-thumbnail info-img-lg">
                                    <div data-toggle="modal" data-target=".modal-image-upload" class="change-image-collapse cursor-pointer full_rounded h-100 left mw-100 mx-auto opacity-modal-primary p-4 position-absolute right top z-index-1">
                                        <p class="mb-0 small mt-3 text-white">Change Image</p>
                                    </div>
                                </div>

                                <div class="row small px-3 position-relative">
                                    <p-check  v-model="user.status" class="p-switch p-fill text-primary mx-auto mb-3">
                                        <span class="text-primary" v-if="user.status ==true">Active</span>
                                        <span class="text-switch" v-else>Inactive</span>
                                    </p-check>
                                </div>

                                <div class="row small px-3 position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-user mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Name:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <input readonly @change="updateUsers" placeholder="Contact name" class="text-default border-0 text-capitalize" v-model="user.name">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom ">
                                        <span class="ti-email mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <input  readonly @change="updateUsers" placeholder="Email" class="text-default border-0" v-model="user.email">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom ">
                                        <span class="ti-star mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Roles:</label>
                                        <v-select @change="updateRoles" class="info-select" :value.sync="role.id" :options="roles"></v-select>
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-location-pin mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Street
                                            Address:</label> <span class="small ti-pencil position-absolute"></span>
                                        <input readonly placeholder="Street Address" class="text-default border-0" @change="updateContactAddress" v-model="contact_address.address">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-map-alt mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Zip Code:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <input type="text" readonly placeholder="Zip code"  class="text-default border-0" @change="updateContactAddress" v-model="contact_address.zipcode_id">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom ">
                                        <span class="ti-direction mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">City:</label>
                                        <input disabled placeholder="City" class="text-default border-0 text-capitalize" name="city" v-model="contact_address.zipcode.city.name">

                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-flag-alt text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">State:</label>
                                        <input disabled placeholder="State" class="text-default border-0 text-capitalize" name="state" v-model="contact_address.zipcode.city.state.name">
                                    </p>
                                </div>

                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-mobile mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Phone Number:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <the-mask :mask="'(###)-###-####'" type="tel" readonly placeholder="Phone Number"  class="text-default border-0" @change="updateContact" v-model="contact.phone"/>
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-credit-card text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Social
                                            Security:</label> <span class="small ti-pencil position-absolute"></span>
                                        <the-mask type="tel" readonly placeholder="Social Security" class="text-default border-0"  @change="updateContact" v-model="contact.social_security" :mask="'###-##-####'"/>
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-calendar mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Date of Birth:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <datepicker placeholder="Date of Birth" :format="'M-d-yyyy'"  :input-class="'text-default border-0'" v-model="contact.birthdate"></datepicker>
                                    </p>
                                </div>
                            </div>

                            <!--End Box lead info not collapsed-->

                        </div>
                    </div>

                    <!--End Box lead info-->
                    <business :contact="contact" :showCollapseSmall="true"></business>

<!--ingresar modal change image-->
                <!--Modal Picture -->
                <modal-image @changeImage="changeImage" :url="uri" :id="user.id" :image="user.photo" v-if="user.id"></modal-image>
                <!--End Modal-->

            </div>

        </template>

        <template slot="buttonCreate">
            <router-link :to="{ name: route_uri+'-id', params: { id: user.id }}">
                <button  class="btn-primary btn-minw rounded-0 py-2 px-3 small text-white  d-flex align-items-center justify-content-center mr-md-0 mr-3">
                    <span class="ti-pencil-alt mr-2 view text-white"></span> Inspect
                </button>
            </router-link>
        </template>
    </modals>
</template>

<script>
import Modals from './../../../helpers/modals/modals'
import api from './../../../../config/api'
import userComponent from './users'
import PrettyCheck from 'pretty-checkbox-vue/check'
import loading from './../../../helpers/loading'
import businessComponent from './../business/_business'
import modalImage from './../../../helpers/modals/modalimage'
import first from 'lodash/first'
import words from 'lodash/words'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'modalPreviewUsers',
  components: {
    modalImage,
    Modals,
    api,
    'user': userComponent,
    'p-check': PrettyCheck,
    loading,
    'business': businessComponent
  },
  props: ['user_id'],
  data () {
    return {
      showModals: true,
      contact: {},
      role: {},
      contact_address: {zipcode: {city: {state: {}}}},
      uri: 'users',
      activities: {},
      application: {},
      lead: {},
      processor: {},
      loading: true,
      user: {}
    }
  },
  watch: {
    contact_address (value) {
      if (!value.zipcode_id) {
        return {zipcode: {city: {state: {}}}}
      }
    },
    showModals (value) {
      if (!value) this.$emit('update:showModals', value)
    }
  },
  computed: {
    roles () {
      return this.$store.state.roles
    },
    route_uri () {
      return first(words(this.uri))
    },
    users () {
      return this.$store.state.users
    },
    processors () {
      return this.$store.getters.processors
    },
    loanPurposes () {
      return this.$store.state.loanPurposes
    },
    products () {
      return this.$store.state.products
    },
    collapseId () {
      if (this.user.contact) {
        return 'contact-collapse-' + this.user.contact.id
      } else {
        return 'contact-collapse'
      }
    },
    addContact () {
      if (isEmpty(this.user.contact)) return true
      return false
    }

  },
  methods: {
    setUri () {
      this.$emit('paginate', this.uri + '&page=' + this.Page + '&per_page=' + this.ShowEntries)
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }
      this.createImage(files[0])
    },
    createImage (file) {
      var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    updateContactAddress () {
      if (this.contact_address.id) {
        // updated
        api.Address().update(this.contact_address.id, this.contact_address).then(response => {
          api.SuccessResponse(response)
          this.contact_address = response.data.data
        })
      } else {
        // created
        api.Address().create(this.contact_address).then(response => {
          this.contact_address = response.data.data
          this.contact.address_id = this.contact_address.id
          api.Contacts().attachAddress(this.contact.id, response.data.data.id)
          api.SuccessResponse(response)
        })
      }
    },
    updateRoles () {
      api.Users().updateRole(this.user.id, this.role.id).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    updateContact () {
      api.Contacts().update(this.contact.id, this.contact).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    updateUsers () {
      api.Users().update(this.user.id, this.user).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    changeImage (photo) {
      this.user.photo = photo
    }

  },
  created () {
    api.Users().getOne(this.user_id).then(response => {
      this.role = response.data.data.role
      this.contact = response.data.data.contact
      this.user = response.data.data
      this.loading = false
      if (response.data.data.contact) {
        this.contact = response.data.data.contact
        if (response.data.data.contact.address) {
          this.contact_address = response.data.data.contact.address
          if (!this.contact_address.zipcode) {
            this.contact_address.zipcode = {city: {state: {}}}
          }
        }
      }
    }).catch(error => {
      if (error.response.status === 404) {
        this.$router.push({name: 'users'})
      } else {
        api.ErrorResponse(error)
      }
    })
  },
  mounted () {
    if (isEmpty(this.users) || isEmpty(this.processors)) {
      this.$store.dispatch('getAllUsers')
    }

    if (isEmpty(this.roles)) {
      this.$store.dispatch('getRoles')
    }

    if (isEmpty(this.products)) {
      this.$store.dispatch('getProducts')
    }

    if (isEmpty(this.loanPurposes)) {
      this.$store.dispatch('getLoanPurposes')
    }
  }
}
</script>

<style scoped>

</style>

<style lang="css">
    .modal-create .ion{
        width:auto!important;
    }
    .information-preview{
        width:auto!important;
        margin-top:50px;
        padding-bottom:150px;
    }

    .preview-icon{
        font-size: 30px;
        color: #6063c1!important;
        vertical-align: middle;
    }

    .preview-buttons-container{
        align-items: center;
    }
</style>
