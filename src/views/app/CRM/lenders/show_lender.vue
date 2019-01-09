<template>
    <div>
        <div class="col-md-12">
            <div class="row">
                <div class="col-12">
                    <router-link to="/CRM/lenders" class="small text-underline text-capitalize text-primary">&lt; Back</router-link>
                </div>
                <div class="col-md mt-2 mb-3">
                    <!--Main title-->
                    <h4 class="float-left mr-5 text-capitalize" v-text="lender.name"></h4>
                    <!--Breadcrumb-->
                    <nav>
                        <ol class="breadcrumb small p-0 mt-2 col-md-auto col-12">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-primary">Home</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/CRM/lenders" class="text-primary text-capitalize">Lender list
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active font-weight-light text-capitalize" v-text="lender.name"></li>
                        </ol>
                    </nav>
                    <!--End breadcrumb-->
                </div>
            </div>

            <div class="row">
                <!--Here starts the information in these case boxes should be collapsable-->
                <div class="information">
                    <!--Box lender info-->
                    <div v-if="lender" class="col-12 bg-white border mb-4 border-bottom-3 ">
                        <div class="mb-1 row mx-0">
                            <div class="col-12 small border-bottom pb-3">
                                <a href="javascript:;" data-toggle="collapse" data-target=".lead-info" class="card-link link-collapse collapsed">
                                    <h6 class="mt-3 mb-0">
                                        <span class="ti-briefcase mr-1"></span>Lender ID: U-{{lender.id}}
                                        <span class="ti-angle-right text-default float-right arrow-collapse mt-1"></span>
                                    </h6>
                                </a>
                            </div>
                            <!--Box lender info collapsed-->
                            <!--Modal Picture -->
                            <modal-image @changeImage="changeImage" :url="uri" :id="lender.id" :image="lender.image" v-if="lender.id"></modal-image>
                            <!--End Modal-->
                            <!--End Modal-->
                            <div class="col collapse show lead-info ">
                                <div class="row d-flex align-items-center">
                                    <div class="mx-3">
                                        <div class="text-center position-relative my-3">
                                            <progressive-img :aspect-ratio="1" :src="lender.image" class="rounded-circle img-thumbnail info-img"/>
                                            <div data-toggle="modal" :data-target="'#'+lender.id" class="change-image cursor-pointer full_rounded h-100 mw-100 opacity-modal-primary p-4 progressive-image-main top z-index-1">
                                                <p class="mb-0 small text-white">Change Image</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="col-12 small px-0">
                                            <h6 class="mb-2 text-primary  field">
                                                <span class="small ti-pencil position-absolute collapse-edit"></span>
                                                <input readonly placeholder="Contact name" class="text-primary border-0 w-100 text-capitalize" @change="updateLender" v-model="lender.name">
                                            </h6>
                                        </div>
                                        <div class="col-12 small px-0">
                                            <p class="mb-2 field">
                                                <span class="small ti-pencil position-absolute collapse-edit"></span>
                                                <the-mask :mask="'(###) ###-####'" type="tel" placeholder="Phone Number" class="text-default border-0 w-100" @change="updateContact" v-model="contact.phone"/>
                                            </p>
                                        </div>
                                        <div class="col-12 small px-0">
                                            <p class="field mb-2">
                                                <span class="small ti-pencil position-absolute collapse-edit"></span>
                                                <input readonly placeholder="Email" class="text-default border-0 w-100" @change="updateLender" v-model="lender.email">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--End lead info collapsed-->

                            <!--Box lead info not collapsed-->
                            <div class="collapse col-12 lead-info ">
                                <div class="text-center my-2 position-relative">
                                    <img :src="lender.image" class="rounded-circle my-3 img-thumbnail info-img-lg">
                                    <div data-toggle="modal" :data-target="'#'+lender.id" class="change-image-collapse cursor-pointer full_rounded h-100 left mw-100 mx-auto opacity-modal-primary p-4 position-absolute right top z-index-1">
                                        <p class="mb-0 small mt-3 text-white">Change Image</p>
                                    </div>
                                </div>
                                <div class="row small px-3 position-relative">
                                    <p-check @change="updateLender" v-model="lender.status" class="p-switch p-fill text-primary mx-auto mb-3">
                                        <span class="text-primary" v-if="lender.status ==true">Active</span>
                                        <span class="text-switch" v-else>Inactive</span>
                                    </p-check>
                                </div>
                                <div class="row small px-3 position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-user mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Name:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <input readonly placeholder="Contact name" class="text-default border-0 text-capitalize" @change="updateLender" v-model="lender.name">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom ">
                                        <span class="ti-email mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <input readonly placeholder="Email" class="text-default border-0" @change="updateLender" v-model="lender.email">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-location-pin mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Street
                                            Address:</label> <span class="small ion ion-edit position-absolute"></span>
                                        <input readonly placeholder="Street Address" class="text-default border-0" @change="updateContactAddress" v-model="contact_address.address">
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-map-alt mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Zip Code:</label>
                                        <span class="small ti-pencil position-absolute"></span>
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
                                        <span class="ti-phone mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Phone Number:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <the-mask :mask="'(###) ###-####'" type="tel" readonly placeholder="Phone Number" @change="updateContact" class="text-default border-0" v-model="contact.phone"/>
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-minus mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Min Loan Size:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <v-money prefix="$" @change="updateLender" :money.sync="lender.min_loan_size" class="text-default border-0"></v-money>
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-plus mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Max Loan Size:</label>
                                        <span class="small ion ion-edit position-absolute"></span>
                                        <v-money prefix="$" @change="updateLender" :money.sync="lender.max_loan_size" class="text-default border-0"></v-money>
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <div class="w-100 mb-0 py-2 border-bottom d-flex">
                                        <div class="col field pl-0">
                                            <span class="ti-minus mr-1 text-primary"></span>
                                            <label class="font-weight-normal mb-0 small text-primary">Min
                                                Interest:</label>
                                            <span class="small pencil-edit position-absolute"></span>
                                            <the-mask @change="updateLender" :mask="['##.# %','#.# %','# %']" type="tel" readonly placeholder="Min Interest Rate" class="text-default border-0" v-model="lender.min_interest"/>
                                        </div>
                                        <div class="col field pr-0">
                                            <span class="ti-plus mr-1 text-primary"></span>
                                            <label class="font-weight-normal mb-0 small text-primary">Max
                                                Interest:</label>
                                            <span class="small ti-edit position-absolute"></span>
                                            <the-mask @change="updateLender" :mask="['##.# %','#.# %','# %']" type="tel" readonly placeholder="Max Interest Rate" class="text-default border-0" v-model="lender.max_interest"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <div class="w-100 mb-0 py-2 border-bottom d-flex">
                                        <div class="col field pl-0">
                                            <span class="ti-minus mr-1 text-primary"></span>
                                            <label class="font-weight-normal mb-0 small text-primary">Min Terms:</label>
                                            <span class="small ti-pencil position-absolute"></span>
                                            <the-mask @change="updateLender" :mask="['## Months','# Months']" type="tel" readonly placeholder="Min Interest Rate" class="text-default border-0" v-model="lender.min_terms"/>
                                        </div>
                                        <div class="col field pr-0">
                                            <span class="ti-plus mr-1 text-primary"></span>
                                            <label class="font-weight-normal mb-0 small text-primary">Max Terms:</label>
                                            <span class="small ti-pencil position-absolute"></span>
                                            <the-mask @change="updateLender" :mask="['### Months','## Months','# Months']" type="tel" readonly placeholder="Max Interest Rate" class="text-default border-0" v-model="lender.max_terms"/>

                                        </div>
                                    </div>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <div class="w-100 mb-0 py-2 border-bottom d-flex">
                                        <div class="col field pl-0">
                                            <span class="ti-minus mr-1 text-primary" style="border-radius:100%; border:1px solid #6164c0;" ></span>
                                            <label class="font-weight-normal mb-0 small text-primary">Negative
                                                Days:</label> <span class="small ti-pencil position-absolute"></span>
                                            <input @change="updateLender" type="number" readonly placeholder="Negative Days" class="text-default border-0" v-model="lender.negative_days"/>
                                        </div>
                                        <div class="col field pr-0">
                                            <span class="ti-support mr-1 text-primary"></span>
                                            <label class="font-weight-normal mb-0 small text-primary">Puerto
                                                Rico:</label>
                                            <select @change="updateLender" v-model="lender.puerto_rico" class="text-default border-0 rounded-0">
                                                <option :value="false">No</option>
                                                <option :value="true">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row px-3 small position-relative">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-money mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Weekly
                                            Payments:</label>
                                        <select @change="updateLender" v-model="lender.weekly_payments" class="text-default border-0 rounded-0">
                                            <option :value="false">No</option>
                                            <option :value="true">Yes</option>
                                        </select>
                                    </p>
                                </div>
                                <div class="row px-3 small position-relative mb-4">
                                    <p class="field w-100 mb-0 py-2 border-bottom">
                                        <span class="ti-flag mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Consolidation
                                            Refinance:</label>

                                        <select @change="updateLender" v-model="lender.consolidation_refinance" class="text-default border-0 rounded-0">
                                            <option :value="false">No</option>
                                            <option :value="true">Yes</option>
                                        </select>
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

                </div>
                <!--The main content -->
                <div class="col-lg-10 col-12 main-content pl-lg-4 pl-0 pr-0">
                    <!--leneder properties-->
                    <lender-selection :id="id"></lender-selection>
                    <!--End lender properties-->

                    <!-- Note: These are the tabs for create (tasks, meetings, calls etc ) this ones should be call like a module-->
                    <div class="col-12 bg-white border mb-4 border-bottom-3">
                        <create-timeline @addActivity="add_activity" :contact="contact" :morph="morph" :brokers="brokers"></create-timeline>
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
import lenderSelection from '../../../helpers/lenderselection'
import PrettyCheck from 'pretty-checkbox-vue/check'
import contact from './../contacts/_contact'
import modalImage from './../../../helpers/modals/modalimage'
import isEmpty from 'lodash/isEmpty'
import clone from 'lodash/clone'

