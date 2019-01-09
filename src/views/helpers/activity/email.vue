<template>
    <section>
        <template v-if="edit">
            <div class="row d-flex align-items-center px-3">
                <div class="col-sm-12 py-2 d-flex border-bottom align-items-center">
                    <div class="mr-3">
                        <span class="small text-default"><strong>To:</strong></span>
                    </div>
                    <v-email :disabled="true" class="col" :value.sync="newnote.email.to" :options="newnote.email.to"></v-email>
                    <div class="col-auto">
                        <div class="row">
                            <div class="col-6 small text-primary show">
                                <button @click="cc=!cc" class="btn bg-white text-primary btn-sm p-0">CC</button>
                            </div>
                            <div class="col-6 small text-primary">
                                <button @click="bcc=!bcc" class="btn bg-white text-primary btn-sm p-0">BCC</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="cc" class="row d-flex align-items-center px-3">
                <div class="col-sm-12 py-2 d-flex align-items-center border-bottom">
                    <div class="mr-3 ">
                        <span class="small text-default"><strong>CC:</strong></span>
                    </div>
                    <v-email class="col" :value.sync="newnote.email.cc" :options="users_options"></v-email>
                </div>
            </div>
            <div v-if="bcc" class="row d-flex align-items-center px-3">
                <div class="col-sm-12 d-flex py-2 align-items-center border-bottom">
                    <div class="mr-3 ">
                        <span class="small text-default"><strong>BCC:</strong></span>
                    </div>
                    <v-email class="col" :value.sync="newnote.email.bcc" :options="users_options"></v-email>
                </div>
            </div>
            <div class="row d-flex px-3">
                <div class="col-sm-12 py-2 d-flex border-bottom align-items-center">
                    <div class="mr-3 ">
                    <span class="small text-default">
                        <strong>From:</strong>
                    </span>
                    </div>
                    <v-email :disabled="true" class="col" :value.sync="from" :options="from"></v-email>
                </div>
            </div>
            <div class="row px-3 d-flex mb-2">
                <div class="col-sm-12 py-2 d-flex border-bottom">
                    <div class="mr-3">
                    <span class="small text-default">
                        <strong>Subject:</strong>
                    </span>
                    </div>
                    <input v-model="newnote.email.subject" type="text" class="form-control-sm text-default border-0 col ml-3 content-input p-0 emails-fusion" placeholder="Add subject">
                </div>
            </div>
            <text-editor :id="id" :text.sync="newnote.email.body" class="pt-3"></text-editor>
            <transition name="showButtons">
                <div v-if="newnote.email.body || newnote.email.subject " class="col-12 clearfix mb-3 pt-3 create-buttons border-top">
                    <button @click="save" class="btn btn-primary btn-sm mr-2" :disabled="saving || !newnote.email.body || !newnote.email.subject">
                        <font-awesome-icon v-if="saving" icon="circle-notch" class="min-w-60" spin/>
                        <template v-if="!saving">Send Email</template>
                    </button>

                    <button :disabled="saving" @click="discard" class="btn btn-outline-primary btn-sm">Discard</button>
                </div>
            </transition>
        </template>
        <template v-else>
            <div class="row mx-0 pt-2 border-bottom">
                <div class="col-auto">
                    <p class="text-left text-default small mb-2">
                        <strong>Status:</strong> Error</p>
                </div>
                <div class="col-auto">
                    <p class="text-left text-default small mb-2">
                        <strong>Openings:</strong> 0</p>
                </div>
                <div class="col-auto">
                    <p class="text-left text-default small mb-2">
                        <strong>Clicks:</strong> 0</p>
                </div>
            </div>
            <div class="row px-3 pt-2">
                <div class="text-default small col-12 pt-3">
                    <p><strong v-html="newnote.email.subject"></strong></p>
                </div>
                <div class="text-default small col-12 border-bottom pb-3 mb-2" v-html="newnote.email.body">

                </div>
                <div v-if="!reply">
                    <button @click="reply = true" class="btn-sm btn bg-white text-primary mb-2 click-edit view-note">
                        <span class="ion ion-ios-undo "></span> Reply
                    </button>
                </div>
            </div>
            <template v-if="reply">
                <div class="row d-flex align-items-center px-3">
                    <div class="col-sm-12 py-2 d-flex border-bottom align-items-center">
                        <div class="mr-3">
                            <span class="small text-default"><strong>To:</strong></span>
                        </div>
                        <v-email :disabled="true" class="col" :value.sync="newnote.newemail.to" :options="newnote.newemail.to"></v-email>
                        <div class="col-auto">
                            <div class="row">
                                <div class="col-6 small text-primary show">
                                    <button @click="cc=!cc" class="btn bg-white text-primary btn-sm p-0">CC</button>
                                </div>
                                <div class="col-6 small text-primary">
                                    <button @click="bcc=!bcc" class="btn bg-white text-primary btn-sm p-0">BCC</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="cc" class="row d-flex align-items-center px-3">
                    <div class="col-sm-12 py-2 d-flex align-items-center border-bottom">
                        <div class="mr-3 ">
                            <span class="small text-default"><strong>CC:</strong></span>
                        </div>
                        <v-email class="col" :value.sync="newnote.newemail.cc" :options="users_options"></v-email>
                    </div>
                </div>
                <div v-if="bcc" class="row d-flex align-items-center px-3">
                    <div class="col-sm-12 d-flex py-2 align-items-center border-bottom">
                        <div class="mr-3 ">
                            <span class="small text-default"><strong>BCC:</strong></span>
                        </div>
                        <v-email class="col" :value.sync="newnote.newemail.bcc" :options="users_options"></v-email>
                    </div>
                </div>
                <div class="row d-flex px-3">
                    <div class="col-sm-12 py-2 d-flex border-bottom align-items-center">
                        <div class="mr-3 ">
                    <span class="small text-default">
                        <strong>From:</strong>
                    </span>
                        </div>
                        <v-email :disabled="true" class="col" :value.sync="from" :options="from"></v-email>
                    </div>
                </div>
                <div class="row px-3 d-flex mb-2">
                    <div class="col-sm-12 py-2 d-flex border-bottom">
                        <div class="">
                            <span class="small text-default">
                                <strong>Subject:</strong>
                            </span>
                        </div>
                        <input v-model="newnote.newemail.subject" type="text" class="form-control-sm text-default border-0 col ml-3 content-input p-0 emails-fusion" placeholder="Add subject">
                    </div>
                </div>
                <text-editor :id="id" :text.sync="newnote.newemail.body" class="pt-3"></text-editor>
                <transition name="showButtons">
                    <div v-if="newnote.newemail.body || newnote.newemail.subject " class="col-12 clearfix mb-3 pt-3 create-buttons border-top">
                        <button @click="save_reply" class="btn btn-primary btn-sm mr-2" :disabled="saving || !newnote.newemail.body || !newnote.newemail.subject">
                            <font-awesome-icon v-if="saving" icon="circle-notch" class="min-w-60" spin/>
                            <template v-if="!saving">Send Email</template>
                        </button>

                        <button :disabled="saving" @click="discard" class="btn btn-outline-primary btn-sm">Discard</button>
                    </div>
                </transition>
            </template>

        </template>
    </section>
