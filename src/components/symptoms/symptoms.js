import HorizontalStepper from 'vue-stepper';

// This components will have the content for each stepper step.
import StepZero from './StepZero.vue';
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';
import StepThree from './StepThree.vue';
import StepFour from './StepFour.vue';

export default {
    components: {
        HorizontalStepper
    },
    data() {
        return {
            demoSteps: [
                {
                    icon: 'person',
                    name: 'zero',
                    title: 'Introduction',
                    subtitle: '',
                    component: StepZero,
                    completed: false

                },
                {
                    icon: 'person',
                    name: 'first',
                    title: 'Patient Details',
                    subtitle: '',
                    component: StepOne,
                    completed: false

                },
                {
                    icon: 'person',
                    name: 'second',
                    title: 'Symptom Checker',
                    subtitle: '',
                    component: StepTwo,
                    completed: false

                },
                {
                    icon: 'person',
                    name: 'third',
                    title: 'Questions',
                    subtitle: '',
                    component: StepThree,
                    completed: false

                },
                {
                    icon: 'report_problem',
                    name: 'fourth',
                    title: 'Interview',
                    subtitle: '',
                    component: StepFour,
                    completed: false
                }
            ]
        }
    },
    methods: {
        // Executed when @completed-step event is triggered
        completeStep(payload) {
            debugger;
            this.demoSteps.forEach((step) => {
                if (step.name === payload.name) {
                    step.completed = true;
                }
            })
        },
        // Executed when @active-step event is triggered
        isStepActive(payload) {
            this.demoSteps.forEach((step) => {
                if (step.name === payload.name) {
                    if (step.completed === true) {
                        step.completed = false;
                    }
                }
            })
        },
        // Executed when @stepper-finished event is triggered
        finish(payload) {
            this.$router.push('education')
        }
    }
}