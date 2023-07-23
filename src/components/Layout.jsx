import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Routes from "routes/Routes";
import ProductViewModal from "./ProductViewModal";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { useStore } from "redux/storeApp";
import { isEmpty } from "lodash";
const Layout = (props) => {
  const store = useStore(props.initialReduxState);
  const [user, setUser] = useState([]);
  const [changeUser, setChangeUser] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [changeUser]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route
          render={(props) => (
            <div>
              <div className="container">
                <ToastContainer
                  draggable={false}
                  transition={Zoom}
                  autoClose={3000}
                />

                <Header
                  {...props}
                  user={user}
                  changeUser={changeUser}
                  setChangeUser={setChangeUser}
                />
                <div className="main">
                  <Routes />
                </div>
              </div>
              <Footer />
              <ProductViewModal />
            </div>
          )}
        />
      </BrowserRouter>
    </Provider>
  );
};

export default Layout;
