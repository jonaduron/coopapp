<template>
  <div class="navigation">
    <nav id="navbar" class="bd-navbar navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              <img src="../assets/coopapp-nav.png" alt="Coopapp">
            </a>
            <a class="navbar-burger" role="button" @click="showNav = !showNav" :class="{'is-active': showNav}">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div id="navbarmenu" class="navbar-menu" :class="{'is-active': showNav}">
            <div class="navbar-start">
              <router-link class="navbar-item" to="/channels">
                <i class="material-icons icon">forum</i><strong>Channels</strong>
              </router-link>
              <router-link class="navbar-item" to="/members">
                <i class="material-icons icon">group</i><strong>Members</strong>
              </router-link>         
            </div>
            <hr class="nabar-divider">
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="control"> 
                  <div class="button is-danger" @click="signout()">
                    <i class="material-icons icon">exit_to_app</i><strong>Signout</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </nav>
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
        this.$store.state.session_token = false;
        this.$store.state.session_token = false;
        this.$router.push('/connection');
      }).catch(error => console.log(error));
    },
    activeRoute() {
      
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
</style>