export default {
  props: ['id'],
  components: {
    lenderSelection,
    createTimeline,
    activitiesHistory,
    applications,
    business,
    contact,
    modalImage,
    'p-check': PrettyCheck
  },
  data () {
    return {

      uri: 'lenders',
      lender: {},
      contact: {},
      contact_address: {zipcode: {city: {state: {}}}},
      broker: {},
      brokers: [],
      activities: [],
      industries: [],
      morph: {id: this.id, type: 'lenders'},
      loading_activities: true
    }
  },
  created () {
    api.Lenders().getOne(this.id).then(response => {
      this.lender = response.data.data
      this.broker = response.data.data.executive
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
        this.$router.push({name: 'lenders'})
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
    api.Lenders().getActivities(this.id).then(response => {
      // if(response.data.data.activities)this.activities = response.data.data;
    }).then(() => {
      this.loading_activities = false
    })
    api.Brokers().getAll().then(response => this.brokers = response.data.data)
    api.Industries().getAll().then(response => this.industries = response.data.data)
  },
  computed: {
    contactExist () {
      return !isEmpty(this.contact)
    }
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
    updateLender () {
      api.Lenders().update(this.lender.id, this.lender).then(response => {
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
    changeImage (photo) {
      this.lender.image = photo
    }
  }
}

</script>

<style>
    @import '~vue-awesome-notifications/dist/styles/style.css';

</style>
