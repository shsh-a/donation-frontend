<template>
<b-container>
    <b-form @submit.prevent="submit" @reset="onReset" v-if="show">

        <b-input-group prepend="Name">
            <b-form-input class="p-4" id="input-name" v-model="name" type="text" required placeholder="Your Name*" :state="nameState"></b-form-input>
        </b-input-group>

        <b-input-group prepend="E-Mail" class="py-2">
            <b-form-input class="p-4" id="input-email" v-model="email" type="email" required placeholder="Your E-Mail*" :state="emailState"></b-form-input>
        </b-input-group>




        <div class="py-2">
            <vue-phone-number-input v-model="phone" :required="true" default-country-code="IN" />
        </div>

        <b-input-group prepend="Address" class="py-2">
            <b-form-input class="p-4" id="input-addr" v-model="address" type="text" required placeholder="Your Adress*"></b-form-input>

        </b-input-group>

        <!-- <place-autocomplete-field v-model="address" placeholder="Enter an an address, zipcode, or location" label="Address" name="address" api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"></place-autocomplete-field> -->

        <b-input-group prepend="Amount $" class="py-2">
            <b-form-input class="p-4" id="input-amount" v-model="amount" type="number" step="100" required placeholder="amount" :state="amountState"></b-form-input>
        </b-input-group>

        <vue-recaptcha ref="recaptcha" @verify="onCaptchaVerified" @expired="onCaptchaExpired" sitekey="6LfYzaQZAAAAAGJab3zwjpfZNpiU5aslXaqJMzIC">

        </vue-recaptcha>
        <b-form-invalid-feedback :state="captchaState">
            You must complete captcha verification before you can proceed.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="captchaState">
            Success..
        </b-form-valid-feedback>



        <b-button type="submit" variant="success" size="lg" :disabled="!submitState">Donate</b-button>

        <b-button class="m-2 " type="reset" variant="danger" size="lg">Reset</b-button>
    </b-form>




</b-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'page',
    data() {
        return {
            name: 's',
            email: 's@B.COM',
            phone: "1234567890",
            show: true,
            address: "a",
            amount: 100,
            token: '',
            submitState: false,
        }
    },
    methods: {
        submit: function() {
            console.log('submit clicked');
            axios.post('http://localhost:8001/donate', {
                    recaptchaToken: this.token,
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    address: this.address,
                    amout: this.amount
                })
                .then((response) => {
                    console.log(response);

                    console.log(response.data.order.id);


                    var options = {
                        "key": "rzp_test_38t5Sl6d0qAXHO", // Enter the Key ID generated from the Dashboard
                        "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        "currency": "INR",
                        "name": "Acme Corp",
                        "description": "Test Transaction",
                        "image": "https://example.com/your_logo",
                        "order_id": response.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                        "handler": function(response) {
                            alert(response.razorpay_payment_id);
                            alert(response.razorpay_order_id);
                            alert(response.razorpay_signature)
                        },
                        "prefill": {
                            "name": "Gaurav Kumar",
                            "email": "gaurav.kumar@example.com",
                            "contact": "9999999999"
                        },
                        "notes": {
                            "address": "Razorpay Corporate Office"
                        },
                        "theme": {
                            "color": "#F37254"
                        }
                    };

                    try{
                        var rzp1 = new window.Razorpay(options);

                        rzp1.open();
                        
                    }catch(err){
                        alert(err);
                    }


                }, (error) => {
                    console.log(error);
                });


        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.email = '';
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
        updatePhoneNumber(data) {
            this.formatted_number = data.formattedNumber
            this.national_number = data.nationalNumber
        },
        onCaptchaExpired: function() {
            this.$refs.recaptcha.reset();
            this.token = "";
            this.submitState = false;
        },
        onCaptchaVerified: function(token) {
            this.token = token;
            this.submitState = true;
        }
    },
    computed: {
        nameState() {
            return this.name.length > 2 ? true : null;
        },

        emailState() {
            let re = /\S+@\S+\.\S+/;
            if (this.email.length > 0 && re.test(this.email) == true) {
                return true;
            } else if (this.email.length == 0) {
                return null;
            } else {
                return false;
            }

        },
        amountState() {
            return this.amount > 10 ? true : false;
        },
        captchaState() {
            return this.token.length > 0 ? true : false;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
b-form-input {
    margin: auto;
}
</style>
