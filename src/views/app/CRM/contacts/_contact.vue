<template>
  <section>
    <modal-create-contact @selected="selected" @closeModal="showModals=false" :show-search="true" v-if="showModals"></modal-create-contact>
    <div class="col-12 bg-white border mb-4 border-bottom-3">
      <div class="  row mx-0">
        <div class="col-12 small border-bottom pb-3">
          <a data-target=".lead-info" href="#" data-toggle="collapse" class="card-link collapsed link-collapse">
            <h6 class="mt-3 mb-0">
              <span class="ti-briefcase mr-2"></span>Contact <span v-if="contact">ID: C-{{contact.id}}</span>
              <span class="ti-angle-right text-default float-right arrow-collapse mt-1"></span>
            </h6>
          </a>
        </div>
        <loading class="col" v-if="loading"></loading>
        <template v-else>
          <div v-if="addContact" class="col-12 mb-4">
            <p class="mt-3 small text-center"><strong>{{parent.name}}</strong> is not associated with a contact.</p>
            <button @click="openModals" class="btn-primary rounded-0 py-2 px-3 small text-white mx-auto d-block">
              <span class="ti-file mr-1"></span> Add a Contact
            </button>
          </div>
          <template v-else>
            <!--Box lead info collapsed-->
            <div class="col collapse border-bottom  lead-info" :class="{show: showCollapseSmall}">
              <div class="row d-flex align-items-center">
                <div class="mx-3">
                  <div class="text-center position-relative my-3">
                    <progressive-img :aspect-ratio="1" :src="contact.photo" class="rounded-circle img-thumbnail info-img"/>
                    <div data-toggle="modal" :data-target="'#' + contact.id" class="change-image cursor-pointer full_rounded h-100 mw-100 opacity-modal-primary p-4 progressive-image-main top z-index-1">
                      <p class="mb-0 small text-white">Change Image</p>
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="col-12 small px-0">
                    <h6 class="mb-2 text-primary field">
                      <span class="small ti-pencil position-absolute collapse-edit"></span>
                      <input readonly placeholder="Contact name" class="text-primary border-0 w-100 text-capitalize" @change="updateContact" v-model="contact.name">
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
                      <input readonly placeholder="Email" class="text-default border-0 w-100" @change="updateContact" v-model="contact.email">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!--End lead info collapsed-->
            <!--Box lead info not collapsed-->
            <div class="collapse  col-12 lead-info info-collapse" :id="collapseId" :class="{show: showCollapse}">
              <div class="text-center my-2 position-relative">
                <img :src="contact.photo" class="rounded-circle my-3 img-thumbnail info-img-lg">
                <div data-toggle="modal" data-target=".modal-image-upload" class="change-image-collapse cursor-pointer full_rounded h-100 left mw-100 mx-auto opacity-modal-primary p-4 position-absolute right top z-index-1">
                  <p class="mb-0 small mt-3 text-white">Change Image</p>
                </div>
              </div>
              <div class="row small px-3 position-relative">
                <p-check @change="updateContact" v-model="contact.status" class="p-switch p-fill text-primary mx-auto mb-3">
                  <span class="text-primary" v-if="contact.status ==true">Active</span>
                  <span class="text-switch" v-else>Inactive</span>
                </p-check>
              </div>
              <div class="row small px-3 position-relative">
                <p class="field w-100 mb-0 py-2 border-bottom">
                  <span class="ti-user mr-1 text-primary"></span>
                  <label class="font-weight-normal mb-0 small text-primary">Name:</label>
                  <span class="small ti-pencil position-absolute"></span>
                  <input readonly placeholder="Contact name" class="text-default border-0 text-capitalize" @change="updateContact" v-model="contact.name">
                </p>
              </div>
              <div class="row px-3 small position-relative">
                <p class="field w-100 mb-0 py-2 border-bottom ">
                  <span class="ti-email mr-1 text-primary"></span>
                  <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                  <span class="small ti-pencil position-absolute"></span>
                  <input readonly placeholder="Email" class="text-default border-0" @change="updateContact" v-model="contact.email">
                </p>
              </div>
              <div class="row px-3 small position-relative">
                <p class="field w-100 mb-0 py-2 border-bottom">
                  <span class="ti-location-pin mr-1 text-primary"></span>
                  <label class="font-weight-normal mb-0 small text-primary">Street Address:</label>
                  <span class="small ti-pencil position-absolute"></span>
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
                  <span class="ti-mobile mr-1 text-primary"></span>
                  <label class="font-weight-normal mb-0 small text-primary">Phone Number:</label>
                  <span class="small ti-pencil position-absolute"></span>
                  <the-mask :mask="'(###) ###-####'" type="tel" readonly placeholder="Phone Number" @change="updateContact" class="text-default border-0" v-model="contact.phone"/>
                </p>
              </div>
              <div class="row px-3 small position-relative">
                <p class="field w-100 mb-0 py-2 border-bottom">
                  <span class="ti-credit-card mr-1 text-primary"></span>
                  <label class="font-weight-normal mb-0 small text-primary">Social Security:</label>
                  <span class="small ti-pencil position-absolute"></span>
                  <the-mask type="tel" readonly placeholder="Social Security" class="text-default border-0" @change="updateContact" v-model="contact.social_security" :mask="'###-##-####'"/>
                </p>
              </div>
              <div class="row px-3 small position-relative">
                <p class="border-bottom field mb-0 py-2 w-100">
                  <span class="ti-bookmark-alt mr-1 text-primary"></span>
                  <label class="font-weight-normal mb-0 small text-primary">Ownership: </label>
                  <span class="small ti-pencil position-absolute"></span>
                  <the-mask type="tel" readonly placeholder="Ownership (Percentage)" @change="updateContact" class="text-default border-0" v-model="contact.ownership" :mask="['#%','##%','###%']"/>
                </p>
              </div>
              <div class="row px-3 mb-4 small position-relative">
                <p class="field w-100 mb-0 py-2 border-bottom">
                  <span class="ti-calendar mr-1 text-primary"></span>
                  <label class="font-weight-normal mb-0 small text-primary">Date of Birth:</label>
                  <span class="small ti-pencil position-absolute"></span>
                  <datepicker placeholder="Date of Birth" :format="'M-d-yyyy'" @selected="updateContact" :input-class="'text-default border-0'" v-model="contact.birthdate"></datepicker>
                </p>
              </div>
            </div>
            <!--End Box lead info not collapsed-->
          </template>
        </template>
      </div>
    </div>
    <!--Modal Picture -->
    <modal-image @changeImage="changeImage" :url="uri" :id="contact.id" :image="contact.photo" v-if="contact.id"></modal-image>
    <!--End Modal-->
  </section>
