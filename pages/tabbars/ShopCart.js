import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, ScrollView, AsyncStorage} from 'react-native'
import {Tabs, Carousel, Flex, Button, WhiteSpace, WingBlank, Card} from '@ant-design/react-native'
import Constants from '../../utils/constants'
import StorageUtil from '../../utils/StorageUtil'
import {Actions} from "react-native-router-flux"

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

    // 渲染分割线
    renderSeparator = () => {
        return <View style={{borderTopColor: '#ccc', borderTopWidth: 1, marginLeft: 10, marginRight: 10}}/>
    }
    // 渲染每个商品
    renderItem = () => {
        if (this.state.carts) {
            return this.state.carts.map(item => {
                let imageUrl = item.image.replace('http://localhost:8080/mall', hostPath)
                //此处的spuId、skuId有问题，没有考虑到具有特有属性的商品
                return <TouchableHighlight underlayColor="#fff" onPress={() => {
                    Actions.itemDetail({spuId: item.skuId})
                }}>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Image source={{uri: imageUrl}} style={{width: 150, height: 140, marginRight: 10}}/>
                        <View style={{justifyContent: 'space-around'}}>
                            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                            <Text style={{color: '#c81623'}}>¥{item.price}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Button size='small' style={{width: 50}} onPress={() => this.onPress('decrement')}><Text
                                    style={{fontWeight: '700px'}}>-</Text></Button>
                                <Text style={{
                                    width: 50,
                                    textAlign: 'center'
                                }}>{item.num}</Text>
                                <Button size='small' style={{width: 50}}
                                        onPress={() => this.onPress('increment')}>+</Button>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            })
        }
    }

    render() {
        return <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
            <Text style={{marginTop: 50, textAlign: 'center'}}>购物车</Text>
            <Text style={{color: 'grey', margin: 10}}>
                {this.state.receiveAddress ? this.state.receiveAddress.address : ''}
            </Text>
            <ScrollView>
                {this.renderItem()}
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