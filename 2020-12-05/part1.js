#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const main = () => {
    let buffer, highestSeatId = 0;
    let seatIds = [];

    while (buffer = lineReader.next()) {
        const seat = parseLine(buffer.toString());
        console.log(seat);
        highestSeatId = Math.max(highestSeatId, seat.id);
        seatIds.push(seat.id);
    }
    
    console.log(`\n\nHighest seat id = ${highestSeatId}`);

    const sortedSeats = seatIds.sort((a,b) => a - b);
    for (let index = 0; index < sortedSeats.length; index++) {
        if (sortedSeats[index] + 1 !== sortedSeats[index+1]) {
            console.log(`Your seat id is ${sortedSeats[index] + 1}`);
            break;
        }
    }
}

const parseLine = (line) => {
    const seat = {
        input: line,
        row: calculateRow(line.slice(0, 7)),
        col: calculateCol(line.slice(7)),
    }
    seat.id = seat.row * 8 + seat.col;
    return seat;
}

const calculateRow = (rowPart) => {
    let top = 127, bottom = 0, row = 0;

    for(let char of rowPart) {
        if (char === 'F') {
            row = top = Math.floor(top - ((top - bottom) / 2));
        } else if (char === 'B') {
            row = bottom = Math.ceil(bottom + ((top - bottom) / 2));
        }
        // console.log(`top: ${top} bottom: ${bottom}`);
    }
    // console.log(`top: ${top} bottom: ${bottom} row: ${row}`);
    return row;
}

const calculateCol = (colPart) => {
    let top = 7, bottom = 0, row = 0;

    for(let char of colPart) {
        if (char === 'L') {
            row = top = Math.floor(top - ((top - bottom) / 2));
        } else if (char === 'R') {
            row = bottom = Math.ceil(bottom + ((top - bottom) / 2));
        }
        // console.log(`top: ${top} bottom: ${bottom}`);
    }
    // console.log(`top: ${top} bottom: ${bottom} row: ${row}`);
    return row;
}

main();

