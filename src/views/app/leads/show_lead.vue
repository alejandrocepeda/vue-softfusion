<template>
  <section>
    <div  class="col-md-12">
      <div class="row">
        <div class="col-12">
          <router-link to="/leads" class="small text-underline text-capitalize text-primary">&lt; Back</router-link>
        </div>
        <div class="col-md mt-2 mb-3">
          <!--Main title-->
          <h4 class="float-left mr-5 text-capitalize" v-text="contact.name"></h4>
          <!--Breadcrumb-->
          <nav>
            <ol class="breadcrumb small p-0 mt-2 col-md-auto col-12">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-primary">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/leads" class="text-primary text-capitalize">Leads list</router-link>
              </li>
              <li class="breadcrumb-item active font-weight-light text-capitalize" v-text="contact.name"></li>
            </ol>
          </nav>
          <!--End breadcrumb-->
        </div>

      </div>
      <div class="row">
        <!--Here starts the information in these case boxes should be collapsable-->
        <div class="information">
          <!--Box lead info-->
          <div v-if="contact" class="col-12 bg-white border mb-4 border-bottom-3 ">
            <div class="mb-1 row mx-0">
              <div class="col-12 small border-bottom pb-3">
                <a href="javascript:;" data-toggle="collapse" data-target=".lead-info" class="card-link link-collapse collapsed">
                  <h6 class="mt-3 mb-0">
                    <span class="ion ion-briefcase"></span>Lead ID: L-{{lead.id}}
                    <span class="ion ion-chevron-right text-default float-right arrow-collapse mt-1"></span>
                  </h6>
                </a>
              </div>

              <!--Box lead info collapsed-->

              <div class="col collapse show lead-info ">
                <div class="row">
                  <div class="col-auto">
                    <div   class="text-center position-relative">
                      <progressive-img :aspect-ratio="1" :src="contact.photo" class="rounded-circle my-3 img-thumbnail info-img"/>
                      <div data-toggle="modal" data-target=".modal-image-upload" class="change-image cursor-pointer full_rounded h-100 mw-100 opacity-modal-primary p-4 progressive-image-main top z-index-1">
                        <p class="mb-0 small text-white">Change Image</p>
                      </div>
                    </div>
                  </div>

                  <div class="col pl-0 pr-3">
                    <div class="col-12 small px-0">
                      <h6 class="mb-2 text-primary mt-3 field">
                        <span class="small ion ion-edit position-absolute"></span>
                        <input readonly placeholder="Contact name" class="text-primary border-0 w-100 text-capitalize" @change="updateContact" v-model="contact.name">
                      </h6>
                    </div>
                    <div class="col-12 small px-0">
                      <p class="mb-2 field">
                        <span class="small ion ion-edit position-absolute collapse-edit"></span>
                        <the-mask :mask="'(###) ###-####'" type="tel" placeholder="Phone Number" class="text-default border-0 w-100" @change="updateContact" v-model="contact.phone"/>
                      </p>
                    </div>
                    <div class="col-12 small px-0">
                      <p class="field">
                        <span class="small ion ion-edit position-absolute collapse-edit"></span>
                        <input readonly placeholder="Email" class="text-default border-0 w-100" @change="updateContact" v-model="contact.email">
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!--End lead info collapsed-->

              <!--Box lead info not collapsed-->

              <div class="collapse col-12 lead-info " @showModalsPreview="show = true">
                <div class="text-center my-2 position-relative">
                  <img :src="contact.photo" class="rounded-circle my-3 img-thumbnail info-img-lg">
                  <div data-toggle="modal" data-target=".modal-image-upload" class="change-image-collapse cursor-pointer full_rounded h-100 left mw-100 mx-auto opacity-modal-primary p-4 position-absolute right top z-index-1">
                    <p class="mb-0 small mt-3 text-white">Change Image</p>
                  </div>
                </div>
                <div class="row small px-3 position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom">
                    <span class="ion ion-ios-person-outline text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Name:</label>
                    <span class="small ion ion-edit position-absolute"></span>
                    <input readonly placeholder="Contact name" class="text-default border-0 text-capitalize" @change="updateContact" v-model="contact.name">
                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom ">
                    <span class="ion ion-ios-email-outline text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                    <span class="small ion ion-edit position-absolute"></span>
                    <input readonly placeholder="Email" class="text-default border-0" @change="updateContact" v-model="contact.email">
                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom">
                    <span class="ion ion-ios-location-outline text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Street
                      Address:</label> <span class="small ion ion-edit position-absolute"></span>
                    <input readonly placeholder="Street Address" class="text-default border-0" @change="updateContactAddress" v-model="contact_address.address">
                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom">
                    <span class="ion flaticon-mailbox text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Zip Code:</label>
                    <span class="small ion ion-edit position-absolute"></span>
                    <input type="text" readonly placeholder="Zip code" @change="updateContactAddress" class="text-default border-0" v-model="contact_address.zipcode_id">
                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom ">
                    <span class="ion flaticon-push-pin text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">City:</label>
                    <input disabled placeholder="City" class="text-default border-0 text-capitalize" name="city" v-model="contact_address.zipcode.city.name">

                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom">
                    <span class="ion ion-ios-flag-outline text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">State:</label>
                    <input disabled placeholder="State" class="text-default border-0 text-capitalize" name="state" v-model="contact_address.zipcode.city.state.name">
                  </p>
                </div>

                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom">
                    <span class="ion ion-ios-telephone-outline text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Phone Number:</label>
                    <span class="small ion ion-edit position-absolute"></span>
                    <the-mask :mask="'(###) ###-####'" type="tel" readonly placeholder="Phone Number" @change="updateContact" class="text-default border-0" v-model="contact.phone"/>
                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom">
                    <span class="ion flaticon-id-card text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Social
                      Security:</label> <span class="small ion ion-edit position-absolute"></span>
                    <the-mask type="tel" readonly placeholder="Social Security" class="text-default border-0" @change="updateContact" v-model="contact.social_security" :mask="'###-##-####'"/>
                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="border-bottom field mb-0 py-2 w-100">
                    <span class="ion flaticon-percentage text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Ownership: </label>
                    <span class="small ion ion-edit position-absolute"></span>
                    <the-mask type="tel" readonly placeholder="Ownership (Percentage)" @change="updateContact" class="text-default border-0" v-model="contact.ownership" :mask="['#%','##%','###%']"/>
                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom">
                    <span class="ion ion-ios-calendar-outline text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Date of Birth:</label>
                    <span class="small ion ion-edit position-absolute"></span>
                    <datepicker placeholder="Date of Birth" :format="'M-d-yyyy'" @selected="updateContact" :input-class="'text-default border-0'" v-model="contact.birthdate"></datepicker>
                  </p>
                </div>
                <div class="row px-3 small position-relative">
                  <p class="field w-100 mb-0 py-2 border-bottom">
                    <span class="ion flaticon-broker text-primary" data-pack="android" data-tags=""></span>
                    <label class="font-weight-normal mb-0 small text-primary">Broker:</label>
                    <v-select class="info-select" :value.sync="lead.executive_id" @change="updateLead" :options="brokers"></v-select>
                  </p>
                </div>
                <div class="row px-3 small position-relative mb-4">
                  <p class="border-bottom field mb-0 py-2 w-100">
                    <span class="ion ion-ios-world-outline text-primary"></span>
                    <label class="font-weight-normal mb-0 small text-primary">Web source: </label>
                    <span class="small ion ion-edit position-absolute"></span>
                    <input readonly placeholder="Web source" @change="updateLead" class="text-default border-0" v-model="lead.source">
                  </p>
                </div>
              </div>

              <!--End Box lead info not collapsed-->

            </div>
          </div>

          <!--End Box lead info-->

          <!--Business info same thing as lead editable and stuff-->

          <business  :contact="contact" :showCollapseSmall="true"></business>

          <!--End Business Info-->

          <!--What if you have applications -->

          <applications :lead="id"></applications>
        </div>

        <!--The main content -->
        <div class="col-lg-10 col-12 main-content pl-lg-4 pl-0 pr-0">

          <!--Box with progres bar -->

          <div class="col-12 bg-white border mb-4 border-bottom-3">
            <!--Progress bar-->
            <progress-bar :statuses="leadstatuses" @change="updateLead" :status.sync="lead.lead_status_id"></progress-bar>
          </div>

          <!-- Note: These are the tabs for create (tasks, meetings, calls etc ) this ones should be call like a module-->

          <div class="col-12 bg-white border mb-4 border-bottom-3">

            <create-timeline @addActivity="add_activity" :contact="contact" :morph="morph"></create-timeline>

          </div>

          <div class="col-12 bg-white border mb-4 border-bottom-3">
            <activities-history :loading="loading_activities" @deleteActivity="delete_activity" @addActivity="add_activity" @updateActivity="update_activity" :activities="activities" :contact="contact" :morph="morph"></activities-history>
          </div>

          <!-- Note: Here starts the timeline tabs, which shiw a view of the elements created (tasks, emails etc..) -->

        </div>
      </div>
    </div>

    <!--Modal Picture -->
    <modal-image @changeImage="changeImage" url="contacts" :id="contact.id" :image="contact.photo" v-if="contact.id"></modal-image>
    <!--End Modal-->
  </section>
