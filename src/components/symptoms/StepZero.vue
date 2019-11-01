<template>
  <div class="container">
    <div class="col-lg-12 col-md-12">
      <h2>Terms of Service</h2>
      <p>Before using the checkup, please read Terms of Service. Remember that:</p>
      <ul>
        <li>Checkup is not a diagnosis. Checkup is for informational purposes and is not a qualified medical opinion.</li>
        <li>Do not use in emergencies. In case of health emergency, call your local emergency number immediately.</li>
        <li>Your data is safe. Information that you provide is anonymous and not shared with anyone.</li>
      </ul>
      <form>
        <label class="checkbox-inline">
          <input type="checkbox" name="terms" value="terms" @change="checkBox" />I read and accept Terms of Service and Privacy Policy.
        </label>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      termsChecked: false
    };
  },
  mounted() {
    this.$emit("can-continue", { value: false });
  },
  methods: {
    checkBox($event) {
      this.termsChecked = !this.termsChecked;
      if (this.termsChecked) {
        this.$emit("can-continue", { value: true });
      }
    }
  }
};
</script>
<style scoped>
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: static;
  opacity: 1;
  margin-right: 10px;
}
ul {
  display: inline-block;
}
ul:not(.browser-default) {
  list-style-type: inherit;
}
ul:not(.browser-default) > li {
  list-style-type: inherit;
}
</style>