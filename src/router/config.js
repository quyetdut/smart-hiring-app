import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/Authentication/Login/Login";
import SignUp from "pages/Authentication/SignUp/SignUp";
import Error from "pages/Error/Error.js";
import VerifyEmail from "pages/Authentication/VerifyEmail/VerifyEmail";
import ProfileCreation from "pages/ProfileCreation/ProfileCreation";
import GeneralInformation from "pages/ProfileCreation/components/GeneralInformation/GeneralInformation";
import ProjectCreation from "pages/ProjectCreation/ProjectCreation";
import MyProfile from "pages/User/MyProfile/MyProfile";
import MyProject from "pages/MyProject/MyProject.js";
import ExploreProject from "pages/ExploreProject/ExploreProject";
import Communication from "pages/Communication/Communication";
import ProjectHealth from "pages/Creator/ProjectHealth/ProjectHealth";
import ViewProfile from "pages/ViewProfile/ViewProfile";
import ManageProjects from "pages/Creator/ManageProjects/ManageProjects";
import EnterEmail from "pages/Authentication/FogotPassword/EnterEmail";
import VerifyDigitalCode from "pages/Authentication/FogotPassword/VerifyDigitalCode";
import UpdatePassWord from "pages/Authentication/FogotPassword/UpdatePassWord";
import { USER_ROLE } from "core/constants";

export const routeConfig = [
  {
    path: "/signup",
    isPrivate: false,
    exact: true,
    component: SignUp
  },
  {
    path: "/verify-email",
    isPrivate: false,
    exact: false,
    component: VerifyEmail
  },
  {
    path: "/login",
    isPrivate: false,
    exact: true,
    component: Login
  },
  {
    path: "/profile-creation",
    isPrivate: true,
    exact: true,
    role: USER_ROLE.DEVELOP,
    component: ProfileCreation
  },
  {
    path: "/general-information",
    isPrivate: true,
    exact: true,
    role: USER_ROLE.PROJECT_OWNER,
    component: GeneralInformation
  },
  {
    path: "/manage-projects",
    isPrivate: true,
    exact: true,
    role: USER_ROLE.PROJECT_OWNER,
    component: ManageProjects
  },
  {
    path: "/project-creation",
    isPrivate: true,
    exact: true,
    role: USER_ROLE.PROJECT_OWNER,
    component: ProjectCreation
  },
  {
    path: "/my-projects",
    isPrivate: true,
    exact: true,
    role: USER_ROLE.DEVELOP,
    component: MyProject
  },
  {
    path: "/explore-projects",
    isPrivate: true,
    exact: true,
    role: USER_ROLE.DEVELOP,
    component: ExploreProject
  },
  {
    path: "/my-profile/:profileId",
    isPrivate: true,
    exact: true,
    // role: USER_ROLE.DEVELOP,
    component: MyProfile
  },
  {
    path: "/messages",
    isPrivate: true,
    exact: true,
    component: Communication
  },
  {
    path: "/project-health/:projectId",
    isPrivate: true,
    exact: true,
    role: USER_ROLE.PROJECT_OWNER,
    component: ProjectHealth
  },
  {
    path: "/view-profile",
    isPrivate: true,
    exact: true,
    role: USER_ROLE.PROJECT_OWNER,
    component: ViewProfile
  },
  {
    path: "/fogot-password-enter-email",
    isPrivate: false,
    exact: true,
    component: EnterEmail
  },
  {
    path: "/fogot-password-verify-code",
    isPrivate: false,
    exact: true,
    component: VerifyDigitalCode
  },
  {
    path: "/fogot-password-update-password",
    isPrivate: false,
    exact: true,
    component: UpdatePassWord
  },
  { path: "*", component: Error }
];

const PrivateRoute = (privateProps) => {
  const { user } = useSelector((state) => state.user);
  if (user) {
    if (user.isProfileCreated) {
      if (
        privateProps.path === "/profile-creation" ||
        privateProps.path === "/general-information"
      ) {
        return <Redirect to="/not-found" />;
      }

      if (
        privateProps.role !== undefined &&
        !user.roles.includes(privateProps.role)
      ) {
        return <Redirect to="/not-found" />;
      }
    } else {
      if (user.roles[0] === USER_ROLE.DEVELOP) {
        if (privateProps.path !== "/profile-creation") {
          return <Redirect to="/profile-creation" />;
        }
      } else {
        if (privateProps.path !== "/general-information") {
          return <Redirect to="/general-information" />;
        }
      }
    }

    return <privateProps.component {...privateProps} />;
  }

  return <Redirect to="/login" />;
};

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) =>
        route.isPrivate ? (
          <PrivateRoute {...route} />
        ) : (
          <route.component {...props} />
        )
      }
    />
  );
};
