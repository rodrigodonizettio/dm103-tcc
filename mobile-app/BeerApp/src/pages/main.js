import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Button, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { apiGPIOChannelFeed, apiStageChannelFeed, apiFermChannelFeed, apiMatChannelFeed, apiSendStartProcess } from '../services/api';

export class MainScreen extends React.Component {
    state = {
        gpioSystemStatusLED: 0, //field2
        gpioCurrentTemperature: 0, //field3
        gpioCooler: 0, //field4
        gpioCoolerStatusLED: 0, //field5
        gpioHeater: 0, //field6
        gpioHeaterStatusLED: 0, //field7
        stageTimeLast: 0, //field1
        stageStage: 0, //field2
        stageProcess: 0, //field3
        fermTemp1: 0, //field1
        fermTime1: 0, //field2
        fermTemp2: 0, //field3
        fermTime2: 0, //field4
        fermTemp3: 0, //field5
        fermTime3: 0, //field6
        fermTemp4: 0, //field7
        fermTime5: 0, //field8
        matTemp1: 0, //field1
        matTime1: 0, //field2
        matTemp2: 0, //field3
        matTime2: 0, //field4
        matTemp3: 0, //field5
        matTime3: 0, //field6
        matTemp4: 0, //field7
        matTime5: 0, //field8
    };

    componentDidMount() {
        this.loadGPIOChannelFeed();
        this.loadStageChannelFeed();
        this.loadFermChannelFeed();
        this.loadMatChannelFeed();
    }

    loadGPIOChannelFeed = async () => {
        const response = await apiGPIOChannelFeed.get();
        const { feeds } = response.data;
        console.log("GET - GPIO Channel Feed FROM ThingSpeak: " + feeds[0]);
        this.setState({ gpioSystemStatusLED: this.loadGPIOBooleanValue(feeds[0].field2) });
        this.setState({ gpioCurrentTemperature: this.loadGPIOCurrentTemperature(feeds[0].field3) });
        this.setState({ gpioCooler: this.loadGPIOBooleanValue(feeds[0].field4) });
        this.setState({ gpioCoolerStatusLED: this.loadGPIOBooleanValue(feeds[0].field5) });
        this.setState({ gpioHeater: this.loadGPIOBooleanValue(feeds[0].field6) });
        this.setState({ gpioHeaterStatusLED: this.loadGPIOBooleanValue(feeds[0].field7) });
    };

    loadGPIOChannelFeedInterval = setInterval(this.loadGPIOChannelFeed, 20000);    

    loadStageChannelFeed = async () => {
        const response = await apiStageChannelFeed.get();
        const { feeds } = response.data;
        console.log("GET - STAGE Channel Feed FROM ThingSpeak: " + feeds[0]);
        this.setState({ stageTimeLast: this.loadStageTimeLast(feeds[0].field1) });
        this.setState({ stageStage: feeds[0].field2 });
        this.setState({ stageProcess: this.loadStageProcess(feeds[0].field3) });
    };

    loadGPIOCurrentTemperature = (value) => {
        if(value == -999) {
            return "N/C";
        } else if(isNaN(value) || value == null) {
            return "N/A";
        } else {
            return value.toFixed(0);
        }
    };

    loadGPIOBooleanValue = (value) => {
        if(value == 0) {
            return "OFF";
        } else if(value == 1) {
            return "ON";
        } else {
            return "N/A";
        }
    };

    loadStageTimeLast = (value) => {
        if(isNaN(value)) {
            return "N/A";
        } else {
            return (value/60).toFixed(1); //Representing Time in Minutes
        }
    };

    loadStageProcess = (value) => {
        if(value == 0) {
            return "OFF";
        } else if(value == 1) {
            return "Fermentation";
        } else if(value == 2) {
            return "Maturation";
        } else {
            return "N/A";
        }
    };

    loadStageChannelFeedInterval = setInterval(this.loadStageChannelFeed, 20000);

