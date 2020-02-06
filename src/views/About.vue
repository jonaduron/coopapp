<template>
    <div class="about">
        <Navigation></Navigation>
          <div class="container">
            <div class="h-100" style="width: 120px; background-color: rgba(0,0,255,.1)">
              Height 100%
            </div>
            <div class="">
              <p>Hola</p>
            </div>
          </div>   
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import { bus } from '../main.js'

export default {
    name: "About",
    components: {
        Navigation
    },
    data() {
        return {
            channels: [],
            channel: false,
            edit: false,
            label: "",
            topic: "",
            isActive: false
        }    
    },
    methods: {
        getChannels() {
            axios.get('channels?token='+this.$store.state.session_token).then((response) => {
                this.channels = response.data;
            }).catch(error => console.log(error));
        },
        viewChannel(channel) {
            this.channel = channel;
        },
        deleteChannel(id) {
            axios.delete('channels/'+id+'?token='+this.$store.state.session_token)
            .then((response) => {
                alert('it seems like it worked');
                this.getChannels();
            })
            .catch(error => console.log(error));
        },
        editChannel(channel) {
            axios.put('channels/'+channel.id+'?token='+this.$store.state.session_token, {
                label: channel.label,
                topic: channel.topic,
            }).then((response) => {
                alert('si jaló');
            }).catch(error => console.log(error));channel
        },
        postChannel() {
            axios.post('channels?token='+this.$store.state.session_token, {
                label: this.label,
                topic: this.topic
            }).then((response) => {
                console.log('it has been successful bro, you are la verga');
                this.changeActiveState();
                this.getChannels();
            }).catch(error => console.log(error));
        },
        changeActiveState() {
            this.isActive = !this.isActive;
        }
    },
    mounted() {
        this.getChannels();
    }
}
</script>

<style scoped>
html, body {
    height: 100%;
}
.container { 
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
</style>