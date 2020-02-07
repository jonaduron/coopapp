<template>
    <div class="channel">
        <Navigation></Navigation>
        <div class="layout row">
            <div class="container">
                <section class="hero is-primary">
                    <div class="main-title">
                        <div class="has-text-left">
                            <h1 class="title">{{ channel.label }}</h1>
                            <h2 class="subtitle">{{ channel.topic }}</h2>
                        </div>
                    </div>    
                </section>
                <div class="conteneur">
                    <div class="container" style="position: relative;">
                        <div class="chat-container">
                            <div>
                                <div v-for="message in messages" v-bind:key="message.id">
                                    <div class="message">
                                        <div class="message-info">
                                            <div class="username">
                                                {{ message.member_id }}
                                            </div>
                                            <div style="margin-top: 5px;"></div>
                                            <div class="content">{{ message.message }}</div>
                                        </div>
                                        <div class="message-buttons">
                                            <button type="button" class="btn-icon-message button is-danger is-outlined is-rounded" @click="deleteMessage()">
                                                <div>
                                                    <i class="material-icons icon">delete</i>
                                                </div>
                                            </button>
                                            <button type="button" class="btn-icon-message button is-warning is-outlined is-rounded" @click="editMessage()">
                                                <div>
                                                    <i class="material-icons icon">edit</i>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="typer">
                            <input type="text" v-model="message" name="message" placeholder="Type here..." v-on:keyup.enter="posterMessage()">
                            <div class="buttons">
                                <button type="button" class="btn--icon button is-primary is-outlined is-rounded">
                                    <div class="btn_content">
                                        <i class="material-icons icon">mood</i>
                                    </div>
                                </button>
                                <button type="button" class="btn--icon button is-link is-outlined is-rounded" @click="posterMessage()">
                                    <div class="btn_content">
                                        <i class="material-icons icon">send</i>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="recent-chats-container">
                        <div>
                            <h1 class="title">Other channels</h1>
                        </div>
                        <div class="list-item" v-for="channel in channels" v-bind:key="channel.id" @click="goToChannel(channel)">
                            <router-link :to="'/channel/'+channel.id"> 
                                <p class="is-size-6 has-text-black-bis	">{{ channel.label }}</p>
                            </router-link>
                        </div>
                    </div> 
                </div>
            </div>
        </div>          
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { bus } from '../main.js';

export default {
    name: 'Channel',
    components: {
        Navigation
    },
    data() {
        return {
            messages: [],
            channel: '',
            id: 0,
            message: "",
            channels: [],
            members: null
        }
    },
    methods: {
        getMessages() {
            axios.get('channels/'+this.$route.params.id+'/posts?token='+this.$store.state.session_token).then((response) => {
                this.messages = response.data;
            }).catch(error => console.log(error));
        },
        getChannel() {
            axios.get('channels/'+this.$route.params.id+'?token='+this.$store.state.session_token).then((response) => {
                this.channel = response.data;
            }).catch(error => console.log(error));
        },
        posterMessage() {
            axios.post('channels/'+this.channel.id+'/posts', {
                member_id: this.$store.state.user_id,
                message: this.message,
                token: this.$store.state.session_token
            }).then((response) => {
                console.log('it has been successful bro, you are la verga');
                this.getChannels();
                this.getMessages();
            }).catch(error => console.log(error));
        },
        deleteMessage(message) {
            axios.delete('channels/'+this.channel.id+'/posts/'+message.id).then((response) => {
                console.log('it has been successful bro, you are la verga');
                this.getChannels();
                this.getMessages();
            }).catch(error => console.log(error));
        },
        editMessage(message) {
            axios.put('channels/'+this.channel.id+'/posts/'+message.id, {
                message: this.message,
                token: this.store.state.user_id
            }).then((response) => {
                console.log('it has been successful bro, you are la verga');
                this.getChannels();
                this.getMessages();
            }).catch(error => console.log(error));            
        },
        getChannels() {
            this.channels = this.$store.state.channels;
        },
        getMember(member_id) {
            this.member = this.getMember(member_id);
        },
        goToChannel() {
            this.vm.$forceUpdate();
        }
    },
    mounted () {
        this.getMessages();
        this.getChannel();
        this.getChannels();
    }
}
</script>

<style scoped>
.conteneur {
    display: flex;
}
.conteneur > :first-child {
    order: 2;
}
.conteneur > :nth-child(2) {
    order: 1;  
}
.chat-container {
    display: flex;
    box-sizing: border-box;
    height: calc(100vh - 13.5rem);
    overflow-y: auto;
    padding: 10px;
    background-color: #f2f2f2;
}
.message {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 3px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
.typer {
    box-sizing: border-box;
    align-items: center;
    bottom: 0;
    height: 3.5rem;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
}
.typer input[type=text] {
    position: absolute;
    left: 2.5rem;
    padding: 1rem;
    width: 80%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1.25rem;
}
.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
}
.chat-container .content {
    padding: 8px;
    background-color: #90ee90;
    border-radius: 10px;
    display: inline-block;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    max-width: 50%;
    word-wrap: break-word;
}
.message {
    text-align: left;
}
.message .content {
    background-color: #90ee90;
}
.message.own {
    text-align: right;
}
.message.own .content {
    background-color: #ff9999;
}
.buttons {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
.buttons .btn--icon{
    justify-content: center;
    height: 40px;
    width: 40px;
    min-width: 20;
    margin: 10px;
    background-color: transparent;
    border: none;
}
.main-title {
    padding: 5px;
}
.recent-chats-container {
    margin-top: 5px;
}

.btn-icon-message {
    height: 30px;
    width: 30px;
    border: none;
    margin: 3px;
    font-size: 5px;
}
</style>