    loadFermChannelFeed = async () => {
        const response = await apiFermChannelFeed.get();
        const { feeds } = response.data;
        console.log("GET - FERM Channel Feed FROM ThingSpeak: " + feeds[0]);
        this.setState({ fermTemp1: feeds[0].field1 ? feeds[0].field1 : 'N/A' });
        this.setState({ fermTime1: feeds[0].field2 ? feeds[0].field2/86400 : 'N/A' }); //Representing Time in Days
        this.setState({ fermTemp2: feeds[0].field3 ? feeds[0].field3 : 'N/A' });
        this.setState({ fermTime2: feeds[0].field4 ? feeds[0].field4/86400 : 'N/A' }); //Representing Time in Days
        this.setState({ fermTemp3: feeds[0].field5 ? feeds[0].field5 : 'N/A' });
        this.setState({ fermTime3: feeds[0].field6 ? feeds[0].field6/86400 : 'N/A' }); //Representing Time in Days
        this.setState({ fermTemp4: feeds[0].field7 ? feeds[0].field7 : 'N/A' });
        this.setState({ fermTime4: feeds[0].field8 ? feeds[0].field8/86400 : 'N/A' }); //Representing Time in Days
    };

    loadFermChannelFeedInterval = setInterval(this.loadFermChannelFeed, 120000);

    loadMatChannelFeed = async () => {
        const response = await apiMatChannelFeed.get();
        const { feeds } = response.data;
        console.log("GET - MAT Channel Feed FROM ThingSpeak: " + feeds[0]);
        this.setState({ matTemp1: feeds[0].field1 ? feeds[0].field1 : 'N/A' });
        this.setState({ matTime1: feeds[0].field2 ? feeds[0].field2/86400 : 'N/A' }); //Representing Time in Days
        this.setState({ matTemp2: feeds[0].field3 ? feeds[0].field3 : 'N/A' });
        this.setState({ matTime2: feeds[0].field4 ? feeds[0].field4/86400 : 'N/A' }); //Representing Time in Days
        this.setState({ matTemp3: feeds[0].field5 ? feeds[0].field5 : 'N/A' });
        this.setState({ matTime3: feeds[0].field6 ? feeds[0].field6/86400 : 'N/A' }); //Representing Time in Days
        this.setState({ matTemp4: feeds[0].field7 ? feeds[0].field7 : 'N/A' });
        this.setState({ matTime4: feeds[0].field8 ? feeds[0].field8/86400 : 'N/A' }); //Representing Time in Days
    };

    loadMatChannelFeedInterval = setInterval(this.loadMatChannelFeed, 120000);

    sendFermChannelFeed = async () => {
        const response = apiSendStartProcess.get("https://api.thingspeak.com/update?api_key=MJLW7MUQEFDVJJYD"
            + "&field1=" + (isNaN(this.state.fermTemp1) ? "0" : this.state.fermTemp1)
            + "&field2=" + (isNaN(this.state.fermTime1) ? "0" : this.state.fermTime1*86400)
            + "&field3=" + (isNaN(this.state.fermTemp2) ? "0" : this.state.fermTemp2)
            + "&field4=" + (isNaN(this.state.fermTime2) ? "0" : this.state.fermTime2*86400)
            + "&field5=" + (isNaN(this.state.fermTemp3) ? "0" : this.state.fermTemp3)
            + "&field6=" + (isNaN(this.state.fermTime3) ? "0" : this.state.fermTime3*86400)
            + "&field7=" + (isNaN(this.state.fermTemp4) ? "0" : this.state.fermTemp4)
            + "&field8=" + (isNaN(this.state.fermTime4) ? "0" : this.state.fermTime4*86400)
        );
        const { status } = response;
        console.log("GET - New FERM Values TO ThingSpeak");
        console.log('Status: ' + status);
        console.log('Response: ' + response);
    };

