<script setup lang="ts">
import Header from "./components/common/Header.vue";
</script>

<template>
    <main class="main">
        <Header />
        <div class="content">
            <router-view />
        </div>
    </main>
</template>

<style scoped>
.main {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.content {
    height: inherit;
    width: 100%;
    background: #f9f9f9b1;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-size: 20px;
}
</style>
