import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Button } from 'react-native';
import api from '../services/api';

export class MainScreen extends React.Component {
    state = {
        thingButtonValue: 0,
    };

    componentDidMount() {
        this.loadThingSpeak();
    }

    loadThingSpeak = async () => {
        const response = await api.get();
        const { feeds } = response.data;
        console.log(feeds[0].field1);
        this.setState({ thingButtonValue: feeds[0].field1 })
    };

    render() {
        return (
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>ThingSpeak value: {this.state.thingButtonValue}</Text>
                        <Button title="Get ThingSpeak value!"></Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});