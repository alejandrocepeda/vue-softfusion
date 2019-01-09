<template>
    <div>
        <modal-create-contact :showCreate="true" @closeModal="showModals=false" v-if="showModals"></modal-create-contact>

        <div class="col-md-12 active show">
            <div class="row">
                <div class="col-md my-md-3 mt-3 mb-2">
                    <h4 class="float-left mr-lg-5 mr-3">Contacts list</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb small p-0 mt-2 col-md-auto col-12">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-primary">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active font-weight-light">Contacts list</li>
                        </ol>
                    </nav>
                </div>
                <div class="col-auto float-md-right float-left mb-md-0 mb-3">
                    <button @click="showModals=true" class="btn-success rounded-0 py-2 px-3 small text-white float-md-right float-left d-flex align-items-center mr-md-0 mr-3">
                        <span class="ti-user mr-1"></span> Create Contact
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
                    <div class="d-none d-sm-block float-md-right mr-4 ml-lg-auto">
                        <div class="input-group my-2 my-md-0">
                            <input v-model="search" @change="getContacts()" type="text" placeholder="Search..." class="form-control search">
                            <div class="input-group-prepend ">
                                <span id="basic-addon1" class="input-group-text rounded-right search-icon">
                                    <span class="ion ion-ios-search mr-0 "></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 bg-white border-table px-0 mb-5 border-bottom-3">
                    <pagination @preview="openPreview" :uri="uri" :rows.sync="contacts" :loading="loading" :columns="columns" :pagination="pagination" @paginate="getContacts"></pagination>
                </div>
            </div>
        </div>

        <modal-preview-contacts :contact="preview_contact" v-if="showModalsPreview" :showModals.sync="showModalsPreview"></modal-preview-contacts>
    </div>
</template>

<script>
  import modalCreateContact from './../../../app/CRM/contacts/_modalCreateContact'
  import api from './../../../../config/api'
  import {exportar} from './../../../../config/export'
  import modalPreviewContacts from './_modalPreviewContacts'
  import debounce from 'lodash/debounce'

  export default {
    components: {
      modalCreateContact,
      modalPreviewContacts
    },
    name: 'contacts',
    data () {
      return {
        showModals: false,
        showModalsPreview: false,
        uri: 'contacts?sort_by=id&order_by=desc',
        search: null,
        contacts: [],
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
            label: 'Contact',
            field: 'contact_name',
            preview: true,
            class: 'contact-td'
          },
          {
            label: 'Business',
            field: 'business_name'
          },
          {
            label: 'State',
            field: 'state'
          },
          {
            label: 'Phone',
            field: 'phone',
            type: 'phone'
          },
          {
            label: 'Status',
            field: 'status.name',
            level: 'status.level'

          },
          {
            label: 'User registered',
            field: 'date',
            type: 'date'
          },
          {
            label: 'Last updated',
            field: 'updated',
            type: 'date'
          }
        ],
        rows: {},
        preview_contact: {}
      }
    },
    created () {
      this.getContacts()
    },
    mounted () {
      console.log('MOUNTED!')
    },
    watch: {
      search: debounce(function () {
        this.getContacts()
      }, 1500)

    },

    methods: {

      download (type) {
        this.export_loading = true
        api.Any(`${this.uri}&pagination=false`).getQuery().then(response => {
          exportar(this.transformData(response.data.data), this.columns, type, 'contacts')
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
      getContacts (uri = null) {


        this.loading = true

        //modulo para busquedas
        let query = uri ? uri : this.uri

        if (this.search) {
          query = `${query}&search=${this.search}`
        }

        console.log('TRY CONTACTS!')

        axios.get(query)
          .then(response => {
            this.contacts = this.transformData(response.data.data)
            this.pagination = response.data.meta
            this.loading = false
            console.log('GET CONTACTS!')
          }).catch(error => {
          console.log('ERROR CONTACTS!')
          console.log(error)
        })
      },
      transformData (data) {
        return data.map(item => {
          return {
            'id': item.id,
            'business_name': item.relations.business.name ? item.relations.business.name : '',
            'contact_name': item.name,
            'phone': item.phone,
            'state': item.relations.state.name ? item.relations.state.name : '',
            'date': item.created_at,
            'updated': item.updated_at,
            'status': item.status
          }
        })
      },
      openPreview (contact) {
        // abrir modal
        this.showModalsPreview = true
        this.preview_contact = contact
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
