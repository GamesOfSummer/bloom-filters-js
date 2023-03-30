import {
    consoleBuffer,
    consoleEnd,
    consoleStart,
    validateFxn,
} from './helpers.js';

// import 'xxhashjs';

import * as XXH from 'xxhashjs';

const h1 = (string) =>
    Math.abs(XXH.h32(0xabcd).update(string).digest().toNumber() % 100);
const h2 = (string) =>
    Math.abs(XXH.h32(0x1234).update(string).digest().toNumber() % 100);
const h3 = (string) =>
    Math.abs(XXH.h32(0x6789).update(string).digest().toNumber() % 100);

class BloomFilter {
    _array: number[];

    constructor() {
        this._array = new Array(100).fill(0);
    }
    add(string) {
        this._array[h1(string)] = 1;
        this._array[h2(string)] = 1;
        this._array[h3(string)] = 1;
    }
    contains(string) {
        return !!(
            this._array[h1(string)] &&
            this._array[h2(string)] &&
            this._array[h3(string)]
        );
    }
}

consoleStart();

let bf = new BloomFilter();
bf.add('Brian');
validateFxn(bf.contains('Brian'), true);
validateFxn(bf.contains('David'), false);

bf.add('David');
validateFxn(bf.contains('Brian'), true);
validateFxn(bf.contains('David'), true);

consoleEnd();
consoleBuffer();

export {};
