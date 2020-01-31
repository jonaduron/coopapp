<template>
    <div class="channels">
        <Navigation></Navigation>
        <section class="section">
            <div class="container">
                <div class="header">
                    <h1 class="title intro-title is">Channels</h1>
                    <button class="button is-primary" @click="isActive = !isActive">Create channel</button>
                </div>  
                <div>    
                    <div class="channel-item" v-for="channel in channels" v-bind:key="channel.id">
                        <router-link :to="'/channel/'+channel.id">
                            <p>{{ channel.label }}</p>
                        </router-link>
                    </div>
                </div> 
                <!--<div class="column">
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
                                    <i class="material-icons icon">forward</i><router-link class="item" :to="'/channel/'+channel.id">See messages</router-link>
                                </div>
                            </div>    
                        </div>
                    </div>
                    <div v-else>
                        <p>In this section will appear all the messages of a channel selected</p>
                    </div>
                </div>-->
            </div>
        </section>
        <div class="modal" :class="{'is-active': isActive}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="hero is-small is-primary is-bold">
                    <div class="hero-body">
                        <div class="container">
                            <div class="is-pulled-left">
                                <h1 class="title">New chat</h1>
                            </div>
                            <div class="form is-pulled-left">
                                <div class="field">
                                    <label class="label is-pulled-left">Label</label>
                                    <input type="text" v-model="label" class="input is-rounded" name="label">
                                </div>
                                <div class="field">
                                    <label class="label is-pulled-left">Topic</label>
                                    <input type="text" v-model="topic" class="input is-rounded" name="topic">
                                </div>
                                <div class="media-center">
                                    <button class="button is-link is-rounded" @click="postChannel()">Create</button>
                                    <button class="button is-danger is-rounded" @click="isActive = false">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>   
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
        deleteChannel() {
            axios.delete('channels/'+this.channel.id+'?token='+this.$store.state.session_token)
            .then((response) => {
                alert('it seems like it worked');
            })
            .catch(error => console.log(error));
        },
        editChannel() {
            axios.put('channels/?token='+this.$store.state.session_token+'&id='+this.channel.id+'&label='+this.channel.label+'&topic='+this.channel.topic).then((response) => {
                console.log(response.data);
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
.channel-item {
    height: 2em;
    margin: 2px;
    padding: 5px;
    height: 40px;
    box-shadow: 0px 0px 1px 0px solid black;
}
.header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
.container {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
}
.item {
    color: white;
}
.media-center {
    display: flex;
    justify-content: space-around;
}
</style>