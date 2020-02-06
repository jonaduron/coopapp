<template>
    <div class="members">
        <Navigation></Navigation>
        <section class="section">
            <div class="container">
                <div class="header">
                    <h1 class="title intro-title is">Members</h1>
                </div>  
                <div class="list is-hoverable">    
                    <div class="list-item" v-for="member in members" v-bind:key="member.id">
                        <router-link :to="'/member/'+member.id">
                            <strong>    {{ member.fullname }}</strong>
                            <p>{{ member.email }}</p>
                        </router-link>
                        <div class="member-buttons">
                            <div class="button is-link is-rounded" @click="deleteChannel(channel.id)">
                                <i class="material-icons icon">subject</i><strong>See details</strong>
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
            members: [],
            member: false
        }
    },
    methods: {
        getMember() {
            axios.get('members/').then((response) => {
                
            }).catch(error => console.log(error));
        },
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
        this.getMember();
    }
}
</script>

<style scoped>

</style>