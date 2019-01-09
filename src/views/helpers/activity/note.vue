<template>
    <section>
        <template v-if="edit">
            <text-editor :id="'t'+id" :text.sync="newnote.description" class="pt-4"></text-editor>
            <transition name="showButtons">
                <div v-if="newnote.description" class="col-12 clearfix mb-3 pt-3 border-top buttons-create">
                    <button @click="save" class="btn btn-primary btn-sm mr-2" :disabled="saving">
                        <font-awesome-icon v-if="saving" icon="circle-notch" class="min-w-60" spin/>
                        <template v-if="!saving">Save Note</template>
                    </button>
                    <button :disabled="saving" @click="discard" class="btn btn-outline-primary btn-sm">Discard</button>
                </div>
            </transition>
        </template>
        <template v-else>
            <div class="row px-4 pt-2">
                <div class="text-default small pb-1" v-html=newnote.description></div>
            </div>
        </template>
    </section>

</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import clone from 'lodash/clone'

export default {
  name: 'note',
  data () {
    return {
      newnote: {
        description: '',
        activity_type_id: 1,
        user_id: 1,
        activity_status_id: 1
      },
      saving: false
    }
  },
  props: {
    activity: {type: Object},
    activity_type: {type: Array},
    morph: Object,
    cancel: Boolean,
    id: {
      default () {
        return 'note'
      }
    },
    user_id: Number,
    users: Array,
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
    }
  },
  watch: {
    activity (value) {
      this.newnote = cloneDeep(value)
    },
    user_id (value) {
      this.newnote.user_id = value
      return value
    },
    cancel (value) {
      if (value) this.discard()
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
