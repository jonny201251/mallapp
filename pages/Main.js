import React, {Component} from 'react'
import {Text, View} from 'react-native';
import {Icon, SearchBar, TabBar, Provider} from '@ant-design/react-native'
import zhCN from '@ant-design/react-native/es/locale-provider/zh_CN'
import customTheme from '../customTheme'
import Home from './tabbars/Home'
import ShopCart from './tabbars/ShopCart'
import Me from './tabbars/Me'

export default class Main extends Component {
    state = {
        selectedTab: 'homeTab',
    }

    renderContent(pageText) {
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                <Text style={{margin: 50}}>{pageText}</Text>
            </View>
        );
    }

    onChangeTab(tabName) {
        this.setState({
            selectedTab: tabName,
        });
    }

    render() {
        return (
            <Provider locale={zhCN} theme={customTheme}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="#f5f5f5"
                >
                    <TabBar.Item
                        title="首页"
                        icon={<Icon name="home"/>}
                        selected={this.state.selectedTab === 'homeTab'}
                        onPress={() => this.onChangeTab('homeTab')}
                    >
                        <Home/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon name="ordered-list"/>}
                        title="购物车"
                        badge={20}
                        selected={this.state.selectedTab === 'shopCartTab'}
                        onPress={() => this.onChangeTab('shopCartTab')}
                    >
                        <ShopCart/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon name="user"/>}
                        title="我的"
                        selected={this.state.selectedTab === 'meTab'}
                        onPress={() => this.onChangeTab('meTab')}
                    >
                        <Me/>
                    </TabBar.Item>
                </TabBar>
            </Provider>
        )
    }
}