<template>
    <div class="components-container mt-2 px-3 py-5">
        <div class="login-module">
            <LoginModule />
        </div>
    </div>
</template>

<script>
import LoginModule from '@/components/LoginModule.vue';

export default{
    name:'LoginPage',
    components: {
        LoginModule
    }
}
</script>