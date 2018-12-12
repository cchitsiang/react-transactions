// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { getRouterData } from './utils/utils';

import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    component: Home,
    layout: BasicLayout,
  },
  {
    path: '/user/login',
    component: UserLogin,
    layout: UserLayout,
  },
  {
    path: '/user/register',
    component: UserRegister,
    layout: UserLayout,
  },
  {
    path: '*',
    component: NotFound,
    layout: BasicLayout,
  },
];

const routerData = getRouterData(routerConfig, []);

export { routerData };
