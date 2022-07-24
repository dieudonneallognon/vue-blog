<script>
import Nav from "./components/Nav.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import HomeView from "./views/HomeView.vue";
import { ref, onMounted, reactive, toRefs } from "vue";
import router from "./router";

export default {
    components: {
        LoginView,
        RegisterView,
        HomeView,
        Nav,
    },

    setup(props, context) {
        let articles = ref([]);
        let user = ref({});
        let users = ref([]);

        onMounted(() => {
            router.push("/dashboard");

            fetch("http://localhost:3004/articles")
                .then((res) => res.json())
                .then((data) => (articles.value = data));

            fetch("http://localhost:3004/utilisateurs")
                .then((res) => res.json())
                .then((data) => (users.value = data));
        });

        function toRoute(routeName) {
            router.push({ name: routeName });
        }

        function syncData(loggedUser) {
            if (loggedUser) {
                user.value = loggedUser;
            }

            fetch("http://localhost:3004/articles")
                .then((res) => res.json())
                .then((data) => (articles.value = data));

            fetch("http://localhost:3004/utilisateurs")
                .then((res) => res.json())
                .then((data) => (users.value = data));
        }

        return {
            toRoute,
            syncData,
            articles,
            user,
            users,
        };
    },
};
</script>

<template>
    <main class="container-fluid">
        <header class="row my-1">
            <RouterLink to="/home">
                <h1>Intersect&nbsp;&nbsp;<i class="bi bi-intersect"></i></h1>
            </RouterLink>
        </header>
        <div class="row">
            <div class="col-md-3">
                <Nav :user="user" @update="syncData" @forward="toRoute" />
            </div>
            <div class="col-md-9">
                <RouterView
                    @forward="toRoute"
                    @update="syncData"
                    :articles="articles"
                    :users="users"
                    :user="user"
                />
            </div>
        </div>
    </main>
</template>
