const http = require('http');
const { getTable } = require('./queries');

const port = 3000

const server = http.createServer(async(req,res) => {

    if (req.url == '/weapons') {

        if (req.method == 'GET') {
            let body = '';
            req.on('data', (chunk) => body += chunk.toString())
            req.on('end', async() => {
                const query = JSON.parse(body);
                const result = await getAll(query.table);
                if (typeOf(result) == 'array') {
                    res.writeHead(200, { 'Content-Type' : 'application/json' })
                    res.end(JSON.stringify(result))
                } else {
                    res.writeHead(500)
                    res.end('Server error (500)')
                }
            })
        }

    }

});

server.listen(port, () => console.log(`Server listening on port: ${port}`))
