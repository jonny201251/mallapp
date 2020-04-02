import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, AsyncStorage, ScrollView} from 'react-native'
import Constants from "../utils/constants"
import StorageUtil from '../utils/StorageUtil'
import {Checkbox} from "beeshell";
import {Button} from "@ant-design/react-native";
import {Actions} from "react-native-router-flux";

const hostPath = Constants.hostPath
export default class OrderInfo extends Component {
    state = {
        totalMoney: 0.00,
        length: 0
    }
    //计算总计
    total = () => {
        let totalMoney = 0
        if (this.state.carts) {
            this.state.carts.map(cart => {
                totalMoney += cart.price * cart.num
            })
        }
        this.setState({totalMoney, length: this.state.carts.length})
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

    // 渲染每个商品
    renderItem = () => {
        if (this.state.carts) {
            return this.state.carts.map(item => {
                let imageUrl = item.image.replace('http://localhost:8080/mall', hostPath)

                return <TouchableHighlight underlayColor="#fff" onPress={() => {
                    //此处的spuId、skuId有问题，没有考虑到具有特有属性的商品
                    Actions.itemDetail({spuId: item.skuId})
                }}>
                    <View>
                        <View style={{flexDirection: 'row', padding: 10}}>
                            <Image source={{uri: imageUrl}} style={{width: 150, height: 140, marginRight: 10}}/>
                            <View style={{justifyContent: 'space-around'}}>
                                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                                <Text style={{color: '#c81623'}}>¥{item.price}</Text>
                                <Text style={{color: 'grey'}}>x{item.num}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            })
        }
    }

    submit = () => {
        Actions.MyOrder()
    }

    render() {
        return <View style={{flex: 1}}>
            <Text style={{color: 'grey', margin: 10, fontSize: 20}}>
                {this.state.receiveAddress ? this.state.receiveAddress.realName : ''}
                {this.state.receiveAddress ? '  ' + this.state.receiveAddress.mobile : ''}
            </Text>
            <Text style={{color: 'grey', marginLeft: 10}}>
                {this.state.receiveAddress ? this.state.receiveAddress.address : ''}
            </Text>
            <ScrollView>
                {this.renderItem()}
            </ScrollView>
            <View style={{flexDirection: 'row', marginRight: 10, alignSelf: 'flex-end'}}>
                <Text>
                    共
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#c81623',
                        height: 50,
                        lineHeight: 50
                    }}>
                        {this.state.length}
                    </Text>
                    件,总计:
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#c81623',
                        height: 50,
                        lineHeight: 50
                    }}>
                        ¥{this.state.totalMoney + '  '}
                    </Text>
                </Text>
                <Button type="warning" style={{width: 110}} onPress={() =>this.submit()}>
                    提交订单
                </Button>
            </View>
        </View>
    }
}