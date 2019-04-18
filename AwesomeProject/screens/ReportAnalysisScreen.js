import React, { Component } from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';




export default class ReportAnalysisScreen extends Component {
    state = {
        result : "result from backend" // should come from backend
    }

    componentWillMount() {
        return fetch('https://localhost:3000/getTweetAnalysis')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.message
                })
            })
    }

    render() {

        //JSON.stringify(itemId)
        //add header

        return (
            <View style={styles.container}>

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