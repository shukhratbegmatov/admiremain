<template>
  <div id="app">
    <div class="addapp" v-if="deferredPrompt">
      <div>
        <a @click="deferredPrompt=null">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7" stroke="#0F0D4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 17L7 7" stroke="#0F0D4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></a>

      </div>
      <div class="app-text">
        Instal the app for notifications, orders and more
      </div>
      <div>
        <button
            ref="addBtn"
            class="addd-button"
            @click="clickCallback"
        >
          Install app
        </button>

      </div>

    </div>

    <router-view/>
    </div>
</template>
<script>
export default {
  data(){
    return{
      isLoading: true,
      deferredPrompt: null
    }

  },
  
  //   if(!localStorage.getItem('token')){
  //     this.$router.push('/login')
  //   }
  //   this.captureEvent()
  //   var isMobile = {
  //     Android: function () {
  //       return navigator.userAgent.match(/Android/i);
  //     },
  //     BlackBerry: function () {
  //       return navigator.userAgent.match(/BlackBerry/i);
  //     },
  //     iOS: function () {
  //       return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  //     },
  //     Opera: function () {
  //       return navigator.userAgent.match(/Opera Mini/i);
  //     },
  //     Samsung: function () {
  //       return navigator.userAgent.match(
  //           /SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i,
  //       );
  //     },
  //     Windows: function () {
  //       return (
  //           navigator.userAgent.match(/IEMobile/i) ||
  //           navigator.userAgent.match(/WPDesktop/i)
  //       );
  //     },
  //     any: function () {
  //       return (
  //           isMobile.Android() ||
  //           isMobile.BlackBerry() ||
  //           isMobile.iOS() ||
  //           isMobile.Opera() ||
  //           isMobile.Windows()
  //       );
  //     },
  //   };

  // },
  methods: {
    captureEvent() {
      window.addEventListener('beforeinstallprompt', (e) => {
        // ! Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e
      })
    },
    clickCallback() {
      // Show the prompt
      this.deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // Call another function?
        }
        this.deferredPrompt = null
      })
    },
  }
}
</script>
<style>

.loading img{
  width: 180px;
}
.addapp{
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1225222222222;
  height: 60px;
  position: relative;
  background: #fff;
  padding: 18px;}
.addd-button{
  background:rgba(0, 55, 145, 1);
  width: 102px;
  height: 40px;
  border-radius: 4px;
  color: #fff;
  font-size:16px;
  font-weight: bold;
  margin-left: 20px;
}
.app-text{
  color: #0F0D4A;
  font-size: 20px;
  margin-left: 20px;
}
.app-logos{
  display: flex;
  align-items: center;
  margin-left: 40px;
}
</style>
