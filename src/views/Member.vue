<template>
    <div class="members">
        <Navigation></Navigation>
        <section class="section">
            <div class="container">
                <div class="header">
                    <h1 class="title intro-title is">Member</h1>
                </div>  
                <div class="member-div">
                    <div class="info-div">
                        <section class="section">
                            <div class="member-img">
                                <img class="image is-96x96" src="https://gravatar.com/avatar/1b8696ebec002747c0aeb76b51a27346?s=400&d=robohash&r=x"/>  
                            </div>
                            <div>
                                <p>{{ member.fullname }}</p>
                                <p>{{ member.email }}</p>    
                            </div> 
                        </section>
                    </div> 
                    <div class="messages-div">
                        <div class="list is-hoverable">    
                            
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
.member-div {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}

</style>