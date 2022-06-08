import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Loading from "./components/Loading/Loading";
import "./assets/scss/index.scss";
import {
  getToken,
  // removeUserLocal,
  // setUserLocal,
  getLanguage
} from "core/localStore";
import { useTranslation } from "react-i18next";
import "plugins/react-i18n.js";
import Toast from "components/Toast";
import { routeConfig, RouteWithSubRoutes } from "router/config";

import Login from "pages/Authentication/Login/Login";
import Error from "pages/Error/Error";
import GeneralInformation from "pages/ProfileCreation/components/GeneralInformation/GeneralInformation";
import ProfileCreation from "pages/ProfileCreation/ProfileCreation";

function App() {
  const { i18n } = useTranslation();
  // const { user } = useSelector((state) => state.user);
  // const [authLoading, setAuthLoading] = useState(true);

  // const getUserMe = async () => {
  //   try {
  //     // const response = await await api.get(`/userme`);
  //     // if (response) {
  //     // }
  //     let fakeResponse = { result: true };
  //     if (fakeResponse.result) {
  //       setUserLocal(getToken(), user);
  //     } else {
  //       removeUserLocal();
  //     }
  //     setAuthLoading(false);
  //   } catch (e) {
  //     removeUserLocal();
  //     setAuthLoading(false);
  //   }
  // };

  useEffect(() => {
    i18n.changeLanguage(getLanguage());
    const token = getToken();
    if (!token) {
      return;
    }

    // getUserMe();
  }, []);

  // if (authLoading && getToken()) {
  //   return <Loading visible={authLoading} />;
  // }

  return (
    <div className="content-wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/not-found" component={Error} />
          <Route exact path="/profile-creation" component={ProfileCreation} />
          <Route
            exact
            path="/general-information"
            component={GeneralInformation}
          />
          <Route exact path="/" component={Login} />
          {routeConfig.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
      <Toast />
    </div>
  );
}

export default App;
