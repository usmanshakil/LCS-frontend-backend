import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import "@progress/kendo-theme-bootstrap/dist/all.scss";
//import 'bootstrap/scss/bootstrap.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Redux action
import { setNews } from './Redux/Actions/Demo';
//Component
import { Container } from './CommonLayout/Container';
import { Login, SignUp, ForgotPassword, ResetPassword } from './Components/Auth/index';
import {PrivacyPolicy} from './CommonLayout';
export class App extends React.Component {
  toastId = null;
  customToastId = 'xxx-yyy';
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  //show toast message in whole project 
  _toastMessage = (messageType, message) => {

    message = message ? message : 'Something went wrong, please try again.'

    if (messageType === 'success') {
      toast.dismiss()
      toast.success(message, {
        // toastId: this.customToastId
      });
    } else if (messageType === 'dismiss') {
      toast.dismiss()
    }
    else if (messageType === 'warn') {
      toast.dismiss()
      toast.warn(message, {
      });
    }
    else {
      toast.dismiss()
      toast.error(message, {
      });
    }
  }

  render() {
    let customProps = {
      _toastMessage: this._toastMessage
    }
    return (
      <div className="App">
        <ToastContainer autoClose={2000} />
        <BrowserRouter>
          <Switch>
            <Route path="/login" render={(props) => <Login {...props} customProps={customProps} />} />
            <Route path="/signup" render={(props) => <SignUp {...props} customProps={customProps} />} />
            <Route path="/privacy-policy" render={(props) => <PrivacyPolicy {...props} customProps={customProps} />} />
            <Route path="/forgot-password" render={(props) => <ForgotPassword {...props} customProps={customProps} />} />
            <Route path="/reset-password" render={(props) => <ResetPassword {...props} customProps={customProps} />} />
            <Route path="/" render={(props) => <Container {...props} customProps={customProps} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.reducer.data
})

const mapDispatchToProps = (dispatch) => {
  return {
    setNews: (data) => dispatch(setNews(1))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
