import React from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

import {Text, View} from 'react-native';
import {Icon, SearchBar, TabBar} from '@ant-design/react-native';

export default class TabBarTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            isReady: false,
        };
    }

    componentWillMount(){
        fetch('http://haiyingmall.paas.casicloud.com/brand/getById?id=1')
            .then(res=>res.json())
            .then(data=>{
                console.warn(data)
            })

    }

    async componentDidMount() {
        await Font.loadAsync(
            'antoutline',
            // eslint-disable-next-line
            require('@ant-design/icons-react-native/fonts/antoutline.ttf')
        );

        await Font.loadAsync(
            'antfill',
            // eslint-disable-next-line
            require('@ant-design/icons-react-native/fonts/antfill.ttf')
        );
        // eslint-disable-next-line
        this.setState({ isReady: true });
    }

    renderContent(pageText) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <SearchBar placeholder="Search" showCancelButton />
                <Text style={{ margin: 50 }}>{pageText}</Text>
            </View>
        );
    }
    onChangeTab(tabName) {
        this.setState({
            selectedTab: tabName,
        });
    }
    render() {
        const {isReady } = this.state;
        if (!isReady) {
            return <AppLoading />;
        }
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="#f5f5f5"
            >
                <TabBar.Item
                    title="Life"
                    icon={<Icon name="home" />}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => this.onChangeTab('blueTab')}
                >
                    {this.renderContent('Life Tab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="ordered-list" />}
                    title="Koubei"
                    badge={2}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => this.onChangeTab('redTab')}
                >
                    {this.renderContent('Koubei Tab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="like" />}
                    title="Friend"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => this.onChangeTab('greenTab')}
                >
                    {this.renderContent('Friend Tab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="user" />}
                    title="My"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => this.onChangeTab('yellowTab')}
                >
                    {this.renderContent('My Tab')}
                </TabBar.Item>
            </TabBar>
        );
    }
}