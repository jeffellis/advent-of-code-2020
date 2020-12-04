#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const main = () => {
    let buffer, line;
    let validPassports = 0;

    let passport = {};
    while (buffer = lineReader.next()) {
        line = buffer.toString();
        if (line.length === 0) {
            validPassports += isValid(passport) ? 1 : 0;
            passport = {};
        } else {
            parseLine(line, passport);
        }
    }
    if (line.length !== 0) {
        validPassports += isValid(passport) ? 1 : 0;
    }
    
    console.log(`\n\nThere are ${validPassports} valid passports`);
}

const parseLine = (line, passport) => {
    const tokens = line.split(' ');
    tokens.forEach((token) => {
        const [key, value] = token.split(':');
        passport[key] = value;
    });
    return passport;
}

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' /*, 'cid' */];

const isValid = (passport) => {
    const inValid = REQUIRED_FIELDS.some((field) => !passport[field]);
    return !inValid;
}

main();
