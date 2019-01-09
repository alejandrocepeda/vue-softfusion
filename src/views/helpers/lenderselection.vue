<template>
    <div class="col-12 bg-white border mb-4 border-bottom-3">
        <div class="border-bottom mb-4">
            <div>
                <div>
                    <div class="tab-pane border-bottom create-tabs mb-4">
                        <ul role="tablist" class="nav nav-tabs border-0  d-flex mx-auto row ">
                            <li role="presentation" class="nav-item is-active">
                                <a aria-controls="new-industries" href="#new-industries" role="tab" data-toggle="tab" class=" nav-link small py-md-3 py-sm-2 py-1 border-0 mx-2 show active" aria-selected="true"><span class="ti-layers mr-1"></span>Lender
                                    Industries</a>
                            </li>
                            <li role="presentation" class=" nav-item">
                                <a aria-controls="new-states" href="#new-states" role="tab" data-toggle="tab" class=" nav-link small py-md-3 py-sm-2 py-1 border-0 mx-2"><span class="ti-list mr-1"></span>Lender
                                    States</a>
                            </li>
                            <li role="presentation" class=" nav-item">
                                <a aria-controls="new-products" href="#new-products" role="tab" data-toggle="tab" class=" nav-link small py-md-3 py-sm-2 py-1 border-0 mx-2"><span class="ti-email mr-1"></span>Lender
                                    Products</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content">
                        <!--industries-->
                        <section id="new-industries" class="tab-pane fade show active">

                            <div class="my-3 over-y-scroll px-3 row ">
                                <div v-for="group in chunkedItems" class="col-sm-6 col-md-6 col-lg-3  mb-4">

                                    <h6 class="mb-3">Business Services</h6>

                                    <div v-for="item in group" class="align-items-center d-flex my-2 px-3">
                                        <input type="checkbox" class="cursor-pointer float-left form-control mr-2 rounded-0" :value="item.id" :checked="checkedIndustries(item.id)" @change="updateIndustries($event)">
                                        <span class="small">{{ item.name }}</span>
                                    </div>

                                </div>
                            </div>
                        </section>

                        <!--States-->
                        <section id="new-states" class="tab-pane fade">

                            <div class="my-3 over-y-scroll px-3 row ">
                                <div v-for="states in chunkedStates" class="col-sm-6 col-md-4 col-lg-4 col-xl-3  mb-4">

                                    <h6 class="mb-3">Business Services</h6>

                                    <div v-for="state in states" class="align-items-center d-flex my-2 px-3">
                                        <input type="checkbox" class="cursor-pointer float-left form-control mr-2 rounded-0" :value="state.id" :checked="checkedStates(state.id)" @change="updateStates($event)" >
                                        <span class="small">{{ state.name }}</span>
                                    </div>

                                </div>
                            </div>
                        </section>

                        <!--Products-->
                        <section id="new-products" class="tab-pane fade">

                            <div class="my-3 over-y-scroll px-3 row ">
                                <div class="col-sm-3 mb-4">

                                    <h6 class="mb-3">Products</h6>

                                    <div v-for="product in lender_products" class="align-items-center d-flex my-2 px-3">
                                        <input type="checkbox" class="cursor-pointer float-left form-control mr-2 rounded-0" :value="product.id" :checked="checkedProducts(product.id)" @change="updateProducts($event)">
                                        <span class="small">{{ product.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from './../../config/api'
import chunk from 'lodash/chunk'
import findIndex from 'lodash/findIndex'
import orderBy from 'lodash/orderBy'

export default {
  name: 'lenderselection',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    industry_id: {
      type: [Number, String]
    }
  },

  data () {
    return {
      checked: false,
      lender_industries: [],
      lender_states: [],
      lender_products: [],
      lender_industries_active: [],
      lender_states_active: [],
      lender_products_active: []
    }
  },
  computed: {
    chunkedItems () {
      return chunk(this.lender_industries, (this.lender_industries.length / 4))
    },

    chunkedStates () {
      return chunk(this.lender_states, (this.lender_states.length / 4))
    }

  },
  methods: {
    checkedIndustries (id) {
      return findIndex(this.lender_industries_active, (item) => {
        return item.id == id
      }) >= 0
    },
    checkedStates (id) {
      return findIndex(this.lender_states_active, (state) => {
        return state.id == id
      }) >= 0
    },
    checkedProducts (id) {
      return findIndex(this.lender_products_active, (product) => {
        return product.id == id
      }) >= 0
    },
    updateIndustries (e) {
      let id = e.target.value
      if (e.target.checked) {
        api.Lenders().updateIndustry(this.id, id)
          .then(response => api.SuccessResponse(response))
          .catch(error => api.ErrorResponse(error))
      } else {
        api.Lenders().deleteIndustry(this.id, id)
          .then(response => api.SuccessResponse(response))
          .catch(error => api.ErrorResponse(error))
      }
    },
    updateStates (e) {
      let id = e.target.value
      if (e.target.checked) {
        api.Lenders().updateState(this.id, id)
          .then(response => api.SuccessResponse(response))
          .catch(error => api.ErrorResponse(error))
      } else {
        api.Lenders().deleteState(this.id, id)
          .then(response => api.SuccessResponse(response))
          .catch(error => api.ErrorResponse(error))
      }
    },
    updateProducts (p) {
      let id = p.target.value
      if (p.target.checked) {
        api.Lenders().updateProducts(this.id, id)
          .then(response => api.SuccessResponse(response))
          .catch(error => api.ErrorResponse(error))
      } else {
        api.Lenders().deleteProducts(this.id, id)
          .then(response => api.SuccessResponse(response))
          .catch(error => api.ErrorResponse(error))
      }
    }
  },
  mounted () {
    api.Industries().getAll().then(response => this.lender_industries = response.data.data)
    api.Products().getAll().then(response => this.lender_products = response.data.data)
    api.States().getAll().then(response => this.lender_states = orderBy(response.data.data, 'name'))
    api.Lenders().getIndustries(this.id).then(response => this.lender_industries_active = response.data.data)
    api.Lenders().getStates(this.id).then(response => this.lender_states_active = response.data.data)
    api.Lenders().getProducts(this.id).then(response => this.lender_products_active = response.data.data)
  }

}
</script>

<style scoped>

</style>
