<template>
    <section>
        <div class="col-md-12">
            <div class="row">
                <div class="col-12">
                    <router-link to="/CRM/users" class="small text-underline text-capitalize text-primary">&lt; Back
                    </router-link>
                </div>
                <div class="col-sm-6 mt-2 mb-3">
                    <!--Main title-->
                    <h4 class="float-left mr-5 text-capitalize" v-text="user.name"></h4>
                    <!--Breadcrumb-->
                    <nav>
                        <ol class="breadcrumb small p-0 mt-2">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-primary">Home</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/CRM/users" class="text-primary text-capitalize">Users list</router-link>
                            </li>
                            <li class="breadcrumb-item active font-weight-light text-capitalize" v-text="user.name"></li>
                        </ol>
                    </nav>
                    <!--End breadcrumb-->
                </div>
                <div class="col-sm-6 float-right">
                </div>
                <!--Here starts the information in these case boxes should be collapsable-->
                <div class="information">
                    <!--Box lead info-->
                    <div class="col-12 bg-white border mb-4 border-bottom-3 ">
                        <div class="row mx-0">
                            <div class="col-12 small border-bottom pb-3">
                                <a href="javascript:;" data-toggle="collapse" data-target=".lead-info" class="card-link link-collapse collapsed">
                                    <h6 class="mt-3 mb-0">
                                        <span class="ti-briefcase mr-1"></span>User ID: U-{{user.id}}
                                        <span class="ti-angle-right text-default float-right arrow-collapse mt-1"></span>
                                    </h6>
                                </a>
                            </div>
                            <!--Box lead info collapsed-->
                            <div class="col collapse show lead-info">
                                <div class="row d-flex align-items-center">
                                    <div class="mx-3">
                                        <div class="text-center position-relative my-3">
                                            <progressive-img :aspect-ratio="1" :src="user.image.url" class="rounded-circle  img-thumbnail info-img"/>
                                            <div data-toggle="modal" data-target=".modal-image-upload" class="change-image cursor-pointer full_rounded h-100 mw-100 opacity-modal-primary p-4 progressive-image-main top z-index-1">
                                                <p class="mb-0 small text-white">Change Image</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="col-12 small px-0">
                                            <h6 class="mb-2 text-primary field">
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
                                            <p class="field mb-2">
                                                <span class="small ti-pencil position-absolute collapse-edit"></span>
                                                <input readonly @change="updateUsers" placeholder="Email" class="text-default border-0 w-100" v-model="user.email">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--End lead info collapsed-->
                            <!--Box lead info not collapsed-->
                            <div class="collapse col-12 lead-info info-collapse">
                                <div class="text-center my-2 position-relative">
                                    <progressive-img :aspect-ratio="1" :src="user.image.url" class="rounded-circle  img-thumbnail info-img"/>
                                    <div data-toggle="modal" data-target=".modal-image-upload" class="change-image-collapse cursor-pointer full_rounded h-100 left mw-100 mx-auto opacity-modal-primary p-4 position-absolute right top z-index-1">
                                        <p class="mb-0 small mt-3 text-white">Change Image</p>
                                    </div>
                                </div>
                                <div class="row small px-3 position-relative">
                                    <p-check @change="updateUsers" v-model="user.status" class="p-switch p-fill text-primary mx-auto mb-3">
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
                                        <span class="ti-email text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <input @change="updateUsers" readonly placeholder="Email" class="text-default border-0" v-model="user.email">
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
                                        <label class="font-weight-normal mb-0 small text-primary">Street Address:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <input readonly placeholder="Street Address" class="text-default border-0" @change="updateContactAddress" v-model="contact_address.address">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-map-alt mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Zip Code:</label>
                                        <span class="small ion ion-edit position-absolute"></span>
                                        <input type="text" readonly placeholder="Zip code" @change="updateContactAddress" class="text-default border-0" v-model="contact_address.zipcode_id">
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
                                        <span class="ti-flag-alt mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">State:</label>
                                        <input disabled placeholder="State" class="text-default border-0 text-capitalize" name="state" v-model="contact_address.zipcode.city.state.name">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-mobile mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Phone Number:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <the-mask :mask="'(###)-###-####'" type="tel" readonly placeholder="Phone Number" @change="updateContact" class="text-default border-0" v-model="contact.phone"/>
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-credit-card mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Social Security:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <the-mask type="tel" readonly placeholder="Social Security" class="text-default border-0" @change="updateContact" v-model="contact.social_security" :mask="'###-##-####'"/>
                                    </p>
                                </div>
                                <div class="row px-3 mb-4 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-calendar mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Date of Birth:</label>
                                        <span class="small ion ion-edit position-absolute"></span>
                                        <datepicker placeholder="Date of Birth" :format="'M-d-yyyy'" @selected="updateContact" :input-class="'text-default border-0'" v-model="contact.birthdate"></datepicker>
                                    </p>
                                </div>
                            </div>
                            <!--End Box lead info not collapsed-->
                        </div>
                    </div>
                    <!--End Box lead info-->
                    <!--Business info same thing as lead editable and stuff-->
                    <business :contact="contact" :showCollapseSmall="true"></business>
                    <!--End Business Info-->
                    <!--What if you have applications -->
                </div>
               <!--The main content -->
                <div class="col-lg-10 col-12 main-content pl-lg-4 pl-0 pr-0">
                    <!-- Note: These are the tabs for create (tasks, meetings, calls etc ) this ones should be call like a module-->
                    <div class="col-12 bg-white border mb-4 border-bottom-3">
                        <create-timeline @addActivity="add_activity" :contact="contact" :morph="morph" :brokers="users"></create-timeline>
                    </div>
                    <!-- Note: Here starts the timeline tabs, which shiw a view of the elements created (tasks, emails etc..) -->
                    <div class="col-12 bg-white border mb-4 border-bottom-3">
                        <activities-history :loading="loading_activities" @deleteActivity="delete_activity" @addActivity="add_activity" @updateActivity="update_activity" :activities="activities" :contact="contact" :morph="morph"></activities-history>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal Picture -->
        <modal-image @changeImage="changeImage" :url="uri" :id="user.id" :image="user.image.url" v-if="user.id"></modal-image>
        <!--End Modal-->
    </section>
