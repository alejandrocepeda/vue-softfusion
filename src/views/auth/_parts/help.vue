<template>
   <div class="row border-top border-light mt-4">
       <div class="col-12">
           <h2 class="text-center text-muted mt-5">Need Help?</h2>
       </div>
       <div class="col-12">
           <h2 class="text-center text-primary mt-2 font-weight-normal">
               <i class="ti-headphone-alt mr-1 help-icon"></i> 1-866-257-2973</h2>
           <p class="text-center text-primary mt-3"><i class="ti-email mr-1 help-sub-icon"></i> <a href="mailto:info@softfusion.com">info@softfusion.com</a> | <i class="ti-help-alt  help-sub-icon"></i> FAQ</p>
       </div>
   </div>
</template>

<script>
export default {
  name: 'help'
}
</script>

<style scoped>

</style>

<style lang="scss">
    .help-icon{
        position: relative;
        left:-10px;
        font-size:2.5rem;

    }

    .help-sub-icon{
        vertical-align: middle;
    }
</style>
