<template>
  <modals title="Contact Preview" :showCreate="true" :showModals.sync="showModals">
    <template slot="bodyCreate">
      <div class="information information-preview">
        <contact :id="contact.id" :showCollapse="true" :showCollapseSmall="false"></contact>
        <business :contact="data_contact" :showCollapseSmall="true"></business>
      </div>
    </template>
    <template slot="buttonCreate">
      <router-link :to="{ name: route_uri+'-id', params: { id: contact.id }}">
        <button class="btn-primary btn-minw rounded-0 py-2 px-3 small text-white  d-flex align-items-center justify-content-center mr-md-0 mr-3">
          <span class="ti-pencil-alt mr-2 view text-white"></span> Inspect
        </button>
      </router-link>
    </template>
  </modals>
</template>

<script>
import Modals from './../../../helpers/modals/modals'
import api from './../../../../config/api'
import contactComponent from './_contact'
import business from './../business/_business'
import first from 'lodash/first'
import words from 'lodash/words'

export default {
  name: 'modalPreviewContacts',
  components: {
    Modals,
    api,
    'contact': contactComponent,
    business
  },
  props: {
    contact: {}
  },
  data () {
    return {
      showModals: true,
      contact_address: {zipcode: {city: {state: {}}}},
      uri: 'contacts',
      data_contact: this.contact
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
    updateContact () {
      api.Contacts().update(this.contact.id, this.contact).then(response => {
        api.SuccessResponse(response)
      }).catch(error => {
        api.ErrorResponse(error)
      })
    },
    setUri () {
      this.$emit('paginate', this.uri + '&page=' + this.Page + '&per_page=' + this.ShowEntries)
    }
  },
  mounted () {
    api.Contacts().getOne(this.contact.id).then(response => {
      this.data_contact = response.data.data
    })
  }
}
</script>

<style scoped>

</style>

<style lang="css">
  .modal-create .ion{
    width: auto !important;
  }
  .information-preview{
    width:          auto !important;
    margin-top:     50px;
    padding-bottom: 150px;
  }
  .preview-icon{
    font-size:      30px;
    color:          #6063C1 !important;
    vertical-align: middle;
  }
  .preview-buttons-container{
    align-items: center;
  }
</style>
