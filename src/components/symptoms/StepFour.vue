<template>
  <div>
    <v-app id="inspire">
      <div v-for="(healthyQuestion, index) in healthQuestions" :key="index">
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > index+1" :step="index+1"></v-stepper-step>

          <v-stepper-content :step="index+1">
            <v-card color="grey lighten-1" class="mb-12" height="200px">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{ healthyQuestion.question }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions style="display: inherit;">
                <v-btn
                  v-bind:class="{ selected: activeIndex === childindex }"
                  text
                  v-for="(answer,childindex) in healthyQuestion.answers"
                  @click="submitQuestions(index+1,childindex,answer)"
                  :key="childindex"
                >{{ answer }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper>
      </div>
    </v-app>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import db from "@/firebase/init";
export default {
  name: "Navbar",
  data() {
    return {
      e6: 1,
      healthQuestions: [],
      activeIndex: ""
    };
  },
  methods: {
    ...mapActions(["PUSH_ANSWER"]),
    submitQuestions(index, childindex,answer) {
      this.PUSH_ANSWER(answer);
      if (this.healthQuestions.length === index) {
        this.activeIndex = childindex;
        this.$emit("can-continue", { value: true });
      } else {
        this.e6 = index + 1;
        this.activeIndex = childindex;
      }
    }
  },
  created() {
    let self = this;
    db.collection("healthQuestions")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          let question = doc.data();
          self.healthQuestions = question.questions;
        });
      });
  }
};
</script>
<style>
.v-card__actions .action {
  display: inline-block !important;
}
.action {
  align: center;
}
.selected {
  background: blue !important;
}
</style>