</template>

<script>
import api from './../../../config/api'
import cloneDeep from 'lodash/cloneDeep'
import clone from 'lodash/clone'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'

export default {
  name: 'email',
  data () {
    return {
      reply: false,
      newnote: {
        description: '',
        title: '',
        activity_type_id: 3,
        user_id: 1,
        email: {
          to: [],
          subject: '',
          body: '',
          cc: [],
          bcc: [],
          from: []
        },
        newemail: {}
      },
      cc: false,
      bcc: false,
      clone_to: [],
      saving: false
    }
  },
  props: {
    activity: {type: Object},
    activity_type: {type: Array},
    contact: Object,
    morph: Object,
    id: {
      default () {
        return 'email'
      }
    },
    user_id: {
      required: true,
      default () {
        return null
      }
    },
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
      this.newnote.email.to.map(item => this.get_label(item))
      this.newnote.email.cc.map(item => this.get_label(item))
      this.newnote.email.bcc.map(item => this.get_label(item))
    }
  },

  watch: {
    activity (value) {
      this.newnote = cloneDeep(value)
      this.newnote.email.to.map(item => this.get_label(item))
      this.newnote.email.cc.map(item => this.get_label(item))
      this.newnote.email.bcc.map(item => this.get_label(item))
    },
    'newnote.email.subject': function (value) {
      this.newnote.title = value
    },
    'newnote.email.body': function (value) {
      this.newnote.description = value
    },

    cancel (value) {
      if (value) this.discard()
    },

    user_id (value) {
      this.newnote.user_id = value
    },

    contact (value) {
      this.newnote.email.to.push(this.get_label(value))
    },
    reply () {
      this.newnote.newemail = clone(this.newnote.email)
      this.newnote.newemail.subject = 'R: ' + this.newnote.newemail.subject
    }
  },
  computed: {
    users_options () {
      return map(this.contacts, item => this.get_label(item))
    },
    me () {
      return this.$store.state.me
    },
    from () {
      let temp
      if (!isEmpty(this.newnote.email.from)) {
        temp = this.newnote.email.from.map(item => this.get_label(item))
      } else {
        temp = this.users_options.filter(item => item.id == this.me.contact_id)
      }

      this.newnote.email.from = temp
      return temp
    },
    contacts () {
      return sortBy(this.$store.state.contacts, 'name')
    }
  },
  methods: {
    save_reply () {
      this.saving = true
      api.Emails().create(this.newnote.newemail).then(response => {
        this.newnote.email_id = response.data.data.id
        this.$emit('save', this.newnote)
      })
    },
    save () {
      this.saving = true
      api.Emails().create(this.newnote.email).then(response => {
        this.newnote.email_id = response.data.data.id
        this.$emit('save', this.newnote)
      })
    },
    discard () {
      if (this.editforce) {
        this.newnote = cloneDeep(this.activity)
        this.newnote.email.to.map(item => this.get_label(item))
        this.newnote.email.cc.map(item => this.get_label(item))
        this.newnote.email.bcc.map(item => this.get_label(item))
        this.reply = false
        this.saving = false
      } else {
        this.newnote.email.body = ''
        this.newnote.email.subject = ''
        this.newnote.email.cc = []
        this.newnote.email.bcc = []
        this.saving = false
      }
    },
    get_label (item) {
      item.name_email = `${item.name} (${item.email})`
      return item
    }
  }
}
</script>

<style scoped>

</style>
