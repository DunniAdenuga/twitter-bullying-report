import React, { Component } from 'react';
import {View, Button, StyleSheet} from 'react-native';




export default class HomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        //JSON.stringify(itemId)
        return (
            <View style={this.props.style}>
                <Button style={styles.button}
                        onPress={() => {
                    this.props.navigation.navigate('NewReport', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    });
                }}
                    title="Make New Report">
                </Button>

                <Button  style={styles.button}
                         onPress= {() => {
                             this.props.navigation.navigate('ReportList', {
                                 itemId: 86,
                                 otherParam: 'anything you want here',
                                 twitter_user:
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