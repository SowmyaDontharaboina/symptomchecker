import { mapGetters } from "vuex";
import List from './precaution.vue';
import db from "@/firebase/init";

export default {
    name:'education',
    components: {
      List
    },
    data() {
        return {
          isEmergency: '',
          symptomList:[]
        }
    },
    computed: {
      ...mapGetters(['getResult','getSymptoms'])
    },
    methods: {
      navigate: function() {
        this.$router.push('nearestDoctors');
      },
      showDetail: function(idx) {
        this.$swal({
          title: `
          <i>
            ${this.symptomList[idx].name}
          </i>
          `,
          // add a custom html tags by defining a html method.
          html:
            `<small>
            ${this.symptomList[idx].evidence}
            </small>
            <hr/>
            <h5>Precautions</h5>
            <ul>
             ${this.symptomList[idx].precautions}
            </ul>
            `,
          showCloseButton: true,
          focusConfirm: false,
        })
      }
    },
    created() {
      let self = this;
      db.collection("Education")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            let symptoms = doc.data();
            self.symptomList = symptoms.symptomDetails;
            //console.log(self.symptomList);
          });
        });
    },
}