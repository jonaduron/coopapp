<template>
    <div class="messages">
        <Navigation></Navigation>
        <div class="layout row">
            <div class="container">
                <section class="hero is-info">
                    <h1 class="title">{{ channel.label }}</h1>
                    <h2 class="subtitle">{{ channel.topic }}</h2>
                </section>
                <div class="conteneur">
                    <div class="container" style="position: relative;">
                        <div class="chat-container">
                            <div>
                                <div v-for="message in messages" v-bind:key="message.id">
                                    <div class="message">
                                        <div class="username">
                                            {{ message.member_id }}
                                        </div>
                                        <div style="margin-top: 5px;"></div>
                                        <div class="content">{{ message.message }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="typer">
                            <input type="text" placeholder="Type here...">
                            <button type="button" class="blue--text emoji-panel btn btn--icon">
                                <div class="btn_content">
                                    <i class="material-icons icon">mood</i>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="recent-chats-container">
                        <ul class="list">
                            <li class="subheader">Recent chats</li>
                        </ul>
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
    name: 'Messages',
    components: {
        Navigation
    },
    data() {
        return {
            messages: [],
            channel: ''
        }
    },
    methods: {
        getMessages() {
            axios.get('channels/'+this.channel_id+'/posts?token='+this.$store.state.session_token).then((response) => {
                this.messages = response.data;
            }).catch(error => console.log(error));
        }
    },
    created() {
        bus.$on('get-channel', (data) => {
            this.channel = data;
        });
    },
    mounted () {
        this.getMessages();
    },
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
    box-sizing: border-box;
    height: calc(100vh - 14.5rem);
    overflow-y: auto;
    padding: 10px;
    background-color: #f2f2f2;
}
.message {
    margin-bottom: 3px;
}
.typer {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    height: 4.9rem;
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
.btn--icon {
    border-radius: 50%;
    justify-content: center;
    height: 36px;
    width: 36px;
    min-width: 0;
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
.message.own {
    text-align: right;
}
</style>