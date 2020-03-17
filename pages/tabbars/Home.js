import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {SearchBar} from "@ant-design/react-native"

export default class Home extends Component {
    state = {
        value: ''
    }

    render() {
        return <View style={{margin: 10}}>
            <SearchBar
                value={this.state.value}
                placeholder="搜索"
                onSubmit={value => Alert.alert(value)}
                onCancel={() => this.setState({value: ''})}
                onChange={value => this.setState({value})}
                showCancelButton
            />
        </View>
    }
}