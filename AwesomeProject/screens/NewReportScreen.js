import React, { Component } from 'react';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';




export default class NewReportScreenScreen extends Component {

    state = {
        author: "",
        reporter: "",
        tweet: ""
    }
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        //JSON.stringify(itemId)
        return (
            <View style={this.props.style}>
                <Text>Reporter: </Text>
                <Text>{this.state.reporter}</Text>

                <Text> Author: </Text>
                <TextInput
                    numberOfLines = {1}
                    maxLength = {50}
                    onChangeText={(text) => this.setState({author: text})}
                    value={this.state.author}
                />

                <Text> Tweet: </Text>
                <TextInput
                    style={styles.tweet}
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText={(text) => this.setState({tweet: text})}
                    value={this.state.tweet}
                />

                <Button  style={styles.button}
                         onPress= {() => {
                             this.props.navigation.navigate('ReportList', {
                                 itemId: 86,
                                 otherParam: 'anything you want here',
                             });
                         }}
                         title="Submit">
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
    },
    tweet: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    }
})