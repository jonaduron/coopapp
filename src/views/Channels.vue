<template>
    <div class="channels">
        <Navigation></Navigation>
        <section class="section">
            <div class="container">
                <div class="header">
                    <h1 class="title intro-title is">Channels</h1>
                    <div class="button is-primary" @click="isActive = !isActive">
                        <i class="material-icons icon">create</i><strong>Create channel</strong>
                    </div>
                </div>  
                <div class="list is-hoverable">    
                    <div class="list-item" v-for="channel in channels" v-bind:key="channel.id">
                        <router-link :to="'/channel/'+channel.id">
                            <i class="material-icons icon">mode_comment</i><strong>    {{ channel.label }}</strong>
                            <p>{{ channel.topic }}</p>
                        </router-link>
                        <div class="channel-buttons">
                            <div class="button is-danger is-rounded" @click="deleteChannel(channel.id)">
                                <i class="material-icons icon">delete</i>
                            </div>
                            <div class="button is-warning is-rounded" @click="editEvent(channel)">
                                <i class="material-icons icon">edit</i>
                            </div>
                        </div>
                    </div>
                </div> 
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
                                    <div class="button is-link is-rounded" @click="postChannel()">
                                        <i class="material-icons icon">create</i><strong>Create</strong>
                                    </div>
                                    <div type="submit" class="button is-danger is-rounded" @click="isActive = false">
                                        <i class="material-icons icon">cancel</i><strong>Cancel</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div> 
        <div class="modal" :class="{'is-active': isActive2}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="hero is-small is-warning is-bold">
                    <div class="hero-body">
                        <div class="container">
                            <div class="is-pulled-left">
                                <h1 class="title">New chat</h1>
                            </div>
                            <div class="form is-pulled-left">
                                <div class="field">
                                    <label class="label is-pulled-left">Label: </label>
                                    <input type="text" v-model="label" class="input is-rounded" name="label">
                                </div>
                                <div class="field">
                                    <label class="label is-pulled-left">Topic: </label>
                                    <input type="text" v-model="topic" class="input is-rounded" name="topic">                                 
                                </div>
                                <div class="media-center">
                                    <div class="button is-primary is-rounded" @click="editChannel(channel)">
                                        <i class="material-icons icon">create</i><strong>Edit</strong>
                                    </div>
                                    <div type="submit" class="button is-danger is-rounded" @click="isActive2 = false">
                                        <i class="material-icons icon">cancel</i><strong>Cancel</strong>
                                    </div>
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
            isActive: false,
            isActive2: false
        }    
    },
    methods: {
        getChannels() {
            axios.get('channels?token='+this.$store.state.session_token)
            .then((response) => {
                this.channels = response.data;
                this.$store.commit('setChannels', response.data);
            }).catch(error => console.log(error));
        },
        deleteChannel(id) {
            axios.delete('channels/'+id+'?token='+this.$store.state.session_token)
            .then((response) => {
                alert('it seems like it worked');
                this.getChannels();
            }).catch(error => console.log(error));
        },
        editChannel(channel) {
            axios.put('channels/'+channel.id+'?token='+this.$store.state.session_token, {
                label: this.label,
                topic: this.topic,
            }).then((response) => {
                alert('si jaló');
                this.isActive2 = false;
                this.getChannels();
            }).catch(error => console.log(error));
        },
        postChannel() {
            axios.post('channels?token='+this.$store.state.session_token, {
                label: this.label,
                topic: this.topic
            }).then((response) => {
                console.log('it has been successful bro, you are la verga');
                this.changeActiveState();
                this.getChannels();
                this.label = '';
                this.topic = '';
            }).catch(error => console.log(error));
        },
        changeActiveState() {
            this.isActive = !this.isActive;
        },
        editEvent(channel) {
            this.channel = channel;
            this.isActive2 = !this.isActive2;
        }
    },
    mounted() {
        this.getChannels();
    }
}
</script>

<style scoped>
.list-item {
    height: 4em;
    display: flex;
    justify-content: space-between;
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
    text-align: left;
}
.media-center {
    display: flex;
    justify-content: space-around;
}
</style>