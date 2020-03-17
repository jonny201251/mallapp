import React, {Component} from 'react'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import Main from './pages/Main'

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
        return (
            <Main></Main>
        )
    }
}