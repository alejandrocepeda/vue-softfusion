<template>
    <section>
        <modal-create-business @selected="selected" @closeModal="showModals=false" :show-search="true" v-if="showModals"></modal-create-business>
        <!--End Modal-->
        <div class="col-12 bg-white border mb-4 border-bottom-3">
            <div class="row mx-0">
                <div class="col-12 small border-bottom pb-3">
                    <a href="javascript:;" data-target=".business-info" data-toggle="collapse" class="card-link collapsed link-collapse" aria-expanded="false">
                        <h6 class="mt-3 mb-0">
                            <span class="ti-briefcase mr-2"></span>Business
                            <span v-if="business">ID: B-{{business.id}}</span>
                            <span class="ti-angle-right text-default float-right arrow-collapse mt-1"></span>
                        </h6>
                    </a>
                </div>
                <loading class="col" v-if="loading"></loading>
                <template v-else>
                    <div v-if="addBusiness" class="col-12 mb-4">
                        <p class="mt-3 small text-center"><strong>{{contact.name}}</strong> is not associated with a
                            company.</p>
                        <button @click="openModals" class="btn-primary rounded-0 py-2 px-3 small text-white mx-auto d-block">
                            <span class="ti-file"></span> Add a Business
                        </button>
                    </div>
                    <template v-else>
                        <div class="col collapse  business-info" :class="{show: showCollapseSmall}">
                            <div class="row d-flex align-items-center">
                                <div class="mx-3">
                                    <div class="text-center position-relative my-3">
                                        <progressive-img :aspect-ratio="1" :src="business.image.url" class="rounded-circle img-thumbnail info-img"/>
                                        <div data-toggle="modal" :data-target="'.'+business.id" class="change-image cursor-pointer full_rounded h-100 mw-100 opacity-modal-primary p-4 progressive-image-main top z-index-1">
                                            <p class="mb-0 small text-white">Change Image</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <div class="col-12 small px-0">
                                        <h6 class="mb-2 text-primary  field">
                                            <span class="small ti-pencil position-absolute collapse-edit"></span>
                                            <input readonly placeholder="Contact name" class="text-primary border-0 w-100 text-capitalize" @change="updateBusiness" v-model="business.name">
                                        </h6>
                                    </div>
                                    <div class="col-12 small px-0">
                                        <p class="mb-2 field">
                                            <span class="small ti-pencil position-absolute collapse-edit"></span>
                                            <the-mask :mask="'(###) ###-####'" type="tel" placeholder="Phone Number" class="text-default border-0 w-100" @change="updateBusiness" v-model="business.phone"/>
                                        </p>
                                    </div>
                                    <div class="col-12 small px-0">
                                        <p class="field mb-2">
                                            <span class="small ti-pencil position-absolute collapse-edit"></span>
                                            <input readonly placeholder="Web" class="text-default border-0 w-100" @change="updateBusiness" v-model="business.web">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="collapse col-12 business-info info-collapse" :class="{show: showCollapse}">
                            <div class="text-center my-2 position-relative">
                                <button @click="detachBusiness" type="button" class="close font-weight-light mr-1 position-absolute right text-secondary detach-business-button" data-toggle="tooltip" data-placement="top" title="Detach Business">
                                    <span class="pr-1 tex">×</span>
                                </button>
                                <img class="rounded-circle my-3 img-thumbnail info-img-lg" :src="business.image.url">
                                <div data-toggle="modal" :data-target="'#'+business.id" class="change-image-collapse cursor-pointer full_rounded h-100 left mw-100 mx-auto opacity-modal-primary p-4 position-absolute right top z-index-1">
                                    <p class="mb-0 small mt-3 text-white">Change Image</p>
                                </div>
                            </div>
                            <div class="row small px-3 position-relative">
                                <p-check @change="updateBusiness" v-model="business.status" class="p-switch p-fill text-primary mx-auto mb-3">
                                    <span class="text-primary" v-if="business.status == true">Active</span>
                                    <span class="text-switch" v-else>Inactive</span>
                                </p-check>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-briefcase mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Business Name:</label>
                                    <span class="small ion ion-edit position-absolute"></span>
                                    <input readonly placeholder="Business Name" @change="updateBusiness" class="text-default border-0 text-capitalize" v-model='business.name'>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-location-pin mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Street Address:</label>
                                    <span class="small ti-pencil position-absolute"></span>
                                    <input readonly placeholder="Street Addres" @change="updateBusinessAddress" class="text-default border-0" v-model="business_address.address">
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-map-alt mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Zip code:</label>
                                    <span class="small ti-pencil position-absolute"></span>
                                    <input readonly placeholder="Zip code" @change="updateBusinessAddress" class="text-default border-0" v-model="business_address.zipcode_id">
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field w-100  mb-0 py-2">
                                    <span class="ti-direction mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">City:</label>
                                    <input disabled placeholder="City" class="text-default border-0  text-capitalize" v-model="business_address.zipcode.city.name">
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field w-100  mb-0 py-2">
                                    <span class="ti-flag-alt mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">State:</label>
                                    <input disabled placeholder="State" class="text-default border-0 text-capitalize" v-model="business_address.zipcode.city.state.name">
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-mobile mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Phone Number</label>
                                    <span class="small ti-pencil position-absolute"></span>
                                    <the-mask :mask="'(###)-###-####'" type="tel" readonly placeholder="Phone Number" @change="updateBusiness" class="text-default border-0" v-model="business.phone"/>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-timer mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Time in Businness</label>
                                    <v-select :add="true" @add="modalTimeInBusiness=true" class="info-select" :value.sync="business.years_in_business_id" @change="updateBusiness" :options="yearsinbusiness"></v-select>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-money mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Annual Revenue:</label>
                                    <v-select :add="true" @add="modalAnnualRevenue=true" class="info-select" :value.sync="business.annual_revenue_id" @change="updateBusiness" :options="annualrevenues"></v-select>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-medall mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Credit Score:</label>
                                    <v-select :add="true" @add="modalCreditScores=true" class="info-select" :value.sync="business.credit_score_id" @change="updateBusiness" :options="creditscores"></v-select>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field w-100  mb-0 py-2">
                                    <span class="ti-stats-up mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Industry:</label>
                                    <v-select :add="true" @add="modalIndustries=true" class="info-select" :value.sync="business.industry_id" @change="updateBusiness" :options="industries"></v-select>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative mb-4">
                                <p class="border-bottom field w-100  mb-0 py-2">
                                    <span class="ti-world mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Website:</label>
                                    <input placeholder="Web" class="text-default border-0 text-capitalize" v-model="business.web" disabled>
                                </p>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
        </div>
        <!--Modal Picture -->
        <modal-image @changeImage="changeImage" url="businesses" :id="business.id" :image="business.image.url" v-if="business.id"></modal-image>
        <!--End Modal-->
        <modal-center :value="true" name="Time in Business" :valueId.sync="business.years_in_business_id" @update="$store.dispatch('getAllYearsInBusines')" uri="years-in-business" :open.sync="modalTimeInBusiness"></modal-center>
        <modal-center :value="true" name="Annual revenue" :valueId.sync="business.annual_revenue_id" @update="$store.dispatch('getAllAnnualRevenues')" uri="annual-revenues" :open.sync="modalAnnualRevenue"></modal-center>
        <modal-center :value="true" name="Credit Score" :valueId.sync="business.credit_score_id" @update="$store.dispatch('getAllCreditScores')" uri="credit-scores" :open.sync="modalCreditScores"></modal-center>
        <modal-center name="Industry" :valueId.sync="business.industry_id" @update="$store.dispatch('getAllIndustries')" uri="industries" :open.sync="modalIndustries"></modal-center>

    </section>
