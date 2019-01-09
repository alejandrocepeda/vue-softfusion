<template>
    <div>
        <modals :showCreate="true" v-if="showModals" :showModals.sync="showModals"></modals>
        <div class="col-md-12 active show">
            <div class="row">
                <div class="col-md my-md-3 mt-3 mb-2">
                    <h4 class="float-left mr-lg-5 mr-3">Deals list</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb small p-0 mt-2 col-md-auto col-12">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-primary">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active font-weight-light">Applications list</li>
                        </ol>
                    </nav>
                </div>
                <div class="col-auto float-md-right float-left mb-md-0 mb-3">
                    <!--<button @click="showModals=true" class="btn-success rounded-0 py-2 px-3 small text-white float-md-right float-left d-flex align-items-center mr-md-0 mr-3">
                        <span class="ion ion-person-add"></span> Create Application
                    </button>-->
                    <button data-toggle="dropdown" class="btn-primary btn-minw rounded-0 mr-md-4 mr-0 py-2 px-3 small text-white float-md-right float-left align-items-center dropdown-toggle">
                        <font-awesome-icon v-if="export_loading" icon="circle-notch" class="mr-2" spin/>
                        Download
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item small" href="#" @click="download('pdf')">.PDF</a>
                        <a class="dropdown-item small" href="#" @click="download('xls')">.XLS</a>
                        <a class="dropdown-item small" href="#" @click="download('csv')">.CSV</a>
                    </div>
                    <form class="d-none d-sm-block float-md-right mr-4 ml-lg-auto">
                        <div class="input-group my-2 my-md-0">
                            <input type="text" placeholder="Search..." class="form-control search">
                            <div class="input-group-prepend ">
                                <span id="basic-addon1" class="input-group-text rounded-right search-icon">
                                    <span class="ion ion-ios-search mr-0 "></span>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-12 bg-white border-table px-0 mb-5 border-bottom-3 deals-pagination">
                    <pagination @preview="openPreview" :uri="uri" :rows.sync="deals" :loading="loading" :columns="columns" :pagination="pagination" @paginate="getDeals"></pagination>
                </div>
            </div>
        </div>
        <modal-preview-deals :deal="preview_deal" v-if="showModalsPreview" :showModals.sync="showModalsPreview"></modal-preview-deals>
    </div>
</template>

<script>

import modals from './../../helpers/modals/modals'
import modalPreviewDeals from './_modalPreviewDeals'
import {exportar} from './../../../config/export'
import api from './../../../config/api'

export default {

  name: 'applications',
  components: {
    modals, modalPreviewDeals
  },
  data () {
    return {
      showModals: false,
      showModalsPreview: false,
      uri: 'applications?sort_by=id&order_by=desc',
      deals: [],
      loading: false,
      export_loading: false,
      pagination: {},
      columns: [
        {
          label: 'Id',
          field: 'id',
          class: 'text-center'
        },
        {
          label: 'Lead Id',
          field: 'lead_id',
          class: 'text-center'
        },
        {
          label: 'Business',
          field: 'business_name'
        },
        {
          label: 'Contact',
          field: 'contact_name',
          preview: true,
          class: 'contact-td'
        },
        {
          label: 'Phone',
          field: 'phone',
          type: 'phone'
        },
        {
          label: 'Email',
          field: 'email'
        },
        {
          label: 'State',
          field: 'state'
        },
        {
          label: 'Date',
          field: 'date',
          type: 'date'
        },
        {
          label: 'Executive',
          field: 'executive'
        },
        {
          label: 'Processor',
          field: 'processor_name'
        },
        {
          label: 'Status',
          field: 'status.name',
          level: 'status.level'
        }

      ],
      rows: {},
      preview_deal: {}
    }
  },
  created () {
    this.getDeals()
  },
  mounted () {

  },
  computed: {},

  methods: {
    download (type) {
      this.export_loading = true
      api.Any(`${this.uri}&pagination=false`).getQuery().then(response => {
        exportar(this.transformData(response.data.data), this.columns, type, 'applications')
        this.export_loading = false
      }).catch(error => {
        api.ErrorResponse(error)
        this.export_loading = false
      })
    },
    /**
             * Obtener todos los leads
             * @param uri
             */
    getDeals (uri = this.uri) {
      this.loading = true
      api.Applications(uri).getPaginate()
        .then(response => {
          this.deals = this.transformData(response.data.data)
          this.pagination = response.data.meta
          this.loading = false
        })
    },
    transformData (data) {
      return data.map(item => {
        return {
          'id': item.id,
          'lead_id': item.relations.lead.id,
          'business_name': item.relations.business.name,
          'contact_name': item.relations.contact.name,
          'phone': item.relations.contact.phone,
          'email': item.relations.lead.email,
          'state': item.relations.state.name,
          'date': item.created_at,
          'executive': item.relations.executive.name,
          'processor_name': item.relations.processor.name,
          'status': item.relations.application_status
        }
      })
    },
    openPreview (deal) {
      // abrir modal
      this.showModalsPreview = true
      this.preview_deal = deal
    },
    closeModals () {
      this.showModalsPreview = false
    }
  }
}
</script>

<style scoped>
    tbody{
        height: 690px;
    }

    .min-w{
        width: 95px;
    }

    .loading{
        position: relative;
    }

    .loading > td{
        background-color: #FFF !important;
        position:         absolute;
        top:              0;
        left:             0;
        bottom:           0;
        width:            100%;
        opacity:          1;
        z-index:          100;
        height:           100%;
    }

    .loading .loader{
        position:   absolute;
        top:        40%;
        left:       45%;
        text-align: center;
    }

</style>

<style lang="css">
    .small{
        font-size: 84% !important;
    }

    /* responsive */
    @media only screen and (min-width: 1024px) and (max-width:1800px){
        .small{
            font-size: 76% !important;
        }
    }
</style>
