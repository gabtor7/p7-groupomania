<template>
    <h2>Modifier le post</h2>
    <div class="full-post p-3 my-3 rounded">
        <form enctype="multipart/form-data" id="editPost" class="mx-0 mb-2">
            <div class="row px-3 w-100">
                <div class="text-input col pl-0">
                    <textarea aria-label="Contenu du post" name="content" id="content-input" placeholder="Créer un post" v-model="newContent"></textarea>
                </div>
                <div class="media-upload col-2 d-flex flex-column text-center px-3">
                    <input type="file" ref="image" name="imageUpload" id="fileUpload" class="add-media" style="display:none" @change="manageImage">
                    <label for="fileUpload" class="add-media__button d-flex flex-column"><i class="fa fa-light fa-image"></i>
                        <span v-if="!newMediaUrl">Ajouter une image</span>
                        <span v-else>
                            {{ currentPost.imageUrl }}
                        </span>
                    </label>
                    <input type="button" v-if="newMediaUrl" class="btn btn-secondary" id="file-remove" value="x" @click="removeImage">
                </div>
            </div>
        </form>
        <div v-if="!newMediaUrl" class="edit-media d-flex flex-direction-column align-items-end">
            <img :src="currentPost.imageUrl" :alt="currentPost.imageUrl" class="post-media">
            <button v-if="currentPost.imageUrl" class="post-actions__delete" title="Supprimer l'image" @click="removeCurrentImage">
                Supprimer l'image
            </button>
        </div>
        <div class="post-update-actions d-flex justify-content-end">
            <button class="post-actions__delete delete-btn" title="Supprimer ce post" @click="open = !open">
                <i v-if="!open" class="fa-solid fa-trash mr-2"></i>
                <span v-else>{{ confirmCancelDeleteTxt }}</span>
            </button>
            <div class="post-update d-inline-block">
                <input type="submit" form="editPost" value="Mettre à jour" @click="updatePost" class="btn btn-primary w-100">
            </div>
            <div v-show="open" class="delete-component">
                <PostDeletion :postId="postId"  @cancel-delete="open = false"></PostDeletion>
            </div>
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
            postId: '',
            currentPost: '',
            open: false,
            newMediaUrl: false,
            newMediaContent: '',
            newContent: ''
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
                    this.newContent = this.currentPost.content;
                })
            })
            .catch(err => console.log(err));
        },
        removeCurrentImage(){
            this.currentPost.imageUrl='';
        },
        removeImage(){
            this.newMediaContent='';
            this.newMediaUrl = false;
        },
        manageImage(e){
            let files = e.target.files || e.dataTransfer.files;
            if(!files.length){
                return;
            }
            this.newMediaContent = files[0];
            this.newMediaUrl = true;
        },
        updatePost(e){
            e.preventDefault();
            let formData = new FormData();
            if(this.newMediaContent != ''){
                formData.append('image', this.newMediaContent);
            }
            formData.append('content', this.newContent);

            fetch(`http://localhost:3000/post/${this.postId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                },
                body: formData 

            })
            .then(() => {
                this.$router.push('/');
            })
            .catch(err => console.log(err));
            this.newMediaContent = '';
            this.newMediaUrl = false;
        }
    },
    computed: {
        confirmCancelDeleteTxt(){
            return this.open ? 'Annuler' : 'Supprimer le post';
        }
    },
    created(){
        this.postId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        this.getSinglePost();
        
    }
}
</script>

<style scoped>
.delete-btn i{
    font-size: 18px;
}

.delete-component{
    position: absolute;
    bottom: 46px;
    margin-bottom: 10px;
    right: 10px;
    padding: 6px;
    border: solid 1px #aaaaaa;
    background-color: #fff;
}

.post-submission input{
    word-wrap: wrap-word;
}

.post-update input{
    font-size: 18px
}
</style>