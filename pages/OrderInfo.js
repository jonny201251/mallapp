import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, AsyncStorage} from 'react-native'
import Constants from "../utils/constants"
import StorageUtil from '../utils/StorageUtil'

const hostPath = Constants.hostPath
export default class OrderInfo extends Component {
    state = {
        totalMoney: 0.00,
    }
    //计算总计
    total = () => {
        let totalMoney = 0
        if (this.state.carts) {
            this.state.carts.map(cart => {
                totalMoney += cart.price * cart.num
            })
        }
        this.setState({totalMoney})
    }

    componentWillMount() {
        let skuIds = this.props.skuIds.join(',')
        StorageUtil.get("userInfo").then(user => {
            if (user != null) {
                //收货地址
                fetch(hostPath + '/app/receiveAddress?userId=' + user.id)
                    .then(res => res.json())
                    .then(resp => {
                        this.setState({receiveAddress: resp.data})
                    })
                //勾选的购物车
                fetch(hostPath + '/app/order/list?userId=' + user.id + '&skuIds=' + skuIds)
                    .then(res => res.json())
                    .then(resp => {
                        this.setState({carts: resp.data}, () => this.total())
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