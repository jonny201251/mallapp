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
                        icon={<Icon name="home" color="red"/>}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => this.onChangeTab('blueTab')}
                    >
                        {this.renderContent('Life Tab')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon name="ordered-list" color="red"/>}
                        title="购物车"
                        badge={2}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => this.onChangeTab('redTab')}
                    >
                        {this.renderContent('Koubei Tab')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon name="user" color="red"/>}
                        title="我的"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => this.onChangeTab('yellowTab')}
                    >
                        {this.renderContent('My Tab')}
                    </TabBar.Item>
                </TabBar>
            </Provider>
        )
    }
}