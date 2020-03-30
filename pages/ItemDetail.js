import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native'
import Constants from "../utils/constants"
import ItemDetailSpecYes from './itemDetail/ItemDetailSpecYes'
import ItemDetailSpecNo from './itemDetail/ItemDetailSpecNo'

const hostPath = Constants.hostPath

class ItemDetail extends Component {
    state = {
        itemData: {}
    }

    componentWillMount() {
        let spuId = this.props.spuId
        fetch(hostPath + '/app/item?id=' + spuId)
            .then(res => res.json())
            .then(resp => {
                this.setState({itemData: resp.data})
            })
    }


    render() {
        if (this.state.itemData.specType === 'complexSpecYes') {
            return <View><ItemDetailSpecYes itemData={this.state.itemData}/></View>
        }
        return <View><ItemDetailSpecNo itemData={this.state.itemData}/></View>
    }
}

export default ItemDetail