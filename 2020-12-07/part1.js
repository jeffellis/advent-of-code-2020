#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');
const bags = {};

const main = () => {
    let buffer, sum = 0;

    while (buffer = lineReader.next()) {
        const bag = parseLine(buffer.toString());
        bags[bag.bagType] = bag;
    }
    
    const target = 'shiny gold';
    for (bag of Object.keys(bags)) {
        if (contains(bags[bag], 'shiny gold')) {
            console.log(`${bag} can contain ${target}`);
            sum++
        }
    }

    let count = countBagsInside(bags[target]);
    // for(innerBag of Object.keys(bags[target].contents)) {
    //     count += bags[target].contents[innerBag];
    // }

    console.log(`\n\nPart 1: ${sum} different bags may contain a ${target} bag`);
    console.log(`\n\nPart 2: '${target}' bags hold a total of ${count} bags`);
}

const BAGS_CONTAIN = ' bags contain';
const INNER_BAG_REGEX = /^(\d+) (.+) bag/;

const parseLine = (line) => {    
    const bagType = line.slice(0, line.indexOf(BAGS_CONTAIN));
    const contents = line.slice(line.indexOf(BAGS_CONTAIN) + BAGS_CONTAIN.length + 1).split(', ');

    const bag = {
        bagType,
        contents: {},
    };

    for (innerBag of contents) {
        if (innerBag === 'no other bags.') {
            bag.contents = null;
        } else {
            const matches = innerBag.match(INNER_BAG_REGEX);
            bag.contents[matches[2]] = Number.parseInt(matches[1]);
        }
    }

    return bag;
}

const contains = (bag, bagType) => {
    if (!bag.contents) {
        // console.log(`contains: ${bag.bagType} is a leaf`, bag);
        return false;
    }
    if (bag.contents[bagType]) {
        // console.log(`${bag.bagType} contains ${bagType}`);
        return true;
    }
    for (content of Object.keys(bag.contents)) {
        const innerBag = bags[content];
        // console.log(`contains: ${bag.bagType} recursively searching into ${innerBag.bagType}`);
        if (contains(innerBag, bagType)) {
            return true;
        }
    }
    return false;
}

const countBagsInside = (bag) => {
    if (!bag.contents) {
        return 0;
    }
    
    const innerBags = Object.keys(bag.contents);
    let count = 0; //innerBags.length;
    for (innerBag of innerBags) {
        count += bag.contents[innerBag] ? bag.contents[innerBag] : 1
        count += bag.contents[innerBag] ? bag.contents[innerBag] * countBagsInside(bags[innerBag]) : 1;
    }

    console.log(`bag count for ${bag.bagType} is ${count}`);
    return count;
};

main();

