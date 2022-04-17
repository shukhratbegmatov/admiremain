<template>
  <div>
    <Navbar></Navbar>
    <div class="form_create container">
      <router-link to="/" class="page_title">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19"
            stroke="#191923"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 12L11 18"
            stroke="#191923"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 12L11 6"
            stroke="#191923"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Do’kon qo’shish
        <div v-if="errors.data">
          {{ errors.data.errors.phone }}
        </div>
      </router-link>
      <div class="f_forms">
        <form class="create_form" @submit.p.prevent="submit()">
          <label class="cre_label">Do’kon username</label>
          <div class="input_group">
            <input type="text" v-model="name" placeholder="Name" />
          </div>

          <label class="cre_label">Telefon raqam</label>
          <div class="input_group">
            <input type="number" v-model="number" v-mask="'#########'" placeholder="phone" />
          </div>

          <label class="cre_label">Manzil</label>
          <div class="input_group">
            <input type="text" v-model="address" placeholder="address" />
          </div>
          <div class="form_btn_f">
            <button class="form_btn">
              <span v-if="$store.state.spiner == false">Qo’shish</span>
              <b-spinner v-if="$store.state.spiner == true"></b-spinner>
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Header/Footer";
export default {
  components: {
    Footer,
    Navbar,
  },
  data() {
    return {
      name: "",
      number: "",
      address: "",
      errors: "sas",
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch("createMagazin", {
          name: this.name,
          phone: this.number,
          address: this.address,
        })
        .then(() => {
          this.$router.push("/");
          this.$store.state.spiner = false;
        })
        .catch((error) => {
          this.errors = error.response;
        });
    },
  },
};
</script>
<style>
.form_create {
  margin-top: 100px;
}
.page_title {
  display: flex;
  align-items: center;
  font-family: Cera Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  color: #191923;
}
.page_title svg {
  margin-right: 20px;
}
.create_form input,
create_form input::placeholder {
  font-family: Cera Pro;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  opacity: 0.98;
}
.input_group {
  margin-bottom: 26px;
}
.create_form {
  margin-top: 26px;
}
.cre_label {
  font-family: Cera Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
}
.form_btn {
  background: #003791;
  border-radius: 14px;
  padding: 20px 115px;
  font-family: Cera Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}
.form_btn_f {
  display: flex;
  align-items: center;
  justify-content: center;
}
.f_forms {
  display: flex;
  justify-content: center;
}
.text-danger {
  color: red;
  text-align: center;
  margin-bottom: 20px;
}
</style>
