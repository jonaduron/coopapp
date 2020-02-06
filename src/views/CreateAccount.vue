<template>
    <div class="create-account has-background-white-ter">
        <div class="container has-blackground-">
            <section class="section">
                <div class="form" @submit.prevent="formSubmit">
                    <h1 class="title">Create account</h1>
                    <div class="field">
                        <label class="label">Fullname</label>
                        <input type="text" v-model="fullname" class="input is-rounded" name="fullname">
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <input type="email" v-model="email" class="input is-rounded" name="email">
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <input type="password" v-model="password" class="input is-rounded" name="password">
                    </div>
                    <div class="field">
                        <label class="label">Confirm password</label>
                        <input class="input is-rounded" name="confirmPassword">
                    </div>
                    <div class="media-center">
                        <button class="button is-primary is-rounded" @click="createAccount()"><strong>Signup</strong></button>
                        <div><br>
                            <p><router-link to="/connection"><strong>Come back!</strong></router-link></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'CreateAccount',
        data() {
            return {
                fullname: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            }
        },
        methods: {
            createAccount() {
                axios.post('members', {
                        fullname:  this.fullname,
                        email:     this.email,
                        password:  this.password
                    }).then((response) => {
                        console.log(response);
                        this.$router.push('/connection');
                    }).catch(
                        error => console.log(error)
                    );
            },
            formSubmit: function(event) {
                this.fullname = '';
                this.email = '';
                this.password = '';
                this.name = '';
                event.target.reset();
            }
        }
    }  
</script>

<style scoped>
.container {
    text-align: center;
}
body {
   background-color: darkgoldenrod; 
}
</style>