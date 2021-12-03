import React, { Component } from 'react';
import { Grid, Icon, Container } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

//CSS
import "./Footer.css"


 class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUserInfo: props.loginUserInfo
        }
    }


    render() {
        let { loginUserInfo } = this.state;
        return (
            <div>
                <Container>
                    <Grid >
                        <Grid.Row className="mt-2rem">
                            <Grid.Column mobile={2} tablet={2} />
                            <Grid.Column mobile={12} computer={16} tablet={12}>
                                <div className={`footer-outline theme-${loginUserInfo.role_id}`}>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={2} tablet={2}/>
                        </Grid.Row>

                        <Grid.Row className="footer-mb">
                            <Grid.Column mobile={7} computer={6} tablet={6}>
                                <p>
                                <Icon name="copyright outline" size="small" />
                                Little Children Schoolhouse <span className="company-name cursor-pointer">
                                    <Link to="/privacy-policy" target="blank" rel="noopener noreferrer">privacy policy</Link>
                                    </span> </p>
                            </Grid.Column>
                            <Grid.Column mobile={1} computer={6}  tablet={2}/>
                            <Grid.Column mobile={7} computer={4} tablet={6}>
                                <p>Powered By: <span className="company-name"><a href="http://techwavegroup.com" target="blank" rel="noopener noreferrer">techwave group</a> </span></p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginUserInfo: state.loginReducer.loginUserInfo,
  });
  
  const mapDispatchToProps = dispatch => {
    return {

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Footer);