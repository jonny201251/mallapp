export default class ItemUtil {
    static get(){
        //商品列表数据
        fetch(hostPath+'/spu?currentPage')
            .then(res => res.json())
            .then(resp => this.setState({images: resp.data}))
    }
}