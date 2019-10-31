<template>
  <div>
    <v-app class="wizard-one" id="details">
      <form name="form-details">
        <div class="patient-gender" v-bind:class="{activeDiv: isActive,notactive: prevSection}" v-show="showFirst">
          <h2 class="header">Please select your sex</h2>
          <label
            class="gender"
            v-bind:class="{active:isActiveCheck}"
            v-for="item in gender"
            :key="item.id"
          >
            <input
              type="radio"
              name="gender"
              :value="item.gender"
              @change="onGenderSelection(item, $event)"
            />
            <img
              width="150"
              height="150"
              :src="require(`@/assets/${item.gender}.png`)"
              :alt="item.gender"
            />
            <span>{{item.gender}}</span>
          </label>
        </div>
        <div class="patient-age" v-bind:class="{notactive: prevSection}" v-show="showSecond">
          <div class="slidecontainer">
            <h2 class="header">Please select your age</h2>
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
            <span class="startage">
              1
              <img
                width="32"
                height="30"
                src="../../assets/minus.png"
                alt="minus"
                @click="minusValue()"
              />
            </span>
            <div class="range">
              <input
                type="range"
                min="1"
                max="100"
                value="50"
                class="slider"
                id="myRange"
                v-on:input="getValue($event)"
              />
              <span class="setage">{{ageValue}}</span>
            </div>
            <span class="endage">
              <img
                width="32"
                height="30"
                src="../../assets/plus.png"
                alt="plus"
                @click="addValue()"
              />
              100
            </span>
          </div>
        </div>
      </form>
    </v-app>
  </div>
</template>
    <script>
import db from "@/firebase/init";
export default {
  name: "StepOne",
  data() {
    return {
      showFirst: true,
      showSecond: false,
      isActive: false,
      isActiveCheck: false,
      prevSection: false,
      ageValue: 22,
      gender: [{ id: 1, gender: "male" }, { id: 2, gender: "female" }],
      blocks: [
        { id: 1, details: "genderdetails", completed: false, current: true },
        { id: 2, details: "agedetails", completed: false, current: false }
      ]
    };
  },
  mounted() {
    this.$emit("can-continue", { value: false });
    this.blocks.forEach(element => {
      if (element.current) {
        this.isActive = !this.isActive;
      }
    });
  },
  methods: {
    onGenderSelection(item, $event) {
      this.genderValue = item.gender;
      $event.target.parentElement.classList.add("active");
      if (
        item.gender === "male" &&
        $event.target.parentElement.nextSibling.classList.contains("active")
      ) {
        $event.target.parentElement.nextSibling.classList.remove("active");
      } else {
        $event.target.parentElement.previousSibling.classList.remove("active");
      }
      //this.showFirst = false;
      this.showSecond = true;
      this.$emit("can-continue", { value: true });
      // this.prevSection = !this.prevSection;
      // this.isActive = !this.isActive;
      //this.nextSection(false, true);
    },
    getValue($event) {
      this.ageValue = $event.target.value;
      this.nextActive();
    },
    addValue() {
      if(this.ageValue < 100) {
        this.ageValue = parseInt(this.ageValue) + 1;
        this.nextActive();
      }
    },
    goBack () {
      this.showFirst = true;
      this.showSecond = false;
    },
    minusValue() {
      if(this.ageValue > 1) {
        this.ageValue = parseInt(this.ageValue) - 1;
        this.nextActive();
      }
    },
    nextActive() {
      if (this.genderValue) {
        this.$emit("can-continue", { value: true });
      }
    },
    nextSection(completed, current) {
      if (!completed) {
        this.blocks.forEach(ele => {
          ele.current = true;
        });
      }
    }
  }
};
</script>
    <style scoped>
.v-card__actions .action {
  display: inline-block !important;
}

.notactive {
  display: none;
}
.patient-gender {
  margin-bottom: 50px;
}
.activeDiv {
  display: block;
}
.patient-age {
  margin-bottom: 100px;
}
.action {
  align: center;
}
.selected {
  background: blue !important;
}
.header {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 20px;
}
#details {
  background: white;
}
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
.element {
  position: relative;
}
.gender {
  display: inline-block;
  border: 1px solid black;
}
.gender.active {
  border: 4px solid black;
}
.gender span {
  display: block;
}
.gender:last-child {
  margin-left: 30px;
}
.age {
  margin-top: 20px;
}
/*replace the content value with the
corresponding value from the list below*/

.element:before {
  content: "\f000";
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
  /*--adjust as necessary--*/
  color: #000;
  font-size: 18px;
  padding-right: 0.5em;
  position: absolute;
  top: 10px;
  left: 0;
}
.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 50%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

input[type="range"] {
  width: 50%;
  margin: 45px 0;
}
.slider:hover {
  opacity: 1;
}
.range {
  display: inline;
  position: relative;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 50%;
  height: 10px;
  padding: 0;
  margin: 45px 0;
  border-radius: 4px;
  box-sizing: content-box;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 30px;
  height: 15px;
  border: 2px solid #a7a7a7;
  border-radius: 25px;
  background: rgb(7, 122, 84);
}

.setage {
  position: absolute;
  left: 44%;
  width: 60px;
  height: 1em;
  font-size: 30px;
  text-align: center;
  color: rgb(7, 122, 84);
  font-weight: bold;
  white-space: nowrap;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}
</style>