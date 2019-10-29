<template>
    <div class="navbar">
      <nav class="nav-extended indigo darken-2">
        <div class="nav-content">
          <router-link to="">
            <span class="nav-title"> Symptom Checker </span>
          </router-link>
          <a href="" class="btn-floating btn-large halfway-fab pink ">
          <router-link to="symptoms">
            <i class="material-icons">add</i>
          </router-link>
          </a>
        </div>
      </nav>
    </div>
</template>
<script>
import { EventBus } from '../../main';
export default {
  name: 'Navbar',
  data() {
    return {

    };
  },
  computed: {
},
< /script>
<style scoped>
.navbar {
    padding: 0 !important;
}
</style>;
