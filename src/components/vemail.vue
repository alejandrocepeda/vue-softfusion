<template>
  <v-select :disabled="disabled" :multiple="multiple" placeholder="Choose an Email" class="text-default border-0 rounded-0 v-email" v-model="value" :label="label" :options="options"></v-select>
</template>

<script>
import vSelect from 'vue-select'

/**
 * The only true email.
 */
export default {
  name: 'vmultiple',
  components: {'v-select': vSelect},
  props: {
    /**
     * Sets the button font color
     */
    value: {required: true},
    options: {required: true},
    disabled: {
      default () {
        return false
      }
    },
    multiple: {
      default () {
        return true
      }
    },
    label: {
      default () {
        return 'name_email'
      }
    }
  }
}
</script>

<style>
  .v-email span.selected-tag{
    position:      inherit !important;
    margin-right:  5px !important;
    margin-top:    2px !important;
    margin-bottom: 2px !important;
  }
  .v-email .selected-tag .close{
    font-size: 19px !important;
  }
  .v-email input, .v-email.disabled input{
    width:     auto !important;
    height:    21px !important;
    font-size: 0.875rem !important;
  }
  .v-email.disabled .dropdown-toggle, .v-select.disabled .dropdown-toggle .clear, .v-select.disabled .dropdown-toggle input, .v-select.disabled .open-indicator, .v-select.disabled .selected-tag .close{
    background-color: transparent !important;
    cursor:           not-allowed;
  }
  .v-email.disabled .selected-tag .close, .v-select.disabled .selected-tag::after{display: none}
  .v-email .selected-tag{
    border-color:     #5F57F5 !important;
    color:            #312D7F;
    background-color: #FFF;
    border-radius:    0 !important;
    padding-left:     5px !important;
    padding-right:    5px !important;
    padding-top:      2px !important;
  }
</style>
<docs>
  This email is amazing, use it responsibly.
  ## Examples
  Orange button:
  ```jsx
  <v-email placeholder="Choose an Email" class="text-default border-0 rounded-0 v-email"></v-email>
  ```
</docs>
