<template>
    <div>
        <div class="table-responsive">
            <table class="table small text-default ">
                <thead>
                <tr>
                    <th v-for="(column, index) in columnas" :key="index"
                        @click="sort(index)" :class="column.class" class="border-bottom-table-secondary min-w border-top-0">
                        {{column.label}}
                    </th>
                    <th v-if="actions" class="border-bottom-table-secondary min-w border-top-0">Actions</th>
                </tr>
                </thead>
                <tbody>
                <template v-if="loading">
                    <tr class="loading" :key="loading">
                        <td colspan="100">
                            <loading></loading>
                        </td>
                    </tr>
                </template>
                <template v-else is="transition-group" name="fade">
                    <tr v-for="(item,index) in rows" :key="item.id">
                        <td v-for="column in columnas" :class="column.class"  >
                            <span v-if="column.level" :class="'px-3 py-1 badge badge-pill text-capitalize badge-'+collect(item,column.level)">{{ collectFormatted(item,column)}}</span>

                            <div  v-else-if="column.preview">{{ collectFormatted(item,column)}}
                                <div class="mt-1 position-absolute right top hover pagination-btn-preview">
                                    <button @click="$emit('preview',item)"  class="btn-outline-primary  mt-2  py-1 small ">Preview</button>
                                </div>
                            </div>

                            <span v-else>{{ collectFormatted(item,column)}}</span>
                        </td>
                        <td v-if="actions">
                            <router-link :to="{ name: route_uri+'-id', params: { id: item.id }}">
                                <span class="ti-pencil-alt mr-1 rounded view text-default"></span>
                            </router-link>
                            <span class="ti-trash mr-1 delete text-default" @click="delete_item(item.id)"></span>
                        </td>
                    </tr>
                </template>
                </tbody>
                <thead>
                <tr>
                    <th v-for="column in columnas" :class="column.class" class="border-bottom-table-secondary min-w">
                        {{column.label}}
                    </th>
                    <th v-if="actions" class="border-bottom-table-secondary min-w ">Actions</th>
                </tr>
                </thead>
            </table>
        </div>
        <div class="row align-items-center border-bottom pb-3 mx-0 mb-4">
            <div class="col-md text-default text-md-left text-right">

                <span class="small">Show</span>

                <select v-model="ShowEntries" @change="changeEntries(ShowEntries)" class="mx-3 custom-select form-control-sm">
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>

                <span class="small">Entries</span>

            </div>
            <div class="col-xl col-0 d-xl-block d-none text-center">
                <span class="small text-default px-1">Showing {{this.pagination.from}} to {{this.pagination.to}} of {{this.pagination.total}} entries</span>
            </div>
            <div class="col-md align-items-center mt-xl-0 mt-3">
                <nav class="float-right">
                    <ul class="pagination mb-0 small">
                        <li class="page-item" :class="{'disabled':pagination.current_page == 1}">
                            <a class="text-secondary page-link" href="javascript:void(0)" aria-label="Previous" v-on:click.prevent="changePage(pagination.current_page - 1)">
                                <span aria-hidden="true">« Previous</span>
                            </a>
                        </li>
                        <li class="page-item" v-for="page in pagesNumber" :class="{'active': page == pagination.current_page}">
                            <a class="text-secondary page-link" href="javascript:void(0)" v-on:click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{'disabled':pagination.current_page == pagination.last_page}">
                            <a class="text-secondary page-link" href="javascript:void(0)" aria-label="Next" v-on:click.prevent="changePage(pagination.current_page + 1)">
                                <span aria-hidden="true">Next »</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    </div>
</template>

<script>
import each from 'lodash/forEach'
import first from 'lodash/first'
import words from 'lodash/words'
import loading from './loading'
import * as CoreDataTypes from '../../config/filters'

const dataTypes = {}
const coreDataTypes = CoreDataTypes.default
each(Object.keys(coreDataTypes), (key) => {
  const compName = key
  dataTypes[compName] = coreDataTypes[key]
})

export default {
  components: {
    loading

  },
  name: 'pagination',
  props: {
    actions: {
      type: Boolean,
      default: true
    },
    uri: {
      type: String,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    offset: {
      type: Number,
      default: 2
    },
    columns: {
      required: true,
      type: Array
    },
    rows: {
      required: true,
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
      Page: 1,
      ShowEntries: 15,
      dataTypes: dataTypes || {},
      showModals: false
    }
  },

  computed: {
    columnas () {
      let app = this
      return app.columns.map(item => {
        if (item.type) item.typeDef = app.dataTypes[item.type]
        return item
      })
    },
    pagesNumber () {
      if (!this.pagination.to) {
        return []
      }
      let from = this.pagination.current_page - this.offset
      if (from < 1) {
        from = 1
      }
      let to = from + (this.offset * 2)
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page
      }
      let pagesArray = []
      for (let page = from; page <= to; page++) {
        pagesArray.push(page)
      }
      return pagesArray
    },
    route_uri () {
      return first(words(this.uri))
    }
  },
  methods: {
    delete_item (id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
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
          axios.delete(this.route_uri + '/' + id, {}).then(() => {
            this.$emit('update:rows', this.rows.filter(item => item.id != id))

            this.$swal({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              type: 'success',
              customClass: 'bg-body rounded-0',
              confirmButtonClass: 'btn btn-primary rounded-0 font-weight-light bg-primary'
            })
          })
        }
      })
    },
    collectFormatted (obj, column) {
      let value

      value = this.collect(obj, column.field)

      if (value === undefined) return ''

      // lets format the resultant data
      const type = column.typeDef

      if (typeof type !== 'undefined' && value != '') {
        return type.format(value)
      }

      return value
    },
    collect (obj, field) {
      // utility function to get nested property
      function dig (obj, selector) {
        let result = obj
        const splitter = selector.split('.')
        for (let i = 0; i < splitter.length; i++) {
          if (typeof result === 'undefined') {
            return undefined
          }
          result = result[splitter[i]]
        }
        return result
      }

      if (typeof field === 'string') return dig(obj, field)
      return undefined
    },
    changePage (page) {
      this.Page = page
      this.setUri()
    },
    changeEntries (value) {
      this.ShowEntries = value
      this.setUri()
    },
    setUri () {
      this.$emit('paginate', this.uri + '&page=' + this.Page + '&per_page=' + this.ShowEntries)
    }
  }
}
</script>

<style scoped lang="scss">
    .custom-select{
        width: auto !important;
    }

    tr{
        td{position:relative;}

        &:hover{
            .hover{
                display: block;
            }
        }

        .hover{
            display: none;
        }

    }

</style>

<style lang="css">
    .awn-toast{
        z-index: 999999;
    }

    tr:hover .contact-td div {
        width:140px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    tr:hover .contact-td div.hover{
        width: auto;
    }

    .contact-td{
        width: 214px;
    }
</style>
