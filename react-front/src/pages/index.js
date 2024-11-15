import { LazyLoad } from "@/lib/lazyLoad";

const PageLayout = LazyLoad(() => import("../layouts/pageLayout"));
const HomePage = LazyLoad(() => import("./home"));
const SignIn = LazyLoad(() => import("./signIn"));

const NotFound = LazyLoad(() => import("./404NotFound"));

export { PageLayout, HomePage, SignIn, NotFound };
