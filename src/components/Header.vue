<template>
    <header class="header">
        <nav class="nav">
            <router-link to="/">Main</router-link>
            <router-link to="/settings">Settings</router-link>
        </nav>
    </header>
</template>

<style scoped>
.header {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #f9f9f9b1;
    border-radius: 24px;
    padding: 20px 0;
}
.nav {
    max-width: 200px;
    width: 100%;
    height: 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
</style>
