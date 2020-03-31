import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, ScrollView, AsyncStorage} from 'react-native'
import {Tabs, Carousel, Flex, Button, WhiteSpace, WingBlank, Card} from '@ant-design/react-native'
import Constants from '../../utils/constants'
import StorageUtil from '../../utils/StorageUtil'

const hostPath = Constants.hostPath

export default class ShopCart extends Component {
    state = {}

    componentWillMount() {
        StorageUtil.get("userInfo").then(user => {
            if (user) {
                //获取购物车中的商品
                fetch(hostPath + '/app/cart/list?userId=' + user.id)
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
            <Text style={{margin: 50}}>购物车-------------------------------</Text>
        </View>
    }
}