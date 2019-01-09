<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-12">

                <router-link to="/applications" class="small text-capitalize text-primary">&lt; Back</router-link>

            </div>
        </div>
        <div class="row">
            <div class="col-auto d-flex mt-2 mb-3">
                <!--Main title-->

                <h4 class="mr-5 text-capitalize" v-text="contact.name"></h4>

                <!--Breadcrumb-->

                <nav>
                    <ol class="breadcrumb small p-0 mt-2">
                        <li class="breadcrumb-item">
                            <router-link to="/" class="text-primary">Home</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link to="/applications" class="text-primary text-capitalize">Deals list
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

            <!--Modal Picture -->

            <div class="information">
                <!--Box application info-->

                <application :application="application" :showCollapseSmall="true"></application>

                <!--End Box application info-->
                <!--Box contact info-->
                <contact :id="contact.id" :showCollapseSmall="true"></contact>
                <!--End box contact info-->
                <!--Business info same thing as lead editable and stuff-->
                <business :contact="contact" :showCollapseSmall="true"></business>
                <!--End Business Info-->
                <!--What if you have applications -->
            </div>

            <!--The main content -->
            <div class="col-lg-10 col-12 main-content pl-lg-4 pl-0 pr-0">
                <!--Box with progres bar -->
                <div class="col-12 bg-white border mb-4 border-bottom-3">
                    <!--Progress bar-->
                    <progress-bar :statuses="applicationStatuses" @change="updateApplication" :status.sync="application.application_status_id"></progress-bar>
                </div>

                <div class="col-12 bg-white border mb-4 border-bottom-3">
                    <tabs class="mb-4">
                        <tab icon="ti-folder mr-1" name="Documents">
                            <documents @addDocument="addDocument" @deleteDocument="deleteDocument" v-if="documents" :documents="documents"></documents>
                        </tab>
                        <tab icon="ti-book mr-1" name="Underwriting">
                            <underwriting v-if="application.underwritings" :list="application.underwritings" :advanceds="application.client_advanceds" :application_id="id"></underwriting>
                        </tab>
                        <tab icon="ti-link mr-1" name="Matchs">
                            <match></match>
                        </tab>
                        <tab icon="ti-check-box mr-1" name="Approvals">
                            <approval></approval>
                        </tab>
                    </tabs>
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
import application from '../deals/_application'
import contact from '../CRM/contacts/_contact'
import business from '../CRM/business/_business'
import progress from './../../helpers/progress'
import createtimeline from './../../helpers/createtimeline'
import api from './../../../config/api'
import documents from './_documents'
import match from './_match'
import approval from './_approval'
import underwriting from './_underwritings'
import activitiesHistory from '../../helpers/activity/activities_history'
import clone from 'lodash/clone'

export default {
  props: ['id'],
  components: {
    contact,
    activitiesHistory,
    business,
    documents,
    application,
    underwriting,
    match,
    approval,
    'progressBar': progress,
    'createTimeline': createtimeline
  },
  data () {
    return {
      image: 'https://img.myloview.es/cuadros/hombre-foto-de-perfil-avatar-400-30875000.jpg',
      uri: 'applications',
      activities: [],
      application: {},
      applicationStatuses: null,

      contact: {},
      contact_address: {zipcode: {city: {state: {}}}},
      lead: {},
      morph: {id: this.id, type: 'applications'},
      loading_activities: true,
      documents: []
    }
  },
  created () {
    api.ApplicationStatuses().getAll().then(response => this.applicationStatuses = response.data.data)
    api.Applications().getOne(this.id).then(response => {
      this.contact = response.data.data.lead.contact
      this.business = response.data.data.lead.contact.business
      this.application = response.data.data
      this.documents = response.data.data.documents
    }).catch(error => {
      if (error.response.status === 404) {
        this.$router.push({name: 'applications'})
      } else {
        api.ErrorResponse(error)
      }
    })
  },
  computed: {
    brokers () {
      return this.$store.getters.brokers
    }
  },
  mounted () {
    api.Applications().getActivities(this.id).then(response => this.activities = response.data.data).then(() => {
      this.loading_activities = false
    })
  },
  watch: {},
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
      api.Contacts().update(this.contact.id, this.contact).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    updateApplication () {
      api.Applications().update(this.application.id, this.application).then(response => {
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
    },
    update_application () {
      this.activities = this.activities.map(item => {
        if (item.id == activity.id) return clone(activity)
        return item
      })
    },

    addDocument (document) {
      let formData = new FormData()
      formData.append('document', document.file[0])
      formData.append('type', document.type)
      formData.append('document_type_id', document.document_type_id)
      formData.append('period', document.period)
      formData.append('size', Math.floor(document.file[0].size / 1024))
      api.Applications().addDocument(this.id, formData).then(response => {
        api.SuccessResponse(response)
        this.documents = response.data.data.documents
      })
    },
    deleteDocument (document) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        customClass: 'bg-body rounded-0',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success rounded-0 font-weight-light',
        cancelButtonClass: 'btn btn-danger rounded-0 font-weight-light',
        confirmButtonColor: '#53D190',
        cancelButtonColor: '#F65F6E',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          api.Applications().deleteDocument(this.id, document.id).then(response => {
            this.documents = response.data.data.documents
            this.$swal({
              title: 'Deleted!',
              text: 'Document has been deleted.',
              type: 'success',
              customClass: 'bg-body rounded-0',
              confirmButtonClass: 'btn btn-primary rounded-0 font-weight-light bg-primary'
            })
          }).catch(error => {
          })
        }
      })
    }

  }
}
</script>

<style>
    @import '~vue-awesome-notifications/dist/styles/style.css';

</style>

<style lang="scss">
    .ap-icon{
        font-size: 15px !important;
    }
</style>
