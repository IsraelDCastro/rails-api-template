import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/user/userStore";
import { Notification } from "@/lib";
import { trackPageView } from "@/lib/analytics";

import Home from "@/pages/home.vue";
import Profile from "@/pages/profile/profile.vue";
import RequestResetPassword from "@/pages/profile/requestResetPassword.vue";
import ResetPassword from "@/pages/profile/resetPassword.vue";
import EditProfile from "@/pages/profile/editProfile.vue";
import PasswordProfile from "@/pages/profile/passwordProfile.vue";

import SignIn from "@/pages/signIn.vue";
import SignUp from "@/pages/signUp.vue";

import NotFound from "@/pages/404.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/profile/",
    name: "Profile",
    component: Profile,
    meta: {
      blockChildren: true,
    },
    children: [
      {
        path: "edit",
        component: EditProfile,
        name: "Edit profile",
      },
      {
        path: "password",
        component: PasswordProfile,
        name: "Edit password",
      },
    ],
  },
  {
    path: "/request-reset-password",
    name: "Request Reset Password",
    component: RequestResetPassword,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    component: ResetPassword,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();

  if (userStore.user_signed_in) {
    if (to.name === "SignIn" || to.name === "SignUp") {
      next("/");
      Notification("You are already signed in.", "warning");
    } else {
      next();
    }
  } else if (to.name === "Profile" || to.meta?.blockChildren) {
    next("/sign-in");
    Notification("You need to sign in to access this page.", "warning");
  } else {
    next();
  }
});

router.afterEach((to) => {
  trackPageView(`${window.location.origin}${to.fullPath}`);
});

export default router;
