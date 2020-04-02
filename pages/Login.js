import React, {Component} from 'react'
import {Text, View} from 'react-native'
import Constants from "../utils/constants"
import StorageUtil from '../utils/StorageUtil'
import {InputItem, Button} from '@ant-design/react-native'
import {Tip} from 'beeshell'
import {Actions} from "react-native-router-flux";

const hostPath = Constants.hostPath
export default class Login extends Component {
    state = {
        value1: '',
        value2: ''
    }

    componentWillMount() {
        //用户登录
        StorageUtil.get("userInfo").then(user => {
            if (user == null) {
                fetch(hostPath + '/app/login?username=范海峰&password=1')
                    .then(res => res.json())
                    .then(resp => {
                        StorageUtil.set("userInfo", resp.data)
                    })
            }
        })
    }

    onPress = () => {
        if (this.state.value1.length > 0 && this.state.value2.length > 0) {
            fetch(hostPath + '/app/login?username=' + this.state.value1 + '&password=' + this.state.value2)
                .then(res => res.json())
                .then(resp => {
                    if (resp.code === 1) {
                        StorageUtil.set("userInfo", resp.data)
                        Actions.entry()
                    } else {
                        Tip.show('登录名或密码错误!', 2000, 'center')
                    }

                })
        } else {
            Tip.show('登录名或密码不能为空!', 2000, 'center')
        }
    }

    render() {
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50, fontSize: 20}}>用户登录</Text>
            <InputItem
                clear
                value={this.state.value1}
                onChange={value => {
                    this.setState({
                        value1: value,
                    });
                }}
                placeholder="登录名"
            />
            <View style={{marginTop: 30}}/>
            <InputItem
                type='password'
                clear
                value={this.state.value2}
                onChange={value => {
                    this.setState({
                        value2: value,
                    });
                }}
                placeholder="密码"
            />
            <View style={{marginTop: 30}}/>
            <Button type="warning" style={{width: '95%'}} onPress={() => this.onPress()}>登录</Button>
        </View>
    }
}