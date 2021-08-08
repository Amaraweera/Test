const fs = require('fs');
const services = require('./service');
const blend = require('@mapbox/blend');
const argv = require('minimist')(process.argv.slice(2));

const {
    greeting = 'Hello',
    who = 'You',
    width = 400,
    height = 500,
    color = 'Pink',
    size = 100,
} = argv;

const firstReq = {
    // https://cataas.com/cat/says/Hi%20There?width=500&amp;height=800&amp;c=Cyan&amp;s=150
    url: 'https://cataas.com/cat/says/' + greeting + '?width=' + width + '&height=' + height + '&color' + color + '&s=' + size,
    encoding: 'binary'
};

const secondReq = {
    url: 'https://cataas.com/cat/says/' + who + '?width=' + width + '&height=' + height + '&color' + color + '&s=' + size,
    encoding: 'binary'
};

// Execute main function 
main();

async function main() {
    let firstImage  = await services.fetchImage(firstReq);
    let secondImage = await services.fetchImage(secondReq);

    blend([ {
        buffer: new Buffer(firstImage, 'binary'),
        x: 0,
        y:0,
        }, {
            buffer: new Buffer(secondImage, 'binary'),
        x: width,
        y: 0,
    }], {
        width: width * 2,
        height: height,
        format: 'jpeg',
    }, (err, data) => {
        const fileOut = join(process.cwd(), `/cat-card.jpg`);

        fs.writeFile(fileOut, data, 'binary', (err) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log("The file was saved!");
        });
    });
}