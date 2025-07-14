/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {__, allPass, equals, filter, gte, length, pipe, propEq, values} from 'ramda';

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }

    return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => pipe(
    values,
    filter(equals('green')),
    length,
    gte(__, 2)
)(shapes);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
    const colors = values(shapes);
    return colors.filter(equals('red')).length === colors.filter(equals('blue')).length;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    propEq('circle', 'blue'),
    propEq('star', 'red'),
    propEq('square', 'orange'),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
    const colors = values(shapes).filter(color => color !== 'white');
    return ['red', 'green', 'blue', 'orange'].some(color => colors.filter(c => c === color).length >= 3);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
    const colors = values(shapes);
    const greenCount = colors.filter(equals('green')).length;
    const redCount = colors.filter(equals('red')).length;
    return greenCount === 2 && redCount === 1 && shapes.triangle === 'green';
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allPass([
    propEq('circle', 'orange'),
    propEq('star', 'orange'),
    propEq('square', 'orange'),
    propEq('triangle', 'orange'),
]);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({star}) => star !== 'red' && star !== 'white';

// 9. Все фигуры зеленые.
export const validateFieldN9 = allPass([
    propEq('circle', 'green'),
    propEq('star', 'green'),
    propEq('square', 'green'),
    propEq('triangle', 'green'),
]);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({triangle, square}) => triangle === square && triangle !== 'white';
