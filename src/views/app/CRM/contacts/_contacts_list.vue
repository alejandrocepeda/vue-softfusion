<template>
    <div v-if="contacts.length > 0" class="col-12 bg-white border mb-4 border-bottom-3">
        <div class="mb-4 row mx-0">
            <div class="col-12 small border-bottom pb-3">
                <a href="#" class="card-link collapsed link-collapse">
                    <h6 class="mt-3 mb-0">
                        <span class="ion ion-briefcase"></span>My contacts
                    </h6>
                </a>
            </div>
            <div v-for="item in contacts" :key="item.id" class="col-12">
                <div class="row px-3 small position-relative">
                    <div class=" border-bottom  mb-0 py-2 w-100 d-flex align-items-center">
                        <button type="button" class="close col-auto font-weight-light pr-3 right text-secondary">
                            <span class="pr-1 tex">×</span>
                        </button>
                        <div class="col px-0">
                            <label class="font-weight-normal mb-0 small text-primary" v-text="'C-' + item.id"></label><br>
                            <span class="font-weight-normal mb-0 " v-text="item.name"></span>
                        </div>
                        <div class="col px-0">
                            <router-link :to="'/CRM/contacts/'+item.id" class="text-decoration-0 cursor-pointer btn-primary small text-white float-right d-flex align-items-center rounded-0 py-1 px-2 line-height-0">
                                <span class="ti-eye"></span> View </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from './../../../../config/api'

export default {
  name: 'contactsList',
  props: {
    uri: {required: true},
    reload: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      contacts: []
    }
  },
  watch: {
    reload (value) {
      if (value) this.getContacts()
    }
  },
  created () {
    this.getContacts()
  },
  methods: {
    getContacts () {
      api.Any(this.uri + '/contacts').getAll().then(response => {
        this.contacts = response.data.data
        this.$emit('update:reload', false)
      })
    }
  }
}
</script>

<style scoped>

</style>
