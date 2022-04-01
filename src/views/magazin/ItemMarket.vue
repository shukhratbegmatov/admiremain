<template>
    <div class="odd-bg isModal cursor_poent" @click="showModal(items=item)">
      <div class="container">
        <div class="today-table table-today">
          <div class="today-table-inner">
            <span class="today-table-N"></span>
            <div>
              <div class="today-clients">{{name}}</div>
              <div class="today-time">{{new Date(time*1000).toLocaleTimeString()}}</div>
            </div>
          </div>
          <div class="today-calc">
            <div class="today-last "><span class="mx-2">{{sum_order.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}</span> <span> so'm</span></div>
            <div class="today-first "><span class="mx-2">{{received_money.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}</span>
              <span> so'm</span></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:['received_money','sum_order','name','time','item'],
  methods:{
    showModal(items){
      this.$store.state.isActive=true
      console.log(items)
      this.$store.state.is_showStatistic=items
    },

  }
};
</script>

<style>
.cursor_poent{
  cursor: pointer;
}
</style>
