<template>
  <div @scroll="scroll">
    <header class="header">
      <div class="search" :class="{ active: searchs }">
        <div class="search_ch">
          <div class="input_group">
            <input
                type="text"
                id="search"
                @input="searchsF()"
                v-model="text"
                placeholder="Maxsulot nomi bilan izlang"
            />

            <svg
                @click="
                searchs = false;
                text = '';
              "
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M14.6668 1.33334L1.3335 14.6667"
                  stroke="#200E32"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
              <path
                  d="M14.6668 14.6667L1.3335 1.33334"
                  stroke="#200E32"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="container">
        <nav class="nav">
          <router-link to="/">
            <img src="@/assets/images/svg/logo.svg" alt="logo" />
          </router-link>
          <ul class="menu">
            <li>
              <label for="search" class="search_label" @click="searchs = true">
                <img src="@/assets/images/svg/search.svg" alt="icon" />
              </label>
            </li>
            <li>
              <router-link to="/notivication">
                <img src="@/assets/images/svg/notifi.svg" alt="icon" />
              </router-link>
            </li>
            <li>
              <router-link to="/ru/shop/create">
                <img src="@/assets/images/svg/add.svg" alt="icon" />
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <div v-if="markets">
          <a
              @scroll="scroll(item)"
              class="market-item"
              v-for="(item, index) in markets"
              :key="index"
          >
            <div
                class="inner-market"
                @click="nexPage(item.id)"
            >
              <div class="market-client">
                <div class="market-logo">
                  <img src="@/assets/images/png/Makro.png" alt="icon" />
                </div>
                <div>
                  <div class="market-name">{{ item.name }} {{item.active}}</div>
                  <div class="market-price">
                    <span class="market-back">
                      <img src="@/assets/images/svg/back.svg" alt="icon"
                      /></span>
                    <div class="market-sum">
                      <span>{{ item.market_balance }}</span
                      ><span> so'm</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="market-pin">
                <img src="@/assets/images/svg/pinned.svg" alt="icon" />
              </div>
            </div>
            <div class="action-wrap">
              <button @click="showActions(index)"  class="btn-action">
                <span class="dots"></span>
              </button>
              <div
                  class="actions-links-wrap "
                  :class="{'actions-links-show':isActives[index].active}"
              >
                <router-link :to="'ru/employer/create/'+item.id" class="action-link">
                  <img src="@/assets/images/svg/prodile.svg" alt=":(" />
                  <span>xodim qo'shish</span>
                </router-link>
                <a @click="deleteFunc(item.id)" class="action-link">
                  <img src="@/assets/images/svg/delate.svg" alt=":(" />
                  <span>o'chirish</span>
                </a>
                <router-link :to="'/ru/shop/edit/'+item.id" href="#!" class="action-link">
                  <img src="@/assets/images/svg/edit.svg" alt=":(" />
                  <span>tuzatish</span>
                </router-link>
              </div>
            </div>
          </a>
          <div class="face_top">
            <div class="empty-item" v-if="$store.state.pending == true">
              <div class="empty-logo"></div>
              <div>
                <div class="empty-name"></div>
                <div class="empty-price"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<style>
</style>
<script>
import Footer from "@/components/Header/Footer";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: { Footer },
  data() {
    return {
      item: 20,
      markets: [],
      searchs: false,
      text: "",
      isActives:[],
      isActives1:[]
    };
  },
  mounted() {
    // window.addEventListener('click',function (){
    //   this.isActives.forEach(el=>{
    //     el.active=false
    //   })
    //   console.log("hello")
    // })
    axios
        .get("market?include=employee", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.markets = response.data.data;
          for (let i=0;i<=this.markets.length;i++){
            this.isActives.push({
              'active':false
            })
          }
        });
    this.scroll();
  },
  computed: {
    getMarket() {
      return this.$store.getters.allMagazine;
    },
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    deleteFunc(item){
      axios
          .post("market/delete-market",

              [item]
              ,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
          .then(() => {
            this.$router.go()
          });
    },
    showActions(index) {
      this.isActives.forEach(el=>{
        el.active=false
      })
      this.isActives[index].active=!this.isActives[index].active
      console.log(this.isActives[index].active)
    },
    searchsF() {
      axios
          .get("market?name=" + this.text, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log(this.markets, "hello");
            this.markets = response.data;
          });
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight ===
            document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.state.pending = true;
          this.item = this.item + 20;
          axios
              .get("market?per-page=" + this.item, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((response) => {
                this.markets = response.data;
                this.$store.state.pending = false;
              });
        }
      };
    },
    nexPage(item) {
      this.$router.push("/ru/shop/" + item);
    },
  },
};
</script>
<style>
.market-item {
  cursor: pointer;
}
.market-item.active {
  background: rgba(0, 55, 145, 0.05);
}
.empty-item {
  margin-top: 50px;
  margin-bottom: 100px;
}
.empty-item.active {
  margin-top: 0;
  margin-bottom: 100px;
}
.face_top {
  margin-bottom: 100px;
}
.search {
  position: fixed;
  width: 100%;
  height: 78px;
  z-index: 22;
  background: #fff;
  left: 0;
  top: -100%;
  transition: 0.5s;
  right: 0;
}
.search.active {
  top: 0;
  transition: 0.3s;
}
.search_ch {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input_group {
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
.input_group input {
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
.inner-market {
  flex: 0 1 80%;
  display: flex;
}
.btn-action {
  width: 50px;
  height: 50px;
  background-color: transparent;
  margin-right: -10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.btn-action span {
  position: relative;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: #094cb6;
}
.btn-action span::before {
  content: "";
  position: absolute;
  left: 0;
  top: -14px;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: #094cb6;
}
.btn-action span::after {
  content: "";
  position: absolute;
  left: 0;
  top: 14px;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: #094cb6;
}
.action-wrap {
  display: flex;
  position: relative;
}
.actions-links-wrap {
  z-index: 2;
  position: absolute;
  right: 20px;
  top: -16px;
  min-width: auto;
  height: fit-content;
  background-color: #094cb6;
  display: inline-flex;
  flex-direction: column;
  padding: 20px 20px 15px 15px;
  border-radius: 10px;
  transition: transform 0.3s;
  transform: scale(0);
  transform-origin: top right;
}
.actions-links-show {
  transform: scale(1);
  transform-origin: top right;
}
.action-link {
  display: inline-flex;
}
.action-link img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  object-position: center;
  margin-right: 12px;
}
.action-link span {
  display: block;
  width: max-content;
  color: #fff;
}
.action-link:not(:last-child) {
  margin-bottom: 20px;
}
</style>
