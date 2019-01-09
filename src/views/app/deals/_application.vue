<template>
        <section>
            <div class="col-12 bg-white border mb-4 border-bottom-3">
                <div class="mb-4 row mx-0">
                    <div class="col-12 small border-bottom pb-3">
                        <a href="#application-collapse" data-toggle="collapse" class="card-link link-collapse collapsed" aria-expanded="false">
                            <h6 class="mt-3 mb-0">
                                <span class="ti-briefcase mr-2"></span>Application ID:
                                A-<span v-text="applicationData.id"></span>
                                <span class="ti-angle-right text-default float-right arrow-collapse mt-1"></span>
                            </h6>
                        </a>
                    </div>
                    <loading class="col" v-if="loading"></loading>
                    <div v-else class="col-12">
                        <div class="row px-3 small position-relative">
                            <p class="border-bottom field mb-0 py-2 w-100">
                                <span class="ti-briefcase mr-1 text-primary"></span>
                                <label class="font-weight-normal mb-0 small text-primary">Product Type:</label>
                                <v-select  @change="updateApplication" class="info-select" :value.sync="applicationData.product_id" :options="products"></v-select>
                            </p>
                        </div>
                        <div class="row px-3 small position-relative">
                            <p class="border-bottom field mb-0 py-2 w-100">
                                <span class="ti-money mr-1 text-primary"></span>
                                <label class="font-weight-normal mb-0 small text-primary">Loan Request:</label>
                                <span class="small ti-pencil position-absolute"></span>
                                <v-money prefix="$" @change="updateApplication" :money.sync="applicationData.loan_amount" class="text-default border-0"></v-money>
                            </p>
                        </div>

                        <div class="row px-3 small position-relative">
                            <p class="border-bottom field mb-0 py-2 w-100">
                                <span class="ti-user mr-1 text-primary"></span>
                                <label class="font-weight-normal mb-0 small text-primary">Processor:</label>
                                <v-select @change="updateApplication" class="info-select" :value.sync="applicationData.processor_id" :options="processors"></v-select>
                            </p>
                        </div>
                        <div class="collapse" id="application-collapse" :class="{show: showCollapse}">
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-pin-alt mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Loan purpose:</label>
                                    <v-select :add="true" @add="modalLoan=true" @change="updateApplication" class="info-select" :value.sync="applicationData.loan_purpose_id" :options="loanPurposes"></v-select>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-stats-down mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Bankrupcty:</label>
                                    <v-select @change="updateApplication" class="info-select" :value.sync="applicationData.bankruptcy"></v-select>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-pin-alt mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Collateral:</label>
                                    <v-select @change="updateApplication" class="info-select" :value.sync="applicationData.collateral" ></v-select>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-pin-alt mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Exist debt:</label>
                                    <span class="small ti-pencil position-absolute"></span>
                                    <v-money prefix="$" @change="updateApplication" :money.sync="applicationData.exist_debt" class="text-default border-0"></v-money>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="field w-100 mb-0 py-2 border-bottom">
                                    <span class="ti-id-badge mr-1 text-primary" data-pack="android" data-tags=""></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Broker:</label>
                                    <v-select class="info-select" :value.sync="lead.executive_id" @change="updateLead" :options="brokers"></v-select>
                                </p>
                            </div>
                            <div class="row px-3 small position-relative">
                                <p class="border-bottom field mb-0 py-2 w-100">
                                    <span class="ti-world mr-1 text-primary"></span>
                                    <label class="font-weight-normal mb-0 small text-primary">Website: </label>
                                    <span class="small ti-pencil position-absolute"></span>
                                    <input readonly placeholder="Web source" @change="updateLead" class="text-default border-0" v-model="lead.source">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <modal-center name="loan purpose" :valueId.sync="applicationData.loan_purpose_id" @update="$store.dispatch('getLoanPurposes')" uri="loan-purposes" :open.sync="modalLoan"></modal-center>
        </section>
</template>

<script>

import api from '../../../config/api'
import loading from './../../helpers/loading'
import isEmpty from 'lodash/isEmpty'
import modalCenter from '../../helpers/modals/modalcenter'

export default {
  components: {
    loading,modalCenter
  },
  name: 'application',
  props: {
    id: {
      type: [String, Number],
      default () {
        return null
      }
    },
    application: {
      type: Object,
      default: () => { return {} }
    },
    showCollapse: {
      type: Boolean
    },
    showCollapseSmall: {
      type: Boolean
    }
  },
  data () {
    return {
      applicationData: this.application,
      loading: true,
      lead: {},
      modalLoan:false
    }
  },
  watch: {
    'applicationData.loan_purpose_id':function (value) {
      console.log(value,'value')
    },
    applicationData (value) {
      if (value) {
        this.loading = false
      }
    },
    application (value) {
      this.applicationData = value
      this.lead = value.lead
    }
  },
  mounted () {
    if (this.id) {
      api.Applications().getOne(this.id).then(response => {
        this.applicationData = response.data.data
        this.lead = response.data.data.lead
        this.loading = false
      })
    }

    if (isEmpty(this.brokers)) this.$store.dispatch('getAllUsers')

    if (isEmpty(this.loanPurposes)) this.$store.dispatch('getLoanPurposes')

    if (isEmpty(this.products)) this.$store.dispatch('getProducts')
  },
  computed: {
    brokers () {
      return this.$store.getters.brokers
    },
    processors () {
      return this.$store.getters.processors
    },
    loanPurposes () {
      return this.$store.state.loanPurposes
    },
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    updateApplication () {
      api.Applications().update(this.applicationData.id, this.applicationData).then(response => {
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
    }
  }
}
</script>

<style scoped>

</style>
