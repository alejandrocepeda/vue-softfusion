<template>
    <section>
        <div class="col-12 bg-white border mb-4 border-bottom-3 ">
            <div class=" row mx-0">
                <div class="col-12 small border-bottom pb-3">
                    <a href="javascript:;" data-toggle="collapse" data-target=".lead-info" class="card-link link-collapse collapsed">
                        <h6 class="mt-3 mb-0">
                            <span class="ti-briefcase mr-1"></span>Broker ID: U-{{broker.user.id}}
                            <span class="ti-angle-right text-default float-right arrow-collapse mt-1"></span>
                        </h6>
                    </a>
                </div>

                <!--Box lead info collapsed-->
                <div class="col collapse  lead-info" :class="{show: showCollapseSmall}">
                    <div class="row d-flex align-items-center">
                        <div class="mx-3">
                            <div class="text-center position-relative my-3">
                                <progressive-img :aspect-ratio="1" :src="broker.contact.photo" class="rounded-circle img-thumbnail info-img"/>
                                <div data-toggle="modal" :data-target="'#'+broker.user.id" class="change-image cursor-pointer full_rounded h-100 mw-100 opacity-modal-primary p-4 progressive-image-main top z-index-1">
                                    <p class="mb-0 small text-white">Change Image</p>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="col-12 small px-0">
                                <h6 class="mb-2 text-primary  field">
                                    <span class="small ti-pencil position-absolute collapse-edit"></span>
                                    <input @change="updateUsers" readonly placeholder="Contact name" class="text-primary border-0 w-100 text-capitalize" v-model="broker.user.name">
                                </h6>
                            </div>
                            <div class="col-12 small px-0">
                                <p class="mb-2 field">
                                    <span class="small ti-pencil position-absolute collapse-edit"></span>
                                    <the-mask :mask="'(###)-###-####'" type="tel" placeholder="Phone Number" class="text-default border-0 w-100" @change="updateContact" v-model="broker.contact.phone"/>
                                </p>
                            </div>
                            <div class="col-12 small px-0">
                                <p class="field mb-2">
                                    <span class="small ti-pencil position-absolute collapse-edit"></span>
                                    <input readonly @change="updateUsers" placeholder="Email" class="text-default border-0 w-100" v-model="broker.user.email">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--End lead info collapsed-->

                <!--Box lead info not collapsed-->
                <div class="collapse col-12 lead-info info-collapse" :class="{show: showCollapse}">
                    <div class="text-center my-2 position-relative">
                        <img :src="broker.contact.photo" class="rounded-circle my-3 img-thumbnail info-img-lg">
                        <div data-toggle="modal" data-target=".modal-image-upload" class="change-image-collapse cursor-pointer full_rounded h-100 left mw-100 mx-auto opacity-modal-primary p-4 position-absolute right top z-index-1">
                            <p class="mb-0 small mt-3 text-white">Change Image</p>
                        </div>
                    </div>
                    <div class="row small px-3 position-relative">
                        <p-check @change="updateUsers" v-model="broker.user.status" class="p-switch p-fill text-primary mx-auto mb-3">
                            <span class="text-primary" v-if="broker.user.status ==true">Active</span>
                            <span class="text-switch" v-else>Inactive</span>
                        </p-check>
                    </div>
                    <div class="row small px-3 position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom">
                            <span class="ti-user mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">Name:</label>
                            <span class="small ti-pencil position-absolute"></span>
                            <input readonly @change="updateUsers" placeholder="Contact name" class="text-default border-0 text-capitalize" v-model="broker.user.name">
                        </p>
                    </div>
                    <div class="row px-3 small position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom ">
                            <span class="ti-email mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">Email:</label>
                            <span class="small ti-pencil position-absolute"></span>
                            <input @change="updateUsers" readonly placeholder="Email" class="text-default border-0" v-model="broker.user.email">
                        </p>
                    </div>
                    <div class="row px-3 small position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom">
                            <span class="ti-location-pin mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">Street Address:</label>
                            <span class="small ti-pencil position-absolute"></span>
                            <input readonly placeholder="Street Address" class="text-default border-0" @change="updateContactAddress" v-model="broker.contact_address.address">
                        </p>
                    </div>
                    <div class="row px-3 small position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom">
                            <span class="ti-map-alt mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">Zip Code:</label>
                            <span class="small ti-pencil position-absolute"></span>
                            <input type="text" readonly placeholder="Zip code" @change="updateContactAddress" class="text-default border-0" v-model="broker.contact_address.zipcode_id">
                        </p>
                    </div>
                    <div class="row px-3 small position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom ">
                            <span class="ti-direction mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">City:</label>
                            <input disabled placeholder="City" class="text-default border-0 text-capitalize" name="city" v-model="broker.contact_address.zipcode.city.name">
                        </p>
                    </div>
                    <div class="row px-3 small position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom">
                            <span class="ti-flag-alt mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">State:</label>
                            <input disabled placeholder="State" class="text-default border-0 text-capitalize" name="state" v-model="broker.contact_address.zipcode.city.state.name">
                        </p>
                    </div>
                    <div class="row px-3 small position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom">
                            <span class="ti-mobile mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">Phone Number:</label>
                            <span class="small ti-pencil position-absolute"></span>
                            <the-mask :mask="'(###)-###-####'" type="tel" readonly placeholder="Phone Number" @change="updateContact" class="text-default border-0" v-model="broker.contact.phone"/>
                        </p>
                    </div>
                    <div class="row px-3 small position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom">
                            <span class="ti-credit-card mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">Social Security:</label>
                            <span class="small ti-pencil position-absolute"></span>
                            <the-mask type="tel" readonly placeholder="Social Security" class="text-default border-0" @change="updateContact" v-model="broker.contact.social_security" :mask="'###-##-####'"/>
                        </p>
                    </div>
                    <div class="row px-3 mb-4 small position-relative">
                        <p class="field w-100 mb-0 py-2 border-bottom">
                            <span class="ti-calendar mr-1 text-primary"></span>
                            <label class="font-weight-normal mb-0 small text-primary">Date of Birth:</label>
                            <span class="small ti-pencil position-absolute"></span>
                            <datepicker placeholder="Date of Birth" :format="'M-d-yyyy'" @selected="updateContact" :input-class="'text-default border-0'" v-model="broker.contact.birthdate"></datepicker>
                        </p>
                    </div>
                </div>
                <!--End Box lead info not collapsed-->
            </div>
        </div>
        <!--Modal Picture -->
        <modal-image @changeImage="changeImage" :url="uri" :id="broker.contact.id" :image="broker.contact.photo" v-if="broker.contact.id"></modal-image>
        <!--End Modal-->
    </section>

