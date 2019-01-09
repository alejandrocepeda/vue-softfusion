<template>
    <the-mask class="text-default border-0" v-model="vmodel" :mask="mask"/>
</template>

<script>
import {TheMask} from 'vue-the-mask'
import api from './../../config/api'

export default {
  name: 'vmask',
  components: {TheMask},
  props: ['mask', 'value'],
  data () {
    return {
      vmodel: undefined,
      time: null
    }
  },
  watch: {
    'vmodel': function (value, old) {
      if (api.CheckUpdate(value, old)) {
        this.sendUpdate()
        this.$emit('update:value', value)
      }

      return value
    },
    value () {
      this.setvalue()
    }
  },
  methods: {
    setvalue () {
      this.vmodel = this.value
    },
    sendUpdate () {
      clearTimeout(this.time)
      this.time = setTimeout(console.log('hola'), 2000
      )
    }
  }

}
</script>

<style scoped>

</style>
