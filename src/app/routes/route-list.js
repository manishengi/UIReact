import { lazy } from "react";

/**
 * route path
 */
import { RoutePath } from "./route-path";

/**
 * import screen or class
 */
const Dashboard = lazy(() => import("../container/dashboard"));
const Login = lazy(() => import("../container/auth/login"));
const Home = lazy(() => import("../container/home"));
const PageNotFound = lazy(() => import("../container/page-not-found"));
const EntryLandind = lazy(() => import("../container/entity-landing"));
const LiveMonitory = lazy(() => import("../container/live-monitory"));
const CreateClientAdmin = lazy(() =>
  import("../container/create-client-admin")
);
const UserManagement = lazy(() => import("../container/user-management"));
const Profile = lazy(() => import("../container/profile"));
const EntityGroupCreation = lazy(() =>
  import("../container/entity-group-creation")
);
const EntityGroupManagement = lazy(() =>
  import("../container/entity-group-management")
);

/**
 * create route list array
 * main
 */
export const RouteList = [
  {
    path: RoutePath.login,
    component: Login,
    isAuth: false,
  },
  {
    path: RoutePath.dashboard,
    component: Dashboard,
    isAuth: true,
  },
  {
    path: RoutePath.home,
    component: Home,
    isAuth: false,
  },
  {
    path: RoutePath.entryLanding,
    component: EntryLandind,
    isAuth: true,
  },
  {
    path: RoutePath.liveMonitory,
    component: LiveMonitory,
    isAuth: true,
  },
  {
    path: RoutePath.createClientAdmin,
    component: CreateClientAdmin,
    isAuth: true,
  },
  {
    path: RoutePath.userManagement,
    component: UserManagement,
    isAuth: true,
  },
  {
    path: RoutePath.profile,
    component: Profile,
    isAuth: true,
  },
  {
    path: RoutePath.entityGroupCreation,
    component: EntityGroupCreation,
    isAuth: true,
  },
  {
    path: RoutePath.entityGroupManagement,
    component: EntityGroupManagement,
    isAuth: true,
  },
  {
    path: "*",
    component: PageNotFound,
    isAuth: null,
  },
];