</template>

<script>
  import api from '../../../../config/api'
  import loading from '../../../helpers/loading'
  import modalCenter from '../../../helpers/modals/modalcenter'
  import modalCreateBusiness from './_modalCreateBusiness'
  import PrettyCheck from 'pretty-checkbox-vue/check'
  import modalImage from './../../../helpers/modals/modalimage'
  import isEmpty from 'lodash/isEmpty'

  export default {
    components: {loading, modalCreateBusiness, 'p-check': PrettyCheck, modalImage,modalCenter},
    name: 'business',
    props: {
      id: {
        require: true
      },
      contact: {
        default: () => {
          return {}
        }
      },
      showCollapse: {type: Boolean},
      showCollapseSmall: {type: Boolean}
    },
    data () {
      return {
        business: {},
        business_address: {zipcode: {city: {state: {}}}},

        loading: true,
        showModals: false,
        modalTimeInBusiness:false,
        modalAnnualRevenue:false,
        modalCreditScores:false,
        modalIndustries:false,
      }
    },
    created () {
      if (this.contact.business_id || this.id) {
        this.loadBusiness()
        this.showCollapse = true
      }
    },
    mounted () {
    },
    computed: {
      addBusiness () {
        if (isEmpty(this.business)) return true
        return false
      },
      yearsinbusiness(){
        return this.$store.state.years_business
      },
      annualrevenues(){
        return this.$store.state.annual_revenues
      },
      creditscores(){
        return this.$store.state.credit_scores
      },
      industries(){
        return this.$store.state.industries
      },
    },
    watch: {
      'contact.business_id': function (value) {
        if (value) {
          this.loadBusiness()
        } else {
          this.loading = false
        }
      },
      business_address (value) {
        if (!value.zipcode_id) {
          return {zipcode: {city: {state: {}}}}
        }
      }
    },
    methods: {
      detachBusiness () {
        this.loading = true
        api.Contacts().detachBusiness(this.contact.id, this.business.id).then(response => {
          api.SuccessResponse(response)
          this.business = {}
          this.loading = false
          // eliminar business
        }).catch(error => {
          api.ErrorResponse(error)
          this.loading = false
        })
      },
      tooltipLoad () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
      },
      create () {
      },
      changeImage (photo) {
        this.business.image.url = photo
      },
      selected (value) {
        console.log('attach business')
        api.Contacts().attachBusiness(this.contact.id, value.id).then(response => {
          api.SuccessResponse(response)
          this.business = response.data.data
          if (response.data.data.address) this.business_address = response.data.data.address
        })
      },
      openModals () {
        this.showModals = true
      },
      loadBusiness () {
        api.Business().getOne(this.contact.business_id || this.id).then(response => {
          this.business = response.data.data
          if (response.data.data.address) {
            this.business_address = response.data.data.address
            if (!this.business_address.zipcode) {
              this.business_address.zipcode = {city: {state: {}}}
            }
          }
          this.loading = false
          this.tooltipLoad()
        })
        this.$store.dispatch('getAllYearsInBusines')
        this.$store.dispatch('getAllAnnualRevenues')
        this.$store.dispatch('getAllCreditScores')
        this.$store.dispatch('getAllIndustries')

      },
      updateBusiness () {
        api.Business().update(this.business.id, this.business).then(response => {
          api.SuccessResponse(response)
        }).catch(error => {
          api.ErrorResponse(error)
        })
      },
      updateBusinessAddress () {
        if (this.business_address.id) {
          // updated
          api.Address().update(this.business_address.id, this.business_address).then(response => {
            api.SuccessResponse(response)
            this.business_address = response.data.data
          })
        } else {
          // created
          api.Address().create(this.business_address).then(response => {
            this.business_address = response.data.data
            this.business.address_id = this.business.id
            api.Business().attachAddress(this.contact.id, response.data.data.id)
            api.SuccessResponse(response)
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    section{
        position: relative;
    }

    .close{
        .btn{
            border-radius: 10px;
        }
    }

</style>
