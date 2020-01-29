<template>
    <div class="channels">
        <Navigation></Navigation>
        <section class="hero is-medium intro">
            <div class="hero-body">
                <div class="container maincontainer">
                    <div class="column">
                        <h1 class="title intro-title">Channels</h1>
                        <div class="channel-item is-hoverable" v-for="channel in channels" v-bind:key="channel.id" @click="viewChannel(channel)">
                            <p>{{ channel.topic }}</p>
                        </div>
                    </div> 
                    <div class="column">
                        <h1 class="title intro-title">Channel selected</h1>
                        <div v-if="channel">
                            <div class="channel-visualization">
                                <div class="container">
                                    <p>{{ channel.topic }}</p>
                                    <p>{{ channel.label }}</p>
                                </div>
                                <div class="control is-pulled-right">
                                    <div class="button is-danger" @click="deleteChannel()">
                                        <i class="material-icons icon">delete</i><strong>Delete</strong>
                                    </div>
                                    <div class="button is-primary" @click="shareChannel()">
                                        <i class="material-icons icon">forward</i><router-link class="item" to="/messages">See messages</router-link>
                                    </div>
                                </div>    
                            </div>
                        </div>
                        <div v-else>
                            <p>In this section will appear a channel selected</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import { bus } from '../main.js'

export default {
    name: "Channels",
    components: {
        Navigation
    },
    data() {
        return {
            channels: [],
            channel: false,
            edit: false
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
        deleteChannel() {
            axios.delete('channels/'+this.channel.id+'?token='+this.$store.state.session_token).then((response) => {
                alert('it seems like it worked');
            }).catch(error => console.log(error));
        },
        editChannel() {
            axios.put('channels/?token='+this.$store.state.session_token+'&id='+this.channel.id+'&label='+this.channel.label+'&topic='+this.channel.topic).then((response) => {
                console.log(response.data);
            }).catch(error => console.log(error));
        },
        shareChannel() {
            bus.$emit('get-channel', this.channel);
        }
    },
    mounted() {
        this.getChannels();
    }
}
</script>

<style scoped>
.channel-item {
    height: 2em;
    border: 1px solid gray;
    margin: 2px;
    padding: 5px;
    box-shadow: 0px 2px 2px 0px;
}
.maincontainer {
    display: flex;
    flex-flow: row wrap;
}
.item {
    color: white;
}
</style>