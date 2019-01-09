import './../bootstrap'
import {setAxiosHeader} from './auth'
import AWN from 'awesome-notifications'
import each from 'lodash/each'

let notifier = new AWN({position: 'top-right'})

setAxiosHeader()

function Activity (url = 'activities') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(`${url}`),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function ActivityCallStatuses (url = 'activities-call-statuses') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function ActivityStatuses (url = 'activities-statuses') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Address (url = 'addresses') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function AnnualRevenues (url = 'annual-revenues') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Any (url) {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getQuery: () => axios.get(url),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Applications (url = 'applications') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`),
    getActivities: (id) => axios.get(`${url}/${id}/activities?pagination=false`),
    attachActivity: (id, activityId) => axios.put(`${url}/${id}/activities/${activityId}`),
    addDocument: (id, toUpdate) => axios.post(`${url}/${id}/documents`, toUpdate),
    deleteDocument: (id, documentId) => axios.delete(`${url}/${id}/documents/${documentId}`)
  }
}

function ApplicationStatuses (url = 'application-statuses') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Banks (url = 'banks') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Brokers (url = 'brokers') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function BrokerStatuses (url = 'broker-statuses') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false&relationships=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Business (url = 'businesses') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.patch(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`),
    attachAddress: (id, AddressId) => axios.patch(`${url}/${id}/addresses/${AddressId}`),
    attachContact: (id, ContactId) => axios.patch(`${url}/${id}/contacts/${ContactId}`),
    checkTaxId: (toCheck) => axios.post(`${url}/check-tax-id`, toCheck),
    getActivities: (id) => axios.get(`${url}/${id}/activities?pagination=false`),
    attachActivity: (id, activityId) => axios.put(`${url}/${id}/activities/${activityId}`)
  }
}

function CheckUpdate (value, old) {
  if (typeof old !== 'undefined' && old != value) return true
  return false
}

function Cities (url = 'cities') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function ClientAdvanceds (url = 'client-advanceds') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Contacts (url = 'contacts') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`),
    search: (search) => axios.get(`${url}?search=${search}`),
    attachAddress: (id, addressId) => axios.patch(`${url}/${id}/addresses/${addressId}`),
    checkEmail: (toCheck) => axios.post(`${url}/check-email`, toCheck),
    getActivities: (id) => axios.get(`${url}/${id}/activities?pagination=false`),
    attachActivity: (id, activityId) => axios.put(`${url}/${id}/activities/${activityId}`),
    attachBusiness: (id, businessId) => axios.put(`${url}/${id}/businesses/${businessId}`),
    detachBusiness: (id, businessId) => axios.delete(`${url}/${id}/businesses/${businessId}`)

  }
}

function CreditScores (url = 'credit-scores') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Emails (url = 'emails') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Images (url = 'images') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Industries (url = 'industries') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Leads (url = 'leads') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(`${url}`),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`),

    getActivities: (id) => axios.get(`${url}/${id}/activities?pagination=false`),
    attachActivity: (id, activityId) => axios.put(`${url}/${id}/activities/${activityId}`),
    getApplications: (id) => axios.get(`${url}/${id}/applications?pagination=false`)

  }
}

function LeadStatuses (url = 'lead-statuses') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Lenders (url = 'lenders') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false&relationships=false`),
    getPaginate: () => axios.get(`${url}`),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`),
    checkEmail: (toCheck) => axios.post(`${url}/check-email`, toCheck),
    getActivities: (id) => axios.get(`${url}/${id}/activities?pagination=false&relationships=false`),
    attachActivity: (id, activityId) => axios.put(`${url}/${id}/activities/${activityId}`),
    getApplications: (id) => axios.get(`${url}/${id}/applications?pagination=false&relationships=false`),
    getIndustries: (id) => axios.get(`${url}/${id}/industries?pagination=false`),
    getStates: (id) => axios.get(`${url}/${id}/states?pagination=false`),
    getProducts: (id) => axios.get(`${url}/${id}/products?pagination=false`),
    updateIndustry: (id, industryId) => axios.put(`${url}/${id}/industries/${industryId}`),
    deleteIndustry: (id, industryId) => axios.delete(`${url}/${id}/industries/${industryId}`),
    updateState: (id, stateId) => axios.put(`${url}/${id}/states/${stateId}`),
    deleteState: (id, stateId) => axios.delete(`${url}/${id}/states/${stateId}`),
    updateProducts: (id, productId) => axios.put(`${url}/${id}/products/${productId}`),
    deleteProducts: (id, productId) => axios.delete(`${url}/${id}/products/${productId}`)
  }
}

function LoanPurposes (url = 'loan-purposes') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Notes (url = 'activities?activity_typeId=1') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Periodicities (url = 'periodicities') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Processors (url) {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get('roles/3/users?pagination=false'),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Products (url = 'products') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Roles (url = 'roles') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function States (url = 'states') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false&relationships=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Underwritings (url = 'underwritings') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Users (url = 'users') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`),
    updateRole: (id, roleId) => axios.put(`${url}/${id}/roles/${roleId}`)
  }
}

function YearsInBusines (url = 'years-in-business') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function Zipcodes (url = 'zipcodes') {
  return {
    getOne: (id) => axios.get(`${url}/${id}`),
    getAll: () => axios.get(`${url}?pagination=false`),
    getPaginate: () => axios.get(url),
    update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
    create: (toCreate) => axios.post(url, toCreate),
    delete: (id) => axios.delete(`${url}/${id}`)
  }
}

function SuccessResponse (response) {
  notifier.success(response.data.message)
}

function ErrorResponse (error) {
  console.log('notifier error')
  if (typeof error !== 'object' || error === null) return
  if (typeof error.response.data.error === 'string') {
    notifier.alert(error.response.data.error)
  } else if (error.response.data.message) {
    notifier.alert(error.response.data.message)
  } else {
    each(error.response.data.error, (item, index) => {
      notifier.alert(index + ': ' + item[0])
    })
  }
}

export default {
  Activity,
  ActivityCallStatuses,
  ActivityStatuses,
  Address,
  AnnualRevenues,
  Any,
  Applications,
  ApplicationStatuses,
  Banks,
  Brokers,
  Business,
  BrokerStatuses,
  CheckUpdate,
  Cities,
  ClientAdvanceds,
  CreditScores,
  Contacts,
  Emails,
  ErrorResponse,
  Images,
  Industries,
  LeadStatuses,
  Leads,
  Lenders,
  LoanPurposes,
  Notes,
  Periodicities,
  Processors,
  Products,
  Roles,
  SuccessResponse,
  States,
  Underwritings,
  Users,
  YearsInBusines,
  Zipcodes
}
