describe('pizza.js', () => {
    let pizza, pizza1;

    beforeEach(() => {
        pizza = new Pizza(['ham'], 'small');
        pizza1 = new Pizza(['ham1'], 'incorrect size');
    });


    it('should be sure of writing the variables', () => {
        expect(pizza.size).toBe('small');
        expect(pizza.toppings).toEqual(['ham']);
    });

    describe('pizzaPrice()', () => {
        it('should return correct value of price', () => {
            expect(pizza.pizzaPrice).toBe(0.5);
        });

        it('should return 0 if size incorrect', () => {
            expect(pizza1.pizzaPrice).toBeFalsy();
        });
    });

    describe('toppingsPrice()', () => {
        it('should throw error if toppings is undefined', () => {
            const defaultToppings = toppings;
            toppings = false;
            expect(() => pizza1.toppingsPrice).toThrowError(`Toppings can't find`);
            toppings = defaultToppings;
        });

        it('should throw error if toppings doesn\'t exist topping', () => {
            expect(() => pizza1.toppingsPrice).toThrowError(`Topping ham1 can't find`);
        });
    });
});
