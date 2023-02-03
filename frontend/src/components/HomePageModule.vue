<template>
    <div class="main-content">
        <!-- outil de création de posts à la Facebook ? -->
        <CreatePost />
        <!-- boucle affichage de composants UserPost (? nom à définir) -->
        <UserPost />
    </div>
</template>

<script>
import UserPost from './UserPost.vue';
import CreatePost from './CreatePost.vue';

export default{
    name: 'HomePage',
    components: {
        UserPost, CreatePost
    }
}
</script>

<style>

</style>