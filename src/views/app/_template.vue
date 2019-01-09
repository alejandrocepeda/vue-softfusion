<template>
    <div>
        <navbar :class="{blur}"></navbar>
        <div :class="{blur}" class="px-md-5 px-sm-3 px-2 pt-4 border-top bg-body">
            <transition name="page" mode="out-in" :appear="true">

                    <router-view ></router-view>

            </transition>
        </div>
    </div>

</template>

<script>
import navbar from './_navbar'
import {mapActions} from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {
  components: {
    'navbar': navbar
  },

  data () {
    return {

    }
  },
  computed: {
    blur () {
      return this.$store.state.blur
    }
  },
  mounted () {
    if (isEmpty(this.$store.state.me)) {
      this.getMe()
    }

    if (isEmpty(this.$store.state.contacts)) {
      this.getAllContacts()
    }

    if (isEmpty(this.$store.state.users)) {
      this.getAllUsers()
    }

    if (isEmpty(this.$store.state.activity_statuses)) {
      this.getAllActivityStatuses()
    }

    if (isEmpty(this.$store.state.activity_call_statuses)) {
      this.getAllActivityCallStatuses()
    }
  },
  methods: {
    ...mapActions(['getAllContacts', 'getMe', 'getAllUsers', 'getAllActivityStatuses', 'getAllActivityCallStatuses'])
  }
}

</script>


