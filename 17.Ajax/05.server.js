// 引入http模块
const http = require('http');
const server = http.createServer()
//监听request请求事件
server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end('<h1>Hello World</h1>');
});
//分配端口号
server.listen(8080, () => {
    console.log('server running at http://127.0.0.1:8080');
});

