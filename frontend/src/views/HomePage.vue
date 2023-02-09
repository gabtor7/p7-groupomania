<template>
    <!-- outil de création de posts à la Facebook ? -->
    <CreatePost />
    <!-- boucle affichage de composants Post (? nom à définir) -->
    <div class="all-posts">
        <SinglePost v-for="post in posts" :key="post._id" v-bind="post" :imageUrl="post.imageUrl"/>
    </div>
</template>

<script>
import SinglePost from './../components/SinglePost.vue';
import CreatePost from './../components/CreatePost.vue';

export default{
    name: 'HomePage',
    data() {
        return {
            posts: []
        }
    },

    components: {
        SinglePost, CreatePost
    },
    methods:{
        getPosts(){
            fetch('http://192.168.1.50:3000/post', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                }
            })
            .then(res => res.json().then(posts => {
                this.posts = posts.reverse();
            }))
            .catch(err => console.log(err));
        }
    },
    created(){
        this.getPosts();
    }
}
</script>

<style>

</style>