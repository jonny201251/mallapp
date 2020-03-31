import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, ScrollView, AsyncStorage} from 'react-native'
import {Tabs, Carousel, Flex, Button, WhiteSpace, WingBlank, Card} from '@ant-design/react-native'
import Constants from '../../utils/constants'
import StorageUtil from '../../utils/StorageUtil'

const hostPath = Constants.hostPath

export default class ShopCart extends Component {
    state = {}

    componentWillMount() {
        StorageUtil.get("userInfo").then(user => {
            if (user) {
                console.warn(user)
            }
        })


    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>购物车-------------------------------</Text>
        </View>
    }
}