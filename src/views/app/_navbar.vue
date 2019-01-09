<template>
    <div>
        <div class="bg-light">
            <div class="row container d-flex mx-auto px-lg-3 px-0">
                <div class="col-3 py-md-3 py-2 pr-md-5 pr-sm-0 pl-0 d-md-block d-flex align-items-center">
                    <!--Main Logo Horizontal version-->
                    <img class="logo-h pr-sm-0 pr-md-5 disappear" :src="images.logo">
                    <img class="logo-h pr-md-0 appear float-left" :src="images.iso">
                    <button type="button" data-toggle="dropdown" class="btn btn-light dropdown-toggle small font-weight-light d-lg-none d-block">
                        Menu
                    </button>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-5 col-2 d-flex align-items-center pr-md-0 justify-content-end">
                    <form class="ml-lg-auto d-sm-block d-none">
                        <!--Search form-->
                        <div class="input-group my-2 my-md-0">
                            <input class="form-control search" type="text" placeholder="Search...">
                            <div class="input-group-prepend ">
                                <span class="input-group-text rounded-right search-icon" id="basic-addon1"><span class="ti-search mr-0 "></span></span>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="align-items-center col-lg-4 col-md-3 col-sm-4 col-7 d-flex float-left justify-content-end pr-md-0 text-center text-primary">
                    <!--menu items notificactions/settings /profile-->
                    <div class="mr-2 mr-sm-4 mt-2 row text-center text-sm-right">
                        <i class="pl-xl-3 pl-lg-2 mx-md-2 mx-sm-1 mx-0 d-sm-none d-block"><span class="ti-search "></span></i>
                        <i class="pl-xl-3 pl-lg-2 mx-md-2 mx-1 position-relative">
                        <span class="small position-absolute counter">
                            <span class="small text-white bg-danger rounded-circle">12</span>
                        </span> <span class="ti-bell"></span> </i>
                        <i class="pl-xl-3 pl-lg-2 mx-md-2 mx-sm-1 mx-0"><span class="ti-settings"></span></i>
                    </div>
                    <div class="mr-0 row">
                        <button class="btn btn-light dropdown-toggle font-weight-light d-lg-block d-none" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="rounded-circle profile img-thumbnail mr-1" :src="me.image.url"> {{me.name}}
                        </button>
                        <button class="btn btn-light dropdown-toggle font-weight-light d-lg-none d-block pr-sm-2 pr-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="rounded-circle profile img-thumbnail" src="/img/profile.jpg">
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item small" href="#">Profile</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item small" @click="handleLogout" href="#">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Dashboard main menu-->
        <div class="bg-primary main-menu d-lg-block d-none">
            <div class="row container d-flex mx-auto px-0">
                <ul class="nav nav-tabs mt-md-4 mt-sm-3 mt-2 border-0 pt-3 ">
                    <li class="nav-item">
                        <a class="nav-link px-md-4 py-md-3 py-sm-2 p-1" @click="correctActive" :class="{'active': subIsActive('/home')}" data-toggle="tab" href="#nav-1">
                            <span class="ti-home mr-1"></span>Home </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-md-4 py-md-3 py-sm-2 p-1" @click="correctActive" :class="{'active': subIsActive('/CRM')}" data-toggle="tab" href="#nav-2">
                            <span class="mr-1 ti-desktop"></span>CRM </a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/leads" class="nav-link px-md-4 py-md-3 py-sm-2 p-1 only" :class="{'active': subIsActive('/leads')}">
                            <div @click="correctActive">
                                <span class="ti-target mr-1"></span>Lead
                            </div>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/applications" class="nav-link px-md-4 py-md-3 py-sm-2 p-1 only" :class="{'active': subIsActive('/applications')}">
                            <div @click="correctActive"><span class="ti-envelope mr-1"></span>Applications</div>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-md-4 py-md-3 py-sm-2 p-1" data-toggle="tab" @click="correctActive" href="#nav-5">
                            <span class="ti-pie-chart mr-1"></span>Marketing </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-md-4 py-md-3 py-sm-2 p-1" data-toggle="tab" @click="correctActive" href="#nav-6">
                            <span class="ti-email mr-1"></span>Softmail </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-md-4 py-md-3 py-sm-2 p-1" data-toggle="tab" @click="correctActive" href="#nav-7">
                            <span class="ti-panel mr-1"></span>Tools </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mx-auto">
            <div class="col-12 tab-content sub-menu px-0">
                <div class="tab-pane fade bg-white show border-bottom" :class="{'active': subIsActive('/home')}" id="nav-1">
                    <ul class="nav nav-tabs border-0 container d-flex mx-auto bg-white row px-0 ">
                        <li class="nav-item">
                            <router-link to="/home" append class="nav-link small py-md-4 py-sm-3 py-2 border-0 mr-3 ml-2">
                                <i class="ti-dashboard mr-1" style="position: relative; top: 5px;font-size: 1.4rem;"></i>Dashboard
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0" href="#"><span class="ti-bar-chart mr-1"></span>Reports</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0" href="#"><span class="ti-list mr-1"></span>Tasks</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane fade bg-white show border-bottom" :class="{'active': subIsActive('/CRM')}" id="nav-2">
                    <ul class="nav nav-tabs border-0 container d-flex mx-auto bg-white row  px-0 ">
                        <li class="nav-item">
                            <router-link to="/CRM/contacts" class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0">
                                <span class="ti-agenda mr-1"></span>Contacts
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/CRM/businesses" class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0">
                                <span class="ti-briefcase mr-1"></span>Business
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/CRM/lenders" class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0">
                                <span class="ti-money mr-1"></span>Lenders
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/CRM/brokers" class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0">
                                <span class="ti-id-badge mr-2"></span>Brokers
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/CRM/users" class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0">
                                <span class="ti-user mr-1"></span>Users
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane show fade bg-white border-bottom" :class="{'active': subIsActive('/marketing')}" id="nav-5">
                    <ul class="nav nav-tabs border-0 container d-flex mx-auto bg-white row  px-0">
                        <li class="nav-item">
                            <router-link to="/marketing/affiliate_networks" class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0">
                                <span class="ti-world mr-1"></span>Affiliate Network
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0" href="#">
                                <span class="ti-archive mr-1"></span>Materials </a>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane fade bg-white border-bottom" id="nav-6">
                    <ul class="nav nav-tabs border-0 container d-flex mx-auto bg-white row  px-0 ">
                        <li class="nav-item">
                            <a class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0" href="#">
                                <span class="ti-email mr-1"></span>Emails </a>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane fade bg-white border-bottom" id="nav-7">
                    <ul class="nav nav-tabs border-0 container d-flex mx-auto bg-white row  px-0 ">
                        <li class="nav-item">
                            <a class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0" href="#">
                                <span class="ti-loop mr-1"></span>Loan machine engine </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0" href="#">
                                <span class="ti-receipt mr-1"></span>Guidelines </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link small py-md-4 py-sm-3 py-2 border-0  mr-md-3 mr-0 ml-md-2 ml-0" href="#">
                                <span class="ti-ruler-pencil mr-1"></span>Calculators </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {logout} from '../../config/auth'
import logo from './../../assets/img/logo-h.png'
import iso from './../../assets/img/iso.png'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'navbar',
  data: () => {
    return {
      images:
          {
            logo: logo,
            iso: iso
          }
    }
  },
  computed: {
    me () {
      let response = {image: {url: 'hola'}}

      if (!isEmpty(this.$store.state.me)){
        response =  this.$store.state.me
      }

      return response

    }
  },
  methods: {
    subIsActive (input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    },
    handleLogout: function () {
      logout()
      this.$router.push({name: 'login'})
    },
    correctActive (e) {
      $('.nav-link,.main-menu a').removeClass('active')
      if ($(e.target).is('div')) {
        $('.sub-menu .tab-pane').removeClass('active')
        $(e.target).closest('.nav-link').addClass('active')
      }
    }
  }
}
</script>

<style scoped>

</style>
