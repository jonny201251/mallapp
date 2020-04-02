import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight, AsyncStorage} from 'react-native'
import Constants from "../../utils/constants"
import StorageUtil from '../../utils/StorageUtil'
import {Actions} from "react-native-router-flux"
import {Button} from 'beeshell'
import MyOrder from '../MyOrder'

const hostPath = Constants.hostPath
export default class Me extends Component {
    state = {
        flag: false
    }
    init = () => {
        StorageUtil.get("userInfo").then(user => {
            if (user) {
                this.setState({flag: true, user})
            } else {
                //去登录
                Actions.login()
            }
        })
    }


    componentWillMount() {
        this.init()
    }

    onPress = () => {
        Actions.login()
    }

    logout = () => {
        StorageUtil.delete("userInfo")
        Actions.entry()
    }

    showContent = () => {
        if (this.state.flag) {
            return <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Text style={{heigth: 30, lineHeight: 30, paddingRight: 20}}>欢迎您，{this.state.user.loginName}</Text>
                <Button onPress={() => this.logout()} size="sm" textColorInverse>退出登录</Button>
            </View>
        } else {
            return <Button
                onPress={() => this.onPress()}
                style={{borderRadius: 50}}
                size='md'
                textColorInverse>
                去登录
            </Button>
        }
    }

    showOrder = () => {
        if (this.state.flag) {
            return <MyOrder/>
        }
    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            {this.showContent()}
            {this.showOrder()}
        </View>
    }
}