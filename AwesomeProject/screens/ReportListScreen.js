import React, { Component } from 'react';
import {View, FlatList, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';




export default class ReportListScreen extends Component {
    state = {
       data : {} // should come from backend
    }

    render() {

        //JSON.stringify(itemId)
        //add header

        return (
            <View style={styles.container}>

                <FlatList
                    data={[
                        {key: 'Tweet 1'},
                        {key: 'Tweet 2'},
                        {key: 'Tweet 3'},
                    ]}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                                this.props.navigation.navigate('ReportAnalysis', {
                                    itemId: 86,
                                    otherParam: 'anything you want here',
                                });
                            }}>
                        <Text >{item.key}</Text>
                    </TouchableOpacity>
                    }
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