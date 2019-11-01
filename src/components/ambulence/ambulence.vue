<template>
  <div>
  <nav class="nav-extended indigo darken-2">
        <div class="nav-content">
          <router-link to="">
            <span class="nav-title"> Search for hospitals </span>
          </router-link>
          </a>
        </div>
      </nav>
    <span>Search Hospital</span>
    <div class="container ambulence-details">
      <div class="col-lg-12 autocomplete">
        <input
          type="text"
          placeholder="Enter your location, e.g. Hyderabad"
          name="search"
          v-on:keyup="autoComplete($event)"
        />
        <button class="search" type="submit">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <div class="col-lg-10 col-md-12 col-sm-12">
        <ul class="hospital-list">
          <li v-for="(value,index) in filteredValues" v-bind:key="index">
            <span @click="onSelection(value)">{{value}}</span>
          </li>
        </ul>
      </div>
      <div class="row" v-show="active">
        <div class="col-lg-12">
          <h2>Hospital Near By {{hospitalSelected}}</h2>
          <p>Below the name and address</p>
          <div
            class="card"
            :class="{selectedlist: active}"
            v-for="(value,index) in selectedLocation"
            v-bind:key="index"
            style="width:400px"
          >
            <div class="card-body">
              <h4 class="card-title">Location: {{value.name}}</h4>
              <h3 class="card-title"></h3>
              <p class="card-text">
                Address:
                <b>{{value.address}}</b>
              </p>
              <a class="btn btn-primary stretched-link" @click="bookAmbulence()">Book ambulence</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import AutoSuggest from "../auto-suggest/AutoSuggest";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      list: [],
      filteredValues: [],
      hospitalSelected: "",
      selectedLocation: [],
      oneHospital: false,
      active: false
    };
  },
  components: {
    AutoSuggest
  },
  created() {
    let self = this;
    db.collection("hospitalList")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          let hospitals = doc.data();
          self.list = hospitals.locations;
          // alert(self.list[0].name);
        });
      });
  },
  methods: {
    autoComplete($event) {
      this.filteredValues = [];
      let value = $event.target.value.toLowerCase();
      this.list.forEach((ele, index) => {
        if (
          Object.keys(ele)[0]
            .toLowerCase()
            .includes(value) &&
          value != ""
        ) {
          //const keyVal = Object.keys(ele)[0];
          this.filteredValues.push(Object.keys(ele)[0]);
          //this.filteredValues.push(ele[keyVal][0]);
          console.log(this.filteredValues);
        }
      });
    },
    bookAmbulence() {
      var self = this;
      this.$swal({
        title: `
          <i>
            Your Ambulance is Booked.
          </i>
          `,
        // add a custom html tags by defining a html method.
        html: `<small>
            It will reach in 15min.
            </small>
            `,
        showCloseButton: true,
        focusConfirm: false
      }).then(result => {
        this.$router.push("/");
      });
    },
    onSelection(val) {
      if (val) {
        this.hospitalSelected = "";
        this.active = true;
        this.oneHospital = true;
        this.hospitalSelected = val;
        this.$emit("can-continue", { value: true });
        this.list.forEach((ele, index) => {
          if (
            Object.keys(ele)[0].includes(this.hospitalSelected) &&
            val != ""
          ) {
            const keyVal = Object.keys(ele)[0];
            this.selectedLocation = ele[keyVal];
            // });
            //this.filteredValues.push(ele[keyVal][0]);
            //alert(this.selectedLocation);
          }
        });
      }
    },
    removeValue(val) {
      this.hospitalSelected.filter((ele, index) => {
        if (ele.name === val) {
          this.hospitalSelected.splice(index, 1);
        }
      });
      if (this.hospitalSelected.length <= 0) {
        this.$emit("can-continue", { value: false });
      }
    },
    showDetail: function() {
      this.$swal({
        // add a custom html tags by defining a html method.
        html: `<small>
            Ambulence Booking
            </small>
            <hr/>
            <input placeholder="Enter the pickup time" type="text" />
            <input placeholder="address" type="text" />
            `,
        showCloseButton: true,
        focusConfirm: false
      }).then(result => {
        if (result.value) {
          Swal.fire("Booked!", this.$router.push("welcome"), "success");
        }
      });
    }
  }
};
</script>
<style>
.ambulence-details {
  width: 50%;
  margin: 20px;
}
.ambulence-details input[type="text"] {
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
.card {
  display: inline-block !important;
}
.hospital-list {
  text-align: left;
}
.hospital-list li {
  padding-bottom: 10px;
  cursor: pointer;
}
.card.selectedlist {
  margin-left: 20px;
}
</style>