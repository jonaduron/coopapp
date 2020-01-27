<template>
    <div class="members has-background-white-ter">
        <Navigation></Navigation>
          <div class="container is-widescreen">
            <div class="section is-pulled-left">
                <div class="container">
                    <div class="title is-1 is-pulled-left">Members</div>
                    <div class="card">               
                        <div class="member-item is-clickable" v-for="member in members" v-bind:key="member.id" @click="viewMember(member)">
                            <p>{{ member.fullname }}</p>
                        </div>
                    </div>
                </div>        
            </div>
            <div class="section is-pulled-right">
                <div class="container">
                    <div class="title">Member</div>
                    <div v-if="member" class="card">               
                        <div class="member-visualization">
                            <p>{{ member.id }}</p>
                            <p>{{ member.fullname }}</p>
                            <p>{{ member.email }}</p>
                            <button class="button is-danger" @click="deleteMember()">Delete</button>
                        </div>
                    </div>
                    <div v-else>
                        <p>In this section will appear a member selected</p>
                    </div>   
                </div> 
            </div>
          </div>    
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
                console.log(response.data);
                this.members = response.data;
            }).catch(error => console.log(error));
        },
        viewMember(member) {
            this.member = member;
            console.log(this.member.id, this.member.fullname, this.member.email);
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
.member-item {
    height: 2em;
    border: 1px solid gray;
    margin: 2px;
    padding: 5px;
    box-shadow: 0px 2px 2px 0px;
}
</style>