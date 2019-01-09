<template>
    <modals title="Deals Preview" :showCreate="true" :showModals.sync="showModals">
        <template  slot="bodyCreate">
            <section class="preview-modal information information-preview">
                <application :id="deal.id" :showCollapse="true"></application>

                <contact :id="contact.id" :showCollapseSmall="true"></contact>

                <business :contact="contact" :showCollapseSmall="true"></business>
            </section>
        </template>
        <template slot="buttonCreate">
            <router-link :to="{ name: route_uri+'-id', params: { id: deal.id }}">
                <button  class="btn-primary btn-minw rounded-0 py-2 px-3 small text-white  d-flex align-items-center justify-content-center mr-md-0 mr-3">
                    <span class="ti-pencil-alt mr-2 view text-white"></span> Inspect
                </button>
            </router-link>
        </template>
    </modals>
</template>

<script>
import modals from '../../helpers/modals/modals'
import api from './../../../config/api'
import application from './_application'
import contactComponent from './../CRM/contacts/_contact'
import business from './../CRM/business/_business'
import first from 'lodash/first'
import words from 'lodash/words'

export default {
  name: 'modalPreviewDeals',
  components: {
    application, business, 'contact': contactComponent, modals
  },
  props: ['deal'],
  data () {
    return {
      showModals: true,
      contact: {},
      uri: 'applications'
    }
  },
  watch: {
    showModals (value) {
      if (!value) this.$emit('update:showModals', value)
    },
    contact_address (value) {
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
    }
  },
  mounted () {
    api.Applications().getOne(this.deal.id).then(response => {
      this.deal = response.data.data
      this.contact = response.data.data.lead.contact
    })
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
