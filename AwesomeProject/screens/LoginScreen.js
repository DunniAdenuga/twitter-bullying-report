import React, { Component } from 'react';
import {Button, Text, View } from 'react-native';
import TwitterButton from '../components/TwitterButton'

export default class LoginScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Login Screen</Text>
                <TwitterButton />
                {/*<Button*/}
                {/*    title="Go to Home Screen"*/}
                {/*    onPress={() => this.props.navigation.navigate('Home',{*/}
                {/*        itemId: 86,*/}
                {/*        otherParam: 'anything you want here',*/}
                {/*    })}*/}
                {/*/>*/}
            </View>
        );
    }
}