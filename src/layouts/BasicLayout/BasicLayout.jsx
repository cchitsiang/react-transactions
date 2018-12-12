/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0, arrow-parens: 0, no-else-return: 0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter, Link, Redirect, Switch } from 'react-router-dom';
import { enquire } from 'enquire-js';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from '../../utils/injectReducer';
import Authorized from './../../utils/Authorized';
import profileReducer from '../../store/userProfile/reducer';
import logoutReducer from '../../store/userLogout/reducer';
import { userProfile } from '../../store/userProfile/action';
import { userLogout } from '../../store/userLogout/action';
import Header from '../../components/Header/Header';
import Footer from './../../components/Footer';
import { routerData } from '../../routerConfig';
import './BasicLayout.scss';

const { AuthorizedRoute } = Authorized;

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'dark' : THEME;
@withRouter
class BasicLayout extends Component {
  static displayName = 'BasicLayout';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      isScreen: undefined,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
    this.props.userProfile();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
          collapse,
        });
      },
    };

    return handler;
  };

  render() {
    const { location, profile = {} } = this.props;
    const { pathname } = location;

    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className="header-footer-layout">
        <Header
          theme={theme}
          isMobile={this.state.isScreen !== 'isDesktop'}
          profile={profile}
          handleLogout={this.props.userLogout}
        />
        <Layout.Section>
          {/* 主体内容 */}
          <Layout.Main>
            <Switch>
              {routerData.map((item, index) => {
                return item.component ? (
                  <AuthorizedRoute
                    key={index}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath="exception/403"
                  />
                ) : null;
              })}
            </Switch>
          </Layout.Main>
          </Layout.Section>
        <Footer />
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  userProfile,
  userLogout,
};

const mapStateToProps = (state) => {
  return { profile: state.profile, logout: state.logout };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withProfileReducer = injectReducer({
  key: 'profile',
  reducer: profileReducer,
});

const withLogoutReducer = injectReducer({
  key: 'logout',
  reducer: logoutReducer,
});

export default compose(
  withProfileReducer,
  withLogoutReducer,
  withConnect
)(BasicLayout);
