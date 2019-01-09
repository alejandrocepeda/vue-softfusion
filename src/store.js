import Vue from 'vue'
import Vuex from 'vuex'
import api from './config/api'
import sortBy from 'lodash/sortBy'
import {logout} from './config/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {// =data
    blur: false,
    me: {},
    users: [],
    contact: {},
    contacts: [],
    activity_statuses: [],
    activity_call_statuses: [],
    loanPurposes: [],
    products: [],
    periodicities: [],
    roles: [],
    years_business: [],
    annual_revenues: [],
    credit_scores: [],
    industries: []
  },
  getters: {// =computed
    brokers: state => {
      return sortBy(state.users.filter(user => user.role.id === 5), 'name')
    },
    processors: state => {
      return sortBy(state.users.filter(user => user.role.id === 3), 'name')
    },
    lenders: state => {
      return sortBy(state.users.filter(user => user.role.id === 7), 'name')
    }
  },
  actions: {// =methods
    getMe ({state, commit}) {
      api.Users().getOne('me').then(response => commit('set_me', response.data.data)).catch(error => {
        if (error.response.status === 401) {
          logout()
          this.$router.push({name: 'login'})
        }
      })
    },
    getAllUsers ({state, commit}) {
      api.Users().getAll().then(response => commit('set_all_user', response.data.data))
    },
    getAllPeriodicities ({state, commit}) {
      api.Periodicities().getAll().then(response => commit('set_all_periodicities', response.data.data))
    },
    getAllActivityStatuses ({state, commit}) {
      api.ActivityStatuses().getAll().then(response => commit('set_all_activity_statuses', response.data.data))
    },
    getContact ({state, commit}, id) {
      api.Contacts().getOne(id).then(response => commit('set_contact', response.data.data))
    },
    getAllContacts ({state, commit}) {
      api.Contacts().getAll().then(response => commit('set_all_contacts', response.data.data))
    },
    getAllActivityCallStatuses ({state, commit}) {
      api.ActivityCallStatuses().getAll().then(response => commit('set_all_activity_call_statuses', response.data.data))
    },
    getLoanPurposes ({state, commit}) {
      api.LoanPurposes().getAll().then(response => commit('set_all_loan_purposes', response.data.data))
    },
    getProducts ({state, commit}) {
      api.Products().getAll().then(response => commit('set_all_products', response.data.data))
    },
    getRoles ({state, commit}) {
      api.Roles().getAll().then(response => commit('set_all_roles', response.data.data))
    },
    getAllYearsInBusines ({state, commit}) {
      api.YearsInBusines().getAll().then(response => commit('set_all_years_business', response.data.data))
    },
    getAllAnnualRevenues ({state, commit}) {
      api.AnnualRevenues().getAll().then(response => commit('set_all_annual_revenues', response.data.data))
    },
    getAllCreditScores ({state, commit}) {
      api.CreditScores().getAll().then(response => commit('set_all_credit_scores', response.data.data))
    },
    getAllIndustries ({state, commit}) {
      api.Industries().getAll().then(response => commit('set_all_industries', response.data.data))
    }

  },
  mutations: {
    set_me (state, data) {
      state.me = data
    },
    set_blur (state, data) {
      state.blur = data
    },
    set_contact (state, data) {
      state.contact = data
    },
    set_all_contacts (state, data) {
      state.contacts = sortBy(data, 'name')
    },
    set_all_periodicities (state, data) {
      state.periodicities = sortBy(data, 'value')
    },
    set_all_user (state, data) {
      state.users = sortBy(data, 'name')
    },
    set_all_activity_statuses (state, data) {
      state.activity_statuses = sortBy(data, 'name')
    },
    set_all_activity_call_statuses (state, data) {
      state.activity_call_statuses = sortBy(data, 'name')
    },
    set_all_loan_purposes (state, data) {
      state.loanPurposes = sortBy(data, 'name')
    },
    set_all_products (state, data) {
      state.products = sortBy(data, 'name')
    },
    set_all_roles (state, data) {
      state.roles = sortBy(data, 'name')
    },
    set_all_years_business (state, data) {
      state.years_business = sortBy(data, 'name')
    },
    set_all_annual_revenues (state, data) {
      state.annual_revenues = sortBy(data, 'name')
    },
    set_all_credit_scores (state, data) {
      state.credit_scores = sortBy(data, 'name')
    },
    set_all_industries (state, data) {
      state.industries = sortBy(data, 'name')
    }
  }
})
