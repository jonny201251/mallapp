import React, {Component} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {Button, Card, Carousel, Flex, Tabs, WingBlank} from '@ant-design/react-native'
import Constants from '../../utils/constants'
import StorageUtil from '../../utils/StorageUtil'
import {Actions} from "react-native-router-flux";

const hostPath = Constants.hostPath

//没有特有属性
class ItemDetailSpecNo extends Component {
    state = {
        itemData: {},
        num: 1
    }

    componentWillMount() {
        let itemData = this.props.itemData
        this.setState({itemData})
    }

    //显示商品详情
    showDetail = () => {
        let descriptionImages = this.state.itemData.descriptionImages
        if (descriptionImages.length > 0) {
            return descriptionImages.map(url => {
                url = url.replace('http://localhost:8080/mall', hostPath)
                return <Image source={{uri: url}} style={{width: '99.8%', height: 500}}/>
            })
        } else {
            return <WingBlank><Text>暂无详情</Text></WingBlank>
        }

    }
    //显示规格参数
    showSpec = () => {
        let specs = this.state.itemData.specs
        let genericSpec = JSON.parse(this.state.itemData.detail.genericSpec)
        if (specs) {
            return <WingBlank>
                {specs.map(spec => {
                    return <Card style={{marginTop: 5}}>
                        <Card.Header
                            title={spec.name}
                            thumbStyle={{width: 30, height: 30}}
                        />
                        <Card.Body>
                            <View>
                                {
                                    spec.params.map(param => {
                                        if (genericSpec[param.id]) {
                                            return <View style={{flexDirection: "row"}}>
                                                <Text style={{marginLeft: 16, width: 150}}>{param.name}</Text>
                                                <Text>{genericSpec[param.id]}</Text>
                                            </View>
                                        }
                                    })
                                }
                            </View>
                        </Card.Body>
                    </Card>
                })}
            </WingBlank>
        }

    }

    onPress = (type) => {
        if ("decrement" === type) {
            //商品数量的减法
            if (this.state.num > 1) {
                this.setState({num: this.state.num - 1})
            }
        } else if ("increment" === type) {
            //商品数量的加法
            this.setState({num: this.state.num + 1})
        } else if ("add" === type || "buy" === type) {
            //加入购物车
            let sku = this.state.itemData.skus[0]
            let cartData = "skuId=" + sku.id + "&title=" + sku.title + "&image=" + sku.images.split(',')[0] + "&price=" + sku.price + "&num=" + this.state.num
            StorageUtil.get("userInfo").then(user => {
                if (user) {
                    cartData = cartData + '&userId=' + user.id
                    fetch(hostPath + '/app/cart/add?' + cartData)
                        .then(res => res.json())
                        .then(resp => {
                            if (resp.code === 1) {
                                if ("buy" === type) {
                                    let skuIds = []
                                    skuIds.push(sku.id)
                                    Actions.orderInfo({skuIds})
                                }
                            } else {
                                //操作失败！
                            }
                        })
                } else {
                    //去登录
                }
            })
        }
    }

    render() {
        const tabs = [{title: '基本信息'}, {title: '商品详情'}, {title: '规格参数'}];
        let sku = this.state.itemData.skus[0]
        return (
            <Tabs tabs={tabs}>
                <View>
                    <Carousel
                        infinite
                        style={{height: 350, marginTop: 2}}
                    >
                        {
                            sku.images.split(',').map(url => {
                                url = url.replace('http://localhost:8080/mall', hostPath)
                                return <Image source={{uri: url}} style={{width: '99%', height: '100%'}}/>
                            })
                        }
                    </Carousel>
                    <WingBlank>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#c81623',
                            marginTop: 15
                        }}>¥{sku.price}</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 15}}>{sku.title}</Text>
                        <Text>{this.state.itemData.subTitle}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Button size='small' style={{width: 50}} onPress={() => this.onPress('decrement')}><Text
                                style={{fontWeight: '700px'}}>-</Text></Button>
                            <Text style={{
                                width: 50,
                                backgroundColor: '#F8F8F8',
                                textAlign: 'center'
                            }}>{this.state.num}</Text>
                            <Button size='small' style={{width: 50}}
                                    onPress={() => this.onPress('increment')}>+</Button>
                        </View>
                        <Flex justify="between" style={{marginTop: 60}}>
                            <Button type="primary" style={{width: '47%'}}
                                    onPress={() => this.onPress('add')}>加入购物车</Button>
                            <Button type="warning" style={{width: '47%'}}
                                    onPress={() => this.onPress('buy')}>立即购买</Button>
                        </Flex>
                    </WingBlank>
                </View>
                <View>
                    <ScrollView>
                        {
                            this.showDetail()
                        }
                    </ScrollView>
                </View>
                <View>
                    {this.showSpec()}
                </View>
            </Tabs>
        )
    }
}

export default ItemDetailSpecNo