</template>

<script>

  import business from '../business/_business'
  import progress from './../../../helpers/progress'
  import createtimeline from './../../../helpers/createtimeline'
  import api from './../../../../config/api'
  import createDocuments from '../../deals/_documents'
  import activitiesHistory from '../../../helpers/activity/activities_history'
  import PrettyCheck from 'pretty-checkbox-vue/check'
  import clone from 'lodash/clone'
  import isEmpty from 'lodash/isEmpty'
  import modalImage from '../../../helpers/modals/modalimage'

  export default {
    props: ['id'],
    components: {
      'p-check': PrettyCheck,
      activitiesHistory,
      business,
      createDocuments,
      'progressBar': progress,
      'createTimeline': createtimeline,
      modalImage
    },
    data () {
      return {
        uri: 'users',
        activities: [],
        application: {},
        user: {image:{}},
        contact: {},
        contact_address: {zipcode: {city: {state: {}}}},
        lead: {},
        processor: {},
        role: {},
        morph: {id: this.id, type: 'applications'},
        loading_activities: true
      }
    },
    created () {
      api.Users().getOne(this.id).then(response => {
        this.role = response.data.data.role
        this.contact = response.data.data.contact
        this.user = response.data.data
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
      api.Applications().getActivities(this.id).then(response => this.activities = response.data.data).then(() => {
        this.loading_activities = false
      })
    },
    computed: {
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
      roles () {
        return this.$store.state.roles
      }
    },
    watch: {
      contact_address (value) {
        if (!value.zipcode_id) {
          return {zipcode: {city: {state: {}}}}
        }
      }
    },
    methods: {
      onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      changeImage (photo) {
        this.user.image.url = photo
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
        api.Users().updateRole(this.id, this.role.id).then(response => {
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
      add_activity (activity) {
        this.activities.push(activity)
      },
      delete_activity (activity) {
        this.activities = this.activities.filter(item => item.id != activity.id)
      },
      update_activity (activity) {
        this.activities = this.activities.map(item => {
          if (item.id === activity.id) return clone(activity)
          return item
        })
      }
    }
  }
</script>

<style>
    @import '~vue-awesome-notifications/dist/styles/style.css';

</style>
