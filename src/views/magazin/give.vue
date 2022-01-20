<template>
  <div>
    <main class="main give_cards">
      <div class="container" >
        <div class="debt-check "  v-for="(items,indexx) in checkslist" :key="indexx" :class="{'active':showCard[indexx].active==true,'focus':items.payment_type_id==2}" @click="openFunck(items,indexx)" >
          <div class="debt-date" >
            <div class="debt-data">
              <img src="../../assets/images/svg/clock.svg" alt="icon">
              <span> {{items.date}}</span>
            </div>
            <div class="debt-text">
              <span @click="edit(items)"><b-icon icon="pencil-fill" aria-hidden="true"></b-icon></span>
            </div>
          </div>
          <div class="debt-info-sum">
            <div class="debt-el">
              <img src="../../assets/images/svg/up-red.svg" alt="icon"> <span class="debt-text">berdi:</span>
            </div>
            <div class="debt-give"
            ><span>{{items.received_money}} </span><span>so'm</span>
            </div>
          </div>
          <div class="debt-info-sum debt-info-sum2">
            <div class="debt-el">
              <img src="../../assets/images/svg/down-blue.svg" alt="icon"> <span class="debt-text">oldi:</span>
            </div>
            <div class="debt-give"><span></span><span> {{items.sum_order}} so'm</span>
            </div>
          </div>

          <div class="debt-product ">

            <div class="debt-text">Maxsulot turi:</div>
            <div class="debt-text-black">{{items.type}}</div>
          </div>
          <div class="debt-product debt-product2">
            <div class="debt-text">Diller ismi:</div>
            <div class="debt-text-black">{{items.user}}</div>
          </div>
          <div class="debt-product debt-product2">
            <div class="debt-text">To'lov:</div>
            <div class="debt-text-black">{{items.payment_type}}</div>
          </div>
          <div class="empty-price scliton" v-if="!balance"></div>
          <div class="sum-debt" v-if="balance">
            <span>{{balance[0].current_balance}}
          </span><span>so'm</span>
          </div>
        </div>
        <div class="face_top">
          <div class="empty-item" v-if="$store.state.pending==true">
            <div class="empty-logo"></div>
            <div>
              <div class="empty-name"></div>
              <div class="empty-price"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>

  </div>
</template>

<script>
import Footer from "../../components/Header/Footer";
import axios from "axios";
import router from "../../router";

export default {
  props: ['checks'],
  components: {
    Footer,
  },
  data() {
    return {
      active: false,
      showCard: [],
      checkslist: [],
      item:20,
      balance:false
    }
  },
  mounted() {

    axios.get("market/" + router.currentRoute.params.id + "/acts?per-page="+this.item, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
        .then((response) => {
          this.checkslist = response.data.data
        });
    console.log(this.$store.state.check)
    for (let a = 0; a < 1000; a++) {
      this.showCard.push({
        "active": false
      })
    }

    this.scroll()
  },
  methods: {
    openFunck(items,indexx){
      this.balance=false
      for (var i=0;i<this.showCard.length;i++){
        this.showCard[i].active=false
      }
      this.showCard[indexx].active=!this.showCard[indexx].active

      axios.get('market/'+this.$route.params.id+'/acts/'+items.id+'?include=current_balance',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })

      .then(res=>{
        this.balance=res.data.data
      })
    },
    edit(item) {
      this.$router.push('/ru/shop/' + this.$route.params.id + '/edit_product/' + item.id)
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.$store.state.pending = true
          this.item = this.item + 20
          axios.get("market/" + router.currentRoute.params.id + "/acts?per-page="+this.item, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })
              .then((response) => {
                this.checkslist = response.data.data
                this.$store.state.pending = false

              });
        }
      }
    },
    computed: {
      getCheck() {
        return this.$store.getters.allCheck
      },
    },
  }
}
</script>
<style>
.debt-check{
  cursor: pointer;
  height: 138px;
  overflow-y: hidden;
}
.debt-check.active{
  height: max-content;
  overflow-y: auto;
}
.give_cards{
  padding: 10px 0;
}
.debt-data span{
  font-size: 15px;
}
.empty-price.scliton{
  width: 0;
  animation-name: width;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  background: rgba(0,0,0,0.8);
}
@keyframes width {
  0% {
    width: 100%;
  }
  30% {
    width: 50%;
  }
  100% {
    width: 0%;
  }
}
.debt-check.focus{
  background: #d4d3ff;
}
</style>
