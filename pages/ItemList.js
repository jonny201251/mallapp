import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native'

class ItemList extends Component {
    componentWillMount() {
        console.warn(this.props.keyword)
    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>itemList</Text>
        </View>
    }
}

export default ItemList