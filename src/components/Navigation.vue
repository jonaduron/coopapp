<template>
  <div class="navigation">
    <div class="container is-widescreen">
      <nav id="navbar" class="bd-navbar navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <img src="../assets/coopapp2.png" alt="Coopapp"><p><strong>COOPAPP</strong></p>
              </a>
              <a class="navbar-burger" role="button" @click="showNav = !showNav" :class="{'is-active': showNav}">
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
            <div id="navbarmenu" class="navbar-menu" :class="{'is-active': showNav}">
              <div class="navbar-start">
                <router-link class="navbar-item" to="/">
                  <strong>Home</strong>
                </router-link>
                <router-link class="navbar-item" to="/channels">
                  <strong>Channels</strong>
                </router-link>
                <router-link class="navbar-item" to="/members">
                  <strong>Members</strong>
                </router-link>         
                <router-link class="navbar-item" to="/about">
                  <strong>About</strong>
                </router-link>
              </div>
              <div class="navbar-end">
                <div class="navbar-item">
                  <p class="control"> 
                    <button class="button is-danger" @click="signout()">
                      <strong>Signout</strong>
                    </button>
                  </p>
                </div>
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
  data() {
    return {
      showNav: false
    }
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

<!-- Add "scoped" attribute to limbd-navbar it CSS to this component only -->
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

.navbar-item:hover {
  color: rgba(255, 0, 0, 0.89) !important;
}
</style>