</template>

<script>
import api from '../../../../config/api'
import loadingComponent from '../../../helpers/loading'
import modalImage from '../../../helpers/modals/modalimage'
import PrettyCheck from 'pretty-checkbox-vue/check'

export default {
  name: 'broker',
  components: {'loading': loadingComponent, modalImage, 'p-check': PrettyCheck},
  props: {
    id: [Number, String],
    broker: {
      type: Object,
      default: function () {
        return {user: {}, contact: {}, contact_address: {zipcode: {city: {state: {}}}}}
      }
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
      uri: 'brokers',
      loading_broker: true,
      showModals: false,
      isCollapse: false
    }
  },
  created () {
    if (this.id) {
      this.getBroker()
    }
  },
  mounted () {
    if (this.id) {
      this.getBroker()
    }
  },
  watch: {
    'broker.contact_address': function (value) {
      if (!value.zipcode_id) {
        return {zipcode: {city: {state: {}}}}
      }
    }
  },
  computed: {},
  methods: {
    getBroker () {
      api.Users().getOne(this.id).then(response => {
        this.loading_broker = false
        this.broker.user = response.data.data
        if (response.data.data.contact) {
          this.broker.contact = response.data.data.contact
          if (response.data.data.contact.address) {
            this.broker.contact_address = response.data.data.contact.address
            if (!this.broker.contact_address.zipcode) {
              this.broker.contact_address.zipcode = {city: {state: {}}}
            }
          }
        }
      }).catch(error => {
        if (error.response.status === 404) {
          this.$router.push({name: 'brokers'})
        } else {
          api.ErrorResponse(error)
          this.loading_broker = false
        }
      })
    },
    updateUsers () {
      api.Users().update(this.broker.user.id, this.broker.user).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    updateContactAddress () {
      if (this.broker.contact_address.id) {
        // updated
        api.Address().update(this.broker.contact_address.id, this.broker.contact_address).then(response => {
          api.SuccessResponse(response)
          this.broker.contact_address = response.data.data
        })
      } else {
        // created
        api.Address().create(this.broker.contact_address).then(response => {
          this.broker.contact_address = response.data.data
          this.broker.contact.address_id = this.broker.contact_address.id
          api.Contacts().attachAddress(this.broker.contact.id, response.data.data.id)
          api.SuccessResponse(response)
        })
      }
    },
    openModals () {
      this.showModals = true
    },
    updateContact () {
      api.Contacts().update(this.broker.contact.id, this.broker.contact).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    changeImage (photo) {
      this.broker.contact.photo = photo
    }
  }
}
</script>

<style scoped>

</style>
