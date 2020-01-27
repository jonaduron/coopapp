<template>
    <div class="channels has-background-white-ter">
        <Navigation></Navigation>
        <div class="container is-widescreen">
            <div class="section is-pulled-left">
                <div class="container">
                    <h1 class="title is-1 is-pulled-left">Channels</h1>
                    <div class="card">               
                        <div class="channel-item is-clickable" v-for="channel in channels" v-bind:key="channel.id" @click="viewChannel(channel)">
                            <p>{{ channel.label }}</p>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
        <div class="content">
            <div class="title">Channel</div>
            <div v-if="channel" class="card">               
                <div class="channel-visualization">
                    <p>{{ channel.id }}</p>
                    <p>{{ channel.label }}</p>
                    <p>{{ channel.topic}}</p>
                    <button class="button is-danger" @click="deleteChannel()">Delete</button>
                    <button class="button is-warning" @click="activeEdit()">Edit</button>
                    <section v-if="edit">
                        <div class="field">
                            <label class="label">Label</label>
                            <input type="label" v-model="channel.label" class="input is-rounded" name="label">
                        </div>
                        <div class="field">
                            <label class="topic">Topic</label>
                            <input type="topic" v-model="channel.topic" class="input is-rounded" name="topic">
                        </div>
                    </section>
                </div>
            </div>
            <div v-else>
                <p>In this section will appear a channel selected</p>
            </div> 
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
            channels: [],
            channel: false,
            edit: false
        }    
    },
    methods: {
        getChannels() {
            axios.get('channels?token='+this.$store.state.session_token).then((response) => {
                console.log(response.data);
                this.channels = response.data;
            }).catch(error => console.log(error));
        },
        viewChannel(channel) {
            this.channel = channel;
            console.log(this.channel.id, this.channel.label, this.channel.topic);
        },
        deleteChannel() {
            axios.delete('channels/'+this.channel.id+'?token='+this.$store.state.session_token).then((response) => {
                alert('it seems like it worked');
                console.log(response.data);
            }).catch(error => console.log(error));
        },
        editChannel() {
            axios.put('channels/?token='+this.$store.state.session_token+'&id='+this.channel.id+'&label='+this.channel.label+'&topic='+this.channel.topic).then((response) => {
                console.log(response.data);
            }).catch(error => console.log(error));
        },
        activeEdit() {
            this.edit = true;
        }
    },
    mounted() {
        this.getChannels();
    }
}
</script>

<style scoped>

</style>