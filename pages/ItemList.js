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
                console.warn(resp.data)
                this.setState({totalPage: resp.data})
            })
        this.setState({keyword: this.props.keyword}, () => this.getItem())
    }

    //商品列表数据
    getItem = () => {
        fetch(hostPath + '/app/spu?keyword=' + this.state.keyword + '&currentPage=' + this.state.currentPage + '&pageSize=' + this.state.pageSize)
            .then(res => res.json())
            .then(resp => {
                console.warn(resp.data)
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
        return <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{margin: 50}}>itemList</Text>
        </View>
    }
}

export default ItemList