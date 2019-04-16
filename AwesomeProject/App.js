import React from 'react';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewReportScreen from './screens/NewReportScreen'
import ReportListScreen from './screens/ReportListScreen'
import ReportAnalysisScreen from './screens/ReportAnalysisScreen'

import { createStackNavigator, createAppContainer } from "react-navigation";





const AppNavigator = createStackNavigator({
        Login: LoginScreen,
        Home: HomeScreen,
        NewReport: NewReportScreen,
        ReportList: ReportListScreen,
        ReportAnalysis: ReportAnalysisScreen,
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