import carousel from 'vue-owl-carousel';
import $ from 'jquery'
export default {
    components: {
        carousel
    },
    methods: {
        navigatetosym() {
            this.$router.push("/symptoms");
        }
    },
};
