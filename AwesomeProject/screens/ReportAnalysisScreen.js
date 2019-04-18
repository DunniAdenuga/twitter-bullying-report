import React, { Component } from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';




export default class ReportAnalysisScreen extends Component {
    state = {
        result : "result from backend" // should come from backend
    }

    componentWillMount() {

        const { navigation } = this.props;
        const tweet = navigation.getParam('tweet');
        const author = navigation.getParam('author');
        const reporter = navigation.getParam('reporter');

        fetch('http://10.0.2.2:3000/getTweetAnalysis',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: author,
                reporter: reporter,
                tweet: tweet
            })
        }).then(res => res.json())
            .then((response) => {
            this.setState({
                result: JSON.stringify(response.message)
            })
        })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {

        return (
            <View style={styles.container}>
                <Text>Sentiment Result</Text>
                <Text>{this.state.result}</Text>
                <Button  style={styles.button}
                         onPress= {() => {
                             this.props.navigation.navigate('Home');
                         }}
                         title="Go Home">
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
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})