<template>
    <div class="empty">
        hello {{ getPost() }}
    </div>
</template>

<script>

export default{
    name: 'EditPage', 
    data(){
        return {
            userOwns: false,
            postId: '',
            currentPost: ''
        }
    },
    methods: {
        getPost(){
            fetch(`http://localhost:3000/post`, {
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                }
            })
            .then((res) => res.json())
            .then((data) => {
                this.currentPost = data.map(post => post._id != this.postId);
                console.log(this.currentPost);
            })
            .catch(err => console.log(err));
        }
    },
    created(){
        this.postId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    },
}
</script>

<style>

</style>