<template>
   <div id="app" class="container">
  <v-app id="inspire">
    <v-card>
      <v-toolbar
        flat
        color="blue"
        dark
      >
        <v-toolbar-title>Available doctors</v-toolbar-title>
      </v-toolbar>
      <div class="card" v-for="doctor in doctorsList">
  
                <div class="card-con">
                  
                  <div >
                    <strong>{{ doctor.name}}</strong>
                    <div>{{ doctor.description}}</div>
                  </div>
                  <div class="my-2">
              <v-btn x-large color="success" dark v-on:click="bookAppointment">Book Appointment</v-btn>
            </div>
                </div>
    </div>
  
      
    </v-card>
  </v-app>
</div>
</template>
<script>
import db from "@/firebase/init";

export default {
  name: 'doctors',
  data() {
    return {
      doctorsList:[]
    }
  },
  methods: {
      bookAppointment() {
          this.$swal('Appointment', 'You Successfully booked appointment', 'OK');
      }
  },
  created() {
    let self = this;
    db.collection("Doctors")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          let doctors = doc.data();
          self.doctorsList = doctors.DoctorsList;
        });
      });
  }
};
</script>
