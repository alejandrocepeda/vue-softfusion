<template>
    <div>
        <modal-create-lender @closeModal="showModals=false" v-if="showModals"></modal-create-lender>

        <div class="col-md-12 active show">
            <div class="row">
                <div class="col-md my-md-3 mt-3 mb-2">
                    <h4 class="float-left mr-lg-5 mr-3">Lenders list</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb small p-0 mt-2 col-md-auto col-12">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-primary">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active font-weight-light">Lenders list</li>
                        </ol>
                    </nav>
                </div>
                <div class="col-auto float-md-right float-left mb-md-0 mb-3">
                    <button @click="showModals=true" class="btn-success rounded-0 py-2 px-3 small text-white float-md-right float-left d-flex align-items-center mr-md-0 mr-3">
                        <span class="ti-user mr-1"></span> Add New Lender
                    </button>
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
                            <input v-model="search" @change="getLenders()" type="text" placeholder="Search..." class="form-control search">
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
                <div class="col-12 bg-white border-table px-0 mb-5 border-bottom-3">
                    <pagination @preview="openPreview" :uri="uri" :rows.sync="lenders" :loading="loading" :columns="columns" :pagination="pagination" @paginate="getLenders"></pagination>
                </div>
            </div>
        </div>
        <modal-preview-lenders :lender="preview_lender" v-if="showModalsPreview" :showModals.sync="showModalsPreview"></modal-preview-lenders>
    </div>
</template>

<script>
import modalCreateLender from './../../CRM/lenders/_modalCreateLender'
import {exportar} from './../../../../config/export'
import api from './../../../../config/api'
import modalPreviewLenders from './_modalPreviewLenders'
import debounce from 'lodash/debounce'

export default {
  components: {
    modalCreateLender,
    modalPreviewLenders
  },
  name: 'lenders',
  data () {
    return {
      export_loading: false,
      showModals: false,
      showModalsPreview: false,
      uri: 'lenders?sort_by=id&order_by=desc',
      lenders: [],
      loading: false,
      pagination: {},
      search:null,
      columns: [
        {
          label: 'Id',
          field: 'id',
          class: 'text-center'
        },
        {
          label: 'Lender',
          field: 'business_name',
          preview: true,
          class: 'contact-td'
        },
        {
          label: 'Contact',
          field: 'contact_name'
        },

        {
          label: 'Email',
          field: 'email'
        },
        {
          label: 'Phone',
          field: 'phone',
          type: 'phone'
        },
        {
          label: 'Min loan size',
          field: 'min_loan_size',
          type: 'money'

        },
        {
          label: 'Max loan size',
          field: 'max_loan_size',
          type: 'money'

        },
        {
          label: 'Status',
          field: 'status.name',
          level: 'status.level'

        }
      ],
      rows: {},
      preview_lender: {}
    }
  },
  watch:{
    search: debounce(function(){
      this.getLenders()
    }, 1500)

  },
  created () {
    this.getLenders()
  },
  mounted () {

  },

  methods: {
    download (type) {
      this.export_loading = true
      api.Any(`${this.uri}&pagination=false`).getQuery().then(response => {
        exportar(this.transformData(response.data.data), this.columns, type, 'lenders')
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
    getLenders (uri) {
      this.loading = true

      //modulo para busquedas
      let query = uri ? uri : this.uri

      if(this.search){
        query = `${query}&search=${this.search}`
      }


      api.Lenders(query).getPaginate()
        .then(response => {
          this.lenders = this.transformData(response.data.data)
          this.pagination = response.data.meta
          this.loading = false
        })
    },
    transformData (data) {
      return data.map(item => {
        return {
          'id': item.id,
          'business_name': item.name,
          'contact_name': item.relations.contact.name,
          'phone': item.relations.contact.phone,
          'email': item.email,
          'min_loan_size': item.min_loan_size,
          'max_loan_size': item.max_loan_size,
          'status': item.status
        }
      })
    },
    openPreview (lender) {
      this.showModalsPreview = true
      this.preview_lender = lender
    },
    closeModals () {
      this.showModal = false
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
