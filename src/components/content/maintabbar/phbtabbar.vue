<template>
  <tabbar>
    <tabbaritem path1="/phbhot"  :cstyle="tabbarstyle">
      <img slot="item-icon" src="~/assets/img/phb_hot.png" />
      <img slot="item-icon-active" src="~/assets/img/phb_hot_active.png" />
      <div slot="item-text">热卖榜</div>
    </tabbaritem>
    <tabbaritem path1="/phbdoub" :cstyle="tabbarstyle">
      <img slot="item-icon" src="~/assets/img/phb_doub.png" />
      <img slot="item-icon-active" src="~/assets/img/phb_doub_active.png" />
      <div slot="item-text">折扣榜</div>
    </tabbaritem>
    <tabbaritem path1="/phbdz" :cstyle="tabbarstyle">
      <img slot="item-icon" src="~/assets/img/phb_dong.png" />
      <img slot="item-icon-active" src="~/assets/img/phb_dong_active.png" />
      <div slot="item-text">活动榜</div>
    </tabbaritem>
  </tabbar>
</template>
<script>
import tabbar from "components/common/tabbar/tabbar.vue";
import tabbaritem from "components/common/tabbar/tabbarItem.vue";
export default {
  name: "maintabbar",
  data() {
    return {
      tabbarstyle: {
        bgcolor: "transparent",
        activebg: "pink",
        color: "#470000",
        activetext: "white"
      }
    };
  },
  components: {
    tabbar,
    tabbaritem
  }
};
</script>
