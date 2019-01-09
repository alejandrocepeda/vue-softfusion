<template>
    <section>
        <template v-if="edit">
            <div class="row d-flex align-items-center px-3">
                <input v-model="newnote.title" id="input-meeting-create" type="text" placeholder="What is the meeting about?" class="form-control text-default border-0 col content-input meetings-fusion">
                <div class="col-auto">
                    <div class="row">
                        <div class="col-auto mt-1">
                            <span class="text-left text-default small my-2">Start Date</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto small text-primary d-flex align-items-center">
                            <span class="ti-calendar mr-1"></span>
                            <datepicker v-model="newnote.finish_at" format="MM-dd-yyyy" class="text-default min-width-date"
                                        input-class="bg-transparent border-0 position-relative text-primary z-index-1 cursor-pointer min-width-date"
                                        name="uniquename"></datepicker>
                            <div class="dropdown-toggle float-right"></div>
                        </div>
                        <div class="col-auto small text-primary d-flex align-items-center">
                            <span class="ti-time m-0 mr-1"></span>
                            <vue-timepicker format="hh:mm A" hide-clear-button :minute-interval="15" v-model="finish_time"></vue-timepicker>
                            <div class="dropdown-toggle float-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mt-1">
            <div class="row">
                <div class="col-sm-8 ">
                    <text-editor :id="id" :text.sync="newnote.description" class="pt-2"></text-editor>
                    <hr class="my-1">
                    <div class="row">
                        <div class="col-md-6 mx-3">
                            <p class="text-left text-default small my-2">Duration</p>
                            <v-select class="text-default border-0 rounded-0 mb-3 w-75" :value.sync="newnote.duration" label="name" :options="durations"></v-select>
                        </div>
                    </div>
                </div>
                <div class="col border-left mb-3">
                    <p class="text-default small pt-1 mb-2">Add an assistant</p>
                    <div v-for="(item,key) in newnote.assistants" class="alert alert-secondary small  align-items-center d-flex p-1 border-secondary rounded-0 mb-2" role="alert">
                        <progressive-img :aspect-ratio="1" :src="item.photo" class="rounded-circle m-0 mr-2" style="width: 30px;"/>
                        {{item.name}}

                        <button @click="deleteAssistant(item.id)" v-if="key>0" type="button" aria-label="Remove option" class="close" style="right: 10px;position: absolute;">
                            <span aria-hidden="true">×</span></button>
                    </div>
                    <div class="row px-3 d-flex align-items-center">
                        <span class="font-result-size ti-plus mr-1 text-primary"></span>
                        <v-select class="col" placeholder="Add Assistant" @change="addAssistant" :value.sync="clone_assistant" label="name" :options="contacts"></v-select>
                    </div>
                </div>
            </div>
            <transition name="showButtons">
                <div v-if="newnote.title || newnote.description" class="col-12 clearfix mb-3 pt-3 border-top">

                    <button @click="save" class="btn btn-primary btn-sm mr-2" :disabled="saving || !newnote.description">
                        <font-awesome-icon v-if="saving" icon="circle-notch" class="min-w-60" spin/>
                        <template v-if="!saving">Schedule Meeting</template>
                    </button>
                    <button :disabled="saving" @click="discard" class="btn btn-outline-primary btn-sm">Discard</button>
                </div>
            </transition>
        </template>
        <template v-else>
            <div class="">
                <div class="row d-flex align-items-center px-3">
                    <div class="col mt-1">
                    <span class="text-primary h6 d-flex align-items-center mb-0">
                        <p-check class="p-icon p-bigger p-smooth p-round" color="success" toggle v-model="done">
                            <i class="icon ti-check" slot="extra"></i>
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
                <hr class="mt-1">
                <div class="row">
                    <div class="col-sm-8 ">
                        <div v-html="newnote.description" class="pb-3 pt-1 px-3 text-default small border-bottom"></div>
                        <div class="row">
                            <div class="col-md-6 mx-3">
                                <p class="text-left text-default small my-2">Duration</p>
                                <v-select class="text-default border-0 rounded-0 mb-3 w-75 disabled" disabled :value.sync="newnote.duration" label="name" :options="durations"></v-select>
                            </div>
                        </div>
                    </div>
                    <div class="col border-left mb-3">
                        <p class="text-default small pt-1 mb-2">Assistants</p>
                        <div v-for="(item,key) in newnote.assistants" class="alert alert-secondary small  align-items-center d-flex p-1 border-secondary rounded-0 mb-2" role="alert">
                            <progressive-img :aspect-ratio="1" :src="item.photo" class="rounded-circle m-0 mr-2" style="width: 30px;"/>
                            {{item.name}}

                        </div>
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
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'

export default {
  components: {
    'p-check': PrettyCheck
  },
  name: 'meeting',
  data () {
    return {
      durations: [
        {id: 15, name: '15 Minutes'},
        {id: 30, name: '30 Minutes'},
        {id: 45, name: '45 Minutes'},
        {id: 60, name: '1 Hour'},
        {id: 120, name: '2 Hours'},
        {id: 180, name: '3 Hours'},
        {id: 240, name: '4 Hours'},
        {id: 360, name: '6 Hours'},
        {id: 480, name: '8 Hours'}
      ],
      newnote: {
        description: '',
        title: '',
        activity_type_id: 5,
        activity_status_id: 1,
        duration: 15,
        user_id: 1,
        assistants: [],
        finish_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      finish_time: {
        hh: moment().format('h'),
        mm: moment().format('mm'),
        A: moment().format('A')
      },

      clone_assistant: 0,
      saving: false,
      done: false
    }
  },
  props: {
    activity: {type: Object},
    activity_type: {type: Array},
    id: {
      default () {
        return 'meeting'
      }
    },
    user_id: Number,
    contact: Object,
    users: Array,
    morph: Object,
    cancel: Boolean,
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
    finish () {
      return moment(this.newnote.finish_at).format('MM-DD-YYYY hh:mm a')
    },
    contacts () {
      return sortBy(this.$store.state.contacts, 'name')
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
      this.newnote = cloneDeep(value)
    },
    'newnote.finish_at': function (value) {
      this.finish_time = {
        HH: moment(value).format('HH'),
        mm: moment(value).format('mm')
      }
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    'newnote.activity_status_id': function (value) {
      if (value == 1 || value == 2) this.done = false
      if (value == 3) this.done = true
      return value
    },
    contact (value) {
      this.newnote.assistants.push(this.get_label(value))
      this.clone_assistant = ''
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
    deleteAssistant (id) {
      this.newnote.assistants = this.newnote.assistants.filter(item => item.id != id)
    },
    addAssistant (value) {
      if (!find(this.newnote.assistants, item => item.id == value) && typeof value !== 'undefined') {
        this.newnote.assistants.push(this.get_label(find(this.contacts, item => item.id == value)))
      }
      this.clone_assistant = 0
    },
    get_label (item) {
      item.contact_id = item.id
      return item
    },

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
        this.newnote.title = ''
        this.newnote.assistants = []
        this.newnote.duration = 15
        this.newnote.assistants.push(this.get_label(this.contact))
        this.saving = false
      }
    }
  }
}
</script>

<style scoped>

</style>
