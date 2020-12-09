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

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
const byr = (field) => field >= 1920 && field <= 2002;

// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
const iyr = (field) => field >= 2010 && field <= 2020;

// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
const eyr = (field) => field >= 2020 && field <= 2030;

// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
const hgt = (field) => {
    let matches = field.match(/(\d\d\d)cm/);
    if (matches) {
        const height = Number.parseInt(matches[1]);
        return height >= 150 && height <= 193;
    }

    matches = field.match(/(\d\d)in/)
    if (matches) {
        const height = Number.parseInt(matches[1]);
        return height >= 59 && height <= 76;
    }
    
    return false;
};

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
const hcl = (field) => {
    return /\#[0-9|a-f][0-9|a-f][0-9|a-f][0-9|a-f][0-9|a-f][0-9|a-f]$/.test(field);
}

// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
const ecl = (field) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(field);

// pid (Passport ID) - a nine-digit number, including leading zeroes.
const pid = (field) => /^\d\d\d\d\d\d\d\d\d$/.test(field);

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' /*, 'cid' */];
const VALIDATORS = { byr, iyr, eyr, hgt, hcl, ecl, pid };


const isValid = (passport) => {
    const inValid = REQUIRED_FIELDS.some((field) => {
        if (!passport[field]) { return true }
        if (VALIDATORS[field]) {
            return !VALIDATORS[field](passport[field]);
        }
    });
    if (!inValid) {
        console.log('VALID: ', passport);
    }
    return !inValid;
}

main();

