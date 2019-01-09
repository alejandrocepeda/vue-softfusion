<template>

    <div class="tab-pane fade active show border-bottom activity-tabs">
        <tabs>
            <tab class="mt-5" icon="ti-book mr-1" name="Activities">
                <activities @updateActivity="updateActivity" @deleteActivity="deleteActivity" @adActivity="addActivity" v-if="activities.length > 0" :activities="activities" :morph="morph" :contact="contact"></activities>
                <loading v-if="loading"></loading>
            </tab>
            <tab class="mt-5" icon="ti-write mr-1" name="Notes">
                <activities @updateActivity="updateActivity" @deleteActivity="deleteActivity" @addActivity="addActivity" v-if="notes.length > 0" :activities="notes" :morph="morph" :contact="contact"></activities>
                <loading v-if="loading"></loading>
            </tab>
            <tab class="mt-5" icon="ti-list mr-1" name="Tasks">
                <activities @updateActivity="updateActivity" @deleteActivity="deleteActivity" @addActivity="addActivity" v-if="tasks.length > 0" :activities="tasks" :morph="morph" :contact="contact"></activities>
                <loading v-if="loading"></loading>
            </tab>
            <tab class="mt-5" icon="ti-email mr-1" name="Emails">
                <activities @updateActivity="updateActivity" @deleteActivity="deleteActivity" @addActivity="addActivity" v-if="emails.length > 0" :activities="emails" :morph="morph" :contact="contact"></activities>
                <loading v-if="loading"></loading>
            </tab>
            <tab class="mt-5" icon="ti-mobile mr-1" name="Registered Calls">
                <activities @updateActivity="updateActivity" @deleteActivity="deleteActivity" @addActivity="addActivity" v-if="calls.length > 0" :activities="calls" :morph="morph" :contact="contact"></activities>
                <loading v-if="loading"></loading>
            </tab>
            <tab class="mt-5" icon="ti-blackboard mr-1" name="Meetings">
                <activities @updateActivity="updateActivity" @deleteActivity="deleteActivity" @addActivity="addActivity" v-if="meetings.length > 0" :activities="meetings" :morph="morph" :contact="contact"></activities>
                <loading v-if="loading"></loading>
            </tab>
        </tabs>
    </div>

</template>

<script>
import activities from './activities'
import loading from './../../helpers/loading'
import clone from 'lodash/clone'
export default {
  components: {activities, loading},
  props: {
    activities: {type: Array},
    morph: Object,
    contact: {required: true, type: Object},
    loading: {default () {
      return true
    }}
  },
  data () {
    return {

    }
  },

  computed: {
    notes () {
      return clone(this.activities.filter(item => item.activity_type_id == 1))
    },
    tasks () {
      return clone(this.activities.filter(item => item.activity_type_id == 2))
    },
    emails () {
      return clone(this.activities.filter(item => item.activity_type_id == 3))
    },
    calls () {
      return clone(this.activities.filter(item => item.activity_type_id == 4))
    },
    meetings () {
      return clone(this.activities.filter(item => item.activity_type_id == 5))
    }

  },
  methods: {
    updateActivity (activity) {
      this.$emit('updateActivity', activity)
    },
    addActivity (activity) {
      this.$emit('addActivity', activity)
    },
    deleteActivity (activity) {
      this.$emit('deleteActivity', activity)
    }
  }
}
</script>

<style scoped>

</style>
