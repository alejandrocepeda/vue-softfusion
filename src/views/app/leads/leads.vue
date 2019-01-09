<template>
    <div>
        <modal-create-lead :showCreate="true" @closeModal="showModals=false" v-if="showModals"></modal-create-lead>
        <div :class="{blur}" class="col-md-12 active show">
            <div class="row">
                <div class="col-md my-md-3 mt-3 mb-2">
                    <h4 class="float-left mr-lg-5 mr-3">Leads list</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb small p-0 mt-2 col-md-auto col-12">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-primary">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active font-weight-light">Leads list</li>
                        </ol>
                    </nav>
                </div>
                <div class="col-auto float-md-right float-left mb-md-0 mb-3">
                    <button @click="showModals=true" class="btn-success rounded-0 py-2 px-3 small text-white float-md-right float-left d-flex align-items-center mr-md-0 mr-3">
                        <span class="ti-user mr-1"></span> Create Lead
                    </button>
                    <button data-toggle="dropdown" class="btn-primary rounded-0 mr-md-4 mr-0 py-2 px-3 small text-white float-md-right float-left  align-items-center dropdown-toggle">
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
                <div class="col-12 bg-white border-table mb-5 border-bottom-3 px-0">
                    <pagination @preview="openPreview" :uri="uri" :rows.sync="leads" :loading="loading" :columns="columns" :pagination="pagination" @paginate="getLeads"></pagination>
                </div>
            </div>
        </div>
        <modal-preview-leads :lead="preview_lead" v-if="showModalsPreview" :showModals.sync="showModalsPreview"></modal-preview-leads>
    </div>
</template>

<script>

import api from './../../../config/api'
import {exportar} from './../../../config/export'
import modalCreateLead from './../../app/leads/_modalCreateLead'
import modalPreviewLeads from './_modalPreviewLeads'

export default {
  name: 'leads',
  components: {
    modalCreateLead,
    modalPreviewLeads
  },
  props: ['blur'],
  data () {
    return {

      showModals: false,
      showModalsPreview: false,
      uri: 'leads?sort_by=id&order_by=desc',
      export_loading: false,
      leads: [],
      loading: false,
      pagination: {},
      columns: [
        {
          label: 'Id',
          field: 'id',
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
          label: 'Status',
          field: 'status.name',
          level: 'status.level'
        }
      ],
      rows: {},
      preview_lead: {}
    }
  },
  created () {
    this.getLeads()
  },

  methods: {
    createLead () {

    },
    download (type) {
      this.export_loading = true
      api.Any(`${this.uri}&pagination=false`).getQuery().then(response => {
        exportar(this.transformData(response.data.data), this.columns, type, 'leads')
        this.export_loading = false
      }).catch(error => {
        api.ErrorResponse(error)
        this.export_loading = false
      })
    },

    getLeads (uri = this.uri) {
      this.loading = true
      api.Leads(uri).getPaginate()
        .then(response => {
          this.leads = this.transformData(response.data.data)
          this.pagination = response.data.meta
          this.loading = false
        })
    },
    transformData (data) {
      return data.map(item => {
        return {
          'id': item.id,
          'business_name': item.relations.business.name,
          'contact_name': item.relations.contact.name,
          'phone': item.relations.contact.phone,
          'email': item.relations.contact.email,
          'state': item.relations.contact.state,
          'date': item.created_at,
          'executive': item.relations.executive.name,
          'status': item.relations.lead_status,
          'follow': item.follow_up
        }
      })
    },
    openPreview (lead) {
      // abrir modal
      this.showModalsPreview = true
      this.preview_lead = lead
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

    .slide-fade-enter-active{
        transition: all .3s ease;
    }

    .slide-fade-leave-active{
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(37px);
    }
</style>
