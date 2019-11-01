<template>
  <div>
    <div class="col-lg-10 col-md-12 col-sm-12 list">
      <ul class="symptom-list list-group">
        <li
          v-for="(value,index) in symptom"
          v-bind:key="index"
          class="list-group-item"
          @click="onSelection(value)"
        >{{value}}</li>
      </ul>
    </div>
    <div class="col-lg-10 col-md-12 col-sm-12">
      <div
        :class="{selectedlist: active}"
        v-for="(value,index) in symptomSelected"
        v-bind:key="index"
      >
        {{value}}
        <i class="remove fa fa-times" @click="removeValue(value)"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AutoSuggest",
  props: ["symptom"],
  data() {
    return {
      symptomSelected: [],
      active: false
    };
  },
  methods: {
    onSelection(val) {
      if (val) {
        this.active = true;
        this.symptomSelected.push(val);
        this.$emit("can-continue", { value: true });
      }
    },
    removeValue(val) {
      this.symptomSelected.filter((ele, index) => {
        if (ele === val) {
          this.symptomSelected.splice(index, 1);
        }
      });
      if (this.symptomSelected.length <= 0) {
        this.$emit("can-continue", { value: false });
      }
    }
  },
  mounted() {
    this.$emit("can-continue", { value: false });
  }
};
</script>
<style scoped>
.symptom-list {
  text-align: left;
  display: inline;
}
.list {
  padding: 0 12px 12px;
}
.symptom-list li {
  padding-bottom: 10px;
  cursor: pointer;
}
.selectedlist {
  background: #1576d1;
  color: white;
  padding: 6px 14px 6px 12px;
  border-radius: 16px;
  display: inline-block;
  float: left;
}
.remove {
  padding-left: 5px;
}
</style>