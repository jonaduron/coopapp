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
                    <input type="password" v-model="password" class="input is-rounded" name="email">
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
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
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
                this.$store.state.session_token = response.data.token;
                this.$store.state.user = true;
                this.$store.state.user_id = response.data.member.id;
                console.log(response.data);
                console.log(this.$store.state.user);
                console.log(this.$store.state.user_id);
                this.$router.push('/');
            }).catch(
                error => console.log(error)
            );
        }
  }
}
</script>
