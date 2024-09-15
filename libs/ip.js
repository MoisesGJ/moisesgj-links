import http from 'http';

export default async function getIpInfo(ip) {
    const url = `http://ip-api.com/json/${ip}`;

    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (err) {
                    reject(new Error('Error parsing JSON response: ' + err.message));
                }
            });
        }).on('error', (err) => {
            reject(new Error('Request error: ' + err.message));
        });
    });
}
