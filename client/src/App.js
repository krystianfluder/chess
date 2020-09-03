import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { errorActions } from "./actions";
import Logout from "./pages/Auth/Logout";
import Item from "./components/Navigation/Item";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Modal from "./components/Modal/Modal";
import Footer from "./components/Footer/Footer";
import Spinner from "./components/Spinner/Spinner";

const Spinner2 = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: "1200px",
        padding: "20px",
      }}
    >
      <h1>Loading...</h1>
    </div>
  );
};

const LazyLoad = ({ component: Component, ...rest }) => (
  <>
    <Suspense fallback={<Spinner2 />}>
      <Component {...rest} />
    </Suspense>
  </>
);

const Home = React.lazy(() => import("./pages/Home/Home"));
const Auth = React.lazy(() => import("./pages/Auth/Auth"));
const Game = React.lazy(() => import("./pages/Game/Game"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const NewPassword = React.lazy(() => import("./pages/Auth/NewPassword"));

const LazyHome = (props) => <LazyLoad component={Home} {...props} />;
const LazyAuth = (props) => <LazyLoad component={Auth} {...props} />;
const LazyGame = (props) => <LazyLoad component={Game} {...props} />;
const LazyProfile = (props) => <LazyLoad component={Profile} {...props} />;
const LazyNewPassword = (props) => (
  <LazyLoad component={NewPassword} {...props} />
);

const NavigationContainer = ({ accessToken }) => {
  return (
    <Navigation>
      <Item to="/">Home</Item>
      {accessToken ? (
        <>
          <Item to="/game">Game</Item>
          <Item to="/profile">Profile</Item>
          <Item to="/logout">Logout</Item>
        </>
      ) : (
        <>
          <Item to="/auth">Auth</Item>
        </>
      )}
    </Navigation>
  );
};

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const error = useSelector((state) => state.error.error);
  const loading = useSelector((state) => state.common.loading);

  const removeError = () => {
    dispatch(errorActions.remove());
  };

  return (
    <BrowserRouter>
      {loading ? <Spinner /> : null}
      {error ? (
        <Modal onClick={removeError}>{JSON.stringify(error)}</Modal>
      ) : null}

      <div className="content">
        <NavigationContainer accessToken={accessToken} />
        <Switch>
          <Route path="/" exact>
            <LazyHome />
          </Route>
          <Route path="/game" exact>
            {accessToken ? <LazyGame /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/profile" exact>
            {accessToken ? <LazyProfile /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/logout" exact>
            {accessToken ? <Logout /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/auth" exact>
            {!accessToken ? <LazyAuth /> : <Redirect to="/game" />}
          </Route>
          <Route path="/auth/new-password">
            {!accessToken ? <LazyNewPassword /> : <Redirect to="/game" />}
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
