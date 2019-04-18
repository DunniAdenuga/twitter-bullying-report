import React, { Component } from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';




export default class HomeScreen extends Component {
    render() {

        const { navigation } = this.props;
        const loginData = navigation.getParam('loginDatum', 'login data should be here')
        const twitterUserName = loginData.name

        return (
            <View style={this.props.style}>
                <Text>{JSON.stringify(loginData)}</Text>
                <Button style={styles.button}
                        onPress={() => {
                    this.props.navigation.navigate('NewReport', {
                        twitter_user: twitterUserName
                    });
                }}
                    title="Make New Report">
                </Button>

                <Button  style={styles.button}
                         onPress= {() => {
                             this.props.navigation.navigate('ReportList', {
                                 twitter_user: twitterUserName
                             });
                         }}
                         title="See Previous Reports">
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1b95e0',
        color: 'white',
        width: 200,
        height: 50
    }
})