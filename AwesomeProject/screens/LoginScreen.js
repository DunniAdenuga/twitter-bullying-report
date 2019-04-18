import React, { Component } from 'react';
import {Button, NativeModules, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const { RNTwitterSignIn } = NativeModules

const Constants = {
    //Dev Parse keys
    TWITTER_CONSUMER_KEY: "QtJ2zFy4kMmPrJKWQpCUvlgpI",
    TWITTER_CONSUMER_SECRET: "CpH8C0IHlhnAI9PjWkDxYr3RUVb6rf7jspNml70vFvM4T27GbO"
}


export default class LoginScreen extends Component {

    _twitterSignIn = () => {
        RNTwitterSignIn.init(Constants.TWITTER_CONSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
        RNTwitterSignIn.logIn()
            .then(loginData => {
                console.log("loginData")
                console.log(loginData)
                const { authToken, authTokenSecret } = loginData
                if (authToken && authTokenSecret) {
                    this.setState({
                        isLoggedIn: true
                    })
                    this.props.navigation.navigate('Home', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                        loginDatum: loginData
                    })
                }
            })
            .catch(error => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Login Screen</Text>
                <View style={this.props.style}>
                     <Button name="logo-twitter" style={styles.button} onPress={this._twitterSignIn} title="Login with Twitter">
                     </Button>
                </View>
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