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
                        <div class="member-info"> 
                            <div class="member-img">
                                <img class="image is-48x48" src="https://gravatar.com/avatar/1b8696ebec002747c0aeb76b51a27346?s=400&d=robohash&r=x"/>  
                            </div> 
                            <div class="member-data">
                                <strong>{{ member.fullname }}</strong><br>
                                {{ member.email }}
                            </div>
                        </div>    
                        <div class="member-buttons">
                            <router-link :to="'/member/'+member.id">
                                <div class="button is-link is-rounded" >
                                    <i class="material-icons icon">subject</i><strong>See details</strong>
                                </div>
                            </router-link>    
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
    name: 'Members',
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
        getMembers() {
            axios.get('members?token='+this.$store.state.session_token).then((response) => {
                this.members = response.data;
            }).catch(error => console.log(error));
        },
        viewMember(member) {
            this.member = member;
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
        this.getMembers();
    }
}
</script>

<style scoped>
.list-item {
    height: 4em;
    display: flex;
    justify-content: space-between;
}
.member-item {
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
.header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
.member-info {
    display: flex;
    flex-flow: row wrap;
}
.member-data {
    text-align: left;
}
</style>