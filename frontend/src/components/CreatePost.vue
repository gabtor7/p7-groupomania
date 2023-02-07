<template>
    <form class="create-post d-flex justify-content-between border mx-0 row">
        <div class="text-input col-9 pl-0">
            <textarea name="Post content" id="content-input" placeholder="Créer un post" v-model="postContent"></textarea>
        </div>
        <a class="media-upload text-center mr-3" href="#">
            <i class="fa fa-light fa-image"></i>
            <div class="add-media">Ajouter une image</div>
        </a>
        <div class="post-submission">
            <input type="button" value="Poster" @click="registerPost()" class="btn btn-primary h-100">
        </div>
    </form>
</template>

<script>
export default{
    name: 'CreatePost',
    data() {
        return {
            postContent: '',
            postImg: '',
            likes: 0,
            hasLiked: []
        }
    },
    methods:{
        registerPost(){
            fetch('http://192.168.1.49:3000/post', {
                method: 'POST',
                body: JSON.stringify({
                    content: this.postContent,
                    imageUrl: this.postImg,
                    likes: this.likes,
                    hasLiked: this.hasLiked
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
            this.postContent = '';
            this.postImg = '';
        }
    }
}
</script>

<style>

.text-input textarea{
    width: 100%;
    height: 100%;
}

.media-upload{
    margin-top: auto;
}

.media-upload i:before{
    font-size: 32px;
}
</style>