    sendMatChannelFeed = async () => {
        const response = apiSendStartProcess.get("https://api.thingspeak.com/update?api_key=KUEG7YVXEDWMAF9N"
            + "&field1=" + (isNaN(this.state.matTemp1) ? "0" : this.state.matTemp1)
            + "&field2=" + (isNaN(this.state.matTime1) ? "0" : this.state.matTime1*86400)
            + "&field3=" + (isNaN(this.state.matTemp2) ? "0" : this.state.matTemp2)
            + "&field4=" + (isNaN(this.state.matTime2) ? "0" : this.state.matTime2*86400)
            + "&field5=" + (isNaN(this.state.matTemp3) ? "0" : this.state.matTemp3)
            + "&field6=" + (isNaN(this.state.matTime3) ? "0" : this.state.matTime3*86400)
            + "&field7=" + (isNaN(this.state.matTemp4) ? "0" : this.state.matTemp4)
            + "&field8=" + (isNaN(this.state.matTime4) ? "0" : this.state.matTime4*86400)
        );
        const { status } = response;
        console.log("GET - New MAT Values TO ThingSpeak");
        console.log('Status: ' + status);
        console.log('Response: ' + response);
    };

    sendStartProcess = async () => {
        const response = apiSendStartProcess.get("https://api.thingspeak.com/update?api_key=ZOXAWIT42OYRP8Z8"
            + "&field1=1"
        );
        const { status } = response;
        console.log("GET - New START Process TO ThingSpeak");
        Alert.alert("Fermentation Process will start soon");
    };

    sendStopProcess = async () => {
        const response = apiSendStartProcess.get("https://api.thingspeak.com/update?api_key=ZOXAWIT42OYRP8Z8"
            + "&field1=" + 1
        );
        const { status } = response;
        console.log("GET - New STOP Process TO ThingSpeak");
        Alert.alert("Fermentation Process will stop soon");
    };

    sendStartSchedule = () => {
        this.sendFermChannelFeed();
        this.sendMatChannelFeed();
        this.sendStartProcess();
        this.loadFermChannelFeed();
        this.loadMatChannelFeed();
    };

    sendStopSchedule = () => {
        this.sendStopProcess();
        this.loadFermChannelFeed();
        this.loadMatChannelFeed();
    };

    onFermTemp1Changed(e) {
        this.setState({ fermTemp1: e });
    }

    onFermTime1Changed(e) {
        this.setState({ fermTime1: e });
    }

    onFermTemp2Changed(e) {
        this.setState({ fermTemp2: e });
    }

    onFermTime2Changed(e) {
        this.setState({ fermTime2: e });
    }

    onFermTemp3Changed(e) {
        this.setState({ fermTemp3: e });
    }

    onFermTime3Changed(e) {
        this.setState({ fermTime3: e });
    }

    onFermTemp4Changed(e) {
        this.setState({ fermTemp4: e });
    }

    onFermTime4Changed(e) {
        this.setState({ fermTime4: e });
    }

    onMatTemp1Changed(e) {
        this.setState({ matTemp1: e });
    }

    onMatTime1Changed(e) {
        this.setState({ matTime1: e });
    }

    onMatTemp2Changed(e) {
        this.setState({ matTemp2: e });
    }

    onMatTime2Changed(e) {
        this.setState({ matTime2: e });
    }

    onMatTemp3Changed(e) {
        this.setState({ matTemp3: e });
    }

    onMatTime3Changed(e) {
        this.setState({ matTime3: e });
    }

    onMatTemp4Changed(e) {
        this.setState({ matTemp4: e });
    }

