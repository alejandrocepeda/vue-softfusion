<template>
  <div class="row px-3 my-3 mr-0">
    <div id="lead-status-new-lead" v-for="(step,index) in groupStatuses" :class="step[0].level2" class="col p-2 text-default progress-bar">
      <template v-if="step.length > 1">
                <span class="dropdown-toggle text-capitalize" data-toggle="dropdown">
                     <template v-for="item in step" v-if="item.select">
                        {{item.name}}
                     </template>

                </span>
        <div class="dropdown-menu">
          <template v-for="item in step">
            <a @click="newStatus(item.id)" v-if="item.level == 'danger'" data-toggle="modal" data-target="#modal-dead" class="dropdown-item small text-default text-capitalize" role="button">{{item.name}}</a>
            <a @click="newStatus(item.id)" v-else class="dropdown-item small text-default text-capitalize" role="button">{{item.name}}</a>
          </template>

        </div>
      </template>
      <template v-else>
        <span class="text-capitalize" @click="newStatus(step[0].id)">{{step[0].name}}</span>
      </template>
    </div>

    <!--Modal-->
    <div class="modal fade opacity-modal" id="modal-dead" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-0">
          <div class="px-5 modal-header rounded-0 text-white bg-secondary">
            <h5 class="modal-title font-weight-light">Why dead lead?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white font-weight-light">×</span>
            </button>
          </div>
          <div class="modal-body px-5 mt-2">
            <textarea class="form-control border-0 pt-3 text-default content-textarea" placeholder="Start writing to leave a note..."></textarea>
            <div class="px-2 mx-1 my-2 note-options">
              <span class="ion text-default mr-3">T</span> <span class="ion ion-link text-default mr-3"></span>
              <span class="ion ion-paperclip text-default mr-2"></span>
            </div>

          </div>
          <div class="px-5 justify-content-start col-12 clearfix pt-3 border-top modal-footer">
            <button class="small rounded-0 px-3 py-2 btn btn-primary btn-sm mr-3 disabled save-note">Save Note
            </button>
            <button class="small rounded-0 px-3 py-2 btn btn-outline-primary btn-sm discard" data-dismiss="modal">
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End Modal-->
  </div>
</template>

<script>
import find from 'lodash/find'
import map from 'lodash/map'
import flatten from 'lodash/flatten'
import last from 'lodash/last'
import groupBy from 'lodash/groupBy'

export default {
  props: {
    statuses: {
      required: true
    },
    status: {
      required: true,
      default () {
        return 1
      }
    }
  },
  computed: {
    statusnew () {
      return find(this.statuses, {'id': this.status})
    },
    steps () {
      let app = this
      let temp = map(this.statuses, (value) => {
        value.level2 = 'bg-progress border-progress'
        value.select = false
        if (value.step <= app.statusnew.step) value.level2 = 'text-white bg-' + app.statusnew.level + ' border-' + app.statusnew.level
        if (value.step != app.statusnew.step && value.level == 'success' || value.id == app.statusnew.id) value.select = true
        return value
      })
      let selected = map(groupBy(temp, 'step'), group => {
        return group.filter(item => item.select === true)
      })
      selected = flatten(selected.filter(group => group.length > 1))
      if (selected.length > 1) {
        let lasted = last(selected)
        temp = temp.map(item => {
          if (item.id == lasted.id) {
            item.select = false
          }
          return item
        })
      }
      return temp
    },
    groupStatuses () {
      return map(groupBy(this.steps, 'step'), value => value)
    }
  },
  methods: {
    newStatus (id) {
      this.$emit('update:status', id)
      this.$emit('change')
    }
  }
}
</script>

<style scoped>

</style>
