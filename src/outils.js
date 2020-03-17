export const outils = {
    methods: {
        getAvatar(membre) {
            let hash = md5(membre.email);
            return 'https://avatars.dicebear.com/v2/bottts/'+hash;
        },
        getMember(id) {
            let members = this.$store.state.members;
            for(let i = 0; i < members.length; i++) {
                if(members[i].id == id) {
                    return members[i];
                }
            }
        },
        getChannel(id) {
            let channels = this.$store.state.channels;
            for(let i = 0; i < channels.length; i++) {
                if(channels[i].id == id) {
                    return channels[i];
                }
            }
        }
    }
}