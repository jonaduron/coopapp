<template>
    <div class="connection has-background-white-ter">
        <div class="container has-background-white-ter">
            <section class="section">
                <h1 class="title">Login</h1>
                <div class="field">
                    <label class="label">Email</label>
                    <input type="email" v-model="email" class="input is-rounded" name="email">
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <input type="password" v-model="password" class="input is-rounded" name="email" v-on:keyup.enter="connect()">
                </div>
                <div class="media-center">
                    <button class="button is-primary is-rounded" @click="connect()">Login</button>
                    <div><br>
                        <p>You don't have an account?</p>
                        <p><router-link to="/create-account"><strong>Create it here!</strong></router-link></p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
    name: 'connection',
    components: {
        Navigation
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        connect() {
            axios.post('members/signin', {
                email: this.email,
                password: this.password
            }).then((response) => {
                this.$store.commit('setSessionMember', response.data);
                this.$router.push('/');
            }).catch(
                error => console.log(error)
            );
            axios.get('members?token='+this.$store.state.session_token).then((response) => {
                this.$store.commit('setMembers', response.data);
            }).catch(error => console.log(error));
        },
        getStatus() {
            
        }
  }
}
</script>

<style scoped>
.section {
    box-sizing: border-box;
    padding-top: 100px;
    padding-bottom: 180px;
    padding-left: 100px;
    padding-right: 100px;
}
</style>