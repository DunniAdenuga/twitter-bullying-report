import React from 'react';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import { createStackNavigator, createAppContainer } from "react-navigation";





const AppNavigator = createStackNavigator({
        Login: LoginScreen,
        Home: HomeScreen
    },
    {
        initialRouteName: "Login"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}



// AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);