<template>
  <component :activity="activity" :editforce="editforce" :edit="edit" @changeedit="changeEdit" :id="id" :cancel="cancel" :contact="contact" :user_id="me.id" :morph="morph" :activity_type="activity_statuses" :is="component" @save="saveActivity"></component>
</template>

<script>
import note from './note'
import call from './call'
import email from './email'
import meeting from './meeting'
import task from './task'
import api from './../../../config/api'

export default {
  name: 'activity',
  components: {note, call, email, meeting, task},
  data () {
    return {
      component_type: this.type ? this.type : 1,
      cancel: false
    }
  },
  props: {
    activity: {type: Object},
    type: {
      default () {
        return 1
      }
    },
    id: {
      default () {
        return 'note'
      }
    },
    morph: Object,
    contact: Object,
    edit: {
      default () {
        return true
      }
    },
    editforce: {
      default () {
        return false
      }
    }
  },
  computed: {
    component () {
      return this.setComponent(parseInt(this.component_type))
    },
    me () {
      return this.$store.state.me
    },
    activity_statuses () {
      return this.$store.state.activity_statuses
    }
  },
  watch: {
    type (value) {
      this.component_type = value
    }
  },
  methods: {
    changeEdit (value) {
      this.$emit('update:edit', value)
    },
    saveActivity (value) {
      if (value.id && !value.email_id) {
        this.cancel = false
        api.Activity().update(value.id, value).then(response => {
          api.SuccessResponse(response)
          this.$emit('updateActivity', response.data.data)
          this.cancel = true
          this.$emit('update:edit', false)
        }).catch(error => {
          api.ErrorResponse(error)
          this.cancel = true
        })
      } else {
        this.cancel = false
        api.Activity().create(value).then(response => {
          this.assignActivityToLead(response)
          api.SuccessResponse(response)
          this.$emit('addActivity', response.data.data)
          this.cancel = true
          this.$emit('update:edit', false)
        }).catch(error => {
          api.ErrorResponse(error)
          this.cancel = true
        })
      }
    },
    setComponent (id) {
      switch (id) {
        case 1:
          return 'note'
          break
        case 2:
          return 'task'
          break
        case 3:
          return 'email'
          break
        case 4:
          return 'call'
          break
        case 5:
          return 'meeting'
          break
        default:
          return 'note'
      }
    },
    assignActivityToLead (response) {
      axios.put(`${this.morph.type}/${this.morph.id}/activities/${response.data.data.id}`).then(response => {
      }).catch(error => {
        api.ErrorResponse(error)
      })
    }
  }
}
</script>

<style>
  .showButtons-enter{
    opacity:       0;
    transform:     translateY(0px);
    height:        0px;
    padding-top:   0 !important;
    margin-bottom: 0 !important;
  }
  .showButtons-enter button{
    height:    0;
    transform: scaleY(0);
  }
  .showButtons-leave button{
    height:    31px;
    transform: scaleY(1);
  }
  .showButtons-enter-to button{
    transform: scaleY(1.1);
  }
  .showButtons-enter-to{
    opacity:   0.5;
    transform: translateY(8px);
  }
  .showButtons-leave{
    opacity:       1;
    transform:     translateY(48px);
    height:        48px;
    padding-top:   16px !important;
    margin-bottom: 16px !important;
  }
  .showButtons-leave-to{
    opacity:   0.5;
    transform: translateY(-8px);
  }
  .showButtons-enter-active, .showButtons-leave-active, .showButtons-enter-active button, .showButtons-leave-active button{
    transition: opacity .5s;
    transition: transform .4s;
    transition: ease all .4s;
  }
</style>
