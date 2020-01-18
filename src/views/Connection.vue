<template>
    <div class="connection">
        <div class="container">
            <section class="section">
                <h1 class="title">Login</h1>
                <div class="field">
                    <label class="label">Email</label>
                    <input v-model="email" class="input is-rounded" name="email">
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <input v-model="password" class="input is-rounded" name="email">
                </div>
                <div class="media-center">
                    <button class="button is-danger is-rounded" @click="connect()">Login</button>
                    <div><br>
                        <p>You don't have an account?</p>
                        <p><router-link to="/create-account">Create it here!</router-link></p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'connection',
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
                console.log(this.$store.state.user);
                this.$router.push('/');
            }).catch(
                error => console.log(error)
            );
        }
  }
}
</script>
