<template>
    <div>
        <div class="col-md-12">
            <div class="row">
                <div class="col-12">
                    <router-link to="/CRM/contacts" class="small text-underline text-capitalize text-primary">&lt; Back</router-link>
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
                                <router-link to="/CRM/contacts" class="text-primary text-capitalize">Contacts list
                                </router-link>
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

                    <!--Box contact info-->
                    <contact :id="contact.id" :showCollapseSmall="true"></contact>

                    <!--End Box contact info-->

                    <!--Business info same thing as lead editable and stuff-->
                    <business v-if="contact" :contact="contact" :showCollapseSmall="true"></business>

                    <!--End Business Info-->

                    <!--What if you have applications -->

                    <applications v-if="lead" :lead="lead.id"></applications>
                </div>

                <!--The main content -->
                <div class="col-lg-10 col-12 main-content pl-lg-4 pl-0 pr-0">

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
    </div>
</template>

<script>

import createTimeline from './../../../helpers/createtimeline'
import activitiesHistory from '../../../helpers/activity/activities_history'
import api from './../../../../config/api'
import applications from '../../deals/_applications'
import business from '../business/_business'
import PrettyCheck from 'pretty-checkbox-vue/check'
import contact from '../contacts/_contact'
import clone from 'lodash/clone'

export default {
  props: ['id'],
  components: {
    contact,
    'p-check': PrettyCheck,
    createTimeline,
    activitiesHistory,
    applications,
    business
  },
  data () {
    return {
      image: 'https://img.myloview.es/cuadros/hombre-foto-de-perfil-avatar-400-30875000.jpg',
      uri: 'contacts',
      contact: {},
      contact_address: {zipcode: {city: {state: {}}}},
      activities: [],
      lead: null,
      brokers: [],
      morph: {id: this.id, type: 'contacts'},
      loading_activities: true
    }
  },
  created () {
    api.Contacts().getOne(this.id).then(response => {
      this.contact = response.data.data
      this.lead = response.data.data.lead

      if (response.data.data.address) {
        this.contact_address = response.data.data.address
        if (!this.contact_address.zipcode) {
          this.contact_address.zipcode = {city: {state: {}}}
        }
      }
    }).catch(error => {
      if (error.response.status === 404) {
        this.$router.push({name: 'contacts'})
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
    api.Brokers().getAll().then(response => this.brokers = response.data.data)
    api.Contacts().getActivities(this.id).then(response => this.activities = response.data.data).then(() => {
      this.loading_activities = false
    })
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

    updateContact () {
      console.log('update Contact')
      api.Contacts().update(this.contact.id, this.contact).then(response => {
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
