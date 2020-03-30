import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native'
import {Tabs, Carousel} from '@ant-design/react-native'
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
            height: 150,
            backgroundColor: '#fff',
        }
        return (
            <Tabs tabs={tabs}>
                <View>
                    <Carousel
                        infinite
                    >
                        <Text>aaa</Text>
                    </Carousel>
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