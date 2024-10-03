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

                    if (json.status !== 'success') resolve({ ip });

                    const response = {
                        country: json.country,
                        city: json.city,
                        zip: json.zip,
                        isp: json.isp,
                        ip: json.query
                    }

                    resolve(response);
                } catch (err) {
                    reject(new Error('Error parsing JSON response: ' + err.message));
                }
            });

        }).on('error', (err) => {
            reject(new Error('Request error: ' + err.message));
        });
    });
}
