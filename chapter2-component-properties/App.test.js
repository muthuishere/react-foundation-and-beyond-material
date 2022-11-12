import {getStarStylesFor, starStyles} from './App';

describe('App Tests', function () {

    test('1 + 1 equals 2', () => {

        const result = 1 + 1;
        expect(result).toBe(2);
        expect(result).toEqual(2);
    });

    test('Equality checks with ToBe', () => {

        expect(1 + 1).toBe(2);
        expect([1,2]).toBe([1,2]); // uses strict equal  ===
        expect({"a":1,"b":2}).toBe({"a":1,"b":2}); // uses strict equal  ===


    });
    test('Equality checks with toEqual', () => {

        expect(1 + 1).toEqual(2);
        expect([1,2]).toEqual([1,2]);
        expect({"a":1,"b":2}).toEqual({"a":1,"b":2});
    });

    test('getStarStylesFor should work correctly', () => {

        const stars = getStarStylesFor(4.5);
        expect(stars).toEqual([
            starStyles.fullStar,
            starStyles.fullStar,
            starStyles.fullStar,
            starStyles.fullStar,
            starStyles.halfStar
        ]);


        const stars2 = getStarStylesFor(2.0);
        expect(stars2).toEqual([
            starStyles.fullStar,
            starStyles.fullStar,
            starStyles.noStar,
            starStyles.noStar,
            starStyles.noStar
        ]);
    });

});
