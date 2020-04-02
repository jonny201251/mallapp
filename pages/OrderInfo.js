import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, AsyncStorage} from 'react-native'
import Constants from "../utils/constants"
import StorageUtil from '../utils/StorageUtil'

const hostPath = Constants.hostPath
export default class OrderInfo extends Component {
    componentWillMount() {
        let skuIds = this.props.skuIds.join(',')
        //用户登录
        StorageUtil.get("userInfo").then(user => {
            if (user != null) {
                this.setState({user})
                fetch(hostPath + '/app/order/list?userId=' + user.id + '&skuIds=' + skuIds)
                    .then(res => res.json())
                    .then(resp => {
                        this.setState({carts: resp.data})
                    })
            } else {
                //去登录
            }
        })
    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>订单页面</Text>
        </View>
    }
}