</template>

<script>

import api from '../../../../config/api'
import PrettyCheck from 'pretty-checkbox-vue/check'
import loading from '../../../helpers/loading'
import modalCreateContact from './_modalCreateContact'
import modalImage from '../../../helpers/modals/modalimage'
import isEmpty from 'lodash/isEmpty'

export default {
  props: ['id', 'parent', 'showCollapse', 'showCollapseSmall'],
  components: {
    'p-check': PrettyCheck, loading, modalCreateContact, modalImage
  },
  name: 'contact',
  data () {
    return {
      uri: 'contacts',
      contact: {},
      contact_address: {zipcode: {city: {state: {}}}},
      loading: true,
      showModals: false
    }
  },
  created () {
    if (this.id) {
      this.getContact()
    }
  },
  watch: {
    id (value) {
      if (value) {
        this.getContact()
      } else {
        this.loading = false
      }
    },
    parent (value) {
      if (value) {
        this.loading = false
      }
    }
  },
  computed: {
    collapseId () {
      if (this.contact) {
        return 'contact-collapse-' + this.contact.id
      } else {
        return 'contact-collapse'
      }
    },
    addContact () {
      if (isEmpty(this.contact)) return true
      return false
    }
  },
  mounted () {
  },
  methods: {
    getContact () {
      api.Contacts().getOne(this.id).then(response => {
        this.contact = response.data.data
        this.loading = false
        if (response.data.data.address) {
          this.contact_address = response.data.data.address
          if (!this.contact_address.zipcode) {
            this.contact_address.zipcode = {city: {state: {}}}
          }
        }
      })
    },
    selected (value) {
      api.Business().attachContact(this.parent.id, value.id).then(response => api.SuccessResponse(response))
      this.business = value
      this.business_address = value.address
      this.$emit('selected', value)
    },
    updateContactAddress () {
      if (this.contact_address.id) {
        // updated
        api.Address().update(this.contact_address.id, this.contact_address).then(response => {
          api.SuccessResponse(response)
          this.contact_address = response.data.data
          if (!this.contact_address.zipcode) {
            this.contact_address.zipcode = {city: {state: {}}}
          }
        }).catch(error => api.ErrorResponse(error))
      } else {
        // created
        api.Address().create(this.contact_address).then(response => {
          api.SuccessResponse(response)
          this.contact_address = response.data.data
          if (!this.contact_address.zipcode) {
            this.contact_address.zipcode = {city: {state: {}}}
          }
          this.contact.address_id = this.contact_address.id
          api.Contacts().attachAddress(this.contact.id, response.data.data.id).then(response => api.SuccessResponse(response))
        })
      }
    },
    openModals () {
      this.showModals = true
    },
    updateContact () {
      api.Contacts().update(this.contact.id, this.contact).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    changeImage (photo) {
      this.contact.photo = photo
    }
  }
}
</script>

<style scoped>

</style>
