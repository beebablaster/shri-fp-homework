/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import {__, allPass, gte, length, lte, match, pipe} from 'ramda';
import Api from '../tools/api';

const api = new Api();

const isLengthGt2 = pipe(length, gte(__, 3));
const isLengthLt10 = pipe(length, lte(__, 9));
const isPositive = (str) => parseFloat(str) > 0;
const isNumber = match(/^\d*\.?\d*$/);

const validate = allPass([isLengthGt2, isLengthLt10, isPositive, pipe(isNumber, Boolean)]);

const round = (num) => Math.round(num);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    writeLog(value);

    if (!validate(value)) {
        handleError('ValidationError');
        return;
    }

    const number = parseFloat(value);
    const rounded = round(number);
    writeLog(String(rounded));

    api.get('https://api.tech/numbers/base', { number: String(rounded), from: 10, to: 2 })
        .then(({ result }) => {
            writeLog(result);
            const len = result.length;
            writeLog(String(len));
            const squared = Math.pow(len, 2);
            writeLog(String(squared));
            const mod3 = squared % 3;
            writeLog(String(mod3));
            return api.get(`https://animals.tech/${mod3}`)({});
        })
        .then(({ result }) => {
            handleSuccess(result);
        })
        .catch(handleError);
};

export default processSequence;
