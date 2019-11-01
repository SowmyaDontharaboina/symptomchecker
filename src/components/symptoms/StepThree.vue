<template>
  <div class="container">
    <h3>Please check all the statements below that apply to you</h3>
    <v-simple-table height="300px">
      <template v-slot:default>
        <tbody>
          <tr v-for="(question, indexVal) in questions" :key="question.question">
            <td>{{ question.question }}</td>
            <td v-for="(option, index) in question.options" :key="index">
              <input
                class="form-check-input"
                type="radio"
                :name="`option${indexVal}`"
                :id="`option${index}`"
                :value="option"
              />
              <label class="form-check-label" :for="`option${index}`">{{ option }}</label>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import db from "@/firebase/init";
export default {
  name: "StepThree",
  data() {
    return {
      questions: []
    };
  },
  created() {
    let self = this;
    db.collection("generalQuestions")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          let question = doc.data();
          self.questions = question.questions;
        });
      });
  },
  mounted() {
    this.$emit("can-continue", { value: true });
  },
  methods: {
    deleteSmoothie(id) {
      this.smoothies = this.smoothies.filter(smoothie => smoothie.id != id);
    }
  }
};
</script>
<style scoped>
[type="radio"]:not(:checked),
[type="radio"]:checked {
  opacity: 1;
  pointer-events: all;
}
</style>