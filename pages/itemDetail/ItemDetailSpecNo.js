import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, ScrollView} from 'react-native'
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
    }

    render() {
        const tabs = [{title: '基本信息'}, {title: '商品详情'}, {title: '规格参数'}];
        const style = {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
        }
        let sku = this.state.itemData.skus[0]
        let descriptionImages = this.state.itemData.descriptionImages
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

                        <Flex justify="between" style={{marginTop: 80}}>
                            <Button type="primary" style={{width: '47%'}}>加入购物车</Button>
                            <Button type="warning" style={{width: '47%'}}>立即购买</Button>
                        </Flex>
                    </WingBlank>
                </View>
                <View>
                    <ScrollView>
                        {
                            descriptionImages.map(url => {
                                url = url.replace('http://localhost:8080/mall', hostPath)
                                return <Image source={{uri: url}} style={{width: '99.8%', height: 550}}/>
                            })
                        }
                    </ScrollView>

                </View>
                <View>
                    <Text>Content of Third Tab</Text>
                </View>
            </Tabs>
        )
    }
}

export default ItemDetailSpecNo