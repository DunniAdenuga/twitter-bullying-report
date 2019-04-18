import React, { Component } from 'react';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';




export default class NewReportScreenScreen extends Component {

    state = {
        author: "",
        tweet: ""
    }

    sendTweet(reporterName){
        fetch('http://10.0.2.2:3000/createTweet',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: this.state.author,
                reporter: reporterName,
                tweet: this.state.tweet
            })
        })
        .catch((error) =>{
            console.error(error);
        });
        this.props.navigation.navigate('ReportList');


    }

    render() {
        const { navigation } = this.props;
        const reporterName = navigation.getParam('twitter_user', 'no-name');
        //JSON.stringify(itemId)
        return (
            <View style={this.props.style}>
                <Text>Reporter: </Text>
                <Text>{reporterName}</Text>

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
                             this.sendTweet(reporterName);
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