<template>
  <footer class="footer">
    <div class="container">
      <nav>
        <ul class="footer-menu">
          <li class="active">
            <router-link to="/">
              <img src="@/assets/images/svg/markets.svg" alt="icon">
            </router-link>
          </li>
          <li>
            <router-link to="/ru/Statistic">
              <img src="@/assets/images/svg/statistics.svg" alt="icon">
            </router-link>
          </li>
          <li>
            <a href="#!">
              <img src="@/assets/images/svg/group.svg" alt="icon">
            </a>
          </li>
          <li>
            <a @click="log_out()">
              <img src="@/assets/images/svg/prodile.svg" alt="icon">
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>

</template>
<script>

import {mapActions} from "vuex";
export default {
 methods:{
   ...mapActions({
     log_outs:'auth/signOut'
   }),
   log_out(){
     this.log_outs()
     .then(()=>{
       this.$router.go()
     })
   }
 }
}
</script>
