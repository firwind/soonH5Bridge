import NativeHome from './src/NativeHome';
import WebHome from './src/WebHome';

const NavColor = GlobalStyle.themeColor;

export const NavBarConfig = {
    headerStyle: { backgroundColor: NavColor },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    tabBarVisible: false,
    headerBackTitle: '',
};

const Routes = {
    NativeHome: {
        name: 'NativeHome',
        description: 'NativeHome',
        screen: NativeHome,
        navigationOptions: {
            ...NavBarConfig,
            title: '首页',
        }   
    },
    WebHome: {
        name: 'WebHome',
        description: 'WebHome',
        screen: WebHome,
        navigationOptions: {
            ...NavBarConfig,
            title: 'webview',
        }   
    },
  
};

export default Routes;