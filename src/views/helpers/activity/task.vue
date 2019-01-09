<template>
    <section>
        <template v-if="edit">
            <div class="row d-flex align-items-center px-3">
                <input v-model="newnote.title" type="text" placeholder="Enter your task" class="form-control col-sm col-12 text-default border-0 content-input tasks-fusion">
                <div class="col-auto">
                    <div class="row">
                        <div class="col mt-1">
                            <span class="text-left text-default small my-2">Due Date</span>
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
                            <div class="dropdown-toggle time-icon float-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mt-1">
            <text-editor :id="id" :text.sync="newnote.description" class="pt-2"></text-editor>
            <hr class="my-1">
            <div class="row px-3">
                <div class="col-xl col-4">

                    <!--Note: Type of task-->

                    <span class="text-left text-default small my-2">Type</span>
                    <v-select class="text-default border-0 rounded-0 w-50" :value.sync="newnote.activity_status_id" :options="activity_type" label="name"></v-select>

                </div>
                <div class="col">

                    <!--Note: assigned to... but i guess it could be only assigned to the lead im viewing still not sure-->

                    <span class="text-left text-default small my-2">Assigned to</span>
                    <v-select class="text-default border-0 rounded-0 w-75" :value.sync="newnote.assign_to" label="name" :options="contacts"></v-select>
                </div>
                <div class="col-md-auto col-12">
                    <div class="row">
                        <div class="col">
                            <span class="text-left text-default small my-2">Reminder by mail</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto small text-primary d-flex align-items-center">
                            <span class="ti-calendar mr-1"></span>
                            <datepicker v-model="newnote.remember_at" format="MM-dd-yyyy" class="text-default min-width-date"
                                        input-class="bg-transparent border-0 position-relative text-primary z-index-1 cursor-pointer"
                                        name="uniquename"></datepicker>
                            <div class="dropdown-toggle float-right"></div>
                        </div>
                        <div class="col-auto small text-primary d-flex align-items-center">
                            <span class="ti-time mr-1"></span>
                            <vue-timepicker format="hh:mm A" hide-clear-button :minute-interval="15" v-model="remember_time"></vue-timepicker>
                            <div class="dropdown-toggle time-icon float-right"></div>
                        </div>
                    </div>
                </div>

            </div>
            <transition name="showButtons">
                <div v-if="newnote.description  || newnote.title " class="col-12 clearfix mb-3 pt-3 border-top">

                    <button @click="save" class="btn btn-primary btn-sm mr-2" :disabled="saving || !newnote.description">
                        <font-awesome-icon v-if="saving" icon="circle-notch" class="min-w-60" spin/>
                        <template v-if="!saving">Save Task</template>
                    </button>

                    <button @click="discard" class="btn btn-outline-primary btn-sm">Discard</button>
                </div>
            </transition>
        </template>
        <template v-else>
            <div class="row d-flex align-items-center px-3">
                <div class="col mt-1">
                    <span class="text-primary h6 d-flex align-items-center mb-0">
                         <p-check class="p-icon p-bigger p-smooth p-round" color="success" toggle v-model="done">
                            <i class="icon ti-check mr-1" slot="extra"></i>
                            {{newnote.title}}
                            <i class="icon ti-check" slot="off-extra"></i>
                            <label slot="off-label">{{newnote.title}}</label>
                        </p-check>
                    </span>
                </div>
                <div class="col-auto">
                    <div class="row">
                        <div class="col">
                            <span class="text-left text-default small my-2">Due Date</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto small text-primary d-flex align-items-center">
                            <span class="ti-calendar mr-1"></span> <span v-html="finish"></span>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mt-2">
            <div class="row px-4">
                <div class="text-default small" v-html=newnote.description></div>
            </div>
            <hr class="mt-0 mb-1">

            <div class="d-flex mb-1 my-2 px-4 row">
                <div class="pr-3">
                    <p class="text-left text-default small mb-0">
                        Type: <strong class="text-primary">{{newnote.activity_status.name}}</strong>
                    </p>
                </div>
                <div class="border-left border-light border-right px-3">
                    <p class="text-left text-default small mb-0">
                        Assigned to: <strong class="text-primary">{{newnote.assignto.name}}</strong>
                    </p>
                </div>
                <div class="pl-3">
                    <p class="float-left mb-0 mr-2 small text-default text-left">Reminder by mail: </p>
                    <div class="align-items-center d-flex small text-primary">
                        <span class="ti-calendar mr-1"></span>
                        <strong v-html="remember"></strong>
                    </div>
                </div>
            </div>

        </template>
    </section>
