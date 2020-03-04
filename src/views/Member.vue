<template>
    <div class="members">
        <Navigation></Navigation>
        <section class="section">
            <div class="member-container"> 
                <div class="member-div">
                    <div class="header">
                        <h1 class="title intro-title is">Member</h1>
                    </div> 
                    <div class="info-div">
                        <div class="member-img">
                            <img class="image is-256x256" src="https://gravatar.com/avatar/1b8696ebec002747c0aeb76b51a27346?s=400&d=robohash&r=x"/>  
                        </div>
                        <div class="data">
                            <br>
                            <p class="title">{{ member.fullname }}</p>
                            <p>{{ member.email }}</p>    
                        </div> 
                    </div> 
                </div>
                <div class="messages-div">
                     <div class="header">
                        <h1 class="title intro-title is">Last 10 messages</h1>
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
                                <div class="button is-warning is-rounded" @click="editChannel(channel)">
                                    <i class="material-icons icon">edit</i>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
    name: 'Member',
    components: {
        Navigation
    },
    data() {
        return {
            member: false
        }
    },
    methods: {
        deleteMember() {
            if(this.member.id == this.$store.state.user_id) {
                console.log('member-id = '+ this.member.id + 'this.$store.state.user_id = ' + this.$store.state.user_id);
            } else {
                axios.delete('members/'+this.member.id+'?token='+this.$store.state.session_token).then((response) => {
                    alert('it seems like it worked');
                    console.log(response.data);
                }).catch(error => console.log(error));
            }
        }
    },
    mounted() {
        this.member = this.getMember(this.$route.params.id);
    }
}
</script>

<style scoped>
.member-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}
.info-div {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}
</style>