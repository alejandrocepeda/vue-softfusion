<template>
    <div>
        <div class="col-md-12">
            <div class="row">
                <div class="col-12">
                    <router-link to="/CRM/businesses" class="small text-underline text-capitalize text-primary">&lt; Back</router-link>
                </div>
                <div class="col-md mt-2 mb-3">
                    <!--Main title-->

                    <h4 class="float-left mr-5 text-capitalize" v-text="business.name"></h4>

                    <!--Breadcrumb-->

                    <nav>
                        <ol class="breadcrumb small p-0 mt-2 col-md-auto col-12">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-primary">Home</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/CRM/businesses" class="text-primary text-capitalize">Business list
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active font-weight-light text-capitalize" v-text="business.name"></li>
                        </ol>
                    </nav>

                    <!--End breadcrumb-->
                </div>

            </div>
            <div class="row">

                <!--Here starts the information in these case boxes should be collapsable-->

                <div class="information">

                    <!--Business info same thing as lead editable and stuff-->

                    <business-component :id="id" :contact="contact" class="business" :showCollapseSmall="true" ></business-component>

                    <contacts-list :reload.sync="reloadContacts" :uri="'businesses/'+id"></contacts-list>

                    <contact-component @selected="reloadContacts=true" :parent="business"></contact-component>

                    <applications v-if="business.contact" :lead="id"></applications>

                    <!--End Box lead info-->

                </div>

                <!--The main content -->
                <div class="col-lg-10 col-12 main-content pl-lg-4 pl-0 pr-0">

                    <!-- Note: These are the tabs for create (tasks, meetings, calls etc ) this ones should be call like a module-->

                    <div class="col-12 bg-white border mb-4 border-bottom-3">

                        <create-timeline @addActivity="add_activity" :contact="business" :morph="morph"></create-timeline>

                    </div>

                    <div class="col-12 bg-white border mb-4 border-bottom-3">
                        <activities-history :loading="loading_activities" @deleteActivity="delete_activity" @addActivity="add_activity" @updateActivity="update_activity" :activities="activities" :contact="business" :morph="morph"></activities-history>
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
import businessComponent from './_business'
import contactComponent from '../contacts/_contact'
import PrettyCheck from 'pretty-checkbox-vue/check'
import contactsList from './../contacts/_contacts_list'
import clone from 'lodash/clone'

export default {
  props: ['id'],
  components: {
    'p-check': PrettyCheck,
    createTimeline,
    activitiesHistory,
    applications,
    businessComponent,
    contactComponent,
    contactsList
  },
  data () {
    return {
      // editImage: false,
      uri: 'businesses',
      business: {},
      contact: {},
      activities: [],
      morph: {id: this.id, type: 'businesses'},
      loading_activities: true,
      reloadContacts: false,
      showCollapseSmall: true
    }
  },
  created () {

  },
  watch: {},
  mounted () {
    api.Business().getOne(this.id)
      .then(response => this.business = response.data.data)
      .catch(error => {
        if (error.response.status === 404) {
          this.$router.push({name: 'businesses'})
        } else {
          api.ErrorResponse(error)
        }
      })

    api.Business().getActivities(this.id)
      .then(response => this.activities = response.data.data)
      .then(() => this.loading_activities = false)
      .catch(error => api.ErrorResponse(error))
  },
  methods: {
    // editImageFunction: function(){
    //     this.editImage= !this.editImage;
    // },

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
    @import '~vue-awesome-notifications/dist/styles/style.css';

    .business .close{
        display: none;
    }

    .business .modal-header .close{
        display: inherit;
    }

</style>
