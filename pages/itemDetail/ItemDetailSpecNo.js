import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, ScrollView} from 'react-native'
import {Tabs, Carousel, Flex, Button, WhiteSpace, WingBlank, Card} from '@ant-design/react-native'
import Constants from '../../utils/constants'

const hostPath = Constants.hostPath

//没有特有属性
class ItemDetailSpecNo extends Component {
    state = {
        itemData: {}
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
        }else{
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
                        <Text style={{fontSize: 20, marginTop: 15}}>{sku.subTitle}</Text>

                        <Flex justify="between" style={{marginTop: 80}}>
                            <Button type="primary" style={{width: '47%'}}>加入购物车</Button>
                            <Button type="warning" style={{width: '47%'}}>立即购买</Button>
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