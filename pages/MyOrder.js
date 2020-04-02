import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, AsyncStorage, ScrollView} from 'react-native'
import Constants from "../utils/constants"
import StorageUtil from '../utils/StorageUtil'
import {Tabs, Card} from '@ant-design/react-native'
import {Actions} from "react-native-router-flux";

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
                this.setState({userId: user.id}, () => this.init())
            } else {
                //未登录
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

    }
    // 渲染每个订单的商品
    renderOrder = () => {
        if (this.state.orderData) {
            return this.state.orderData.dataList.map(order => {
                return <Card style={{margin: 5}}>
                    <Card.Header
                        title='北京德高航空检测材料有限责任公司'
                        extra={this.orderStatus(order.orderStatus.status)}
                    />
                    <Card.Body>
                        <View>
                            {this.renderItem(order.orderDetails)}
                        </View>
                    </Card.Body>
                </Card>
            })
        }
    }

    // 渲染每个商品
    renderItem = (orderDetails) => {
        return orderDetails.map(item => {
            let imageUrl = item.image.replace('http://localhost:8080/mall', hostPath)
            return <TouchableHighlight underlayColor="#fff" onPress={() => {
                //此处的spuId、skuId有问题，没有考虑到具有特有属性的商品
                Actions.orderDetail({orderId: item.orderId})
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


    render() {
        const tabs = [
            {title: '全部', status: 100},
            {title: '待发货', status: 0},
            {title: '已发货', status: 3},
            {title: '确认收货', status: 8},
        ];
        return <Tabs tabs={tabs} onChange={tab => this.onChangeTab(tab)} style={{marginTop: 15}}>
            <ScrollView>
                {this.renderOrder()}
            </ScrollView>
        </Tabs>
    }
}
