import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, ScrollView, AsyncStorage} from 'react-native'
import {Tabs, Carousel, Flex, Button, WhiteSpace, WingBlank, Card} from '@ant-design/react-native'
import Constants from '../../utils/constants'
import StorageUtil from '../../utils/StorageUtil'

const hostPath = Constants.hostPath

export default class ShopCart extends Component {
    state = {
        totalMoney: 0.00
    }

    componentWillMount() {
        StorageUtil.get("userInfo").then(user => {
            if (user) {
                //收货地址
                StorageUtil.get("receiveAddress").then(value => {
                    if (value == null) {
                        fetch(hostPath + '/app/receiveAddress?userId=' + user.id)
                            .then(res => res.json())
                            .then(resp => {
                                StorageUtil.set("receiveAddress", resp.data)
                                this.setState({receiveAddress: resp.data})
                            })
                    } else {
                        this.setState({receiveAddress: value})
                    }
                })
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
        return <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
            <Text style={{marginTop: 50, textAlign: 'center'}}>购物车</Text>
            <Text style={{color: 'grey', margin: 10}}>
                {this.state.receiveAddress ? this.state.receiveAddress.address : ''}
            </Text>
            <ScrollView>
                <Image source={{uri: 'http://192.168.99.233:8080/mall/image/item/15271057fbe64701bb39237dc17a832b.jpg'}}
                       style={{width: '99.8%', height: 900}}/>
            </ScrollView>
            <View style={{flexDirection: 'row'}}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#c81623',
                    height: 50,
                    lineHeight: 50
                }}>总计:¥{this.state.totalMoney}</Text>
                <Button type="warning" style={{width: '30%'}}>去结算</Button>
            </View>
        </View>
    }
}