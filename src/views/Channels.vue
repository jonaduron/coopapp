<template>
    <div class="channels has-background-white-ter">
        <Navigation></Navigation>
        <div class="container is-widescreen">
            <h1 class="title is-1 is-pulled-left">Channels</h1>
        </div>
        <div class="content">

        </div>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
    name: "Channels",
    components: {
        Navigation
    },
    data() {
        return {
            channels: []
        }    
    },
    methods: {
        getChannels() {
            axios.get('channels?token='+this.$store.state.session_token).then((response) => {
                console.log(response.data);
                this.channels = response.data;
            }).catch(error => console.log(error));
        }
    },
    mounted() {
        this.getChannels();
    }
}
</script>

<style scoped>

</style>