<template>
    <h2>Modifier le post</h2>
    <div class="full-post p-3 my-3 rounded">
        <form enctype="multipart/form-data" class="create-post d-flex justify-content-between border mx-0 row">
            <div class="text-input col-9 pl-0">
                <textarea name="content" id="content-input" placeholder="Créer un post">{{ currentPost.content }}</textarea>
            </div>
            <div class="media-upload d-flex flex-column text-center mr-3 col-2">
                <input type="file" ref="image" name="imageUpload" id="fileUpload" class="add-media" style="display:none" @change="manageImage">
                <label for="fileUpload" class="add-media__button d-flex flex-column"><i class="fa fa-light fa-image"></i>
                    <span v-if="!currentPost.imageUrl">Ajouter une image</span>
                    <span v-else>
                        {{ currentPost.imageUrl }}
                    </span>
                </label>
                <input type="button" v-if="postImg" class="btn btn-secondary" id="file-remove" value="x" @click="removeImage">
            </div>
            <div class="post-submission">
                <input type="submit" value="Poster" @click="registerPost" class="btn btn-primary h-100">
            </div>
        </form>
        <img :src="currentPost.imageUrl" :alt="currentPost.imageUrl" class="post-media">
        <button v-if="currentPost.imageUrl" class="post-actions__delete" title="Supprimer l'image" @click="removeImage">Supprimer l'image</button>
        <button class="post-actions__delete delete-btn" title="Supprimer ce post" @click="open = !open">{{ confirmCancelDeleteTxt }}</button>
        <div v-show="open" class="deletion-component">
            <PostDeletion :postId="currentPost._id"  @cancel-delete="open = false"></PostDeletion>
        </div>
    </div>
</template>

<script>
import PostDeletion from '../components/PostDeletion.vue';

export default{
    name: 'EditPost',
    components: {
        PostDeletion
    },
    data(){
        return {
            userOwns: false,
            postId: '',
            currentPost: {},
            open: false
        }
    },
    methods: {
        getSinglePost(){
            fetch(`http://localhost:3000/post/${this.postId}`, {
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                this.currentPost = res.json().then(post => {
                    this.currentPost = post;
                    console.log(this.currentPost._id);
                })
            })
            .catch(err => console.log(err));
        },
        removeImage(){
            this.currentPost.imageUrl='';
        }
    },
    computed: {
        confirmCancelDeleteTxt(){
            return this.open ? 'Annuler' : 'Supprimer';
        }
    },
    created(){
        this.postId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    },
    mounted(){
        this.getSinglePost();
    }
}
</script>

<style>
.delete-btn{
    position: absolute;
    top: 10px;
    right: 10px;
}

.post-submission input{
    word-wrap: wrap-word;
}
</style>