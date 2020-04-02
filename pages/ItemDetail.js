import React, {Component} from 'react'
import {ActivityIndicator, View} from 'react-native'
import Constants from "../utils/constants"
import ItemDetailSpecYes from './itemDetail/ItemDetailSpecYes'
import ItemDetailSpecNo from './itemDetail/ItemDetailSpecNo'

const hostPath = Constants.hostPath

class ItemDetail extends Component {
    state = {
        isloading: true
    }

    componentWillMount() {
        let spuId = this.props.spuId
        fetch(hostPath + '/app/item?id=' + spuId)
            .then(res => res.json())
            .then(resp => {
                this.setState({itemData: resp.data}, () => this.setState({isloading: false}))
            })
    }


    render() {
        if (this.state.isloading) {
            return <ActivityIndicator size="large"/>
        }
        return (
            <View style={{flex: 1}}>
                {
                    this.state.itemData.specType === 'complexSpecYes' ?
                        <ItemDetailSpecYes itemData={this.state.itemData}/> :
                        <ItemDetailSpecNo itemData={this.state.itemData}/>
                }
            </View>
        )
    }
}

export default ItemDetail