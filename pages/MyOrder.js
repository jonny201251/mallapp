import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, AsyncStorage} from 'react-native'
import Constants from "../utils/constants"
import StorageUtil from '../utils/StorageUtil'

const hostPath = Constants.hostPath
export default class MyOrder extends Component {
    componentWillMount() {
        //用户登录
        StorageUtil.get("userInfo").then(user => {
            if (user == null) {
                fetch(hostPath + '/app/login?username=范海峰&password=1')
                    .then(res => res.json())
                    .then(resp => {
                        StorageUtil.set("userInfo", resp.data)
                    })
            }
        })
    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>我的订单</Text>
        </View>
    }
}