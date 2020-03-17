import React, {Component} from 'react'
import {Text, View} from 'react-native'

export default class Home extends Component {
    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>首页</Text>
        </View>
    }
}