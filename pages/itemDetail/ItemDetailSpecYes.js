import React, {Component} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {Button, Card, Carousel, Flex, Tabs, WingBlank} from '@ant-design/react-native'
import Constants from '../../utils/constants'
import StorageUtil from '../../utils/StorageUtil'
import {Actions} from "react-native-router-flux"
import {Tip} from 'beeshell/dist/components/Tip'

const hostPath = Constants.hostPath


//有特有属性
class ItemDetailSpecYes extends Component {
    state = {}

    componentWillMount() {
        let itemData = this.props.itemData
        console.warn(itemData)
    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>ItemDetailSpecYes</Text>
        </View>
    }
}

export default ItemDetailSpecYes