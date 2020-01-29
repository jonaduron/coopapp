<template>
    <div class="members">
        <Navigation></Navigation>
        <section class="hero is-medium intro">
            <div class="hero-body">
                <div class="container maincontainer">
                    <div class="column">
                        <h1 class="title intro-title">Members</h1>
                        <div class="member-item is-hoverable" v-for="member in members" v-bind:key="member.id" @click="viewMember(member)">
                            <p>{{ member.fullname }}</p>
                        </div>
                    </div> 
                    <div class="column">
                        <h1 class="title intro-title">Member selected</h1>
                        <div v-if="member">
                            <div class="member-visualization">
                            <p>{{ member.fullname }}</p>
                            <p>{{ member.email }}</p>
                            <div class="button is-danger" @click="deleteMember()">
                                <i class="material-icons icon">delete</i><strong>Delete</strong>
                            </div>
                        </div>
                        </div>
                        <div v-else>
                            <p>In this section will appear a member selected</p>
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
</style>