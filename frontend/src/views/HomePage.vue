<template>
    <!-- outil de création de posts à la Facebook ? -->
    <CreatePost @reload-post="getPosts" />
    <!-- boucle affichage de composants Post (? nom à définir) -->
    <div class="all-posts">
        <SinglePost v-for="post in posts" :key="post._id" v-bind="post" @reload-post="getPosts"/>
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
            fetch('http://localhost:3000/post', {
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