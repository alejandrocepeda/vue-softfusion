<template>
    <modals title="Lender Preview" :showCreate="true" :showModals.sync="showModals">
        <template slot="bodyCreate">

            <div class="information information-preview">
                <div v-if="lender" class="col-12 bg-white border mb-4 border-bottom-3 ">
                    <div class="mb-1 row mx-0">
                        <div class="col-12 small border-bottom pb-3">
                            <a href="javascript:;" data-toggle="collapse" data-target=".lead-info" class="card-link link-collapse collapsed">
                                <h6 class="mt-3 mb-0">
                                    <span class="ti-briefcase mr-2"></span>Lender ID: U-{{lender.id}}
                                    <span class="ti-angle-right text-default float-right arrow-collapse mt-1"></span>
                                </h6>
                            </a>
                        </div>
                        <!--Box lender info collapsed-->

                        <!--End Modal-->
                        <div class="col collapse  lead-info ">
                            <div class="row">
                                <div class="col-auto">
                                    <div class="text-center position-relative">
                                        <progressive-img :aspect-ratio="1" :src="lender.image" class="rounded-circle my-3 img-thumbnail info-img"/>
                                        <div data-toggle="modal" data-target=".modal-image-upload" class="change-image cursor-pointer full_rounded h-100 mw-100 opacity-modal-primary p-4 progressive-image-main top z-index-1">
                                            <p class="mb-0 small text-white">Change Image</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col pl-0 pr-3">
                                    <div class="col-12 small px-0">
                                        <h6 class="mb-2 text-primary mt-3 field">
                                            <span class="small ti-pencil position-absolute"></span>
                                            <input readonly placeholder="Contact name" class="text-primary border-0 w-100 text-capitalize" @change="updateLender"  v-model="lender.name">
                                        </h6>
                                    </div>
                                    <div class="col-12 small px-0">
                                        <p class="mb-2 field">
                                            <span class="small ti-pencil position-absolute collapse-edit"></span>
                                            <the-mask :mask="'(###) ###-####'" type="tel" placeholder="Phone Number" class="text-default border-0 w-100" @change="updateContact"  v-model="contact.phone"/>
                                        </p>
                                    </div>
                                    <div class="col-12 small px-0">
                                        <p class="field">
                                            <span class="small ti-pencil position-absolute collapse-edit"></span>
                                            <input readonly placeholder="Email" class="text-default border-0 w-100" @change="updateLender" v-model="lender.email">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--End lead info collapsed-->

                        <!--Box lead info not collapsed-->
                        <div class="collapse col-12 lead-info show info-collapse">
                            <div class="text-center my-2 position-relative">
                                <img :src="lender.image" class="rounded-circle my-3 img-thumbnail info-img-lg">
                                <div data-toggle="modal" data-target=".modal-image-upload" class="change-image-collapse cursor-pointer full_rounded h-100 left mw-100 mx-auto opacity-modal-primary p-4 position-absolute right top z-index-1">
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
                                    <input readonly placeholder="Contact name" class="text-default border-0 text-capitalize" @change="updateLender"  v-model="lender.name">
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="field w-100 mb-0 py-2 border-bottom ">
                                    <span class="ti-email mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                                    <span class="small ti-pencil position-absolute"></span>
                                    <input readonly placeholder="Email" class="text-default border-0" @change="updateLender"  v-model="lender.email">
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
                                    <span class="ti-direction mr-1
                                     text-primary"></span>
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
                                    <span class="small ti-pencil position-absolute"></span>
                                    <v-money prefix="$" @change="updateLender" :money.sync="lender.max_loan_size" class="text-default border-0"></v-money>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <div class="w-100 mb-0 py-2 border-bottom d-flex">
                                    <div class="col field pl-0">
                                        <span class="ti-minus text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Min
                                            Interest:</label>
                                        <span class="small ti-pencil position-absolute"></span>
                                        <the-mask @change="updateLender" :mask="['##.# %','#.# %','# %']" type="tel" readonly placeholder="Min Interest Rate" class="text-default border-0" v-model="lender.min_interest"/>
                                    </div>
                                    <div class="col field pr-0">
                                        <span class="ti-plus mr-1 text-primary"></span>
                                        <label class="font-weight-normal mb-0 small text-primary">Max
                                            Interest:</label>
                                        <span class="small ti-pencil position-absolute"></span>
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
                                        <span class="ti-minus mr-1 text-primary" style="border: 1px solid #6164c0; border-radius: 100%;"></span>
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

                <business :contact="contact" :showCollapseSmall="true"></business>

                <!--Modal Picture -->
                <modal-image @changeImage="changeImage" :url="uri" :id="lender.id" :image="lender.image" v-if="lender.id"></modal-image>
                <!--End Modal-->

            </div>

        </template>
        <template slot="buttonCreate">
            <router-link :to="{ name: route_uri+'-id', params: { id: lender.id }}">

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
import contactComponent from './../contacts/_contact'
import PrettyCheck from 'pretty-checkbox-vue/check'
import modalImage from './../../../helpers/modals/modalimage'
import business from './../business/_business'
import first from 'lodash/first'
import words from 'lodash/words'
import isEmpty from 'lodash/isEmpty'
import clone from 'lodash/clone'

