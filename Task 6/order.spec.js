describe('order.js', () => {
    let order;

    beforeEach(() => {
       spyOn(console, 'error');
       order = new Order();
       order.addPizza(new Pizza(['ham'], 'small2'));
       order.addPizza(new Pizza(['pineapple'], 'small'));
    });

    it('should be sure that class have an array', () => {
        expect(typeof order.pizzas).toBeTruthy();
    });

    describe('totalPrice()', () => {
        it('should return correct total price', () => {
            expect(order.totalPrice).toBe(0.5);
        });

        it('should throw error to console if size of some pizzas is incorrect', () => {
            order.pizzas[0].pizzaPrice;
            expect(console.error).toHaveBeenCalled();
        });

        it('should throw error to console if size is undefined', () => {
            order.pizzas.push({ pizzaPrice: null });
            order.totalPrice;
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('removePizza(index)', () => {
        it('should correct delete pizza from array', () => {
            const order1 = new Order();
            order1.addPizza(new Pizza(['ham'], 'small2'));
            order1.addPizza(new Pizza(['pineapple'], 'small'));
            order1.removePizza(0);
            expect(order1.pizzas.length).toBe(1);
        });
    });
});
