export const outils = {
    methods: {
        getAvatar(membre) {
            let hash = md5(member.email);
            return 'https://avatars.dicebear.com/v2/bottts/'+hash;
        },
        getMember(id) {
            let members = this.$store.state.members;
            for(let i = 0; i < members.length; i++) {
                if(members[i].id == id) {
                    return members[i];
                }
            }
        }
    }
}