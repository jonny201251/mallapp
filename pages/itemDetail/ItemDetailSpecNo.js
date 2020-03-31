import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native'
import {Tabs, Carousel, Flex, Button, WingBlank} from '@ant-design/react-native'
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
        console.warn(itemData)
    }

    render() {
        const tabs = [{title: '基本信息'}, {title: '商品详情'}, {title: '规格参数'}];
        const style = {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
        }
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
                                url = url.replace('localhost', '192.168.99.233')
                                return <Image source={{uri: url}} style={{width: '99%', height: '100%'}}/>
                            })
                        }
                    </Carousel>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#c81623',
                        marginLeft: 15,
                        marginTop: 15
                    }}>¥{sku.price}</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 15}}>{sku.title}</Text>
                    <WingBlank>
                        <Flex justify="between" style={{marginTop: 80, marginLeft: 15}}>
                            <Button type="primary" style={{width: '47%'}}>加入购物车</Button>
                            <Button type="warning" style={{width: '47%'}}>立即购买</Button>
                        </Flex>
                    </WingBlank>
                </View>
                <View>
                    <Text>Content of Second Tab</Text>
                </View>
                <View>
                    <Text>Content of Third Tab</Text>
                </View>
            </Tabs>
        )
    }
}

export default ItemDetailSpecNo