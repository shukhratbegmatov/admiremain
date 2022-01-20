<template>
  <div class="single  f_input_pr container">
    <div class="form_create page_title">
      <div class="text_form">
        <router-link :to="'/ru/shop/'+$route.params.id">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="#191923" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 12L11 18" stroke="#191923" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 12L11 6" stroke="#191923" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
        Ma’lumot qo’shish
      </div>
    </div>
    <div class="col-12 ">
      <form @submit.prevent="submit()">
        <div class="row">
          <div class="col-6  create_pro">
            <label class="cre_label ">Oldi</label>
            <div class="input_group">
              <input type="text" v-mask="'### ### ### ### ### ### ###'" v-model="getMarket[0].sum_order" placeholder="Name" >
            </div>
          </div>
          <div class="col-6 create_pro">
            <label class="cre_label  ">Berdi</label>
            <div class="input_group">
              <input type="text"  v-mask="'### ### ### ### ### ### ###'" v-model="getMarket[0].received_money"  placeholder="Name" >
            </div>
          </div>
          <div class="col-12 create_pro">
            <label class="cre_label  ">Maxsulot turi</label>
            <div class="input_group" v-if="user.data"  >
              <select  :required="true" @change="changeLocation($event)">
                <option  v-for="(item,index) in  user.data.productTypes" :key="index" :value="item.id" :selected="index==0"> {{item.value}}</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <label class="cre_label  ">To’lov turi</label>
            <div class="row form_radio " v-if="user.data" v-bind="selected=user.data.paymentTypes[0].id">
              <div  class="col-6" v-for="items in user.data.paymentTypes" :key="items">
                <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" :value="items.id">
                  {{ items.value }}</b-form-radio>
              </div>
            </div>
          </div>



          <div class="col-12 create_pro">
            <label class="cre_label  ">Oldi berdi vaqti</label>
            <div class="dates">
              <div class="f_times">
                <div class="date_f">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.9">
                      <path d="M10.0003 16.6667C13.222 16.6667 15.8337 14.055 15.8337 10.8333C15.8337 7.61167 13.222 5 10.0003 5C6.77866 5 4.16699 7.61167 4.16699 10.8333C4.16699 14.055 6.77866 16.6667 10.0003 16.6667Z" stroke="#191923" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10 8.33334V10.8333H11.6667" stroke="#191923" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5.83366 3.33334L3.54199 5.00001" stroke="#191923" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.167 3.33334L16.4587 5.00001" stroke="#191923" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                  </svg>
                  <datepicker :value="getMarket[0].date" name="uniquename"></datepicker>
                </div>
                <div class="time_groups" v-bind="
                [hour=new Date(getMarket[0].date).getHours()
                ,minute=new Date(getMarket[0].date).getMinutes()
                ]">
                  <input v-model="hour" @input="checkeds()" type="text" class="minute">:<input @input="checkeds()" v-model="minute" type="text" class="minute">
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 text-center">
            <button class="button_create">
              <span v-if="$store.state.spiner==false">Qo’shish</span>
              <b-spinner v-if="$store.state.spiner==true"></b-spinner>
            </button>
          </div>
        </div>

      </form>
    </div>
    <div class="face_class">

    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../../components/Header/Footer";
import Datepicker from 'vuejs-datepicker';

// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'
import {mapGetters} from "vuex";
export default {
  components:{
    Footer,
    Datepicker,

  },
  data(){
    return{
      times:new Date().toLocaleTimeString(),
      olindi:'',
      berildi:'',
      hour:new Date().getHours(),
      minute:new Date().getMinutes(),
      yourData: {
        "HH": '03',
        "mm": '05',
        "a": 'am'
      },
      date: new Date(new Date().getFullYear(), new Date().getMonth(),  new Date().getDate()),
      value:new Date(),
      selected:'',
      selecteds:'',
    }
  },
  mounted() {
    this.$store.dispatch('editMagazins')
  },
  methods:{
    checkeds(){
      if(this.hour>23||this.hour<0){
        this.hour="00"
      }
      if(this.minute>59||this.minute<0){
        this.minute="59"
      }
    },
    changeLocation(event){
      this.selecteds=event.target.value
    },
    submit(){
      this.$store.dispatch('editProduct',{
        "sum" : this.getMarket[0].sum_order.replace(/\s+/g,''),
        "received_money" : this.getMarket[0].received_money.replace(/\s+/g,''),
        "type" : this.selecteds,
        "payment_type_id": this.selected,
        "date": (this.getMarket[0].other_date)
      })
      .then(()=>{
        this.$router.push("/ru/shop/"+this.$route.params.id)
        this.$store.state.spiner=false
      })
    }
  },
  computed:{
    ...mapGetters({
      user: "auth/user",
    }),
    getMarket() {
      return this.$store.getters.allCheckone
    },
  }
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
.create_pro .input_group{
  width: 100%;
}
.f_input_pr .page_title{
  margin-bottom: 20px;
}
select{
  width: 100%;
  height: 100%;
  background: no-repeat;
}
.form-control{
  border: 0;
  outline: none;
  transition: none;
}
.b-calendar-grid-help{
  display: none;
}

#example-datepicker,.b-time-footer,.h-auto svg{
  display: none !important;
}
.f_times{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dates{
  display: flex;
}
.cre_label{

  font-family: Cera Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

  color: #000000;

}
.form_radio{
  font-family: Cera Pro;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  opacity: 0.98;
}
.form_radio input{
  margin-right: 12px;
}
.cre_label{
  margin-top: 30px;
}
.time_picer input{
  border: none !important;
}
.f_times{
  width: 100%;
}
.date_f{
  display: flex;
  align-items: center;
}
.button_create{
  background: #003791;
  border-radius: 14px;
  width: 330px;
  height: 60px;
  font-family: Cera Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-top: 56px;
}

.time_groups{
  width: 60px;
  display: flex;
}
.time_groups input{
  width: 20px;
}
</style>
