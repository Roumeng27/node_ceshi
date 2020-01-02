var express = require('express')
const banner_data = require('./data/bannerList.js')
const food_data = require('./data/foodList.js')
const detail_data = require('./data/foodDetail.js')
var app = express();
// app.get('*',(req,res)=>{
//     res.sendFile(__dirname+req.path)
// })
// 解决跨域问题
app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        next();
    })
    // 返回的data对象，可直接访问http://localhost:8887/bannerList
app.get('/bannerList', (req, res) => {
        // 这里返回 了一个对象data,可以将你的数组放到一个js里面导出来，这里引入进来，然后替换到data就可以了
    res.send({
        msg: '成功',
        code: 200,
        data: banner_data
    })
})
app.get('/foodList', (req, res) => {
    // 这里返回 了一个对象data,可以将你的数组放到一个js里面导出来，这里引入进来，然后替换到data就可以了
    res.send({
        msg: '成功',
        code: 200,
        data: food_data
    })
})
app.get('/foodDetail', (req, res) => {
    // 这里返回 了一个对象data,可以将你的数组放到一个js里面导出来，这里引入进来，然后替换到data就可以了
    var detail_obj = {};
    try{
        if(req.query.id){
            var newArr = food_data.data;
            for(let i=0;i<newArr.length;i++){
                if(newArr[i].id == req.query.id){
                    detail_obj = newArr[i]
                }
            }
            if(detail_obj.id){
                res.send({
                    msg: '成功',
                    code: 200,
                    data: detail_data
                })
            }else{
                res.send({
                    msg: '暂无此商品',
                    code: 200,
                    data: detail_obj
                })
            }
        }else{
            res.send({
                msg: '参数错误',
                code: 200,
                data: {}
            })
        }
    }catch(err){
        console.log(err)
    }
    
})
app.listen(8887, () => {
    console.log('服务启动成功,8887')
})