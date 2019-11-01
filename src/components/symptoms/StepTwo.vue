<template>
  <form>
    <h2 class="header">Please add your symptoms</h2>
    <div class>
      <div class="col-lg-12 autocomplete">
        <input
          type="text"
          placeholder="Search, e.g. headache"
          name="search"
          v-on:keyup="autoComplete($event)"
        />
      </div>
      <AutoSuggest v-bind:symptom="filteredValues"></AutoSuggest>
    </div>
  </form>
</template>
<script>
import db from "@/firebase/init";
import AutoSuggest from "../auto-suggest/AutoSuggest";
export default {
  data() {
    return {
      symptoms: [],
      filteredValues: []
    };
  },
  components: {
    AutoSuggest
  },
  methods: {
    autoComplete($event) {
      this.filteredValues = [];
      let value = $event.target.value;
      this.symptoms.filter(ele => {
        if (ele.includes(value) && value != "") {
          this.filteredValues.push(ele);
          this.$emit("can-continue", { value: true });
        }
      });
    }
  },
  created() {
    let self = this;
    db.collection("symptomList")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          let symptomsList = doc.data();
          self.symptoms = symptomsList.Symptoms;
        });
      });
  },
  mounted() {
    this.$emit("can-continue", { value: true });
  }
};
</script>
<style scoped>
.symptoms-details {
  margin: 20px;
  width: 50%;
}
.subtitle {
  font-size: 22px;
}
.header {
  font-size: 20px;
  margin-top: 40px;
  text-align: left;
  margin-left: 30px;
}
.symptoms-details input[type="text"] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}
.search {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 3rem;
  background: #f1f1f1;
  border: 1px solid grey;
  padding: 10px;
  display: block;
}
.autocomplete {
  padding-bottom: 0;
}
</style>