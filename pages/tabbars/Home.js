import React, {Component} from 'react'
import {View, Alert, Text, Image, TouchableHighlight} from 'react-native'
import {SearchBar, Carousel, Grid, Flex, WhiteSpace, WingBlank, Button} from "@ant-design/react-native"
import Constants from '../../utils/constants'

const hostPath = Constants.hostPath

export default class Home extends Component {
    state = {
        value: '',
        images: [],
        currentPage: 1,
        pageSize: 4,
        items: []
    }

    componentWillMount() {
        //轮播数据
        fetch(hostPath + '/app/lunbo')
            .then(res => res.json())
            .then(resp => {this.setState({images: resp.data})})

        this.getItem()
    }

    //商品列表数据
    getItem = () => {
        fetch(hostPath + '/spu?currentPage=' + this.state.currentPage + '&pageSize=' + this.state.pageSize)
            .then(res => res.json())
            .then(resp => this.setState({items: resp.data}))
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
                        <Image source={{uri: item.image}}
                               style={{width: '99.8%', height: 180}}/>
                    </View>
                })}
            </Carousel>
            <Text/>
            <Flex>
                {this.state.images.map((item, index) => {
                    if (index < 2) {
                        return <Flex.Item style={{paddingLeft: 4, paddingRight: 4}}>
                            <Image source={{uri: item.image}}
                                   style={{width: '99.8%', height: 180}}/>
                            <Text>标题</Text>
                            <Text>价格</Text>
                        </Flex.Item>
                    }

                })}
            </Flex>
            <Text/>
            <Flex>
                {this.state.images.map((item, index) => {
                    if (index < 2) {
                        return <Flex.Item style={{paddingLeft: 4, paddingRight: 4}}>
                            <Image source={{uri: item.image}}
                                   style={{width: '99.8%', height: 180}}/>
                            <Text>标题</Text>
                            <Text>价格</Text>
                        </Flex.Item>
                    }

                })}
            </Flex>
        </View>
    }
}