<template>
  <div v-if="applications.length > 0" class="col-12 bg-white border mb-4 border-bottom-3">
    <div class="mb-4 row mx-0">
      <div class="col-12 small border-bottom pb-3">
        <a href="javascript:;" class="card-link collapsed link-collapse" aria-expanded="false">
          <h6 class="mt-3 mb-0">
            <span class="ion ion-briefcase"></span>My applications
          </h6>
        </a>
      </div>
      <div v-for="item in applications" :key="item.id" class="col-12">
        <div class="row px-3 small position-relative">
          <div class=" border-bottom  mb-0 py-2 w-100 d-flex align-items-center">
            <button @click="deleteApplication(item.id)" type="button" class="close col-auto font-weight-light pr-3 right text-secondary">
              <span class="pr-1 tex">×</span>
            </button>
            <div class="col px-0">
              <label class="font-weight-normal mb-0 small text-primary" v-text="'A-' + item.id"></label> <br>
              <span class="font-weight-normal mb-0 " v-text="item.relations.product.name"></span><br>
              <span class="font-weight-normal mb-0 small text-switch">
                                <span class="font-weight-heavy text-secondary">Date: </span><span v-text="finish(item.created_at)"></span>
                            </span>
            </div>
            <div class="col px-0">
              <router-link :to="'/applications/'+item.id" class="text-decoration-0 cursor-pointer btn-primary small text-white float-right d-flex align-items-center rounded-0 py-1 px-2 line-height-0">
                <span class="ti-eye mr-2"></span> View </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../config/api'
import moment from 'moment'

export default {
  name: 'applications',
  props: {
    lead: {required: true}
  },
  data () {
    return {
      applications: []
    }
  },
  created () {
    api.Leads().getApplications(this.lead).then(response => { this.applications = response.data.data })
  },
  methods: {
    finish (value) {
      return moment(value).format('MM-DD-YYYY')
    },
    deleteApplication (id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        customClass: 'bg-body rounded-0',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success rounded-0 font-weight-light',
        cancelButtonClass: 'btn btn-danger rounded-0 font-weight-light',
        confirmButtonColor: '#53D190',
        cancelButtonColor: '#F65F6E',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          api.Applications().delete(id).then(() => {
            this.applications = this.applications.filter(item => item.id !== id)
            this.$swal({
              title: 'Deleted!',
              text: 'Your Application has been deleted.',
              type: 'success',
              customClass: 'bg-body rounded-0',
              confirmButtonClass: 'btn btn-primary rounded-0 font-weight-light bg-primary'
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
