import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native'

class ItemDetail extends Component {
    componentWillMount() {
        console.warn(this.props.spuId)
    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>itemDetail</Text>
        </View>
    }
}

export default ItemDetail