import React, {Component} from 'react'
import {View, Alert, Text, Image, TouchableHighlight, FlatList} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {SearchBar, Carousel, Grid, Flex, WhiteSpace, WingBlank, Button} from "@ant-design/react-native"
import Constants from '../../utils/constants'

const hostPath = Constants.hostPath

export default class Home extends Component {
    state = {
        value: '',
        images: [],
        currentPage: 1,
        pageSize: 4,
        totalPage: 0,
        items: [],
    }

    componentWillMount() {
        //轮播数据
        fetch(hostPath + '/app/lunbo')
            .then(res => res.json())
            .then(resp => {
                this.setState({images: resp.data})
            })
        fetch(hostPath + '/app/totalPage?currentPage=' + this.state.currentPage + '&pageSize=' + this.state.pageSize)
            .then(res => res.json())
            .then(resp => {
                this.setState({totalPage: resp.data})
            })
        this.getItem()
    }

    //商品列表数据
    getItem = () => {
        fetch(hostPath + '/app/spu?currentPage=' + this.state.currentPage + '&pageSize=' + this.state.pageSize)
            .then(res => res.json())
            .then(resp => {
                this.setState({items: resp.data})
            })
    }
    // 加载下一页
    loadNextPage = () => {
        console.warn("loadNextPage")
        // 如果下一页的页码值，大于总页数了，直接return
        if ((this.state.currentPage + 1) > this.state.totalPage) {
            return
        }
        this.setState({currentPage: this.state.currentPage + 1}, () => this.getItem())
    }

    render() {
        return <View style={{margin: 10}}>
            <SearchBar
                value={this.state.value}
                placeholder="搜索"
                onSubmit={value => Actions.itemList({keyword: value})}
                onCancel={() => this.setState({value: ''})}
                onChange={value => this.setState({value})}
                showCancelButton
            />
            <Carousel
                autoplay
                infinite
            >
                {this.state.images.map((item, i) => {
                    return <TouchableHighlight underlayColor="#fff" onPress={() => {
                        Actions.itemDetail({spuId: item.spuId})
                    }}>
                        <Image source={{uri: item.image}}
                               style={{width: '99.8%', height: 180}}/>
                    </TouchableHighlight>
                })}
            </Carousel>
            <FlatList
                style={{marginTop: 10}}
                data={this.state.items}
                numColumns={2} // 一行2个
                renderItem={({item}) => <ItemView item={item}/>}
                refreshing={false}
                onRefresh={this.loadNextPage}
            />
        </View>
    }
}

class ItemView extends Component {
    render() {
        let item = this.props.item
        return <View style={{flex: 1, padding: 5, backgroundColor: '#F8F8F8'}}>
            <TouchableHighlight underlayColor="#fff" onPress={() => {
                Actions.itemDetail({spuId: item.spuId})
            }}>
                <View>
                    <Image source={{uri: item.image}}
                           style={{width: '100%', height: 175}}/>
                    <Text>{item.title}</Text>
                    <Text style={{color: '#c81623'}}>¥{item.tmpPrice}</Text>
                </View>
            </TouchableHighlight>
        </View>
    }
}