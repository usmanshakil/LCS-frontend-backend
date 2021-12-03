import React, { Component } from 'react';
import { Menu, Container, Grid, Icon, Sidebar } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux'
// Redux
import { saveLoginUserInfo } from '../../Redux/Actions/Login'
//CSS
import './Header.css';
//Image
import Image from '../../Components/Shared/Assests/Images/logo.png';
// constants
import { constants } from '../../Components'
//popup modal
import { PopUpModal } from '../../Components/Shared/PopupModal/PopupModal';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'lorem ipsim',
            loginUserInfo: props.loginUserInfo,
            activePage: '/home',
            popupModalType: '',
            showPopUpModal: false,
            modalHeader: '',
            modalDescription: '',
            showSideBarFalse: false

        }
    }


    //openpage when specific menu is selected
    openPage(pageName) {
        let page = pageName;
        this.setState({
            activePage: `/${page}`,
            showSideBarFalse: false
        }, () => {
            this.props.history.push(`/${page}`)
        })


    }

    //clear token from cookie and redux
    removeToken = () => {
        Cookies.remove('loginUserToken');
        this.props.saveLoginUserInfo('')
    }
    // showing popup modal when user logout
    showConfirmDeletePopUp = () => {
        this.setState({
            popupModalType: constants.DELETE_CONFIRMATION_MODAL,
            showPopUpModal: true,
            modalHeader: 'Log out',
            modalDescription: 'Are you sure you want to log out'
        })

    }
    // when user click on proceed to yes button then logout api is called
    proceedToYes = () => {
        this.setState({
            popupModalType: '',
            modalHeader: '',
            modalDescription: '',
            showPopUpModal: false
        }, () => {
            this.props.removeToken()
        })
    }

    // hiding popup modal when click on no option
    hideConfirmDeletePopUp = () => {
        this.setState({
            popupModalType: '',
            modalHeader: '',
            modalDescription: '',
            showPopUpModal: false
        })
    }


    toggleSideBar = () => {
        let { showSideBarFalse } = this.state;
        this.setState({
            showSideBarFalse: !showSideBarFalse
        })
    }

    setVisible = () => {
        this.setState({
            showSideBarFalse: false
        })
    }

    render() {
        let { loginUserInfo, popupModalType, showPopUpModal, modalHeader, modalDescription, showSideBarFalse } = this.state;
        let { location } = this.props;

        return (
            <div className="header">
                <div className={` w-100 page-header theme-${loginUserInfo.role_id}`}>
                    <div className="ui container">
                        <Menu secondary >
                            <Menu.Menu position='right' className="scrollable-menu">
                                <Menu.Item >
                                    <a href="tel:617-674-5092" className="contact-info"><i aria-hidden="true" className="phone small icon"></i> 617-734-5092</a>
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <p>  <a href="mailto:admin@littlechildrenschoolhouse.com" className="contact-info">
                                        <i aria-hidden="true" className="envelope small icon" />admin@littlechildrenschoolhouse.com</a></p>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </div>
                </div>
                <Container >
                    <Menu secondary>
                        <Menu.Menu position='right'>
                            <Menu.Item >
                                <p>
                                    Hello <span className="header-username">{loginUserInfo.first_name} </span>
                                    <a className="cursor-pointer" onClick={this.showConfirmDeletePopUp}>Logout </a>
                                </p>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Container>
                {
                    showPopUpModal === true ?
                        <PopUpModal type={popupModalType}
                            open={showPopUpModal}
                            proceedToYes={this.removeToken}
                            close={this.hideConfirmDeletePopUp}
                            modalHeader={modalHeader}
                            modalDescription={modalDescription}
                        />
                        : <Container>
                            <div>
                                <Grid >
                                    <Grid.Row>
                                        <Grid.Column mobile={16} tablet={16} computer={16} className="header-panel">
                                            <Menu secondary className="ipad-menu">
                                                <Menu.Item className="m-v">
                                                    <Icon name="bars" onClick={this.toggleSideBar} />
                                                </Menu.Item>
                                                <Menu.Item className="logo-image">
                                                    <img src={Image}
                                                        alt="schoolhouse logo"
                                                        className="schoolHouse-logo-image"
                                                        //   className=" schoolHouse-logo-image"
                                                        onClick={this.openPage.bind(this, 'home')} />
                                                </Menu.Item>
                                                <Menu.Item name="home"
                                                    active={location.pathname === '/home'}
                                                    className={location.pathname === '/home' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                    onClick={this.openPage.bind(this, 'home')}>
                                                    Home
                          </Menu.Item>
                                                {
                                                    loginUserInfo.role_id === 2 ?
                                                        <Menu.Item name="users"
                                                            active={location.pathname === '/users'}
                                                            className={(location.pathname === '/users' || location.pathname === '/edit-users-profile' || location.pathname.indexOf("/users") === 0) ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                            onClick={this.openPage.bind(this, 'users')}>
                                                            Users
                            </Menu.Item>
                                                        : ''
                                                }

                                                {
                                                    loginUserInfo.role_id === 4 ?
                                                        <Menu.Item name="teacher-profile"
                                                            active={location.pathname === '/view-profile'}
                                                            className={(location.pathname === '/view-profile' || location.pathname === '/edit-profile') ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                            onClick={this.openPage.bind(this, 'view-profile')}
                                                        >
                                                            Teaching Profile
                                                        </Menu.Item>
                                                        : ''
                                                }
                                                {
                                                    loginUserInfo.role_id === 3 || loginUserInfo.role_id === 2 ?
                                                        <Menu.Item name="myChildren"
                                                            active={location.pathname === '/student'}
                                                            className={location.pathname === '/student' || location.pathname === '/student/view' || location.pathname === '/student/edit' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                            onClick={this.openPage.bind(this, 'student')}>
                                                            {loginUserInfo.role_id === 2 ? 'Students' : 'My Children'}
                                                        </Menu.Item>
                                                        : ''
                                                    //                             <Menu.Item name="studentList"
                                                    //                                 active={location.pathname === '/student/view'}
                                                    //                                 className={location.pathname === '/student/view' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                    //                                 // className="teacher-theme"
                                                    //                                 onClick={this.openPage.bind(this, 'student/view')}>
                                                    //                                 Student
                                                    //   </Menu.Item>
                                                }
                                                {
                                                    loginUserInfo.role_id === 2 ?
                                                        <Menu.Item name="myChildren"
                                                            active={location.pathname === '/teachers'}
                                                            className={location.pathname === '/teachers' || location.pathname === '/view-profile' || location.pathname === '/view-staff-info' || location.pathname === '/edit-profile' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                            onClick={this.openPage.bind(this, 'teachers')}>
                                                            Teachers
                            </Menu.Item>
                                                        : ''
                                                }
                                                {/* {
                                                    loginUserInfo.role_id === 3 ? ''
                                                        : <Menu.Item name="classes" active={location.pathname === '/classes'}
                                                            className={location.pathname === '/classes' || location.pathname === '/view-assigned-class' || location.pathname === '/edit-assigned-class' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                            onClick={this.openPage.bind(this, 'classes')}>
                                                            Class
                                 </Menu.Item>
                                                } */}
                                                {
                                                    loginUserInfo.role_id === 2 ? <Menu.Item name="announcement" active={location.pathname === '/announcement'}
                                                        className={location.pathname === '/announcement' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                        onClick={this.openPage.bind(this, 'announcement')}>
                                                        Announcement
                         </Menu.Item>
                                                        : ''
                                                }
                                                {
                                                    loginUserInfo.role_id === 2 ? <Menu.Item name="incidenets" active={location.pathname === '/incidents'}
                                                        className={location.pathname === '/incidents' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                        onClick={this.openPage.bind(this, 'incidents')}>
                                                        Incidents
                         </Menu.Item>
                                                        : ''
                                                }
                                                {
                                                    loginUserInfo.role_id === 2 ? <Menu.Item name="support"
                                                        active={location.pathname === '/admin-support'}
                                                        className={location.pathname === '/admin-support' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                        onClick={this.openPage.bind(this, 'admin-support')}>
                                                        Support
                           </Menu.Item> :
                                                        <Menu.Item name="support"
                                                            active={location.pathname === '/support'}
                                                            className={location.pathname === '/support' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} d-v` : 'd-v'}
                                                            onClick={this.openPage.bind(this, 'support')}>
                                                            Support
                           </Menu.Item>
                                                }


                                                {/* { loginUserInfo.role_id === 4 || loginUserInfo.role_id === 2 ?
                                                     <Dropdown item text='Staff Information Form'>
                                                     <Dropdown.Menu>
                                                       <Dropdown.Item icon='edit' text='View Information Form' />
                                                       <Dropdown.Item icon='globe' text='Add Information Form' />
                                                     </Dropdown.Menu>
                                                   </Dropdown>:''
                                                } */}
                                            </Menu>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Sidebar
                                    as={Menu}
                                    animation='overlay'
                                    icon='labeled'
                                    vertical
                                    visible={showSideBarFalse}
                                    onHide={this.setVisible}
                                    width='thin'

                                >
                                    <Menu.Item name="home"
                                        active={location.pathname === '/home'}
                                        className={location.pathname === '/home' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} ` : ''}
                                        onClick={this.openPage.bind(this, 'home')}>
                                        Home
                          </Menu.Item>
                                    {
                                        loginUserInfo.role_id === 4 ?
                                            <Menu.Item name="teacher-profile"
                                                active={location.pathname === '/view-profile'}
                                                className={(location.pathname === '/view-profile' || location.pathname === '/edit-profile') ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} ` : ''}
                                                onClick={this.openPage.bind(this, 'view-profile')}
                                            >
                                                Teacher Profile
                             </Menu.Item>
                                            : ''
                                    }
                                    {
                                        loginUserInfo.role_id === 2 ?
                                            <Menu.Item name="users"
                                                active={location.pathname === '/users'}
                                                className={(location.pathname === '/users' || location.pathname.indexOf("/users") === 0) ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id} ` : ''}
                                                onClick={this.openPage.bind(this, 'users')}>
                                                Users
                            </Menu.Item>
                                            : ''
                                    }
                                    {
                                        loginUserInfo.role_id === 3 || loginUserInfo.role_id === 2 ?
                                            <Menu.Item name="myChildren"
                                                active={location.pathname === '/student'}
                                                className={location.pathname === '/student' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                                onClick={this.openPage.bind(this, 'student')}>
                                                {loginUserInfo.role_id === 2 ? 'Students' : 'My Children'}
                                            </Menu.Item>
                                            : ''
                                        //                 <Menu.Item name="studentList"
                                        //                     active={location.pathname === '/student/view'}
                                        //                     className={location.pathname === '/student/view' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                        //                     // className="teacher-theme"
                                        //                     onClick={this.openPage.bind(this, 'student/view')}>
                                        //                     Student
                                        //   </Menu.Item>
                                    }
                                    {
                                        loginUserInfo.role_id === 2 ?
                                            <Menu.Item name="myChildren"
                                                active={location.pathname === '/teachers'}
                                                className={location.pathname === '/teachers' || location.pathname === '/view-profile' || location.pathname === '/view-staff-info' || location.pathname === '/edit-profile' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                                onClick={this.openPage.bind(this, 'teachers')}>
                                                Teachers
                            </Menu.Item>
                                            : ''
                                    }

                                    {/* {
                                        loginUserInfo.role_id === 3 ? ''
                                            : <Menu.Item name="classes" active={location.pathname === '/classes'}
                                                className={location.pathname === '/classes' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                                onClick={this.openPage.bind(this, 'classes')}>
                                                Class
                                 </Menu.Item>
                                    } */}
                                    {
                                        loginUserInfo.role_id === 2 ? <Menu.Item name="announcement" active={location.pathname === '/announcement'}
                                            className={location.pathname === '/announcement' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                            onClick={this.openPage.bind(this, 'announcement')}>
                                            Announcement
                         </Menu.Item>
                                            : ''
                                    }
                                    {
                                        loginUserInfo.role_id === 2 ? <Menu.Item name="incidenets" active={location.pathname === '/incidents'}
                                            className={location.pathname === '/incidents' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                            onClick={this.openPage.bind(this, 'incidents')}>
                                            Incidents
                         </Menu.Item>
                                            : ''
                                    }
                                    {
                                        loginUserInfo.role_id === 2 ? <Menu.Item name="support"
                                            active={location.pathname === '/admin-support'}
                                            className={location.pathname === '/admin-support' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                            onClick={this.openPage.bind(this, 'admin-support')}>
                                            Support
                           </Menu.Item> :
                                            <Menu.Item name="support"
                                                active={location.pathname === '/support'}
                                                className={location.pathname === '/support' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                                onClick={this.openPage.bind(this, 'support')}>
                                                Support
                           </Menu.Item>
                                    }

                                    {
                                        loginUserInfo.role_id === 2 ? <Menu.Item name="renewal" active={location.pathname === '/renewal'}
                                            className={location.pathname === '/renewal' ? `theme-${loginUserInfo.role_id} tab-color-${loginUserInfo.role_id}` : ''}
                                            onClick={this.openPage.bind(this, 'renewal')}>
                                            View Renewal
                         </Menu.Item>
                                            : ''
                                    }



                                    <Sidebar.Pusher dimmed={showSideBarFalse}>

                                    </Sidebar.Pusher>
                                </Sidebar>
                            </div>
                        </Container>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginUserInfo: state.loginReducer.loginUserInfo
})

const mapDispatchToProps = (dispatch) => {
    return {
        saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)