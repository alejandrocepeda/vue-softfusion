<template>
    <section class="border-0 rounded-0 d-flex">
        <v-select :disabled="disabled" class="info-select border-0 rounded-0 col pl-0" v-model="selected" :label="label" :placeholder="placeholder" :options="options"></v-select>
        <button @click="$emit('add',true)" v-if="add" type="button" class="add-select btn btn-success btn-sm col-auto d-flex">
            <i class="text-white ti-plus"></i>
        </button>
    </section>
</template>

<script>
  import vSelect from 'vue-select'
  import find from 'lodash/find'

  export default {
    name: 'vselect',
    components: {'v-select': vSelect},
    props: {
      value: {required: true},
      add: {type: Boolean, default: () => false},
      options: {
        type: Array,
        default () {
          return [{id: 0, name: 'No'}, {id: 1, name: 'Yes'}]
        }
      },
      label: {
        default () {
          return 'name'
        }
      },
      disabled: {
        default () {
          return false
        }
      },
      placeholder: {
        default () {
          return 'Choose an option'
        }
      }
    },
    data () {
      return {
        selected: ''
      }
    },
    mounted () {
      this.setselected()
    },
    computed:{
      me(){
        return this.$store.state.me()
      }
    },
    watch: {
      'selected.id': function (value) {
        if (this.value !== value) {
          this.$emit('update:value', value)
          this.$emit('change', value)
          /* if (this.value === null) {
            this.selected = {id: 0, name: this.placeholder}
          } */
        }
      },
      options () {
        this.setselected()
      },
      value () {
        this.setselected()
      }
    },
    methods: {
      setselected () {
        this.selected = find(this.options, item => item.id == this.value)
      }
    }
  }
</script>

<style lang="scss">


    .v-select{
        input{
            padding: 0 !important;
            &::placeholder{
                font-size: small;
            }

        }

        .selected-tag{
            width: 95%;
        }

        .open-indicator{
            right: 5px !important;
            top:   5px;
        }

        &.open .open-indicator{
            right: 5px !important;
            top:   10px;
        }

        .dropdown-menu{
            border:     1px solid #5F57F52E;
            box-shadow: 0 3px 6px 0 #5F57F52E;
        }

    }

    .add-select{
        padding: 0;
        height:  25px;
        width:   25px;

        i.ti-plus{
            font-size: 10px;
        }
    }
</style>
