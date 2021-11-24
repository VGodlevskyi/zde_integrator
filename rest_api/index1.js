const https = require('https');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const myGoogleCalId = process.env.myGoogleCalId;

const host = 'www.googleapis.com';
const path = '/calendar/v3/freeBusy/';

getIntervalsArray = (id, from, to) => {
    const data = JSON.stringify({
        timeMin: from,
        timeMax: to,
        items: [{id: myGoogleCalId}],
    })

    const options = {
        hostname: host,
        path: `${path}?key=${API_KEY}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            const data = [];
            res.on('data', d => {
                process.stdout.write(d)
            })

        })
        req.on('error', error => {
            reject(error);
            console.error(error)
        })
        req.write(data);
        req.end();
    })

}

const from = new Date('2021-11-01');
const to = new Date('2021-12-31');
getIntervalsArray(myGoogleCalId, from.toISOString(), to.toISOString())
    .then(r => {
        console.log(r.calendars[myGoogleCalId]);
            })
    .catch(e => console.log(e));

