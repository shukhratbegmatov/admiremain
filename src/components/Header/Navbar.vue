<template>
  <header class="header">
    <div class="search" :class="{'active':searchs}">
      <div class="search_ch">
        <div class="input_group">
          <input type="text"  @input="searchsF()" v-model="text" placeholder="Maxsulot nomi bilan izlang">

          <svg @click="searchs=false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6668 1.33334L1.3335 14.6667" stroke="#200E32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.6668 14.6667L1.3335 1.33334" stroke="#200E32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </div>

      </div>
    </div>
    <div class="container">
      <nav class="nav">
        <router-link to="/">
          <img src="@/assets/images/svg/logo.svg" alt="logo">
        </router-link>
        <ul class="menu">
          <li>
            <a @click="searchs=true" >
              <img src="../../assets/images/svg/search.svg" alt="icon">
            </a>
          </li>
          <li>
            <router-link to="/notivication">
              <img src="../../assets/images/svg/notifi.svg" alt="icon">
            </router-link>
          </li>
          <li>
            <router-link to="/ru/shop/create">
              <img src="../../assets/images/svg/add.svg" alt="icon">
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  data(){
    return{
      searchs:false,
      text:''
    }
  },
  methods:{
    searchsF(){
      this.$store.dispatch('getSearch',this.text)
    }
  }
}
</script>
<style>
.search{
  position: fixed;
  width: 100%;
  height: 78px;
  z-index: 22;
  background: #fff;
  left: 0;
  top: -100%;
  transition: .5s;
  right: 0;
}
.search.active{
  top: 0;
  transition: .3s;
}
.search_ch{
  display: flex;
  justify-content: center;
  align-items: center;
}
.input_group{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(25, 25, 35, 0.02);
  border: 1px solid rgba(25, 25, 35, 0.15);
  box-sizing: border-box;
  border-radius: 8px;
  width: 348px;
  height: 54px;
  margin-top: 10px;
  padding: 0px 10px 0 10px;
}
.input_group input,.input_group input::placeholder{
  height: 100%;
  width: 90%;
  background: none;
  font-family: CeraPro;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  opacity: 0.5;

}
</style>
