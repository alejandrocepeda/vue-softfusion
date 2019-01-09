<template>
    <div class="bg-primary vh-height d-flex d-block align-items-center">
        <div class="container">
            <transition name="page" mode="out-in" :appear="true">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>

export default {}

</script>
<style>

</style>
