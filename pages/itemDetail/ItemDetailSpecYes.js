import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native'
import Constants from '../../utils/constants'

const hostPath = Constants.hostPath

//有特有属性
class ItemDetailSpecYes extends Component {
    state = {}

    componentWillMount() {
        let itemData = this.props.itemData
        console.warn(itemData)
    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>ItemDetailSpecYes</Text>
        </View>
    }
}

export default ItemDetailSpecYes