    onMatTime4Changed(e) {
        this.setState({ matTime4: e });
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">                    
                    <View style={styles.body}>
                        <Text style={styles.header}>GPIO</Text>
                        <Text>System Status: <Text style={styles.boldAndBlue}>{this.state.gpioSystemStatusLED}</Text></Text>
                        <Text>Sensor Temperature: <Text style={styles.boldAndBlue}>{this.state.gpioCurrentTemperature} [°C]</Text></Text>
                        <Text>Cooler Status: <Text style={styles.boldAndBlue}>{this.state.gpioCooler}</Text></Text>
                        <Text>Heater Status: <Text style={styles.boldAndBlue}>{this.state.gpioHeater}</Text></Text>
                        <Text style={styles.header}>Stage</Text>
                        <Text>Current Process: <Text style={styles.boldAndBlue}>{this.state.stageProcess}</Text></Text>
                        <Text>Current Stage: <Text style={styles.boldAndBlue}>#{this.state.stageStage}</Text></Text>                        
                        <Text>Time Remaining for Next Step: <Text style={styles.boldAndBlue}>{this.state.stageTimeLast} [minutes]</Text></Text>
                        <Text style={styles.header}>Fermentation Schedule</Text>
                        <View style={styles.inline}>
                            <Text>Temperature#1: </Text>                            
                            <Icon name="temperature-high" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onFermTemp1Changed(e)} value = {String(this.state.fermTemp1)} />
                            <Text>[°C] during </Text>
                            <Icon name="clock" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onFermTime1Changed(e)} value = {String(this.state.fermTime1)} />
                            <Text>[days]</Text>
                        </View>
                        <View style={styles.inline}>
                            <Text>Temperature#2: </Text>
                            <Icon name="temperature-high" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onFermTemp2Changed(e)} value = {String(this.state.fermTemp2)} />
                            <Text>[°C] during </Text>
                            <Icon name="clock" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onFermTime2Changed(e)} value = {String(this.state.fermTime2)} />
                            <Text>[days]</Text>
                        </View>
                        <View style={styles.inline}>
                            <Text>Temperature#3: </Text>
                            <Icon name="temperature-high" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onFermTemp3Changed(e)} value = {String(this.state.fermTemp3)} />
                            <Text>[°C] during </Text>
                            <Icon name="clock" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onFermTime3Changed(e)} value = {String(this.state.fermTime3)} />
                            <Text>[days]</Text>
                        </View>
                        <View style={styles.inline}>
                            <Text>Temperature#4: </Text>
                            <Icon name="temperature-high" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onFermTemp4Changed(e)} value = {String(this.state.fermTemp4)} />
                            <Text>[°C] during </Text>
                            <Icon name="clock" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onFermTime4Changed(e)} value = {String(this.state.fermTime4)} />
                            <Text>[days]</Text>
                        </View>
                        <Text style={styles.header}>Maturation Schedule</Text>
                        <View style={styles.inline}>
                            <Text>Temperature#1: </Text>
                            <Icon name="temperature-high" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onMatTemp1Changed(e)} value = {String(this.state.matTemp1)} />
                            <Text>[°C] during </Text>
                            <Icon name="clock" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onMatTime1Changed(e)} value = {String(this.state.matTime1)} />
                            <Text>[days]</Text>
                        </View>
                        <View style={styles.inline}>
                            <Text>Temperature#2: </Text>
                            <Icon name="temperature-high" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onMatTemp2Changed(e)} value = {String(this.state.matTemp2)} />
                            <Text>[°C] during </Text>
                            <Icon name="clock" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onMatTime2Changed(e)} value = {String(this.state.matTime2)} />
                            <Text>[days]</Text>
                        </View>
                        <View style={styles.inline}>
                            <Text>Temperature#3: </Text>
                            <Icon name="temperature-high" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onMatTemp3Changed(e)} value = {String(this.state.matTemp3)} />
                            <Text>[°C] during </Text>
                            <Icon name="clock" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onMatTime3Changed(e)} value = {String(this.state.matTime3)} />
                            <Text>[days]</Text>
                        </View>
                        <View style={styles.inline}>
                            <Text>Temperature#4: </Text>
                            <Icon name="temperature-high" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onMatTemp4Changed(e)} value = {String(this.state.matTemp4)} />
                            <Text>[°C] during </Text>
                            <Icon name="clock" size={15} color="#00f" />
                            <TextInput style={styles.textInput} keyboardType = 'numeric' maxLength={3} onChangeText = {(e)=> this.onMatTime4Changed(e)} value = {String(this.state.matTime4)} />
                            <Text>[days]</Text>
                        </View>
                        <View style={styles.button}>
                        <Button title="Start Schedule!" onPress={() => this.sendStartSchedule()}></Button>
                        <Button title="Stop Schedule!" onPress={() => this.sendStopSchedule()}></Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 1
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inline: {
        paddingTop: 0,
        paddingBottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    textInput: {
        width: 35,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: 'top',
        height: 20,
        borderBottomColor: '#00f',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 12,
    },
    boldAndBlue: {
        fontWeight: 'bold',
        color: '#00f'
    }
});