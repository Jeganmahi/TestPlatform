import Dashboard from "layouts/dashboard";
import Test from "layouts/TestCreate";
import Tables from "layouts/Quizzes";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Result from "layouts/results";
// @mui icons
import Icon from "@mui/material/Icon";
import Usage from "layouts/Usage";
import Quizzes from "layouts/Quizzes";
import DetailedResultData from "layouts/DetailedResults";
import Student from "layouts/student";
import Individual from "layouts/IndividualScore";
import Basic from "layouts/authentication/sign-in";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Socratease Quizzes",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Quizzes",
    component: <Quizzes />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "result",
    key: "result",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/results",
    component: <Result />,
  },
  {
    type: "collapse",
    name: "Usage",
    key: "usage",
    icon: <Icon fontSize="small">circle</Icon>,
    route: "/Usage",
    component: <Usage />,
  },
  {
    type: "hide",
    name: "DrData",
    key: "usage",
    icon: <Icon fontSize="small">circle</Icon>,
    route: "/DRdata",
    component: <DetailedResultData />,
  },
  {
    type: "hide",
    name: "individual",
    key: "usage",
    icon: <Icon fontSize="small">student</Icon>,
    route: "/IndividualScore",
    component: <Individual />,
  },
  {
    type: "collapse",
    name: "Add student",
    key: "student",
    icon: <Icon fontSize="small">add person</Icon>,
    route: "/student",
    component: <Student/>,
  },
  {
    type: "collapse",
    name: "create test",
    key: "test",
    icon:<Icon fontSize="small">note_add</Icon>,
    route: "/TestCreate",
    component: <Test/>,
  },
  {
    type: "hide",
    name: "Sign In",
    key: "sign-in",
    icon:<Icon fontSize="small">note_add</Icon>,
    route: "/sign-in",
    component: <SignIn/>,
  },
  
];

export default routes;
