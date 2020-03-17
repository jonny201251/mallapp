import React, {Component} from 'react'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import {Router, Scene, Stack} from 'react-native-router-flux'
import Entry from './pages/Entry'

export default class App extends Component {
    state = {
        isReady: false,
    }

    //链接字体图标，如果你用的是 expo 请确保字体已经加载完成再初始化app
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
        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading/>
        }
        return <Router sceneStyle={{backgroundColor: 'white'}}>
            <Stack key="root">
                {/*第一个 Scene 就是默认要展示的首页*/}
                {/*key 属性，表示路由的规则名称，将来可以使用这个 key ，进行编程式导航，每一个路由规则，都应该提供一个 唯一的key， key不能重复*/}
                <Scene key="entry" component={Entry} hideNavBar={true}/>
            </Stack>
        </Router>
    }
}