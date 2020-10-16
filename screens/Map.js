import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import MapView from 'react-native-maps';

const { height, width } = Dimensions.get("screen");
const parkings = [
    {
        id: 1,
        title: "Parking 1",
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
        location: {
            lat: 37.87835,
            lng: -122.4334,
        }
    },
    {
        id: 2,
        title: "Parking 2",
        price: 7,
        rating: 3.8,
        spots: 25,
        free: 20,
        location: {
            lat: 37.87845,
            lng: -122.4334,
        }
    },
    {
        id: 3,
        title: "Parking 3",
        price: 10,
        rating: 4.9,
        spots: 58,
        free: 2,
        location: {
            lat: 37.87815,
            lng: -122.4334,
        }
    },
]

export default class Map extends Component {
    state = {
        hours: {}
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
            <View key={`parking-${item.id}`} style={styles.parking}>
                <View style={{ flex: 2, flexDirection: "column" }}>
                    <Text>x{item.spots} {item.title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>{item.price}</Text>
                    <Text>{item.rating}</Text>
                    <TouchableWithoutFeedback>
                        <View style={styles.buy}>
                            <View>
                                <Text>${item.price}</Text>
                                <Text>{item.price}x{hours[item.id]}</Text>
                            </View>
                            <View>
                                <Text></Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    renderParkings() {
        return (
            <ScrollView
                horizontal
                centerContent
                /*When true, the scroll view automatically centers the content when the content is smaller than the scroll view bounds; 
                when the content is larger than the scroll view, this property has no effect. The default value is false.*/
                pagingEnabled
                /*pagingEnabled:When true, the scroll view stops on multiples of the scroll view's size when scrolling. 
                                This can be used for horizontal pagination. The default value is false. 
                                Note: Vertical pagination is not supported on Android.*/
                scrollEnabled
                /*scrollEnabled : When false, the view cannot be scrolled via touch interaction. The default value is true.*/
                showsHorizontalScrollIndicator={false}
                /*showsHorizontalScrollIndicator: When true, shows a vertical scroll indicator. The default value is true.*/
                snapToAlignment="center"
                /*When snapToInterval is set, snapToAlignment will define the relationship of the snapping to the scroll view.*/
                scrollEventThrottle={16}
                onScroll={props => console.log("onScrollEndDrag", props)}
                /*Called when the user stops dragging the scroll view and it either stops or begins to glide.*/
                style={styles.parkings}>
                {parkings.map(parking => this.renderParking(parking))}
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                />
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
    },
    map: {
        flex: 3,
    },
    parkings: {
        flex: 1,
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 24,
    },
    parking: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 6,
        padding: 24,
        marginHorizontal: 24,
        width: width - (24 * 2)
    },
    buy : {
        flex : 1,
        backgroundColor :  "red" 
    }
});
