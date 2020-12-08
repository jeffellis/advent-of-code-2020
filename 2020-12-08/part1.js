#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const ACC = 'acc';
const JMP = 'jmp';
const NOP = 'nop';

const stack = [];
let accumulator = 0;

const main = () => {
    let buffer;

    while (buffer = lineReader.next()) {
        stack.push(parseLine(buffer.toString()));     
    }
console.log(stack);
    execute();
    console.log(stack);
    
    console.log(`\n\nAccumulator = ${accumulator}`);
}

const execute = () => {
    let stackPointer = 0;
    let step = 0;

    while (stackPointer < stack.length) {
        const operation = stack[stackPointer];
        if (operation.executions > 0) {
            break;
        }

        switch (operation.op) {
            case ACC:
                accumulator += Number.parseInt(operation.arg);
                stackPointer++;
                break;
            case JMP:
                stackPointer += Number.parseInt(operation.arg);
                break;
            default:
                stackPointer++;
                break;
        }
        
        operation.executions++;
        step++;
        operation.steps.push(step);

        // console.log(`stackPointer = ${stackPointer}`)
    }
};

const parseLine = (line) => {
    const [op, arg] = line.split(' ');
    return {op, arg, executions: 0, steps: []};
}

main();

