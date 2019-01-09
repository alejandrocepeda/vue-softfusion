<template>
    <modals title="Preview Lead" :showCreate="true" :showModals.sync="showModals">
        <template slot="bodyCreate">

            <div class="information information-preview">

                <contact :id="contact.id" :showCollapse="true"></contact>

                <business :contact="contact" :showCollapseSmall="true"></business>

            </div>

        </template>

        <template slot="buttonCreate">
            <router-link :to="{ name: route_uri+'-id', params: { id: lead.id }}">
                <button  class="btn-primary btn-minw rounded-0 py-2 px-3 small text-white  d-flex align-items-center justify-content-center mr-md-0 mr-3">
                    <span class="ti-pencil-alt mr-2 view text-white"></span> Inspect
                </button>
            </router-link>
        </template>
    </modals>
</template>

<script>
import Modals from './../../helpers/modals/modals'
import api from './../../../config/api'
import contactComponent from './../../app/CRM/contacts/_contact'
import business from './../../app/CRM/business/_business'
import first from 'lodash/first'
import words from 'lodash/words'

export default {
  name: 'modalPreviewLeads',
  components: {
    Modals,
    api,
    'contact': contactComponent,
    business

  },
  props: ['lead'],
  data () {
    return {
      showModals: true,
      contact: {},
      leadstatuses: null,
      contact_address: {zipcode: {city: {state: {}}}},
      uri: 'leads'
    }
  },
  watch: {
    showModals (value) {
      if (!value) this.$emit('update:showModals', value)
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

    updateLead () {
      api.Leads().update(this.lead.id, this.lead).then(response => {
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
    }
  },
  mounted () {
    api.Leads().getOne(this.lead.id).then(response => {
      this.contact = response.data.data.contact
    }),
    api.LeadStatuses().getAll().then(response => this.leadstatuses = response.data.data)
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
