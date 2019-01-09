<template>
    <modals title="Broker Preview" :showCreate="true" :showModals.sync="showModals">
        <template slot="bodyCreate">

            <div class="information information-preview">
                <!--Box lead info-->
                <broker  :id="broker.id" :showCollapse="true" :showCollapseSmall="false"></broker>
                <!--End Box lead info-->

                <!--Business info same thing as lead editable and stuff-->
                <business :contact="contact" :showCollapseSmall="true"></business>
            </div>

        </template>

        <template slot="buttonCreate">
            <router-link :to="{ name: route_uri+'-id', params: { id: broker.id }}">
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
import brokerComponent from './_broker'
import business from './../business/_business'
import first from 'lodash/first'
import words from 'lodash/words'

export default {
  name: 'modalPreviewBrokers',
  components: {
    Modals,
    api,
    'broker': brokerComponent,
    business
  },
  props: ['broker'],
  data () {
    return {
      showModals: true,
      uri: 'brokers',
      activities: [],
      application: {},
      brokers: [],
      loanPurposes: [],
      lead: {},
      user: {},
      contact: {},
      processor: {},
      processors: [],
      products: [],
      isCollapse: true

    }
  },
  watch: {
    showModals (value) {
      if (!value) this.$emit('update:showModals', value)
    },
    'broker.contact_address': function (value) {
      if (!value.zipcode_id) {
        return {zipcode: {city: {state: {}}}}
      }
    }
  },
  computed: {
    route_uri () {
      return first(words(this.uri))
    }
  },
  methods: {

    setUri () {
      this.$emit('paginate', this.uri + '&page=' + this.Page + '&per_page=' + this.ShowEntries)
    },
    getBroker () {
      api.Users().getOne(this.broker.id).then(response => {
        this.loading_broker = false
        this.broker.user = response.data.data
        this.contact = response.data.data.contact
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
  },
  created () {
    this.getBroker()
  },
  mounted () {
    api.BrokerStatuses().getAll().then(response => this.brokerStatuses = response.data.data)
    api.Applications().getActivities(this.broker.id).then(response => this.activities = response.data.data).then(() => {
      this.loading_activities = false
    })
    api.Processors().getAll().then(response => this.processors = response.data.data)
    api.Brokers().getAll().then(response => this.brokers = response.data.data)
    api.LoanPurposes().getAll().then(response => this.loanPurposes = response.data.data)
    api.Products().getAll().then(response => this.products = response.data.data)
  }

}
</script>

<style scoped>

</style>

<style lang="css">
    .modal-create .ion{
        width:auto!important;
    }
    .information-preview{
        width:auto!important;
        margin-top:50px;
        padding-bottom:150px;
    }

    .preview-icon{
        font-size: 30px;
        color: #6063c1!important;
        vertical-align: middle;
    }
    .preview-buttons-container{
        align-items: center;
    }

</style>
