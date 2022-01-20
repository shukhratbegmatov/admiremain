<template>
  <div class="single"  >
    <main class="main" >
      <div class="header" >
        <div class="container">
          <div class="prev-page">

            <div class="prev-market">
              <router-link to="/">
                <img src="../../assets/images/svg/left-prev.svg" alt="icon">
              </router-link>
              <div class="market-name" v-if="getMarket[0].name">{{ getMarket[0].name }}</div>
            </div>
            <router-link :to="'/ru/shop/'+$route.params.id+'/create_product'">
              <img src="../../assets/images/svg/add.svg" alt="icon">
            </router-link>
          </div>
        </div>
      </div>
      <div class="container main_style" :class="{'active':active_add==true}">
        <div class="logo-market">
          <img src="../../assets/images/png/Makro.png" alt="icon">
        </div>
        <div class="market-title" v-if="getMarket[0].name">{{  getMarket[0].name }}</div>
        <div class="market-contact">
          <a class="market-call" href="#!">
            <img src="../../assets/images/svg/phone.svg" alt="icon"> <span>Qo'ng'iroq</span>
          </a>
          <a class="market-location" href="#!">
            <img src="../../assets/images/svg/location.svg" alt="icon"> <span>manzil</span>
          </a>
        </div>
      </div>
      <section class="border-dashed">
        <div class="container">
          <div class="market-debt">
            <div class="debt-market">Qarzdorlik:</div>
            <div class="debt-sum">{{getMarket[0].market_balance}} so'm</div>
          </div>
        </div>
      </section>
      <div class="container">
        <div class="debt-info" v-if="getMarket">
          <div class="debt-client">
            <img src="../../assets/images/svg/give-take.svg" alt="icon"> <span>Oldi berdilar</span>
          </div>
          <a @click="active_add=!active_add" class="info-debt link"><span>{{getCheck.meta.totalCount}}</span>
            <img class="tog_icon"  :class="{'transporents':active_add==true}" src="../../assets/images/svg/next-black.svg" alt="icon">
          </a>
        </div>
      </div>
    </main>
    <div class="dropdown_clas " :class="{'active':active_add==true}">
      <Single
          :checks="getCheck"
      />
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../../components/Header/Footer";
import Single from "./give"
export default {
  data(){
    return{
      active_add:false
    }
  },
  components:{
    Footer,
    Single
  },
  mounted() {
    this.$store.dispatch('getProduct')
    this.$store.dispatch('actsMagazin')
  },
  computed: {
    getMarket() {
      return this.$store.getters.allMagazine
    },
    getCheck() {
      return this.$store.getters.allCheck
    },
  },
}
</script>
<style>
.page_title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Cera Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  color: #191923;
  margin-top: 50px;
}
.text_form{
  display: flex;

}
.text_form a{
  margin-right: 20px;
  display: flex;
  align-items: flex-end;
}
.create{
  display: flex;
  align-items: flex-end;
}
.markets_profile{
  display: flex;
  align-items: center;
  justify-content: center;
}
.markets_profile .market-logo{
  width: 110px;
  height: 110px;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-right: 0;
}
.text_name{
  font-family: Cera Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #191923;
}
.call a{
  font-family: Cera Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
  color: #C70505;

}
.dropdown_clas{
  max-height: 0;
  transition: max-height 0.25s ease-out;
  overflow: hidden;

}
.dropdown_clas.active{

  max-height: fit-content;
  transition: max-height 0.5s ease-in;
}
.link{
  cursor: pointer;
}

.main_style{
  max-height: 1000px;
  transition: max-height 0.25s ease-out;
  overflow: hidden;

}
.main_style.active{
  max-height: 0px;
  transition: max-height 0.5s ease-in;
}
.tog_icon{
  transition: .6s;
}
.tog_icon.transporents{
  transform: rotate(90deg);
  transition: .6s;
}
</style>
