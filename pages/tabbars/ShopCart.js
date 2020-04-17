import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, ScrollView, AsyncStorage} from 'react-native'
import {Tabs, Carousel, Flex, Button, WhiteSpace, WingBlank, Card} from '@ant-design/react-native'
import Constants from '../../utils/constants'
import StorageUtil from '../../utils/StorageUtil'
import {Actions} from "react-native-router-flux"
import {Checkbox} from 'beeshell'


const hostPath = Constants.hostPath

export default class ShopCart extends Component {
    state = {
        totalMoney: 0.00,
        checkAll: false,
        skuIds: []
    }

    init = () => {
        StorageUtil.get("userInfo").then(user => {
            if (user) {
                this.setState({userId: user.id})
                //收货地址
                fetch(hostPath + '/app/receiveAddress?userId=' + user.id)
                    .then(res => res.json())
                    .then(resp => {
                        this.setState({receiveAddress: resp.data})
                    })
                //获取购物车中的商品
                fetch(hostPath + '/app/cart/list?userId=' + user.id)
                    .then(res => res.json())
                    .then(resp => {
                        let cartMap = {}
                        let skuIdsAll = []
                        resp.data.map(cart => {
                            cartMap[cart.skuId] = cart
                            skuIdsAll.push(cart.skuId)
                        })
                        this.setState({carts: resp.data, cartMap, skuIdsAll}, () => this.total())
                    })
            } else {
                //去登录
                Actions.login()
            }
        })
    }

    componentWillMount() {
        this.init()
    }

    // 渲染分割线
    renderSeparator = () => {
        return <View style={{borderTopColor: '#ccc', borderTopWidth: 1, marginLeft: 10, marginRight: 10}}/>
    }
    // 渲染每个商品
    renderItem = () => {
        if (this.state.carts) {
            return this.state.carts.map(item => {
                let title = item.title
                let title1 = title
                let title2 = ''
                if (title.length >= 14) {
                    title1 = title.substr(0, 14)
                    title2 = title.substr(14, 10)
                }
                let imageUrl = item.image.replace('http://localhost:8080/mall', hostPath)

                return <TouchableHighlight underlayColor="#fff" onPress={() => {
                    //此处的spuId、skuId有问题，没有考虑到具有特有属性的商品
                    Actions.itemDetail({spuId: item.skuId})
                }}>
                    <View>
                        <View style={{flexDirection: 'row', padding: 10}}>
                            <View style={{justifyContent: 'space-around', marginRight: 5}}>
                                <Checkbox
                                    style={{backgroundColor: '#F8F8F8'}}
                                    value={this.state.skuIds}
                                    onChange={(skuIds) => this.onChange(skuIds)}>
                                    <Checkbox.Item label='' value={item.skuId}/>
                                </Checkbox>
                            </View>
                            <Image source={{uri: imageUrl}} style={{width: 150, height: 140, marginRight: 5}}/>
                            <View style={{justifyContent: 'space-around'}}>
                                <View>
                                    <Text style={{fontWeight: 'bold'}}>{title1}</Text>
                                    <Text style={{fontWeight: 'bold'}}>{title2}</Text>
                                </View>
                                <Text style={{color: '#c81623'}}>¥{item.price}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button size='small' style={{width: 50}}
                                            onPress={() => this.onPress('decrement', item.skuId, item.num)}><Text
                                        style={{fontWeight: '700px'}}>-</Text></Button>
                                    <Text style={{
                                        width: 50,
                                        textAlign: 'center'
                                    }}>{item.num}</Text>
                                    <Button size='small' style={{width: 50}}
                                            onPress={() => this.onPress('increment', item.skuId, item.num)}>+</Button>
                                </View>
                            </View>
                        </View>
                        {this.renderSeparator()}
                    </View>
                </TouchableHighlight>
            })
        }
    }

    onPress = (type, skuId, oldNum) => {
        let newNum = oldNum
        if ("decrement" === type) {
            //商品数量的减法
            if (oldNum > 1) {
                newNum = oldNum - 1
            }
        } else if ("increment" === type) {
            //商品数量的加法
            newNum = oldNum + 1
        }
        if (newNum !== oldNum) {
            fetch(hostPath + '/app/cart/updateCartNum?userId=' + this.state.userId + '&skuId=' + skuId + '&num=' + newNum)
                .then(res => res.json())
                .then(resp => {
                    if (resp.code === 1) {
                        this.init()
                    }
                })
        }
    }

    onChange = (skuIds) => {
        if (skuIds.length === this.state.skuIdsAll.length) {
            this.setState({value: [1]})
        }
        this.setState({skuIds}, () => this.total())
    }
    //全选
    onChange2 = (value) => {
        if (value[0] === 1) {
            //全选
            let skuIdsAll = this.state.skuIdsAll
            this.setState({skuIds: skuIdsAll, value}, () => this.total())
        } else {
            //全不选
            this.setState({skuIds: [], value}, () => this.total())
        }

    }
    //计算总计
    total = () => {
        let {cartMap, skuIds} = this.state
        let totalMoney = 0.00
        if (skuIds) {
            skuIds.map(skuId => {
                let cart = cartMap[skuId]
                totalMoney += cart.price * cart.num
            })
        }
        this.setState({totalMoney})
    }

    //结算
    jiesuan = () => {
        if (this.state.skuIds.length > 0) {
            Actions.orderInfo({skuIds: this.state.skuIds})
        }
    }

    render() {
        return <View style={{flex: 1}}>
            <Text style={{marginTop: 50, textAlign: 'center'}}>购物车</Text>
            <Text style={{color: 'grey', margin: 10}}>
                {this.state.receiveAddress ? this.state.receiveAddress.address : ''}
            </Text>
            <ScrollView>
                {this.renderItem()}
            </ScrollView>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Checkbox
                    value={this.state.value}
                    onChange={(value) => {
                        this.onChange2(value)
                    }}>

                    <Checkbox.Item label='全选' value={1}/>
                </Checkbox>
                <View style={{flexDirection: 'row', paddingLeft: '22%'}}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#c81623',
                        height: 50,
                        lineHeight: 50,
                        paddingRight: 10
                    }}>总计:¥{this.state.totalMoney}</Text>
                    <Button type="warning" style={{width: 100}} onPress={() => this.jiesuan()}>
                        结算{this.state.skuIds.length > 0 ? '(' + this.state.skuIds.length + ')' : ''}
                    </Button>
                </View>
            </View>
        </View>
    }
}