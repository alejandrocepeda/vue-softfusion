<template>
  <div>
    <div class="row align-items-center px-3 my-4">
      <div class="col-auto">
        <h6 class="mb-0 text-primary">Underwritings</h6>
      </div>
      <div class="col">
        <button class="btn-success small text-white float-right d-flex align-items-center rounded-0 py-2 px-3" data-toggle="modal" data-target=".modal-add-underwriting">
          <span class="ti-plus mr-1"></span>Add new underwriting
        </button>
        <form class="d-none d-sm-block float-md-right mr-4 ml-lg-auto">
          <div class="input-group my-2 my-md-0">
            <input type="text" placeholder="Search..." class="form-control search">
            <div class="input-group-prepend ">
                                        <span class="input-group-text rounded-right search-icon">
                                            <span class="ti-search mr-0 "></span>
                                        </span>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!--Note: Banks associated with deal  -->
    <div v-for="(group,key) in group_banks" class="row px-3 mb-0 mt-4">
      <div class="col-12 small pb-3 px-2 border-bottom border-bottom-table-secondary  border-primary">
        <a href="javascript:;" :data-target="'#deal-bank-'+key" data-toggle="collapse" class="card-link link-collapse collapsed text-default">
          <h6 class="mt-3 mb-0">
            {{group.name}} <span class="small">
                                        <button class="btn-outline-primary ml-2 px-2 py-1 rounded-0 small">
                                            <span class="font-weight-heavy">
                                                View details &nbsp;<span class="ti-angle-right mr-1 arrow-collapse mt-1"></span>
                                            </span>
                                        </button>
                                    </span>
          </h6>
        </a>
      </div>
      <!--Note: List of underwritings or tables -->
      <div class=" col-12 px-0">
        <table class="mb-0 border-primary border-bottom border-bottom-table-secondary table table-striped d-table small text-default">
          <thead>
          <tr class="table-header bg-body">
            <th scope="col" class="border-0">
              Last 4 digits
            </th>
            <th scope="col" class="border-0">
              Month
            </th>
            <th scope="col" class="border-0">
              Total deposits
            </th>
            <th scope="col" class="border-0">
              # of deposits
            </th>
            <th scope="col" class="border-0">
              Ending balance
            </th>
            <th scope="col" class="border-0">
              Avg daily balance
            </th>
            <th scope="col" class="border-0">
              NSFs
            </th>
            <th scope="col" class="border-0">
              Negative days
            </th>
            <th scope="col" class="border-0">Actions</th>
          </tr>
          </thead>
          <tbody class="collapse" :id="'deal-bank-'+key">
          <tr v-for="item in group.banks">
            <td>{{item.last_four_digits}}</td>
            <td>{{item.month|month_year}}</td>
            <td>{{item.total_deposits |money}}</td>
            <td>{{item.number_deposits}}</td>
            <td>{{item.ending_balance|money}}</td>
            <td>{{item.avg_daily_balance|money}}</td>
            <td>{{item.nsfs}}</td>
            <td>{{item.negative_days}}</td>
            <td>
                            <span @click="updateUnderwriting(item)" class="mr-2">
                                <i class="ti-pencil-alt mr-1 text-default view bg-transparent mr-0"></i>
                            </span> <span @click="deleteUnderwriting(item)" class="mr-3 delete-checked-row">
                                <i class="delete ti-trash mr-1 text-default bg-transparent mr-0"></i>
                            </span>
            </td>
          </tr>
          </tbody>
          <tfoot class="border-top-table-secondary">
          <tr class="font-result-size font-weight-normal text-primary">
            <td>Average</td>
            <td></td>
            <td>{{group.total_deposits | money}}</td>
            <td>{{group.number_deposits}}</td>
            <td>{{group.ending_balance| money}}</td>
            <td>{{group.avg_daily_balance| money}}</td>
            <td>{{group.nsfs}}</td>
            <td>{{group.negative_days}}</td>
            <td></td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!--all banks acount-->
    <div class="row px-3 mb-0 mt-4">
      <div class="col-12 px-2 small pb-3 border-bottom  border-bottom-table-secondary">
        <a href="javascript:;" class="card-link link-collapse collapsed text-default">
          <h6 class="mt-3 mb-0">
            All bank accounts
          </h6>
        </a>
      </div>
      <!--Note: List of underwritings or tables -->
      <div class=" col-12 px-0">
        <!--Note: table with total resume -->
        <table class="mb-0 border-primary border-bottom border-bottom-table-secondary table d-table small text-default">
          <thead>
          <tr class="bg-body">
            <th scope="col" class="border-0">
            </th>
            <th scope="col" class="border-0">
            </th>
            <th scope="col" class="border-0">
              Total deposits
            </th>
            <th scope="col" class="border-0">
              # of deposits
            </th>
            <th scope="col" class="border-0">
              Ending balance
            </th>
            <th scope="col" class="border-0">
              Avg daily balance
            </th>
            <th scope="col" class="border-0">
              NSFs
            </th>
            <th scope="col" class="border-0">
              Negative days
            </th>
            <th scope="col" class="border-0">
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="alert alert-primary font-result-size font-weight-normal text-primary">
            <td class="font-weight-normal">Average</td>
            <td></td>
            <td>{{totales.total_deposits | money}}</td>
            <td>{{totales.number_deposits}}</td>
            <td>{{totales.ending_balance| money}}</td>
            <td>{{totales.avg_daily_balance| money}}</td>
            <td>{{totales.nsfs}}</td>
            <td>{{totales.negative_days}}</td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--Note: Tables of advances and ranges-->
    <div id="advances-table" class="row px-3 mb-3 mt-5">
      <div class="col-8 pl-0">
        <div class=" pb-3 px-2 border-bottom border-bottom-table-secondary">
          <div class="card-link link-collapse collapsed text-default d-flex justify-content-between ">
            <h6 class="mt-3 mb-0">
              Client Advances
              <small>(Complete if client currently has an advance.)</small>
            </h6>
            <button class="btn-success small text-white float-right d-flex align-items-center rounded-0 py-2 px-3" data-toggle="modal" data-target=".modal-add-new-balance">
              <span class="ti-plus mr-1"></span>Add new client advance
            </button>
          </div>
        </div>
        <!--Note: List of underwritings or tables -->
        <div class="collapse show" id="deal-client-advance">
          <table class="mb-0 border-primary border-bottom border-bottom-table-secondary table table-striped d-table small text-default">
            <thead>
            <tr class="bg-body table-header">
              <th scope="col" class="border-0">
                Funding company
              </th>
              <th scope="col" class="border-0">
                Payment
              </th>
              <th scope="col" class="border-0">
                Frequency
              </th>
              <th scope="col" class="border-0">
                Funding date
              </th>
              <th scope="col" class="border-0">
                Amount
              </th>
              <th scope="col" class="border-0"></th>
            </tr>
            </thead>
            <tbody id="underwritings-table-body">
            <tr v-for="item in list_advanceds">
              <td>{{item.lender.name}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.periodicity.name}}</td>
              <td>{{item.funded_at}}</td>
              <td>{{item.payment}}</td>
              <td>
                <a href="javascript:;" @click="updateAdvanced(item)" class="mr-2">
                  <span class="ti-pencil-alt mr-1 text-default view bg-transparent mr-0"></span> </a>
                <a @click="deleteAdvanced(item)" href="javascript:;" class="mr-3 delete-checked-row">
                  <span class="delete ti-trash mr-1 text-default bg-transparent mr-0"></span> </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col pr-0">
        <div class="small pb-5 px-2 border-bottom border-bottom-table-secondary">

        </div>
        <!--Note: List of underwritings or tables -->
        <div>
          <table class="table-striped mb-0 border-primary border-bottom border-bottom-table-secondary table d-table small text-default">
            <thead>
            <tr class="bg-body">
              <th scope="col" class="border-0">
                Approval Range
              </th>
              <th scope="col" class="border-0">
                Estimated Amount
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Maximum</td>
              <td>{{totales.total_deposits * 1.2 | money}}</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>{{totales.total_deposits * 0.7 | money}}</td>
            </tr>
            <tr>
              <td>Minimum</td>
              <td>{{totales.total_deposits * 0.3 | money}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--modals-->
    <!--Modal Underwritings -->
    <div class="modal opacity-modal fade modal-add-underwriting">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-0">
          <div class="px-5 modal-header bg-primary rounded-0 text-white">
            <h5 class="modal-title font-weight-normal">Underwriting</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true" class="text-white font-weight-light">×</span>
            </button>
          </div>
          <div class="modal-body px-5 mt-2">
            <form class="create-form  information info-collapse">
              <div class="row">
                <div class="col-md mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Month and year</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <datepicker :bootstrap-styling="true" v-model="formAddUnderwriting.month" minimum-view="month" maximum-view="year" placeholder="Choose a Month" type="date" name="birthdate" class="px-0 text-default border-0 text-capitalize" :full-month-name="true" format="MMMM yyyy" input-class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent"></datepicker>
                  </div>
                </div>
                <div class="col-md mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Total deposits</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <v-money placeholder="Total Deposits" prefix="$" :money.sync="formAddUnderwriting.total_deposits" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0"></v-money>
                  </div>
                </div>
                <div class="col-md mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Number of deposits</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <input v-model="formAddUnderwriting.number_deposits" type="number" placeholder="Number of Deposits" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Ending Balance</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <v-money placeholder="Ending Balance" prefix="$" :money.sync="formAddUnderwriting.ending_balance" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0"></v-money>
                  </div>
                </div>
                <div class="col-md mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Average Daily Balance</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <v-money placeholder="Average Daily Balance" prefix="$" :money.sync="formAddUnderwriting.avg_daily_balance"
                             class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0"></v-money>
                  </div>
                </div>
                <div class="col-md mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">NSFs</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <input type="number" v-model="formAddUnderwriting.nsfs" placeholder="NSFs" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Negative Days</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <input type="number" v-model="formAddUnderwriting.negative_days" placeholder="Negative Days" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                  </div>
                </div>
                <div class="col-md mb-4">
                  <div class="py-1 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Choose a Bank</label>
                    <v-select class="info-select" :value.sync="formAddUnderwriting.bank_id" :options="list_banks"></v-select>
                  </div>
                </div>
                <div class="col-md mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Last 4 digits</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <input maxlength="4" v-model="formAddUnderwriting.last_four_digits" placeholder="Last 4 digits" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="px-5 col-12 clearfix pt-3 border-top modal-footer justify-content-start">
            <button @click="saveUnderwriting" class="rounded-0 px-3 py-2 small btn btn-primary btn-sm mr-3">
              Save register
            </button>
            <button class="rounded-0 px-3 py-2 btn small btn-outline-primary btn-sm discard" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End Modal-->
    <!--Modal new advance -->
    <div class="modal fade modal-add-new-balance opacity-modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-0">
          <div class="px-5 modal-header rounded-0 bg-primary text-white">
            <h5 class="modal-title font-weight-normal">Add New Client Advance</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span class="text-white font-weight-light" aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body mt-2 px-5">
            <form class="create-form  information">
              <div class="row">
                <div class="col mb-4">
                  <div class="pt-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Funding company</label>
                    <v-select class="info-select" :value.sync="formClientAdvanced.lender_id" :options="lenders"></v-select>
                  </div>
                </div>
              </div>
              <div class="row d-flex align-items-center">
                <div class="col mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Payment</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <v-money placeholder="Payment" prefix="$" :money.sync="formClientAdvanced.payment"
                             class="small border-0 form-control rounded-0"></v-money>
                  </div>
                </div>
                <div class="col mb-4">
                  <div class="pt-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Frecuency</label>
                    <v-select class="info-select" :value.sync="formClientAdvanced.periodicity_id" :options="periodicities"></v-select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Funding Date</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <datepicker :bootstrap-styling="true" v-model="formClientAdvanced.funded_at" placeholder="Choose a Date" type="date" class="px-0 text-default border-0 text-capitalize" format="MM-dd-yyyy"
                                input-class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0 bg-transparent"></datepicker>
                  </div>
                </div>
                <div class="col mb-4">
                  <div class="py-2 border-bottom field">
                    <label for="" class="font-weight-normal mb-0 small text-primary">Amount</label>
                    <span class="small ti-pencil position-absolute"></span>
                    <v-money placeholder="Amount" prefix="$" :money.sync="formClientAdvanced.amount"
                             class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0"></v-money>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="px-5 col-12 clearfix pt-3 border-top modal-footer justify-content-start">
            <button @click="saveAdvanced" class="small px-3 py-2 rounded-0 btn btn-primary btn-sm mr-3  save-note">
              Save register
            </button>
            <button class="small px-3 py-2 rounded-0 btn btn-outline-primary btn-sm discard" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End Modal-->
    <!--end modals-->
  </div>
</template>

<script>
import api from './../../../config/api'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import sumBy from 'lodash/sumBy'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'

export default {
  name: 'underwritings',
  props: {
    application_id: {
      require: true,
      type: [Number, String]
    },
    list: Array,
    advanceds: Array
  },
  data () {
    return {
      list_banks: [],
      list_underwritings: this.list,
      list_advanceds: this.advanceds,
      formAddUnderwriting: {
        id: null,
        bank_id: '',
        last_four_digits: '',
        total_deposits: 0,
        number_deposits: '',
        month: '',
        ending_balance: 0,
        avg_daily_balance: 0,
        nsfs: '',
        negative_days: '',
        application_id: this.application_id
      },
      totales: {
        total_deposits: 0,
        ending_balance: 0,
        number_deposits: 0,
        avg_daily_balance: 0,
        nsfs: 0,
        negative_days: 0
      },
      formClientAdvanced: {
        id: null,
        lender_id: '',
        periodicity_id: '',
        application_id: this.application_id,
        payment: '',
        amount: '',
        funded_at: ''
      }
    }
  },
  mounted () {
    api.Banks().getAll().then(response => { this.list_banks = response.data.data })
    if (isEmpty(this.$store.state.periodicities)) {
      this.$store.dispatch('getAllPeriodicities')
    }
  },
  computed: {
    group_banks () {
      let group = map(groupBy(this.list_underwritings, 'bank_id'), group => {
        let temp = {}
        temp.banks = group
        temp.name = group[0].bank.name
        temp.total_deposits = sumBy(group, 'total_deposits')
        temp.ending_balance = sumBy(group, 'ending_balance')
        temp.number_deposits = sumBy(group, 'number_deposits')
        temp.avg_daily_balance = sumBy(group, 'avg_daily_balance')
        temp.nsfs = sumBy(group, 'nsfs')
        temp.negative_days = sumBy(group, 'negative_days')
        return temp
      })
      this.totales.total_deposits = sumBy(group, 'total_deposits')
      this.totales.ending_balance = sumBy(group, 'ending_balance')
      this.totales.number_deposits = sumBy(group, 'number_deposits')
      this.totales.avg_daily_balance = sumBy(group, 'avg_daily_balance')
      this.totales.nsfs = sumBy(group, 'nsfs')
      this.totales.negative_days = sumBy(group, 'negative_days')
      return group
    },
    lenders () {
      return this.$store.getters.lenders
    },
    periodicities () {
      return this.$store.state.periodicities
    }
  },
  filters: {
    month_year: function (value) {
      return moment(value).format('MMMM, YYYY')
    }
  },
  methods: {
    updateUnderwriting (item) {
      this.formAddUnderwriting = item
      $('.modal-add-underwriting').modal('show')
    },
    updateAdvanced (item) {
      this.formClientAdvanced = item
      $('.modal-add-new-balance').modal('show')
    },
    saveUnderwriting () {
      this.formAddUnderwriting.month = moment.utc(this.formAddUnderwriting.month).format('YYYY-MM-DD HH:mm:ss')
      if (this.formAddUnderwriting.id) {
        api.Underwritings().update(this.formAddUnderwriting.id, this.formAddUnderwriting).then(response => {
          this.list_underwritings = this.list_underwritings.filter(item => item.id !== this.formAddUnderwriting.id)
          api.SuccessResponse(response)
          this.list_underwritings.push(response.data.data)
          $('.modal-add-underwriting').modal('hide')
        }).catch(error => api.ErrorResponse(error))
      } else {
        api.Underwritings().create(this.formAddUnderwriting).then(response => {
          api.SuccessResponse(response)
          this.list_underwritings.push(response.data.data)
          $('.modal-add-underwriting').modal('hide')
        }).catch(error => api.ErrorResponse(error))
      }
    },
    deleteUnderwriting (item) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
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
          api.Underwritings().delete(item.id).then(() => {
            this.list_underwritings = this.list_underwritings.filter(under => under.id !== item.id)
            this.$swal({
              title: 'Deleted!',
              text: 'Your Underwriting has been deleted.',
              type: 'success',
              customClass: 'bg-body rounded-0',
              confirmButtonClass: 'btn btn-primary rounded-0 font-weight-light bg-primary'
            })
          }).catch(error => api.ErrorResponse(error))
        }
      })
    },
    saveAdvanced () {
      this.formClientAdvanced.funded_at = moment.utc(this.formClientAdvanced.funded_at).format('YYYY-MM-DD HH:mm:ss')
      if (this.formClientAdvanced.id) {
        // update
        api.ClientAdvanceds().update(this.formClientAdvanced.id, this.formClientAdvanced).then(response => {
          this.list_advanceds = this.list_advanceds.filter(item => item.id !== this.formClientAdvanced.id)
          api.SuccessResponse(response)
          this.list_advanceds.push(response.data.data)
          $('.modal-add-new-balance').modal('hide')
        }).catch(error => api.ErrorResponse(error))
      } else {
        // create
        api.ClientAdvanceds().create(this.formClientAdvanced).then(response => {
          api.SuccessResponse(response)
          this.list_advanceds.push(response.data.data)
          $('.modal-add-new-balance').modal('hide')
        }).catch(error => api.ErrorResponse(error))
      }
    },
    deleteAdvanced (item) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
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
          api.ClientAdvanceds().delete(item.id).then(() => {
            this.list_advanceds = this.list_advanceds.filter(under => under.id !== item.id)
            this.$swal({
              title: 'Deleted!',
              text: 'Your Client Advanced has been deleted.',
              type: 'success',
              customClass: 'bg-body rounded-0',
              confirmButtonClass: 'btn btn-primary rounded-0 font-weight-light bg-primary'
            })
          }).catch(error => api.ErrorResponse(error))
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .information{
    width: 100% !important;
    label{
      padding-left: .75rem;
    }
    .ion-edit{
      top: 50%;
    }
    input{
      color:       #495057;
      font-weight: 400 !important;
    }
  }
  .info-collapse{
    .ti-pencil{
      top: 2.5rem;
    }
  }
</style>
