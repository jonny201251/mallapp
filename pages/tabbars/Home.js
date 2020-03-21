import React, {Component} from 'react'
import {View, Alert, Text, Image} from 'react-native'
import {SearchBar, Carousel} from "@ant-design/react-native"
import Constants from '../../utils/constants'

const url = Constants.hostPath + '/app/lunbo'

export default class Home extends Component {
    state = {
        value: '',
        images: []
    }

    componentWillMount() {
        fetch(url)
            .then(res => res.json())
            .then(resp => {
                this.setState({images: resp.data})
            })
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
            <Carousel
                autoplay
                infinite
            >
                {this.state.images.map((item, i) => {
                    return <View key={i}>
                        <Image source={{uri: Constants.hostPath + item.image}}
                               style={{width: '99%', height: 150}}/>
                    </View>
                })}
            </Carousel>
        </View>
    }
}