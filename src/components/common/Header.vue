<template>
    <header class="header">
        <nav class="nav">
            <router-link class="nav-link" active-class="nav-link--active" to="/"
                >Главная</router-link
            >
            <router-link
                class="nav-link"
                active-class="nav-link--active"
                to="/settings"
                >Настройки</router-link
            >
        </nav>
    </header>
</template>

<style scoped>
.header {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
}
.nav {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 1rem;
}
.nav-link {
    color: black;
    transition: all 0.3s;
    position: relative;
    display: inline-flex;
    gap: 5px;
    font-size: 16px;
}
.nav-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    border-radius: 3px;
    background-color: currentColor;
    transition: width 0.5s;
}
.nav-link:hover::after {
    width: 100%;
}
.nav-link--active {
    font-size: 20px;
    font-weight: 600;
}
.nav-link--active::after {
    width: 100%;
}
</style>
