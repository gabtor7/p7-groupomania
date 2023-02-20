<template>
    <form enctype="multipart/form-data" class="create-post d-md-flex d-sm-block justify-content-between border mx-0 row-md">
        <div class="text-input col-md-8 pl-0 mb-1">
            <textarea aria-label="Champ de saisie du contenu" name="content" id="content-input" placeholder="Créer un post" v-model="postContent"></textarea>
        </div>
        <div class="media-upload d-md-flex flex-column d-sm-inline-block mr-3 col-sm-2">
            <input type="file" ref="image" name="imageUpload" id="fileUpload" class="add-media" style="display:none" @change="manageImage">
            <label for="fileUpload" class="add-media__button d-flex flex-column text-center"><i class="fa fa-light fa-image"></i>
                <span v-if="!postImg">Ajouter une image</span>
                <span v-else>
                    {{ ogfilename }}
                </span>
            </label>
            <input type="button" v-if="postImg" class="btn btn-secondary" id="file-remove" value="x" @click="removeImage">
        </div>
        <div class="post-submission d-sm-inline-block">
            <input type="submit" value="Poster" @click="registerPost" class="btn btn-primary h-100 btn-bold">
        </div>
    </form>
</template>

<script>
export default{
    name: 'CreatePost',
    emits: ['reload-post'],
    data() {
        return {
            postContent: '',
            postImg: '',
            likes: 0,
            hasLiked: [],
            ogfilename: ''
        }
    },
    methods:{
        registerPost(e){
            e.preventDefault();
            let formData = new FormData();
            formData.append('image', this.postImg);
            formData.append('content', this.postContent);

            fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                },
                body: formData                
            })
            .then(() => {
                this.$emit('reload-post');
            })
            .catch(err => console.log(err));
            this.postContent = '';
            this.postImg = '';
            this.ogfilename = '';
        },
        manageImage(e){
            let files = e.target.files || e.dataTransfer.files;
            if(!files.length){
                return;
            }
            this.ogfilename = files[0].name;
            this.postImg = files[0];
        },
        removeImage(){
            this.postImg = '';
            this.ogfilename = '';
        }
    }
}
</script>

<style>

.text-input textarea{
    width: 100%;
    height: 100%;
    white-space: pre;
}

.media-upload{
    position: relative;
    margin-top: auto;
}

.media-upload i:before{
    font-size: 32px;
}

.add-media__button span{
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
}

.add-media__button:hover{
    cursor: pointer;
    color: var(--primary-color);
    text-decoration: underline;
}

#file-remove{
    width: inline;
    position: absolute;
    top: 0;
    right: 20px;
    font-size: 12px;
    padding: 2px 8px;
}

.btn-bold{
    font-size: 18px;
    font-weight: 500;
}

@media (max-width: 768px){
    .create-post{
        text-align: right;
    }
    
    .post-submission, .media-upload{
        margin-right: 1rem;
        width: max-content;
        margin: 5px 10px;
        display: inline-block;
    }
}

</style>