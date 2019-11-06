const fs = require('fs');
const user = [
    'User1',
    'User2',
    'User3',
    'User4'
];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url==="/") {
        res.write('<html>');
        res.write('<head><title>test</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();    
    }
    if (url==="/users") {
        res.write('<html>');
        res.write('<head><title>User</title></head>');
        res.write('<body><h1>Hello</h1></body>');
        res.write('<body>');
        res.write('<ul>');
        user.forEach(u => {
            res.write('<li>'+ u +'</li>');
        });
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url==="/create-user" && method==="POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            // fs.writeFile('message.txt', message, err => {
            //     res.statusCode = 302;
            //     res.setHeader('Location', '/');
            //     return res.end();
            // });
            res.setHeader('Location', '/');
            return res.end();
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>test</title></head>');
    res.write('<body><h1>halo</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;