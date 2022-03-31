<template>
  <div>
    <main class="main">
      <div class="header">
        <div class="container">
          <nav class="nav">
            <a href="/index.html">
              <img src="../../assets/images/svg/logo.svg" alt="logo" />
            </a>
            <div class="title-info">Statistikalar</div>
          </nav>
        </div>
      </div>
      <section class="scroll-body">
        <div class="container">
          <div class="body">
            <div>
              <router-link class="sta-item" to="/ru/today">
                <div class="sta-inner">
                  <span class="sta-icon-bg green">
                    <img src="@/assets/images/png/today.png" alt=":(" />
                  </span>
                  <span class="sta-title">Bugungi ko'rsatkichlari</span>
                </div>
                <div>
                  <img src="@/assets/images/svg/next-blue.svg" alt=":(" />
                </div>
              </router-link>
              <a class="sta-item" href="/index.html">
                <div class="sta-inner">
                  <span class="sta-icon-bg grey">
                    <img src="@/assets/images/png/pie-chart.png" alt=":(" />
                  </span>
                  <span class="sta-title">Do'konlar ko'rsatkichlari</span>
                </div>
                <div>
                  <img src="@/assets/images/svg/next-blue.svg" alt=":(" />
                </div>
              </a>
              <a class="sta-item" href="/productInfo.html">
                <div class="sta-inner">
                  <span class="sta-icon-bg red">
                    <img src="@/assets/images/png/bar-chart-2.png" alt=":(" />
                  </span>
                  <span class="sta-title">Maxsulotlar ko'rsatkichlari</span>
                </div>
                <div>
                  <img src="@/assets/images/svg/next-blue.svg" alt=":(" />
                </div>
              </a>
              <a class="sta-item" href="#!">
                <div class="sta-inner">
                  <span class="sta-icon-bg orange">
                    <img src="@/assets/images/png/dillers.png" alt=":("
                  /></span>
                  <span class="sta-title">Dillerlar ko'rsatkichlar</span>
                </div>
                <div>
                  <img src="@/assets/images/svg/next-blue.svg" alt=":(" />
                </div>
              </a>
            </div>
            <div class="sta-balance">
              <div>
                <div class="b-text">{{$store.state.is_showStatistic.name}}</div>
                <div class="text-b">
                  <span>182 654 123</span><span>so'm</span>
                </div>
              </div>
              <div>
                <div class="b-text">Umumiy do'konlar</div>
                <div class="text-b"><span>92</span><span>ta</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Header/Footer";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('statistic')
  },
  components: { Footer },
};
</script>

<style>
</style>
