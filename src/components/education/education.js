import { mapGetters } from "vuex";
export default {
    name:'education',
    data() {
        return {
          isEmergency: '',
        }
    },
    computed: {
      ...mapGetters(['getResult'])
    },
    methods: {

    }
}