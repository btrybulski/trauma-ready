import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import MapView from 'react-native-maps';
import ActivationItem from './ActivationItem';

// The profile page for an entire hospital. Displays information for contacts, services, and
// activations in a hierarchical list. Majority of data is static and passed in via props; the
// only true state that is involved is for tracking the user's location for integration with maps.

export default class Hospital extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("item").name,
            headerStyle: {
                backgroundColor: "#4B9CD3",
            },
            headerTintColor: "white",
        }
    }

    constructor(props) {
        super(props);
        this.state = this.props.navigation.getParam("item");
        if (this.state._doc) {
            this.state = this.state._doc;
        }
        this.state.activationCodes = [];
    }

    componentDidMount() {
        const baseActivationEndpoint = "http://statt-portal.herokuapp.com/mobile/rac/";
        console.log(baseActivationEndpoint + this.state.rac);
        console.log(this.state.rac);
        fetch(baseActivationEndpoint + this.state.rac)
            .then(res => res.json())
            .then(json => {
                this.setState({ activationCodes : json });
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.areaWrapper}>
                <Text style={styles.hospitalName}>{this.state.name}</Text>

                <View style={styles.infoWrapper}>
                    <Text style={styles.info}>{this.state.address}</Text>
                    <Text style={styles.info}>{this.state.email}</Text>
                </View>

                <View style={styles.mapWrapper}>
                    <MapView
                        loadingEnabled = {true}
                        loadingIndicatorColor="#666666"
                        loadingBackgroundColor="#eeeeee"
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.922,
                            longitudeDelta: 0.0421,
                        }}>
                        <MapView.Marker
                            title={this.state.name}
                            coordinate={{
                                latitude : this.state.latitude,
                                longitude : this.state.longitude
                            }}
                            onPress={(nativeEvent) => {
                                console.log(nativeEvent);
                            }}
                            description={"Will prompt for opening actual maps app eventually"}
                        />
                    </MapView>
                </View>

                <View style={styles.activationWrapper}>
                    <Text style={styles.h2}>Activations</Text>
                    {this.state.activationCodes.map((code, index) =>
                        <ActivationItem
                            navigation={this.props.navigation}
                            key={index}
                            id={code.aid}
                            code={code.code}
                        />)}
                </View>

                <View style={styles.servicesWrapper}>
                    <Text style={styles.h2}>Services</Text>
                    {this.state.services.map((service, index) =>
                        <Text key={index} style={styles.services}>
                            - {service}
                        </Text>
                    )}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    areaWrapper: {
        flex: 1,
        padding: 10,
        flexDirection: "column",
<<<<<<< HEAD
        justifyContent: "center",

=======
        justifyContent: "space-between",
>>>>>>> 0ed3f3ec712c4625686952b6adac33c49aba9594
    },

    hospitalName: {
        fontSize: 24,
        fontWeight: "bold",
        fontStyle: "italic",
        textAlign: "center",
        color: "#4B9CD3",

    },

    infoWrapper: {
        flex: 0.5,
        marginTop: 0,
        paddingTop: 2,
        paddingBottom: 6,
        marginBottom: 6,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 25,
        backgroundColor: "white",
    },

<<<<<<< HEAD
    info: {
      textAlign: "center",
      color: "#4B9CD3",
    },

=======
>>>>>>> 0ed3f3ec712c4625686952b6adac33c49aba9594
    mapWrapper: {
        flex: 2,

    },

    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10
    },

    activationWrapper: {
        flex: 4,
        borderRadius: 10,
        justifyContent: "space-between",
    },

    h2: {
        fontSize: 22,
        marginTop: 8,
        marginBottom: 8,
        color: "#4B9CD3",
        fontWeight: "bold",
    },

    activationItem: {
        fontSize: 18,
        marginTop: 4,
        marginBottom: 4,

        padding: 8,
        backgroundColor: "#ffe10a",
        fontWeight: "bold",
    },

    servicesWrapper: {
        flex: 1,
    },

    red: {
        backgroundColor: "#d10000"
    },

    services: {
<<<<<<< HEAD
        fontSize: 18,
=======
        fontSize: 16,
        paddingLeft: 16,
>>>>>>> 0ed3f3ec712c4625686952b6adac33c49aba9594
    },
});