</template>

<script>

import progress from './../../helpers/progress'
import createTimeline from './../../helpers/createtimeline'
import activitiesHistory from '../../helpers/activity/activities_history'
import api from './../../../config/api'
import applications from '../deals/_applications'
import business from '../CRM/business/_business'
import modalImage from './../../helpers/modals/modalimage'

export default {
  props: ['id'],
  components: {
    'progressBar': progress,
    createTimeline,
    activitiesHistory,
    applications,
    business,
    modalImage
  },
  data () {
    return {
      image: 'https://img.myloview.es/cuadros/hombre-foto-de-perfil-avatar-400-30875000.jpg',
      uri: 'leads',
      lead: {},
      contact: {},
      contact_address: {zipcode: {city: {state: {}}}},
      broker: {},
      brokers: [],
      activities: [],
      leadstatuses: null,
      morph: {id: this.id, type: 'leads'},
      loading_activities: true,
      show: false
    }
  },
  created () {
    api.LeadStatuses().getAll().then(response => this.leadstatuses = response.data.data)
    api.Leads().getOne(this.id).then(response => {
      this.broker = response.data.data.executive
      this.lead = response.data.data

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
        this.$router.push({name: 'leads'})
      } else {
        api.ErrorResponse(error)
      }
    })
  },
  watch: {
    contact_address (value) {
      if (!value.zipcode_id) {
        return {zipcode: {city: {state: {}}}}
      }
    }

  },
  mounted () {
    api.Leads().getActivities(this.id).then(response => this.activities = response.data.data).then(() => {
      this.loading_activities = false
    })
    api.Brokers().getAll().then(response => this.brokers = response.data.data)
  },
  methods: {
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

    updateLead () {
      api.Leads().update(this.lead.id, this.lead).then(response => {
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

    add_activity (activity) {
      console.log('add activity show lead')
      this.activities.push(activity)
    },
    delete_activity (activity) {
      console.log('delete Activity show lead')
      this.activities = this.activities.filter(item => item.id != activity.id)
    },
    update_activity (activity) {
      console.log('update activity show lead')
      this.activities = this.activities.map(item => {
        if (item.id == activity.id) return _.clone(activity)
        return item
      })
    },
    changeImage (photo) {
      this.contact.photo = photo
    },
    showCollapse () {
      if (showModalsPreview) {
        this.showCollapse = true
      }
    }
  }
}
</script>

<style>
  @import '~vue-awesome-notifications/dist/styles/style.css';

</style>
