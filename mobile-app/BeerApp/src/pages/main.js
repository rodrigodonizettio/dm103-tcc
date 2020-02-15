import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Button } from 'react-native';
import api from '../services/api';

export class MainScreen extends React.Component {
    state = {
        thingButtonValue: 0,
        randomValue: 0,
    };

    componentDidMount() {
        this.loadThingSpeak();
    }

    loadThingSpeak = async () => {
        const response = await api.get();
        const { feeds } = response.data;
        console.log("GET - Value FROM ThingSpeak: " + feeds[0].field1);
        this.setState({ thingButtonValue: feeds[0].field1 });
    };

    generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const response = api.get("https://api.thingspeak.com/update?api_key=PPJZUJQPMH0QY6BW&field1=" + randomNumber.toString());
        const { status } = response;
        console.log("GET - New Random Value TO ThingSpeak: " + randomNumber);
        this.loadThingSpeak();
    };

    render() {
        return (
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>ThingSpeak GET value: {this.state.thingButtonValue}</Text>
                        <Button title="POST a random value to ThingSpeak!" onPress={() => this.generateRandomNumber()}></Button>
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