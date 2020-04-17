import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, AsyncStorage, ScrollView} from 'react-native'
import Constants from "../utils/constants"
import StorageUtil from '../utils/StorageUtil'
import {Tabs, Card} from '@ant-design/react-native'
import {Actions} from "react-native-router-flux"
import {Button} from 'beeshell/dist/components/Button'

const hostPath = Constants.hostPath
export default class MyOrder extends Component {
    state = {
        currentPage: 1,
        pageSize: 5,
        status: 100, //状态：全部
    }

    init = () => {
        if (this.state.userId) {
            let url = hostPath + '/app/order/orderList?'
                + 'userId=' + this.state.userId
                + '&currentPage=' + this.state.currentPage
                + '&pageSize=' + this.state.pageSize
                + '&status=' + this.state.status
            fetch(url)
                .then(res => res.json())
                .then(resp => {
                    if (resp.code === 1) {
                        this.setState({orderData: resp.data})
                        // console.warn(resp.data)
                    }

                })
        }
    }

    componentWillMount() {
        //用户登录
        StorageUtil.get("userInfo").then(user => {
            if (user) {
                this.setState({userId: user.id, companyType: user.company.type}, () => this.init())
            } else {
                //去登录
                Actions.login()
            }
        })
    }

    orderStatus = (status) => {
        let statusInfo = ''
        if (status === 0) {
            statusInfo = '等待商家发货'
        } else if (status === 3) {
            statusInfo = '已发货,未确认'
        } else if (status === 8) {
            statusInfo = '确认收货'
        } else if (status === 4) {
            statusInfo = '交易成功'
        } else if (status === 7) {
            statusInfo = '取消订单'
        }
        return statusInfo
    }

    onChangeTab = ({status}) => {
        this.setState({status})
        this.init()
    }
    onPress = (orderId, status) => {
        fetch(hostPath + '/app/order/orderStatus?orderId=' + orderId + '&status=' + status)
            .then(res => res.json())
            .then(resp => {
                if (resp.code === 1) {
                    //重新获取订单
                    this.init()
                }
            })
    }
    showOrderStatusButton = (order) => {
        //0、等待商家发货 3、已发货,未确认 8、确认收货 4、交易成功 7、取消订单
        let arr = []
        let companyType = this.state.companyType
        if (companyType === 1) {
            //分厂人员：取消订单、确认收货
            if (order.orderStatus.status === 0) {
                arr.push(<Button size="sm" style={{paddingLeft: 5}}
                                 onPress={() => this.onPress(order.orderId, '7')}>取消订单</Button>)
            }
            if (order.orderStatus.status === 3) {
                arr.push(<Button size="sm" style={{paddingLeft: 5}}
                                 onPress={() => this.onPress(order.orderId, '8')}>确认收货</Button>)
            }
        } else if (companyType === 2) {
            //商家：确认发货
            if (order.orderStatus.status === 0) {
                arr.push(<Button size="sm" style={{paddingLeft: 5}}
                                 onPress={() => this.onPress(order.orderId, '3')}>确认发货</Button>)
            }
        } else if (companyType === 3) {
            //管理员：取消订单
            if (order.orderStatus.status === 0) {
                arr.push(<Button size="sm" style={{paddingLeft: 5}}
                                 onPress={() => this.onPress(order.orderId, '7')}>取消订单</Button>)
            }
        }
        return arr
    }
    // 渲染每个订单的商品
    renderOrder = () => {
        if (this.state.orderData) {
            return this.state.orderData.dataList.map(order => {
                return <View>
                    <Card style={{margin: 3}}>
                        <Card.Header
                            title={order.seller.name}
                            extra={this.orderStatus(order.orderStatus.status)}
                        />
                        <Card.Body>
                            <View>
                                {this.renderItem(order.orderDetails)}
                            </View>
                        </Card.Body>
                        <Card.Footer
                            extra={`共${order.orderDetails.length}件,总计:${order.totalPay}`}
                        />
                        <View style={{flexDirection: 'row', marginTop: 10, marginRight: 5, alignSelf: 'flex-end'}}>
                            {this.showOrderStatusButton(order)}
                        </View>
                    </Card>

                </View>
            })
        }
    }

    // 渲染每个商品
    renderItem = (orderDetails) => {
        return orderDetails.map(item => {
            let title = item.title
            let title1 = title
            let title2 = ''
            if (title.length >= 16) {
                title1 = title.substr(0, 16)
                title2 = title.substr(16, 10)
            }
            let imageUrl = item.image.replace('http://localhost:8080/mall', hostPath)
            return <TouchableHighlight underlayColor="#fff" onPress={() => {
                //此处的spuId、skuId有问题，没有考虑到具有特有属性的商品
                Actions.orderDetail({orderId: item.orderId})
            }}>
                <View>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Image source={{uri: imageUrl}} style={{width: 150, height: 140, marginRight: 5}}/>
                        <View style={{justifyContent: 'space-around'}}>
                            <View>
                                <Text style={{fontWeight: 'bold'}}>{title1}</Text>
                                <Text style={{fontWeight: 'bold'}}>{title2}</Text>
                            </View>
                            <Text style={{color: '#c81623'}}>¥{item.price}</Text>
                            <Text style={{color: 'grey'}}>x{item.num}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        })
    }


    render() {
        const tabs = [
            {title: '全部', status: 100},
            {title: '待发货', status: 0},
            {title: '已发货', status: 3},
            {title: '确认收货', status: 8},
        ]
        return <View style={{flex: 1}}>

            <Tabs tabs={tabs} onChange={tab => this.onChangeTab(tab)} style={{marginTop: 15}}>
                <ScrollView>
                    {this.renderOrder()}
                </ScrollView>
            </Tabs>
        </View>
    }
}
