const https = require('https');

const id = 'a9bcljiruvd4h8i83v12iil8uk@group.calendar.google.com';
// POST https://www.googleapis.com/calendar/v3/freeBusy
const host = 'www.googleapis.com';
const path = '/calendar/v3/freeBusy';

getArrayIntervals = (id, from, to) => {
    const data = new TextEncoder().encode(JSON.stringify({
        timeMin: from,
        timeMax: to,
        items: [{id: id}],
    }));

    const options = {
        hostname: host,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(data)
    req.end()
}