</template>

<script>
import moment from 'moment'
import PrettyCheck from 'pretty-checkbox-vue/check'
import cloneDeep from 'lodash/cloneDeep'
import clone from 'lodash/clone'

export default {
  components: {
    'p-check': PrettyCheck
  },
  name: 'task',
  data () {
    return {
      newnote: {
        description: '',
        title: '',
        activity_type_id: 2,
        activity_status_id: 1,
        user_id: 1,
        assign_to: 1,
        assignto: {},
        activity_status: {},
        remember_at: moment().format(),
        finish_at: moment().format()
      },
      finish_time: {
        hh: moment().format('h'),
        mm: moment().format('mm'),
        A: moment().format('A')
      },
      remember_time: {
        hh: moment().format('h'),
        mm: moment().format('mm'),
        A: moment().format('A')
      },
      saving: false,
      done: false
    }
  },
  props: {
    activity: {type: Object},
    activity_type: {type: Array},
    id: {
      default () {
        return 'task'
      }
    },
    user_id: Number,
    users: Array,
    morph: Object,
    cancel: Boolean,
    contact: Object,
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
      this.newnote.remember_at = moment(this.newnote.remember_at).format()
      this.newnote.finish_at = moment(this.newnote.finish_at).format()
    }
  },
  computed: {
    finish () {
      return moment(this.newnote.finish_at).format('MM-DD-YYYY hh:mm a')
    },
    remember () {
      return moment(this.newnote.remember_at).format('MM-DD-YYYY hh:mm a')
    },
    contacts () {
      return this.$store.state.contacts
    }
  },
  watch: {
    done (value) {
      if (this.newnote.activity_status_id == 1 && value) {
        this.newnote.activity_status_id = 3
        this.save()
      }

      if (this.newnote.activity_status_id == 3 && !value) {
        this.newnote.activity_status_id = 1
        this.save()
      }
    },
    cancel (value) {
      if (value) this.discard()
    },
    activity (value) {
      this.newnote = value
    },
    'newnote.finish_at': function (value) {
      this.finish_time = {
        HH: moment(value).format('HH'),
        mm: moment(value).format('mm')
      }
      return moment(value).format()
    },
    'newnote.remember_at': function (value) {
      this.remember_time = {
        HH: moment(value).format('HH'),
        mm: moment(value).format('mm')
      }
      return moment(value).format()
    },
    'newnote.activity_status_id': function (value) {
      if (value == 1 || value == 2) this.done = false
      if (value == 3) this.done = true
      return value
    },
    user_id (value) {
      this.newnote.user_id = value
      return value
    },

    finish_time (value) {
      this.newnote.finish_at = moment(this.newnote.finish_at).set({hours:value.HH,minutes:value.mm}).format()
      return value
    },
    remember_time (value) {
      this.newnote.remember_at = moment(this.newnote.remember_at).set({hours:value.HH,minutes:value.mm}).format()
      return value
    }
  },
  methods: {
    save () {
      this.saving = true
      let temp = clone(this.newnote)
      temp.remember_at = moment.utc(temp.remember_at).format('YYYY-MM-DD HH:mm:ss')
      temp.finish_at = moment.utc(temp.finish_at).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('save', temp)
    },
    discard () {
      if (this.editforce) {
        this.newnote = clone(this.activity)
        this.$emit('changeedit', false)
        this.saving = false
      } else {
        this.newnote.description = ''
        this.newnote.title = ''
        this.newnote.remember_at = moment().format()
        this.newnote.finish_at = moment().format()
        this.newnote.assign_to = this.newnote.user_id
        this.newnote.activity_status_id = 1
        this.saving = false
      }
    }
  }
}
</script>

<style lang="scss">
    /*calendar*/
    .vdp-datepicker__calendar{
        right:0;
    }
    /*hours*/
    .time-picker .dropdown{
        left:initial;
        right: -10px;
    }

</style>
