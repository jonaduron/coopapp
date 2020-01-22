<template>
  <div class="navigation">
    <div class="container is-widescreen">
      <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <div class="navbar-item">
              <img src="../assets/coopapp2.png" alt="Coopapp">
            </div>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div class="navbar-menu">
            <div class="navbar-start">
              <router-link class="navbar-item" to="/">
                Home
              </router-link>
              <router-link class="navbar-item" to="/channels">
                Channels
              </router-link>
              <router-link class="navbar-item" to="/members">
                Members
              </router-link>         
              <router-link class="navbar-item" to="/about">
                About
              </router-link>
            </div>
            <div class="navbar-end">
              <div class="navbar-item">
                <button class="button is-danger" @click="signout()">
                  Signout
                </button>
              </div>
            </div>
          </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    
  },
  methods: {
    signout() {
      axios.delete('members/signout?token='+this.$store.state.session_token).then((response) => {
        alert(response.status);
        this.$store.state.session_token = false;
        this.$store.state.session_token = false;
        this.$router.push('/connection');
      }).catch(error => console.log(error));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  text-decoration: none !important;
}
* {
  background-color: black;
  color: white !important;
}
.navbar-item:hover {
  color: rgba(255, 0, 0, 0.89) !important;
}
</style>
