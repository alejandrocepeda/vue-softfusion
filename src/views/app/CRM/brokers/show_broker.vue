<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-12">
                <router-link to="/CRM/brokers" class="small text-underline text-capitalize text-primary">&lt; Back
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
                            <router-link to="/CRM/brokers" class="text-primary text-capitalize">Brokers list
                            </router-link>
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
                <broker :broker="broker" :showCollapseSmall="true"></broker>
                <!--End Box lead info-->

                <!--Business info same thing as lead editable and stuff-->
                <business :contact="contact" :showCollapseSmall="true"></business>
                <!--End Business Info-->

            </div>

            <!--The main content -->
            <div class="col-lg-10 col-12 main-content pl-lg-4 pl-0 pr-0">
                <!--Box with progres bar -->
                <div class="col-12 bg-white border mb-4 border-bottom-3">
                    <!--Progress bar-->
                    <progress-bar :statuses="brokerStatuses" @change="updateUsers" :status.sync="user.broker_status_id"></progress-bar>
                </div>

                <div class="col-12 bg-white border mb-4 border-bottom-3">
                    <!--Documentation tabs-->
                    <documents v-if="documents" :documents="documents"></documents>
                    <!--End documents tab-->
                </div>

                <!-- Note: These are the tabs for create (tasks, meetings, calls etc ) this ones should be call like a module-->

                <div class="col-12 bg-white border mb-4 border-bottom-3">
                    <create-timeline @addActivity="add_activity" :contact="contact" :morph="morph" :brokers="brokers"></create-timeline>
                </div>

                <!-- Note: Here starts the timeline tabs, which shiw a view of the elements created (tasks, emails etc..) -->

                <div class="col-12 bg-white border mb-4 border-bottom-3">
                    <activities-history :loading="loading_activities" @deleteActivity="delete_activity" @addActivity="add_activity" @updateActivity="update_activity" :activities="activities" :contact="contact" :morph="morph"></activities-history>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import business from '../business/_business'
import progress from './../../../helpers/progress'
import createtimeline from './../../../helpers/createtimeline'
import api from './../../../../config/api'
import createDocuments from '../../deals/_documents'
import activitiesHistory from '../../../helpers/activity/activities_history'
import broker from './_broker'
import clone from 'lodash/clone'

export default {
  props: ['id'],
  components: {
    activitiesHistory,
    business,
    broker,
    'documents': createDocuments,
    'progressBar': progress,
    'createTimeline': createtimeline

  },
  data () {
    return {
      uri: 'brokers',
      activities: [],
      application: {},
      brokers: [],
      loanPurposes: [],
      lead: {},
      user: {},
      broker: {user: {}, contact: {}, contact_address: {zipcode: {city: {state: {}}}}},
      contact: {},
      processor: {},
      processors: [],
      products: [],
      morph: {id: this.id, type: 'applications'},
      loading_activities: true,
      brokerStatuses: null,
      documents: []
    }
  },
  created () {
    api.Users().getOne(this.id).then(response => {
      this.loading = false
      this.user = response.data.data
      this.broker.user = this.user
      if (response.data.data.contact) {
        this.broker.contact = response.data.data.contact
        this.contact = response.data.data.contact
        if (response.data.data.contact.address) {
          this.broker.contact_address = response.data.data.contact.address
          if (!this.broker.contact_address.zipcode) {
            this.broker.contact_address.zipcode = {city: {state: {}}}
          }
        }
      }
    }).catch(error => {
      if (error.response.status === 404) {
        this.$router.push({name: 'brokers'})
      } else {
        api.ErrorResponse(error)
        this.loading = false
      }
    })
  },
  mounted () {
    api.BrokerStatuses().getAll().then(response => this.brokerStatuses = response.data.data)
    api.Applications().getActivities(this.id).then(response => this.activities = response.data.data).then(() => {
      this.loading_activities = false
    })
    api.Processors().getAll().then(response => this.processors = response.data.data)
    api.Brokers().getAll().then(response => this.brokers = response.data.data)
    api.LoanPurposes().getAll().then(response => this.loanPurposes = response.data.data)
    api.Products().getAll().then(response => this.products = response.data.data)
  },

  methods: {
    updateUsers () {
      api.Users().update(this.user.id, this.user).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    updateLead () {
      api.Leads().update(this.lead.id, this.lead).then(response => {
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
        if (item.id == activity.id) return clone(activity)
        return item
      })
    }

  }
}
</script>

<style>
    /*@import '~vue-awesome-notifications/dist/styles/style.css';*/
</style>
