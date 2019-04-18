import React, { Component } from 'react';
import {View, FlatList, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';




export default class ReportListScreen extends Component {
    state = {
       data : {} // should come from backend
    }

    componentWillMount() {
        return fetch('http://10.0.2.2:3000/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.message
                })
            })
    }

    render() {
        const { navigation } = this.props;
        const reporterName = navigation.getParam('twitter_user', 'no-name');

        return (
            <View style={styles.container}>
                <Text>Hello {reporterName}</Text>

                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                                this.props.navigation.navigate('ReportAnalysis', {
                                    tweet: item.tweet,
                                    author: item.author,
                                    reporter: item.reporter
                                });
                            }}>
                        <Text >{item.tweet}</Text>
                    </TouchableOpacity>
                    }
                    keyExtractor={item => item.tweet}
                    />
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