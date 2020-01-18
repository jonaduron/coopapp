<template>
    <div class="create-account">
        <div class="container">
            <section class="section">
                <h1 class="title">Create account</h1>
                <div class="field">
                    <label class="label">Fullname</label>
                    <input v-model="fullname" class="input is-rounded" name="fullname">
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <input v-model="email" class="input is-rounded" name="email">
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <input v-model="password" class="input is-rounded" name="password">
                </div>
                <!--<div class="field">
                    <label class="label">Confirm password</label>
                    <input class="input is-rounded" name="confirmPassword">
                </div>-->
                <div class="media-center">
                    <button class="button is-warning is-rounded" @click="createAccount()"><strong>Signup</strong></button>
                    <div><br>
                        <p><router-link to="/connection">Come back!</router-link></p>
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
                password: ''
            }
        },
        mounted() {

        },
        methods: {
            createAccount() {
                axios.post('members', {
                        fullname:  this.fullname,
                        email:     this.email,
                        password:  this.password
                    }).then((response) => {
                        console.log(response);
                    }).catch(
                        error => console.log(error)
                    );
            }
        }
    }  
</script>

<style scoped>
.container {
    text-align: center;
}
</style>