export default {
  name: 'modalPreviewLenders',
  components: {
    Modals,
    api,
    'contact': contactComponent,
    'p-check': PrettyCheck,
    modalImage,
    business
  },
  props: {
    lender: {},
    money: {
      type: Number
    }
  },
  data () {
    return {
      showModals: true,
      contact: {},
      contact_address: {zipcode: {city: {state: {}}}},
      broker: {},
      brokers: [],
      activities: [],
      industries: [],
      uri: 'lenders'
    }
  },
  watch: {
    showModals (value) {
      if (!value) this.$emit('update:showModals', value)
    },
    contact_address (value) {
      if (!value.zipcode_id) {
        return {zipcode: {city: {state: {}}}}
      }
    },
    money (value) {
      if (value) {
        this.currency = this.masked(value)
      } else {
        this.currency = null
      }
    },
    currency (value) {
      value = this.unmasked(value)
      this.currency = this.masked(value)
    }
  },
  computed: {
    route_uri () {
      return first(words(this.uri))
    },
    contactExist () {
      return !isEmpty(this.contact)
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
    },
    transformData (data) {
      return data.map(item => {
        return {
          'id': item.id,
          'business_name': item.name,
          'contact_name': item.relations.contact.name,
          'phone': item.relations.contact.phone,
          'email': item.email,
          'min_loan_size': item.min_loan_size,
          'max_loan_size': item.max_loan_size,
          'status': item.status
        }
      })
    }
  },
  created () {
    api.Lenders().getOne(this.lender.id).then(response => {
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
    })
  },
  mounted () {
    api.Lenders().getActivities(this.lender.id).then(response => {
      // if(response.data.data.activities)this.activities = response.data.data;
    }).then(() => {
      this.loading_activities = false
    })
    api.Brokers().getAll().then(response => this.brokers = response.data.data)
    api.Industries().getAll().then(response => this.industries = response.data.data)
  }
}
</script>

<style scoped>

</style>

<style lang="scss">
    .modal-create .ion{
        width:auto!important;
    }
    .information-preview{
        width:auto!important;
        margin-top:50px;
        padding-bottom:150px;
    }

    .preview-buttons-container{
        align-items: center;
    }
    .btn-preview-edit{
        &:hover{
            color:#fff;
            .preview-icon{
                color:#fff!important;
            }
        }
        .preview-icon{
            font-size: 15px;
            color: #6063c1!important;
            vertical-align: middle;
            font-weight: bold;
            align-self:center;
        }
    }

</style>
