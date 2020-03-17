<template>
  <div class="home">
    <Navigation></Navigation>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'home',
  components: {
    Navigation
  },
  mounted() {
      axios.get('ping').then(()=> {
          if(this.$store.state.session_token == false) {
              this.$router.push('/connection');
          }else {
            this.$router.push('/channels');
          }
      }).catch(() => {
          alert('Cannot connect to the API');
      });
  },
  computed: {
    userConnected() {
        return this.$store.state.user ? true : false;
    }
  },
}
</script>
