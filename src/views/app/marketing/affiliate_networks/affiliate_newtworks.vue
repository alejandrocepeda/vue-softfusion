<template>
    <div class="col-md-12 active show">
        <div class="row">
            <div class="col-sm-6 my-3">
                <h4 class="float-left mr-5">Affiliate Networks</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb small p-0 mt-2">
                        <li class="breadcrumb-item">
                            <router-link to="/" class="text-primary">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active font-weight-light">Affiliate Networks</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm-6 float-right">
                <button class="btn-success rounded-0 py-2 px-3 small text-white float-right d-flex align-items-center">
                    <span class="ti-user mr-1"></span> Add New Affiliate
                </button>
                <button data-toggle="dropdown" class="btn-primary rounded-0 mr-4 py-2 px-3 small text-white float-right d-flex align-items-center dropdown-toggle">
                    Download
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item small" href="#">.PDF</a> <a class="dropdown-item small" href="#">.XLSX</a>
                    <a class="dropdown-item small" href="#">.CSV</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 bg-white border-table px-0 mb-5 border-bottom-3">
                <pagination :uri="uri" :rows="hasoffers" :loading="loading" :columns="columns" :actions="false" :pagination="pagination" @paginate="getHasoffers"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import get from 'lodash/get'
export default {

  data () {
    return {
      uri: 'has-offers',
      hasoffers: [],
      loading: false,
      pagination: {},
      columns: [
        {
          label: 'Lead Id',
          field: 'id',
          class: 'text-center'
        },
        {
          label: 'App Id',
          field: 'app_id',
          class: 'text-center'
        },
        {
          label: 'Offer Id',
          field: 'offer_id',
          class: 'text-center'
        },
        {
          label: 'Affiliate Id',
          field: 'affiliate_id',
          class: 'text-center'
        },
        {
          label: 'Broker Id',
          field: 'executive_id',
          class: 'text-center'
        },
        {
          label: 'Broker',
          field: 'executive'
        },
        {
          label: 'Approval',
          field: 'approval',
          type: 'money'
        },

        {
          label: 'Business',
          field: 'business_name'
        },
        {
          label: 'Contact',
          field: 'contact_name'
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
          label: 'Ip',
          field: 'ip'
        },
        {
          label: 'Transaction Id',
          field: 'transaction_id'
        },
        {
          label: 'Status',
          field: 'has_offer_status.name',
          level: 'has_offer_status.level'
        },
        {
          label: 'Date',
          field: 'date'
        }

      ],
      rows: {}
    }
  },
  created () {
    this.getHasoffers()
  },
  mounted () {

  },

  methods: {
    /**
             * Obtener todos los leads
             * @param uri
             */
    getHasoffers (uri) {
      this.loading = true
      axios.get(uri || this.uri)
        .then(response => {
          this.hasoffers = response.data.data.map(item => {
            return {
              'offer_id': item.offer_id,
              'affiliate_id': item.affiliate_id,
              'ip': item.ip,
              'transaction_id': item.transaction_id,
              'app_id': item.application_id,
              'id': item.lead_id,
              'business_name': get(item, 'relations.lead.contact.business.name', ''),
              'contact_name': get(item, 'relations.lead.contact.name', ''),
              'phone': get(item, 'relations.lead.contact.phone', ''),
              'email': get(item, 'relations.lead.email', ''),
              'date': item.created_at,
              'executive': get(item, 'relations.lead.executive.name', ''),
              'executive_id': get(item, 'relations.lead.executive.id', ''),
              'approval': item.relations.approval,
              'has_offer_status': item.relations.has_offer_status
            }
          })
          this.pagination = response.data.meta
          this.loading = false
        })
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
