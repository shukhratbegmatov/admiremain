<template>
  <div>
    <main class="p-b-110">
      <div>
        <div class="container">
          <div class="prev-page">
            <div class="prev-market">
              <router-link to="/ru/Statistic" class="link-wrap"
                ><img src="@/assets/images/svg/left-prev.svg" alt="icon" />
                <div class="market-name">Bugungi ko'rsatkichlar</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <section class="fixed-block">
        <div class="container">
          <div class="today-balance">
            <div class="today-last">
              <img src="@/assets/images/svg/up-red.svg" alt=":(" />
              <div><span>{{ $store.state.statistics.total_sum }}</span><span>so'm</span></div>
            </div>
            <div class="today-first">
              <img src="@/assets/images/svg/down-blue.svg" alt=":(" />
              <div><span>{{ $store.state.statistics.total_receive}}</span> <span>so'm</span></div>
            </div>
          </div>
        </div>
        <div class="bg-gray">
          <div class="container">
            <div class="today-table">
              <div>
                <span class="today-N">№</span
                ><span class="today-date-title">Do'kon / vaqt</span>
              </div>
              <div class="today-calc">Oldi berdilar</div>
            </div>
          </div>
        </div>
      </section>
      <div class="scroll-body">
        <market-item v-for="marketItem in $store.state.statistics.data" :key="marketItem.id" isModal
          :name="marketItem.name"
         :received_money="marketItem.received_money"
         :sum_order="marketItem.sum_order"
         :time="marketItem.time"
         :item="marketItem"

        ></market-item>
              </div>
      <div class="modal-bg " :class="{'bodyShadow':$store.state.isActive}">

        <div class="modals">
          <div class="modalContent">
            <div class="modal-market">
              <div class="market-logo"> <img src="../../assets/images/png/Makro.png" alt=":("> </div>
              <div>
                <div class="modal-market-name">{{$store.state.is_showStatistic.name}}</div>
                <div class="today-time">{{new Date($store.state.is_showStatistic.time*1000).toLocaleTimeString()}}</div>
              </div>
            </div>
            <div class="modal-client-block">
              <div class="modal-client-info">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.9987 7.33333C9.47146 7.33333 10.6654 6.13943 10.6654 4.66667C10.6654 3.19391 9.47146 2 7.9987 2C6.52594 2 5.33203 3.19391 5.33203 4.66667C5.33203 6.13943 6.52594 7.33333 7.9987 7.33333Z" stroke="#003791" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14" stroke="#003791" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="b-text-b">Diller
              nomi:</span> </div>
              <div class="modal-client-name">{{$store.state.is_showStatistic.username}}</div>
            </div>
            <div class="modal-client-block">
              <div class="modal-client-info">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33333 2.66667H6L7.33333 6L5.66667 7C6.38064 8.44769 7.55231 9.61936 9 10.3333L10 8.66667L13.3333 10V12.6667C13.3333 13.0203 13.1929 13.3594 12.9428 13.6095C12.6928 13.8595 12.3536 14 12 14C9.39951 13.842 6.94677 12.7377 5.10455 10.8954C3.26234 9.05323 2.15803 6.60049 2 4C2 3.64638 2.14048 3.30724 2.39052 3.05719C2.64057 2.80714 2.97971 2.66667 3.33333 2.66667" stroke="#003791" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="b-text-b">Tel
              raqam::</span> </div>
              <div class="modal-client-name">{{$store.state.is_showStatistic.phone}}</div>
            </div>
            <div class="modal-footer">
              <span @click="$store.state.isActive=false" class="modalCloseButton">Ortga</span>
              <span class="m-f-line">

              </span>
              <a :href="'tel:'+$store.state.is_showStatistic.phone">Qo'ng'iroq</a>
            </div>
          </div>
        </div>
      </div>
    <div>
  </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Header/Footer";
import marketItem from "../magazin/ItemMarket.vue";
export default {
  data() {
    return {
      markets: [
        {

        }
      ],
    };
  },
  mounted() {
    this.$store.dispatch('statistic')
  },
  components: { Footer, marketItem },
};
</script>

<style>
.link-wrap {
  display: flex;
  align-items: center;
  width: 100%;
}
.link-wrap img {
  display: inline-block;
  width: auto;
  margin-right: 16px;
}
</style>
