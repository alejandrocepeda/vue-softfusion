<template>
    <div class="border-bottom mb-4">
        <div>
            <tabs>
                <tab icon="ti-write mr-1" name="New Note">
                    <activity @addActivity="add_activity"  :morph="morph" id="note" type="1"></activity>
                </tab>
                <tab icon="ti-list mr-1" name="New Task">
                    <activity @addActivity="add_activity" :morph="morph" id="task" type="2"></activity>
                </tab>
                <tab icon="ti-email mr-1" name="New Email">
                    <activity @addActivity="add_activity" :contact="contact" :morph="morph" id="email" type="3"></activity>
                </tab>
                <tab icon="ti-mobile mr-1" name="New Call">
                    <activity @addActivity="add_activity" :contact="contact" :morph="morph" id="call" type="4"></activity>
                </tab>
                <tab icon="ti-blackboard mr-1" name="New Meeting">
                    <activity @addActivity="add_activity" :contact="contact" :morph="morph" id="meeting" type="5"></activity>
                </tab>
            </tabs>
        </div>
    </div>
</template>

<script>

// Basic Use - Covers most scenarios

import activity from './activity/activity'
import api from './../../config/api'

export default {
  components: {activity},
  props: {
    morph: Object,
    contact: Object
  },
  data () {
    return {
      typeTask: [],
      note: '',
      noteTask: '',
      task: '',
      emailSubject: '',
      email: '',
      phone: '',
      phoneName: '',
      phoneNote: '',
      meeting: '',
      meetingNote: '',
      state: {
        dateTask: new Date(),
        dateCall: new Date(),
        dateMeeting: new Date(),
        reminderTask: new Date()
      },
      timeTask: {
        HH: new Date().getHours(),
        mm: new Date().getMinutes(),
        ss: '00'
      },
      timeCall: {
        HH: new Date().getHours(),
        mm: new Date().getMinutes(),
        ss: '00'
      },
      timeMeeting: {
        HH: new Date().getHours(),
        mm: new Date().getMinutes(),
        ss: '00'
      }
    }
  },
  mounted () {
    api.ActivityStatuses().getAll().then(response => this.typeTask = response.data.data)
  },
  methods: {
    showButtons () {
      return true
    },

    changeNote (value) {
      this.note = value
    },
    CreateNote (value) {
      // convertir a un objecto
      api.Notes().create(this.note)
      this.note = value
    },
    changeNoteTask (value) {
      this.noteTask = value
    },
    changeEmail (value) {
      this.email = value
    },
    changePhoneNote (value) {
      this.phoneNote = value
    },
    changeMeetingNote (value) {
      this.meetingNote = value
    },
    add_activity (activity) {
      this.$emit('addActivity', activity)
    }

  }
}
</script>

<style>
    .min-width-date{
        width: 6em !important;
    }

    .time-picker{
        width: 5em !important;
    }

    .ql-editor.ql-blank:before{
        font-style: normal !important;
    }

</style>
