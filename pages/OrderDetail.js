import React, {Component} from 'react'
import {Text, View} from 'react-native'
import Constants from "../utils/constants"

const hostPath = Constants.hostPath
export default class OrderDetail extends Component {

    componentWillMount() {

    }


    render() {
        return <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <Text>订单详情页</Text>
        </View>
    }
}