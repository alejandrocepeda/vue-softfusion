<template>
  <section>
    <transition-group name="fade">
      <template v-for="(group,key,index) in group_activities">
        <div class="row" :key="key">
          <div class="col-1 pr-0 d-flex mx-auto timeline-icon flex-columnn">
            <div v-if="index != 0" class="d-flex timeline-border-minn timeline-start position-absolute"></div>
            <div class="d-flex timeline-border"></div>
          </div>
          <div class="col-11">
            <h4 class="font-weight-light text-default mb-3">{{key}}</h4>
          </div>
        </div>
        <div class="row" v-for="(item) in group" :key="item.id">
          <div class="col-1 pr-0 d-flex mx-auto timeline-icon flex-columnn">
            <div class="d-flex timeline-border-minn timeline-start position-absolute"></div>
            <div class="d-flex timeline-border-min"></div>
            <div class="align-items-center d-flex position-relative">
              <span :class="activityIcon(item.activity_type_id)" class="bg-primary full_rounded mx-auto bullet text-center text-white z-index-2"></span>
              <span class="bg-primary full_rounded mx-auto p-1 position-absolute right text-center text-white"></span>
              <hr class="border-primary border-top position-absolute right top-1 w-50 z-index-1">
            </div>
            <div v-if="item.id != last.id" class="d-flex timeline-border"></div>
          </div>
          <div class="col-11 activities pl-0 pr-3">
            <div class="border-bottom mb-4 mx-3">
              <div class="row text-default border-0 d-flex  px-2 align-items-center">
                <div class="col-auto">
                  <progressive-img :aspect-ratio="1" :src="item.user.image.url" class="img-thumbnail rounded-circle m-0 activity-img"/>
                </div>
                <div class="col pl-0">
                  <div class="truncate-ellipsis">
                    <p class="small mb-0 ">
                      <strong>{{item.user.name == me.name ? 'You':item.user.name}}</strong>
                      {{activityAbout(item.activity_type_id)}} <strong>{{activityTarget(item)}}</strong>
                    </p>
                  </div>
                  <div class="truncate-ellipsis">
                    <p class="small mb-0">{{item.finish_at ? created_At(item.finish_at) :
                      created_At(item.created_at)}}</p>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="row">
                    <div v-if="item.activity_type_id != 3" class="col-auto small text-primary">
                      <button @click="changeedit(item,group)" class="click-edit btn bg-white text-primary btn-sm p-0 d-flex align-items-center">
                        <span class="ti-pencil mr-1"></span>Edit
                      </button>
                    </div>
                    <div class="col-auto small text-primary">
                      <button @click="deleteActivity(item)" class="btn bg-white text-primary btn-sm p-0 d-flex align-items-center">
                        <span class="ti-trash mr-1"></span>Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="mt-3 mb-0">
              <div>
                <activity @updateActivity="updateActivity" @addActivity="addActivity" :editforce="true" :id="sample" :activity="item" :edit.sync="item.edit" :contact="contact" :morph="morph" :type="item.activity_type_id"></activity>
              </div>
            </div>
          </div>
        </div>
      </template>
    </transition-group>
  </section>
</template>

<script>
import activity from './activity'
import moment from 'moment'
import api from './../../../config/api'
import orderBy from 'lodash/orderBy'
import clone from 'lodash/clone'
import last from 'lodash/last'
import groupBy from 'lodash/groupBy'
import sampleSize from 'lodash/sampleSize'

export default {
  name: 'activities',
  components: {activity},
  props: {
    activities: {required: true, type: Array},
    morph: Object,
    contact: {required: true, type: Object}
  },
  data () {
    return {last: Number}
  },
  computed: {
    group_activities () {
      let temp = clone(orderBy(this.activities.map(item => {
        // set time to local
        item.created_at = moment.utc(item.created_at).local().format()
        if (item.remember_at) {
          item.remember_at = moment.utc(item.remember_at).local().format()
        }
        if (item.finish_at) {
          item.finish_at = moment.utc(item.finish_at).local().format()
          item.time = moment(item.finish_at).isAfter(item.created_at) ? moment(item.finish_at) : moment(item.created_at)
        } else {
          item.time = moment(item.created_at)
        }
        this.$set(item, 'edit', false)
        return item
      }), 'time', 'desc'))
      this.last = last(temp)
      temp.map((item) => {
        item.time = item.time.calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'MMMM YYYY'
        })
        return item
      })
      return groupBy(temp, 'time')
    },
    sample () {
      return sampleSize('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5).join('')
    },
    me () {
      return this.$store.state.me
    }
  },
  methods: {
    deleteActivity (activity) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        customClass: 'bg-body rounded-0',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success rounded-0 font-weight-light',
        cancelButtonClass: 'btn btn-danger rounded-0 font-weight-light',
        confirmButtonColor: '#53D190',
        cancelButtonColor: '#F65F6E',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          api.Activity().delete(activity.id).then(response => {
            this.$emit('deleteActivity', activity)
            this.$swal({
              title: 'Deleted!',
              text: 'Activity has been deleted.',
              type: 'success',
              customClass: 'bg-body rounded-0',
              confirmButtonClass: 'btn btn-primary rounded-0 font-weight-light bg-primary'
            })
          }).catch(error => {

          })
        }
      })
    },
    activityAbout (type) {
      if (type === 1) return 'left a note about'
      if (type === 2) return 'create a task for'
      if (type === 3) return 'send an email to'
      if (type === 4) return 'registered a call with'
      if (type === 5) return 'had a meeting with'
    },
    activityTarget (activity) {
      if (activity.activity_type_id === 1) return this.contact.name
      if (activity.activity_type_id === 2) return activity.assignto.name
      if (activity.activity_type_id === 3) return this.contact.name
      if (activity.activity_type_id === 4) return this.contact.name
      if (activity.activity_type_id === 5) return this.contact.name + ', ' + activity.assistants.map(o => o.name).join(', ')
    },
    activityIcon (type) {
      if (type === 1) return 'ti-write'
      if (type === 2) return 'ti-list'
      if (type === 3) return 'ti-email'
      if (type === 4) return 'ti-mobile'
      if (type === 5) return 'ti-blackboard'
    },
    changeedit (item, group) {
      group.map(val => {
        if (val.id !== item.id) val.edit = false
        return val
      })
      item.edit = !item.edit
    },
    date (value) {
      return moment(value).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'MMMM YYYY'
      })
    },
    created_At (value) {
      return moment(value).format('dddd, MMMM Do YYYY, h:mm a')
    },
    updateActivity (activity) {
      this.$emit('updateActivity', activity)
    },
    addActivity (activity) {
      this.$emit('addActivity', activity)
    }
  }
}
</script>

<style scoped lang="scss">
  .bullet{
    padding: 11px !important;
  }
  .activities > div{
    border:         1px solid #EFEFEF;
    border-radius:  8px;
    padding:        10px;
    padding-bottom: 0;
    & > div{
      margin-top: .3rem !important;
    }
  }
</style>
