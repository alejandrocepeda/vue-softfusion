<template>
    <modals title="Business Preview" :showCreate="true" :showModals.sync="showModals">
        <template slot="bodyCreate">

            <div class="information information-preview">
                <business :id="business.id" :showCollapse="true" :showCollapseSmall="false" ></business>
            </div>

        </template>

        <template slot="buttonCreate">

            <router-link :to="{ name: route_uri+'-id', params: { id: business.id }}">
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
import business from './_business'
import contactComponent from './../contacts/_contact'
import first from 'lodash/first'
import words from 'lodash/words'

export default {
  name: 'modalPreviewBusiness',
  components: {
    Modals,
    business,
    api,
    'contact': contactComponent
  },
  props: {
    business: {}
  },
  data () {
    return {
      showModals: true,
      uri: 'businesses',
      showCollapse: true,
      showCollapseSmall: false
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
    }
  },
  mounted () {
    api.Business().getOne(this.business.id).then(response => {
      this.business = response.data.data
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
        font-size: 30px;
        color: #6063c1!important;
        vertical-align: middle;
    }
    .preview-buttons-container{
        align-items: center;
    }
</style>
