import {AsyncStorage} from 'react-native'
//相当于LocalStorage
export default class StorageUtil {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            return JSON.parse(value);
        });
    }

    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static set(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return StorageUtil.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }

    /**
     * 删除
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
}