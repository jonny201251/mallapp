import React, {Component} from 'react'
import {Text, View} from 'react-native';
import {Icon, SearchBar, TabBar, Provider} from '@ant-design/react-native'
import zhCN from '@ant-design/react-native/es/locale-provider/zh_CN'
import customTheme from '../customTheme'

export default class Main extends Component {
    state = {
        selectedTab: 'redTab',
    }

    renderContent(pageText) {
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                <SearchBar placeholder="Search" showCancelButton/>
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
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => this.onChangeTab('blueTab')}
                    >
                        {this.renderContent('首页')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon name="ordered-list"/>}
                        title="购物车"
                        badge={20}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => this.onChangeTab('redTab')}
                    >
                        {this.renderContent('购物车')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon name="user"/>}
                        title="我的"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => this.onChangeTab('yellowTab')}
                    >
                        {this.renderContent('我的')}
                    </TabBar.Item>
                </TabBar>
            </Provider>
        )
    }
}