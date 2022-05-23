// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Проекты",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Создать заявку",
    rtlName: "لوحة القيادة",
    icon: <AddIcon color="inherit" w={3} h={3} />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Награды",

    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },

  {
    name: "Аккаунт",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Профиль",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Вернуться на авторизацию",
        icon: <ChevronLeftIcon color="inherit" w={6} h={6} />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Создать новый аккаунт",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
