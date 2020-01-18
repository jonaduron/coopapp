<template>
  <div class="home">
    <Navigation></Navigation>
    
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Navigation from '@/components/Navigation.vue'
export default {
  name: 'home',
  components: {
    Navigation
  },
  mounted() {
      axios.get('ping').then(()=> {
          if(!this.userConnected) {
              this.$router.push('/connection');
              console.log(this.$store.state.user);
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
