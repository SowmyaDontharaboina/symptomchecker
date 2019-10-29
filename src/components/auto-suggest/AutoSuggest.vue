<template>
  <div>
    <div v-for="(value,index) in symptom" v-bind:key="index">{{value}}</div>
  </div>
</template>
<script>
export default {
  name: "AutoSuggest",
  props: ["symptom"]
};
</script>
<style scoped>
</style>