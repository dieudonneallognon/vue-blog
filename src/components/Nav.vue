<script>
import { func } from "joi";
import { RouterLink, RouterView } from "vue-router";

export default {
    setup(props, context) {
        function logout() {
            context.emit("update", {});
            context.emit("forward", "login");
        }

        return {
            logout,
        };
    },
    props: ["user"],
};
</script>

<template>
    <nav>
        <ul class="list-group">
            <li class="list-group-item active" aria-current="true">
                <RouterLink to="/dashboard">
                    <i class="bi bi-house-door-fill"></i> Fil d'actualité
                </RouterLink>
            </li>
            <li class="list-group-item" v-if="!user.email">
                <RouterLink to="/register">
                    <i class="bi bi-person-plus-fill"></i> Créer un profil
                </RouterLink>
            </li>
            <li class="list-group-item" v-if="!user.email">
                <RouterLink to="/login">
                    <i class="bi-box-arrow-in-right"></i> Se connecter
                </RouterLink>
            </li>
            <li class="list-group-item" v-if="user.email">
                <a @click="logout()"
                    ><i class="bi-box-arrow-left"></i> Se déconnecter
                </a>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.list-group-item.active {
    background-color: transparent;
}

a:any-link {
    text-decoration: none;
}
</style>
