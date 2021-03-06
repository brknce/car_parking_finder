import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");
const parkings = [
    {
        id: 1,
        title: "Parking 1",
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
        coordinate: {
            latitude: 37.78805,
            longitude: -122.4334,
        }
    },
    {
        id: 2,
        title: "Parking 2",
        price: 7,
        rating: 3.8,
        spots: 25,
        free: 20,
        coordinate: {
            latitude: 37.7970,
            longitude: -122.4334,
        }
    },
    {
        id: 3,
        title: "Parking 3",
        price: 10,
        rating: 4.9,
        spots: 58,
        free: 2,
        coordinate: {
            latitude: 37.79300,
            longitude: -122.4390,
        }
    },
]

export default class Map extends Component {
    state = {
        hours: {},
        active: null
    }

    componentDidMount() {
        const hours = {};

        parkings.map(parking => {
            hours[parking.id] = 1
        });

        this.setState({ hours })
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <Text>Header</Text>
            </View>
        );
    }

    renderParking(item) {
        const { hours } = this.state

        return (
            <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })}>
                <View style={[styles.parking, styles.shadow]}>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <Text style={{ fontSize: 16 }}>x{item.spots} {item.title}</Text>
                        <View style={{ width: 100, borderRadius: 6, borderColor: "gray", borderWidth: 0.5, padding: 4 }}>
                            <Text style={{ fontSize: 16 }}>05:00</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1.5, flexDirection: "row" }}>
                        <View style={{ flex: 0.5, justifyContent: "center", marginHorizontal: 24 }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Ionicons name="ios-pricetag" size={16} color="#70818A"></Ionicons>
                                <Text> ${item.price}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Ionicons name="ios-star" size={16} color="#70818A"></Ionicons>
                                <Text>{item.rating}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.buy}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={{ fontSize: 24, color: "white" }}>${item.price}</Text>
                                <Text style={{ color: "white" }}>{item.price}x{hours[item.id]} hrs</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 24, color: "white" }}>></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderParkings() {
        return (

            <FlatList
                horizontal
                //horizontal : When true, the scroll view's children are arranged horizontally in a row instead of vertically in a column. The default value is false.
                pagingEnabled
                //pagingEnabled : When true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination. The default value is false.
                scrollEnabled
                //scrollEnabled : When false, the content does not scroll. The default value is true.
                showsHorizontalScrollIndicator={false}
                //showsHorizontalScrollIndicator : When true, shows a horizontal scroll indicator. The default value is true.
                scrollEventThrottle={16}
                snapToAlignment="center"
                style={styles.parkings}
                data={parkings}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => this.renderParking(item)}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <MapView
                    initialRegion={{
                        latitude: 37.78829,
                        longitude: -122.4329,
                        latitudeDelta: 0.0229,
                        longitudeDelta: 0.0121,
                    }}
                    style={styles.map}
                >
                    {parkings.map(parking => (
                        <Marker
                            key={`marker-${parking.id}`}
                            coordinate={parking.coordinate}
                        >
                            <TouchableWithoutFeedback onPress={() => this.setState({ active: parking.id })}>
                                <View style={[styles.marker, styles.shadow, this.state.active === parking.id ? styles.active : null]}>
                                    <Text style={{ color: "#840815", fontWeight: "bold" }}>$ {parking.price}</Text>
                                    <Text style={{ color: "#7D818A" }}>({parking.free}/{parking.spots})</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Marker>
                    ))}
                </MapView>
                {this.renderParkings()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 0.5,
        justifyContent: 'center',
        paddingHorizontal: 24
    },
    map: {
        flex: 3,
    },
    parkings: {
        flex: 1,
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        paddingBottom: 24
    },
    parking: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 6,
        padding: 12,
        marginHorizontal: 24,
        width: width - (24 * 2)
    },
    buy: {
        flex: 1,
        backgroundColor: "#D25260",
        flexDirection: "row",
        padding: 12,
        borderRadius: 6
    },
    marker: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "white",
        borderRadius: 24,
        padding: 12,
        borderWidth: 1,
        borderColor: "white",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 24,
    },
    active: {
        borderColor: "#840815",
    }
});
