<template>
  <div>

    <div class="site-wrapper">
      <main class="login">
        <div class="container">
          <div class="wrapper">
            <div class="login-greeting">
              <div class="login-hello">Salom!</div>
              <div class="login-happy">Qaytganingizdan xursandmiz</div>
            </div>
            <form @submit.prevent="submit()" class="login-form">
              <div class="input-wrap">
                <label for="username">
                  <img src="../../assets/images/svg/user-input.svg" alt="icon">
                  <input type="text" name="username" v-model="form.username" id="username" placeholder="Username">
                </label>
              </div>
              <div class="input-wrap wrap-input">
                <label for="parol">
                  <img src="../../assets/images/svg/security-input.svg" alt="icon">
                  <input type="password" id="parol" name="parol" v-model="form.password" placeholder="Parol">
                </label>
                <img class="visible" src="../../assets/images/svg/invisible.svg" alt="icon">
              </div>
              <div class="login-forget"><a href="#!">Parolni unutdingizmi?</a>
              </div>
              <button class="login-btn">
                <span v-if="!$store.state.auth.authS">Tizimga kirish</span>
                <b-spinner v-if="$store.state.auth.authS"></b-spinner>
              </button>
            </form>
            <div class="login-el"><span class="login-line"></span>
              <span class="login-text">Boshqa tizim orqalikirish</span><span class="login-line"></span>
            </div>
            <a href="#!" class="login-google">
              <img src="../../assets/images/svg/google-login.svg" alt="icon">
            </a>
            <div class="login-signin">
              <div>Tizimda yo'qmisiz?</div>
              <a href="#!"><span>Ro'yxatdan o'tish</span> <img
                  src="../../assets/images/svg/right-arrow.svg" alt="icon"></a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      spinner:false,
      error:null,
      form:{
            username:null,
            password:null
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('auth/signIn',this.form)
          .catch(()=>{
            this.$store.state.auth.authS=false
          })
    },

  }
}
</script>
