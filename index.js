const http = require('http');
const url = require('url');
const { getTable } = require('./queries');

const port = process.env.PORT;
const lang = process.env.LANGUAGE;
const text = require('./lang.json');

const server = http.createServer(async(req,res) => {
    const queryParam = url.parse(req.url,true).query;

    if (req.url.startsWith('/weapons')) {
        const tablePrefix = req.url.slice(1).split('?')[0]+'_';
        if (req.method == 'GET') {
            try {
                const registers = await getTable(tablePrefix,queryParam.lang);
                res.writeHead(200, { 'Content-Type' : 'application/json' });
                if (registers.error) {
                    res.end(registers.message);
                } else {
                    res.end(JSON.stringify(registers));
                }
            } catch (e) {
                res.writeHead(500)
                res.end(text.index.weapons.message1[lang])
            }
        }
    }

    else {
        res.writeHead(404)
        res.end(text.index.message1[lang])
    }

});

server.listen(port, () => console.log(`Server listening on port: ${port}`))
