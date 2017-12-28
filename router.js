import React, { Component } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, } from 'react-navigation';
import NativeHome from './src/NativeHome';
import WebHome from './src/WebHome';
import { View, Dimensions } from 'react-native';


const HomeRouter = StackNavigator(
    {   WebHome:{
        screen: WebHome,
        navigationOptions: {
            title: '网页',
        }   
       },
        NativeHome:{
            screen: NativeHome,
            navigationOptions: ({navigation}) => {
                let visible = false;
                if (navigation.state.params) {
                    if (navigation.state.params.isHeaderShow) {
                        visible= true;
                        return {
                            title:'原生',
                       }
                    }
                    
                }
                return {
                    header:null
                }
            }
        }

    },
    {
        initialRouteName: 'NativeHome',
        mode: 'card',
    }
);

const MineTab = StackNavigator( {
    WebHome:{
        screen: WebHome,
        navigationOptions: {
            title: '网页',
        }   
    }
    },
    {
        initialRouteName: 'WebHome',
        mode: 'card',
    }
);

const TabBarItem = props => {
    return (
        <Image
            resizeMode = "contain"
            source = {props.focused ? props.selectedImage : props.normalImage}
            style = {{tintColor: props.tintColor, width: 25, height: 25}}
        />
    );
};


const tabBarMineIcon = ({ tintColor, focused }) => (
    <TabBarItem
        tintColor={ tintColor }
        focused={focused}
        normalImage= {MineIconSelected}
        selectedImage= {MineIconSelected}
    />
);

const Router = TabNavigator(
    {
        MainTab: {
            screen: HomeRouter,
            navigationOptions: {
                tabBarLabel: '原生',
            },
        },
        SettingsTab: {
            screen: MineTab,
            navigationOptions: {
                tabBarLabel: '网页',
            },
        },
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        showIcon: true,
        tabBarComponent: TabBarBottom, 
        tabBarOptions:{
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
            style: { backgroundColor: 'white'},
            upperCaseLabel: false,
            showIcon: true,
        }
    }
);


const { width,height } = Dimensions.get('window');
// create a component
class mrouter extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Router />
            </View>
        );
    }
}


export default mrouter;
