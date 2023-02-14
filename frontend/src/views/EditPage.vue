<template>
    <div class="empty">
        hello
    </div>
</template>

<script>
export default{
    name: 'EditPage', 
    data(){
        return {
            userOwns: false
        }
    },
    props: {
        _id: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>