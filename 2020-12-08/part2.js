#!/usr/bin/env node

const readlines = require('n-readlines');
const _ = require('lodash');

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

    let terminatedNormally = false, modifiedInstruction = 0, newProgram = [];

    while (!terminatedNormally && modifiedInstruction < stack.length) {
        newProgram = _.cloneDeep(stack);
        // Find the next op to modify
        while (modifiedInstruction < newProgram.length) {
            
            if (newProgram[modifiedInstruction].op === NOP) {
                newProgram[modifiedInstruction].op = JMP; 
                modifiedInstruction++;
                break;
            } else if (newProgram[modifiedInstruction].op === JMP) {
                newProgram[modifiedInstruction].op = NOP; 
                modifiedInstruction++;
                break;
            }
            modifiedInstruction++;
        }

        console.log(newProgram);
        terminatedNormally = execute(newProgram);
        console.log(newProgram);
    }

    console.log(`\n\nAccumulator = ${accumulator} Terminated normally = ${terminatedNormally}`);
}

const execute = (stack) => {
    let stackPointer = 0;
    let step = 0;
    accumulator = 0;

    while (stackPointer < stack.length) {
        const operation = stack[stackPointer];
        if (operation.executions > 0) {
            return false;
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
    }

    return true;
};

const parseLine = (line) => {
    const [op, arg] = line.split(' ');
    return {op, arg, executions: 0, steps: []};
}

main();

