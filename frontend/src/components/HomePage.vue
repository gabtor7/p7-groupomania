<template>
    <div class="main-content">
        <!-- outil de création de posts à la Facebook ? -->
        <!-- boucle affichage de composants UserPost (? nom à définir) -->
        <UserPost />
    </div>
</template>

<script>
import UserPost from './UserPost.vue';

export default{
    name: 'HomePage',
    components: {
        UserPost
    }
}
</script>

<style>

</style>