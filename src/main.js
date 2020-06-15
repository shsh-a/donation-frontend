import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue';
import VueTelInput from 'vue-tel-input'
import VuePhoneNumberInput from 'vue-phone-number-input';
import VuePlaceAutocomplete from 'vue-place-autocomplete';
import VueRecaptcha from 'vue-recaptcha';



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-phone-number-input/dist/vue-phone-number-input.css';





Vue.component('vue-phone-number-input', VuePhoneNumberInput);
Vue.component('vue-recaptcha', VueRecaptcha);
Vue.use(VuePlaceAutocomplete);

Vue.use(BootstrapVue);
Vue.use(VueTelInput);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
