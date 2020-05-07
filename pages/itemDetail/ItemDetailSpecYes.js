import React, {Component} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {Button, Card, Carousel, Flex, Tabs, WingBlank} from '@ant-design/react-native'
import Constants from '../../utils/constants'
import StorageUtil from '../../utils/StorageUtil'
import {Actions} from "react-native-router-flux";
import {Tip, Button as Buttonn, BottomModal, Stepper} from 'beeshell'
import variables from '../../customTheme'

const hostPath = Constants.hostPath

//有特有属性
class ItemDetailSpecYes extends Component {
    state = {
        itemData: {},
        num: 1
    }

    componentWillMount() {
        let itemData = this.props.itemData
        //遍历skus
        let skuMap = {}
        itemData.skus.map(item => {
            skuMap[item.indexes] = item
        })
        //生成indexes
        let indexes = []
        itemData.specs.forEach(group => {
            group.params.forEach(param => {
                if (param.generic === 0) {
                    indexes.push(0)
                }
            })
        })
        this.setState({itemData, skuMap, sku: itemData.skus[0], indexes})
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
            let sku = this.state.sku
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
                                } else {
                                    Tip.show('加入购物车成功！', 2000, 'center')
                                }
                            } else {
                                //操作失败！
                            }
                        })
                } else {
                    //去登录
                    Actions.login()
                }
            })
        }
    }

    //显示特有属性
    specialSpec = () => {
        if (this.state.itemData.specs) {
            let specs = this.state.itemData.specs
            let specialSpec = JSON.parse(this.state.itemData.detail.specialSpec)
            let params = {}
            let keys = []
            specs.forEach(group => {
                group.params.forEach(param => {
                    if (param.generic === 0) {
                        params[param.id] = param.name
                        keys.push(param.id)
                        // console.warn(param.name + '-' + specialSpec[param.id])
                    }
                })
            })
            //显示特有属性
            let indexes = this.state.indexes
            if (indexes.length === 1) {
                let selectIndex = indexes[0]
                let key = keys[0]
                return <View style={{flexDirection: "row", flexWrap: 'wrap', marginTop: 5}}>
                    <Text>{params[key] + '  '}</Text>
                    {
                        specialSpec[key].map((item, index) => {
                            if (index === selectIndex) {
                                return <Buttonn onPress={() => this.onPresss(+'0_' + index)} type='info'
                                                size={'sm'}
                                                style={{marginRight: 5, height: 30}}>{item}</Buttonn>
                            } else {
                                return <Buttonn onPress={() => this.onPresss('0_' + index)} size={'sm'}
                                                style={{marginRight: 5, height: 30}}>{item}</Buttonn>
                            }
                        })
                    }
                </View>
            } else {
                let j = -1
                return keys.map((key, i) => {
                    j = indexes[i]
                    return <View style={{flexDirection: "row", flexWrap: 'wrap', marginTop: 5}}>
                        <Text>{params[key] + '  '}</Text>
                        {
                            specialSpec[key].map((item, index) => {
                                if (index === j) {
                                    return <Buttonn onPress={() => this.onPresss(i + '_' + index)} type='info'
                                                    size={'sm'}
                                                    style={{marginRight: 5, height: 30}}>{item}</Buttonn>
                                } else {
                                    return <Buttonn onPress={() => this.onPresss(i + '_' + index)} size={'sm'}
                                                    style={{marginRight: 5, height: 30}}>{item}</Buttonn>
                                }
                            })
                        }
                    </View>
                })
            }
        }
    }

    onPresss = (value) => {
        this.setState({num: 1})
        let skuMap = this.state.skuMap
        let indexes = this.state.indexes
        if (indexes.length === 1) {
            let valArr = value.split('_')
            //取值
            let sku = skuMap[valArr[1]]

            indexes[0] = parseInt(valArr[1])
            this.setState({indexes, sku}, () => this.specialSpec())
        } else {
            let valArr = value.split('_')
            indexes[valArr[0]] = parseInt(valArr[1])
            let tmp = indexes.join('_')
            //取值
            let sku = skuMap[tmp]
            this.setState({indexes, sku}, () => this.specialSpec())
        }
    }

    handleChange = (value, oldValue, action) => {
        this.setState({num: value})
    }

    render() {
        const tabs = [{title: '基本信息'}, {title: '商品详情'}, {title: '规格参数'}];
        let sku = this.state.sku
        return (
            <Tabs tabs={tabs}>
                <View>
                    <Carousel
                        infinite
                        style={{height: 200}}
                    >
                        {
                            sku.images.split(',').map(url => {
                                url = url.replace('http://localhost:8080/mall', hostPath)
                                return <Image source={{uri: url}} style={{width: '99%', height: '100%'}}/>
                            })
                        }
                    </Carousel>
                    <WingBlank>
                        <ScrollView>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#c81623',
                                marginTop: 2
                            }}>¥{sku.price * this.state.num}</Text>
                            <Text style={{fontSize: 18, marginTop: 2}}>{sku.title}</Text>
                            <Text>{this.state.itemData.subTitle}</Text>
                            <View style={{marginBottom: 10}}>
                                <Stepper
                                    value={this.state.num}
                                    editable={true}
                                    min={1}
                                    max={10000000}
                                    operatorStyle={{backgroundColor: '#188afa', borderRadius: 15}}
                                    operatorIconColor='#fff'
                                    onChange={this.handleChange}
                                />
                            </View>
                            <View>
                                <Button
                                    style={{width: 140, height: 30}}
                                    size='sm'
                                    onPress={() => {
                                        this.bottomModal.open()
                                    }}
                                >
                                    选择规格
                                </Button>
                                <BottomModal
                                    ref={(c) => {
                                        this.bottomModal = c
                                    }}
                                    title='选择规格'
                                    cancelable={true}
                                    leftCallback={() => {
                                        this.bottomModal.close()
                                    }}
                                    leftLabelText={'关闭'}
                                    rightLabelText={''}
                                >
                                    <View
                                        style={{
                                            backgroundColor: '#fff',
                                            height: 400,
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <WingBlank>
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                color: '#c81623',
                                                marginTop: 5
                                            }}>¥{sku.price * this.state.num}</Text>
                                            <Text style={{fontSize: 18, marginTop: 5}}>{sku.title}</Text>
                                            <Text>{this.state.itemData.subTitle}</Text>
                                            <View style={{marginBottom: 10}}>
                                                <Stepper
                                                    value={this.state.num}
                                                    editable={true}
                                                    min={1}
                                                    max={10000000}
                                                    operatorStyle={{backgroundColor: '#188afa', borderRadius: 15}}
                                                    operatorIconColor='#fff'
                                                    onChange={this.handleChange}
                                                />
                                            </View>
                                            {this.specialSpec()}
                                        </WingBlank>
                                    </View>
                                </BottomModal>
                            </View>
                            <View style={{marginTop: 5}}><Text>{this.state.itemData.company.name}</Text></View>
                            <Flex justify="between">
                                <Button size={'sm'} type="primary" style={{width: '47%', height: 40}}
                                        onPress={() => this.onPress('add')}>加入购物车</Button>
                                <Button size={'sm'} type="warning" style={{width: '47%', height: 40}}
                                        onPress={() => this.onPress('buy')}>立即购买</Button>
                            </Flex>
                        </ScrollView>
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

export default ItemDetailSpecYes