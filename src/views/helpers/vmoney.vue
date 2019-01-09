<template>
  <input :placeholder="placeholder" v-model="currency" type="text" @change="change">
</template>

<script>
import replace from 'lodash/replace'

export default {
  name: 'vmoney',
  props: {
    placeholder: String,
    money: {
      type: [Number, String]
    },
    prefix: {type: String, default: () => ''},
    suffix: {type: String, default: () => ''}
  },
  data () {
    return {
      currency: 0,
      precision: 2,
      decimal: ',',
      thousands: '.'
    }
  },
  computed: {},
  mounted () {
    this.currency = this.masked(this.money)
  },
  watch: {
    money (value) {
      this.currency = this.masked(value)
    },
    currency (value) {
      value = this.unmasked(value)
      this.currency = this.masked(value)
    }
  },
  methods: {
    change (value) {
      value = value.target.value
      this.$emit('update:money', this.unmasked(value))
      this.$emit('change', this.unmasked(value))
    },
    masked (input) {
      return this.prefix + ' ' + replace(input, /(\d)(?=(\d{3})+(,|$))/g, '$1,') + this.suffix
    },
    unmasked (input) {
      var numbers = this.onlyNumbers(input)
      return parseInt(numbers)
    },
    toStr (value) {
      return value ? value.toString() : ''
    },
    onlyNumbers (input) {
      return this.toStr(input).replace(/\D+/g, '') || '0'
    }
  }
}
</script>

<style scoped>

</style>
