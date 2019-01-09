<template>
    <section>
        <template v-if="edit">
            <div class="row d-flex align-items-center px-3">
                <input disabled v-model="contact.name" type="text" placeholder="Contact Name" class="disabled text-primary border-0  col content-input calls-fusion">
                <div class="col">
                    <span class="small text-default mr-3"><strong>Phone: </strong></span>
                    <the-mask disabled v-model="contact.phone" mask="(###)-###-####" type="tel" placeholder="Phone Number" class="disabled text-primary border-0  content-input calls-fusion"/>
                </div>
                <div class="col-auto">
                    <div class="row">
                        <div class="col-auto mt-1">
                            <span class="text-left text-default small my-2">Call Result</span>
                        </div>
                    </div>
                    <div class="row">
                        <v-select class="col content-input calls-fusion" :value.sync="newnote.activity_call_status_id" :options="call_results"></v-select>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="row">
                        <div class="col-auto mt-1">
                            <span class="text-left text-default small my-2">Call Date</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto small text-primary d-flex align-items-center">
                            <span class="ti-calendar mr-1"></span>
                            <datepicker v-model="newnote.finish_at" format="MM-dd-yyyy" class="text-default min-width-date"
                                        input-class="bg-transparent border-0 position-relative text-primary z-index-1 cursor-pointer"
                                        name="uniquename"></datepicker>
                            <div class="dropdown-toggle float-right"></div>
                        </div>
                        <div class="col-auto small text-primary d-flex align-items-center">
                            <span class="m-0 ti-time mr-1"></span>
                            <vue-timepicker format="hh:mm A" hide-clear-button :minute-interval="15" v-model="finish_time"></vue-timepicker>
                            <div class="dropdown-toggle float-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mt-1">
            <text-editor :id="id" :text.sync="newnote.description" class="pt-2"></text-editor>
            <transition name="showButtons">
                <div v-if="newnote.description" class="col-12 clearfix mb-3 pt-3 create-buttons border-top">

                    <button @click="save" class="btn btn-primary btn-sm mr-2" :disabled="saving || !newnote.description">
                        <font-awesome-icon v-if="saving" icon="circle-notch" class="min-w-60" spin/>
                        <template v-if="!saving">Register Call</template>
                    </button>

                    <button :disabled="saving" @click="discard" class="btn btn-outline-primary btn-sm">Discard</button>
                </div>
            </transition>
        </template>
        <template v-else>
            <div class="row mx-0 pt-2 border-bottom">
                <div class="text-default small col-auto pb-2">
                    <strong>Result of the call: </strong>
                    {{newnote.activity_call_status.name}}
                </div>
                <div class="text-default small col-auto pb-2">
                    <strong>Phone: </strong>
                    <the-mask disabled v-model="contact.phone" mask="(###)-###-####" type="tel" class="disabled border-0  content-input calls-fusion"/>
                </div>
            </div>
            <div class="row px-3 pt-3">
                <div class="text-default small col-12  pb-1" v-html="newnote.description"></div>

            </div>
        </template>
    </section>
</template>

<script>
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
import clone from 'lodash/clone'

export default {
  name: 'Call',
  data () {
    return {
      newnote: {
        description: '',
        title: '',
        activity_call_status_id: 1,
        activity_call_status: {name: ''},
        activity_type_id: 4,
        activity_status_id: 1,
        user_id: 1,
        finish_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      finish_time: {
        hh: moment().format('h'),
        mm: moment().format('mm'),
        A: moment().format('A')
      },

      saving: false
    }
  },
  props: {
    activity: {type: Object},
    activity_type: {type: Array},
    id: {
      default () {
        return 'call'
      }
    },
    cancel: Boolean,
    user_id: Number,
    contact: Object,
    users: Array,
    morph: Object,
    edit: Boolean,
    editforce: {
      default () {
        return false
      }
    }
  },
  mounted () {
    if (this.activity) {
      this.newnote = cloneDeep(this.activity)
    }
  },
  computed: {
    call_results () {
      return this.$store.state.activity_call_statuses
    }
  },
  watch: {
    activity (value) {
      this.newnote = cloneDeep(value)
    },
    'newnote.finish_at': function (value) {
      this.finish_time = {
        HH: moment(value).format('HH'),
        mm: moment(value).format('mm')
      }
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    cancel (value) {
      if (value) this.discard()
    },

    user_id (value) {
      this.newnote.user_id = value
      return value
    },

    finish_time (value) {
      this.newnote.finish_at = moment(this.newnote.finish_at).set({hours:value.HH,minutes:value.mm}).format('YYYY-MM-DD HH:mm:ss')
      return value
    }

  },
  methods: {
    save () {
      this.saving = true
      this.$emit('save', this.newnote)
    },
    discard () {
      if (this.editforce) {
        this.newnote = clone(this.activity)
        this.$emit('changeedit', false)
        this.saving = false
      } else {
        this.newnote.description = ''
        this.saving = false
      }
    }
  }
}
</script>

<style scoped>

</style>
