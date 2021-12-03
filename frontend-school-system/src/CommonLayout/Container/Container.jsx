import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
//Redux Actions
import { showCookiePolicyModal } from "../../Redux/Actions/PopUpModals";
import { saveLoginUserInfo } from "../../Redux/Actions/Login";
// routes
import { routes, Header, Footer } from "../";
//popupmodal
import { PopUpModal } from "../../Components";
//Css
import "./Container.scss";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      loginUserInfo: props.loginUserInfo,
      modalType: "",
      showCookiePolicy: props.showCookiePolicy,
      showSideBarFalse: false
    };
  }

  componentDidMount() {
    this.isUserLogin();
    this.showCookiePolicyModal();
  }

  componentWillReceiveProps(nextProps) {
    this.isUserLogin();
  }

  //check if user is login
  isUserLogin = () => {
    let token = Cookies.get("loginUserToken");
    if (token && token) {
    } else {
      this.props.history.push("/login");
      this.props.saveLoginUserInfo("");
    }
  };

  // showing cookie policy modal once
  showCookiePolicyModal = () => {
    let { showCookiePolicy } = this.state;
    // if (showCookiePolicy === true) {
    if (showCookiePolicy === true) { 
      this.setState({
        modalType: "Cookie Policy"
      });
    }
  };

  // close popup modal of cookie policy
  close = () => {
    this.setState(
      {
        modalType: ""
      },
      () => {
        this.props.showCookiePolicyModal(false);
      }
    );
  };

  //clear token from cookie , redux and logout user
  _removeToken = () => {
    Cookies.remove("loginUserToken");
    this.props.saveLoginUserInfo("");
  };

  render() {
    let customProps = {
        customProps: this.props.customProps,
        _removeToken: this._removeToken
      },
      { modalType, showCookiePolicy } = this.state;
    return (
      <div className="container-view">
        <Header {...this.props} {...customProps} />
        <PopUpModal
          open={showCookiePolicy}
          type={modalType}
          close={this.close}
        />
        <Switch>
          {routes.map((route, key) => {
            if (route.exact) {
              return (
                <Redirect
                  key={key}
                  exact
                  path={route.path}
                  render={props => {
                    return (
                      <route.component
                        {...props}
                        {...customProps}
                        pageName={route.pageName}
                      />
                    );
                  }}
                />
              );
            } else if (route.to) {
              return (
                <Redirect
                  key={key}
                  exact
                  path={route.path}
                  to={route.to}
                  render={props => {
                    return (
                      <route.component
                        {...props}
                        {...customProps}
                        pageName={route.pageName}
                      />
                    );
                  }}
                />
              );
            } else {
              return (
                <Route
                  key={key}
                  exact
                  path={route.path}
                  render={props => {
                    return (
                      <route.component
                        {...props}
                        {...customProps}
                        pageName={route.pageName}
                      />
                    );
                  }}
                />
              );
            }
          })}
        </Switch>
        <Footer {...this.props} {...customProps} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token,
  loginUserInfo: state.loginReducer.loginUserInfo,
  showCookiePolicy: state.popUpModalsReducer.showCookiePolicy
});

const mapDispatchToProps = dispatch => {
  return {
    showCookiePolicyModal: data => dispatch(showCookiePolicyModal(data)),
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
