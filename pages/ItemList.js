import React, {Component} from 'react'
import {View, Alert, Text, Image, TouchableHighlight, FlatList} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {SearchBar, Carousel, Grid, Flex, WhiteSpace, WingBlank, Button} from "@ant-design/react-native"
import Constants from "../utils/constants"

const hostPath = Constants.hostPath

class ItemList extends Component {
    state = {
        keyword: '',
        currentPage: 1,
        pageSize: 4,
        totalPage: 0,
        items: [],
    }

    componentWillMount() {
        fetch(hostPath + '/app/totalPage?keyword=' + this.props.keyword + '&currentPage=' + this.state.currentPage + '&pageSize=' + this.state.pageSize)
            .then(res => res.json())
            .then(resp => {
                this.setState({totalPage: resp.data})
            })
        this.setState({keyword: this.props.keyword}, () => this.getItem())
    }

    //商品列表数据
    getItem = () => {
        fetch(hostPath + '/app/spu?keyword=' + this.state.keyword + '&currentPage=' + this.state.currentPage + '&pageSize=' + this.state.pageSize)
            .then(res => res.json())
            .then(resp => {
                this.setState({items: resp.data})
            })
    }
    // 加载下一页
    loadNextPage = () => {
        // 如果下一页的页码值，大于总页数了，直接return
        if ((this.state.currentPage + 1) > this.state.totalPage) {
            return
        }
        this.setState({currentPage: this.state.currentPage + 1}, () => this.getItem())
    }
    // 渲染分割线
    renderSeparator = () => {
        return <View style={{borderTopColor: '#ccc', borderTopWidth: 1, marginLeft: 10, marginRight: 10}}/>
    }
    // 渲染每个商品
    renderItem = (item) => {
        return <TouchableHighlight underlayColor="#fff" onPress={() => {
            Actions.itemDetail({spuId: item.spuId})
        }}>
            <View style={{flexDirection: 'row', padding: 10}}>
                <Image source={{uri: item.image}} style={{width: 150, height: 140, marginRight: 10}}/>
                <View style={{justifyContent: 'space-around'}}>
                    <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                    <Text style={{color: '#c81623'}}>¥{item.tmpPrice}</Text>
                </View>
            </View>
        </TouchableHighlight>
    }

    render() {
        return <View>
            <SearchBar
                value={this.state.keyword}
                placeholder={this.state.keyword}
                onSubmit={keyword => this.setState({keyword}, () => this.getItem())}
                onCancel={() => this.setState({keyword: ''})}
                onChange={keyword => this.setState({keyword})}
                showCancelButton
            />
            <FlatList
                data={this.state.items}
                renderItem={({item}) => this.renderItem(item)} // 调用方法，去渲染每一项
                ItemSeparatorComponent={this.renderSeparator} //渲染分割线的属性方法
                onEndReachedThreshold={0.5} // 距离底部还有多远的时候，触发加载更多的事件
                onEndReached={this.loadNextPage} // 当距离不足 0.5 的时候，触发这个方法，加载下一页数据
            />
        </View>
    }
}

export default ItemList