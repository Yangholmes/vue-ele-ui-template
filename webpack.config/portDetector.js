/**
 * @file 端口嗅探
 * @author Yangholmes 2020-12-30
 */

const net = require('net');

function portDetector(port) {
    if (port < 0 || port > 65535) {
        return Promise.reject(new Error('port must be between 0 ~ 65535'));
    }
    const server = net.createServer().listen(port);
    return new Promise((resolve, reject) => {
        server.on('listening', () => {
            console.log(`${port} is ok!`);
            server.close();
            resolve(port);
        });
        server.on('error', err => {
            server.close();
            if (err.code === 'EADDRINUSE') {
                resolve(portDetector(port + 1));
                console.log(`${port} is occupied!`);
            }
            else {
                reject(err);
            }
        });
    });
}

module.exports = portDetector;
