import { Id, split, listToDirection } from '../../../src/util';

describe('util functions', () => {
  describe('Id', () => {
    it('sequentially generates id starting with 0', () => {
      const results = [...Array(5)].map(() => Id());

      expect(results).to.deep.eq([0,1,2,3,4]);
    });
  });

  describe('split', () => {
    it('splits space-separated string into array', () => {
      const value = 'taco pizza sushi'
      const result = split(value);

      expect(result).to.deep.eq(['taco', 'pizza', 'sushi']);
    });

    it('splits tab-separated string into array', () => {
      const value = 'taco\tpizza\tsushi'
      const result = split(value);

      expect(result).to.deep.eq(['taco', 'pizza', 'sushi']);
    });

    it('removes empty string items', () => {
      const value = 'taco \n \n \n'
      const result = split(value);

      expect(result).to.deep.eq(['taco']);
    });

    it('returns empty array when not a string value', () => {
      const values = [
        123,
        undefined,
        null,
        {},
        [],
      ]

      values.forEach((value) => {
        const result = split(value);

        expect(result).to.deep.eq([]);
      });
    });
  });

  describe('listToDirection', () => {
    describe('when value is array', () => {
      it('returns object with x and y keys representing position', () => {
        const scenarios = [
          { value: ['top', 'left'], result: { x: 'left', y: 'top'}},
          { value: ['top', 'center'], result: { x: 'center', y: 'top'}},
          { value: ['top', 'right'], result: { x: 'right', y: 'top'}},
          { value: ['bottom', 'left'], result: { x: 'left', y: 'bottom'}},
          { value: ['bottom', 'center'], result: { x: 'center', y: 'bottom'}},
          { value: ['bottom', 'right'], result: { x: 'right', y: 'bottom'}},
        ];

        scenarios.forEach((scenario) => {
          const result = listToDirection(scenario.value);

          expect(result).to.deep.eq(scenario.result);
        });
      });
    });

    describe('when value is string', () => {
      it('returns object with x and y keys representing position', () => {
        const scenarios = [
          { value: 'top left', result: { x: 'left', y: 'top'}},
          { value: 'top center', result: { x: 'center', y: 'top'}},
          { value: 'top right', result: { x: 'right', y: 'top'}},
          { value: 'bottom left', result: { x: 'left', y: 'bottom'}},
          { value: 'bottom center', result: { x: 'center', y: 'bottom'}},
          { value: 'bottom right', result: { x: 'right', y: 'bottom'}},
        ];

        scenarios.forEach((scenario) => {
          const result = listToDirection(scenario.value);

          expect(result).to.deep.eq(scenario.result);
        });
      });
    });

    describe('when position is invalid', () => {
      // TODO: may need to handle invalid cases better
      it('returns null for the respective x or y key', () => {
        const scenarios = [
          { value: 'top pizza', result: { x: null, y: 'top' }},
          { value: 'pizza right', result: { x: 'right', y: null }},
          { value: 'taco pizza', result: { x: null, y: null }},
        ];

        scenarios.forEach((scenario) => {
          const result = listToDirection(scenario.value);

          expect(result).to.deep.eq(scenario.result);
        });
      });
    });
  });
});
