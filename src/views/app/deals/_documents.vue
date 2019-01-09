<template>
    <div id="create_document" role="tabpanel" class="tab-pane fade active show">
        <div class="row align-items-center px-3 my-4">
            <div class="col-auto">
                <h6 class="mb-0 text-primary">Documentation required</h6>
            </div>
            <div class="col">
                <button class="btn-success small text-white float-right d-flex align-items-center rounded-0 py-2 px-3 mr-3">
                    <span class="ti-location-arrow mr-1"></span>Send deal signature
                </button>
                <button class="btn-success small text-white float-right d-flex align-items-center rounded-0 py-2 px-3 mr-3">
                    <span class="ti-location-arrow mr-1"></span>Send coborrower signature
                </button>
                <form class="d-none d-sm-block float-md-right mr-4 ml-lg-auto">
                    <div class="input-group my-2 my-md-0">
                        <input type="text" placeholder="Search..." class="form-control search">
                        <div class="input-group-prepend">
                            <span id="basic-addon1" class="input-group-text rounded-right search-icon">
                                <span class="ti-search mr-0 "></span>
                            </span>
                        </div>
                    </div>
                </form>
            </div>

            <!--Modal Preview documents -->
            <div data-backdrop="static" data-keyboard="false" class="modal fade modal-prev-doc">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Document Preview</h5>
                            <button type="button" class="close" @click="modal=false" data-dismiss="modal">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div v-if="modal" class="modal-body">
                            <loading v-if="loadingProgress != 1"></loading>
                            <pdf @progress="loadingProgress = $event" :src="url"></pdf>
                        </div>
                        <div class="col-12 clearfix pt-3 border-top modal-footer">
                            <a class="btn btn-primary btn-sm mr-2 download-prev" :href="url" download> Download </a>
                            <button class="btn btn-outline-primary btn-sm discard" @click="modal=false" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Modal-->
        </div>

        <!--Note: List of application Documents-->
        <table class="  table small text-default">
            <thead>
            <tr class="table-header alert-primary">
                <th scope="col" class="border-bottom-table-secondary pl-3 border-top-table-secondary">Document name</th>
                <th scope="col" width="15%" class="border-bottom-table-secondary border-top-table-secondary"></th>
                <th scope="col" class="text-center border-bottom-table-secondary border-top-table-secondary">Download</th>
                <th scope="col" width="15%" class="border-bottom-table-secondary border-top-table-secondary">Last updated</th>
                <th scope="col" class="text-center border-bottom-table-secondary border-top-table-secondary">Actions</th>
            </tr>
            </thead>
            <tbody id="documentation-table-body">
            <template v-for="group in documents">
                <tr class="bg-body border-top-table-secondary">
                    <th class="pl-3" colspan="5">{{group.type}}</th>
                </tr>
                <template v-for="document in group.documents">
                    <tr>
                        <td>
                            <template v-if="document.id">
                                <a v-text="name(document)" @click="openModalPdf(document.url)" data-toggle="modal" class="doc-prev-link pl-3" data-target=".modal-prev-doc" :href="document.url"></a>
                            </template>
                            <span class="pl-3" v-else v-text="name(document)"></span>
                        </td>
                        <td>
                            <template v-if="!document.id">
                                <input type="file" @change="uploadFile(document,$event)">
                            </template>
                        </td>
                        <td class="text-center">
                            <a v-if="document.url" :href="document.url" download><span class="ti-import mr-1 view text-default"></span></a>
                        </td>
                        <td>{{document.updated_at}}</td>
                        <td class="text-center">
                            <span v-if="document.id" class="iti-trash mr-1 delete text-default" @click="$emit('deleteDocument', document)"></span>
                        </td>
                    </tr>
                </template>
            </template>
            </tbody>
        </table>
        <!--NEW DOCUMENT TEMPLATE-->
        <section id="soft-documents">
            <!--table header-->
            <div class="soft-documents-header">
                <div class="row">
                    <div class="col-sm-2">
                        <h3>RECIEVED DOCUMENT</h3>
                    </div>
                    <div class="col-sm-10">
                        <div class="row">
                            <div class="col-sm-8">
                                <h3>NAME</h3>
                            </div>
                            <div class="col-sm-4">
                                <div class="row">
                                    <div class="col-sm-3"><h3>CREATED BY</h3></div>
                                    <div class="col-sm-3"><h3>LAST UPDATE</h3></div>
                                    <div class="col-sm-3"><h3>SIZE</h3></div>
                                    <div class="col-sm-3"><h3>ACTIONS</h3></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-sm-2">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <template v-for="group in documents">
                            <a class="nav-link" id="v-pills-home-tab" data-toggle="pill" :href="'#' + group.type.replace(/\s+/g, '')" role="tab" aria-controls="v-pills-home" aria-selected="true">{{group.type}}</a>
                        </template>
                    </div>
                </div>

                <div class="col-sm-10">
                    <div class="tab-content" id="v-pills-tabContent">
                        <template v-for="group in documents">
                        <div class="tab-pane fade show active" :id="group.type.replace(/\s+/g, '')" role="tabpanel" aria-labelledby="v-pills-home-tab">

                                <template v-for="document in group.documents">
                                    <div class="row">
                                        <div class="col-sm-8">
                                            <template v-if="document.id">
                                                <a v-text="name(document)" @click="openModalPdf(document.url)" data-toggle="modal" class="doc-prev-link pl-3" data-target=".modal-prev-doc" :href="document.url"></a>
                                            </template>
                                            <span class="pl-3" v-else v-text="name(document)"></span>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="row">
                                                <div class="col-sm-3"></div>
                                                <div class="col-sm-3">{{ formatDate(document.updated_at) }}</div>
                                                <div class="col-sm-3"></div>
                                                <div class="col-sm-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                        </div>
                        </template>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
import pdf from 'vue-pdf'
import loading from '../../helpers/loading'
import moment from 'moment'

export default {
  components: {
    pdf, loading
  },
  name: 'createdocuments',
  props: {
    documents: {
      type: Array,
      require: true
    },
    application:Number,
  },
  data () {
    return {
      url: null,
      loadingProgress: 0,
      modal: false
    }
  },
  mounted () {

  },
  methods: {
    uploadFile (document, e) {
      document.file = e.target.files || e.dataTransfer.files
      if (!document.file.length) return
      this.$emit('addDocument', document)
    },
    name (document) {
      let temp = document.type

      if (document.id) temp = document.name

      if (document.period && document.period != 'null') temp = `${temp} | ${document.period}`

      return temp
    },
    openModalPdf (url) {
      this.modal = true
      this.url = url
    },
    count(){
        //obtener el numero de tipos de documentos

        //obtener el index de tipo de documento

        //si está en el primero agregar la clase active al pill
    },
    formatDate(value) {
        return moment(value).format('MMM DD, YYYY')
    }
  }
}

</script>

<style scoped>

</style>

<style lang="scss">
    #soft-documents{
        .soft-documents-header{
            background-color: #e0e4ff;
            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 1rem;
            .row{
                display: flex;
                align-items: center;
                h3{
                    font-size: 13px;
                    margin: 0;
                    font-weight: 600;
                }
            }
        }
        .nav-pills{
            .nav-link{
                background-color: #e0e2ff;
                border-radius: inherit;
                border-top: 1px solid white;
                border-right: 1px solid #6164c1;
                color: #212529;
                font-weight: 400;
                font-size: 13px;
            }
        }
    }
</style>
