describe('appController.js', () => {
    let appController;

    beforeEach(() => {
       appController = new AppController();
       appController.order.addPizza(new Pizza(['ham'], 'small'));
       appController.order.addPizza(new Pizza(['ham'], 'small'));
    });

    it('should be sure, that class have Order', () => {
        expect(appController.order).toBeDefined();
    });

    it('should be sure, that pizzas stored', async () => {
        const data = [
            {
                "toppings": ["ham", "bacon"],
                "size": "large"
            },
            {
                "toppings": ["corn", "olives"],
                "size": "medium"
            }
        ];

        const jsonData = JSON.stringify(data);

        spyOn(appController, 'pizzas')
            .and.returnValue(
                Promise.resolve(jsonData)
                    .then(res => {
                        expect(res).toEqual(jsonData);
                    })
                    .then(json => {
                        expect(json.json()).toEqual(data);
                    })
            );
    });

    describe('renderOrder()', () => {
        it('should call all render functions', () => {
            const renderPizzasInOrderSpy = spyOn(appController, 'renderPizzasInOrder');
            const renderAddPizzaButtonInOrderSpy = spyOn(appController, 'renderAddPizzaButtonInOrder');
            const renderTotalPriceInOrderSpy = spyOn(appController, 'renderTotalPriceInOrder');

            appController.renderOrder();

            expect(renderPizzasInOrderSpy).toHaveBeenCalled();
            expect(renderAddPizzaButtonInOrderSpy).toHaveBeenCalled();
            expect(renderTotalPriceInOrderSpy).toHaveBeenCalled();
        });
    });

    describe('init()',() => {
        it('should init order', async () => {
            const initSpy = spyOn(appController, 'initOrder')
                .and.returnValue(Promise.resolve());
            const renderOrderSpy = spyOn(appController, 'renderOrder');
            await appController.init();
            expect(initSpy).toHaveBeenCalled();
            expect(renderOrderSpy).toHaveBeenCalled();
        });
    });

    describe('pizzas()',() => {
        let data;

        beforeEach(() => {
            data = [
                {
                    "toppings": ["ham", "bacon"],
                    "size": "large"
                },
                {
                    "toppings": ["corn", "olives"],
                    "size": "medium"
                }
            ];
        });

        it('should modified array of pizzas', async () => {
            const dataSpy = spyOnProperty(appController, 'pizzas')
                .and.returnValue(Promise.resolve(data));
            const addPizzaSpy = spyOn(appController.order, 'addPizza');
            await appController.initOrder();
            expect(dataSpy).toHaveBeenCalled();
            expect(addPizzaSpy).toHaveBeenCalledTimes(data.length);
        });
    });

    describe('removePizza(i)',() => {
        it('should call all functions for remove', () => {
            const removePizzaSpy = spyOn(appController.order, 'removePizza');
            const renderOrderSpy = spyOn(appController, 'renderOrder');
            const replaceFormSpy = spyOn(appController, 'replaceForm');
            const hideFormSpy = spyOn(appController, 'hideForm');

            appController.removePizza(0);

            expect(removePizzaSpy).toHaveBeenCalled();
            expect(renderOrderSpy).toHaveBeenCalled();
            expect(replaceFormSpy).toHaveBeenCalled();
            expect(hideFormSpy).toHaveBeenCalled();
        });
    });

    describe('addPizzaForm()',() => {
        it('should call all functions for add pizza', () => {
            const addPizzaSpy = spyOn(appController.order, 'addPizza');
            const showFormSpy = spyOn(appController, 'showForm');
            const handleSpy = spyOn(appController, 'handleForm');
            const renderOrderSpy = spyOn(appController, 'renderOrder');

            appController.addPizzaForm();

            expect(addPizzaSpy).toHaveBeenCalled();
            expect(showFormSpy).toHaveBeenCalled();
            expect(handleSpy).toHaveBeenCalled();
            expect(renderOrderSpy).toHaveBeenCalled();
        });
    });

    describe('handleForm(i)',() => {
        it('should call all functions for handle form', () => {
            const replaceFormSpy = spyOn(appController, 'replaceForm');
            const resetFormElementsSpy = spyOn(appController, 'resetFormElements');
            const setFormElementsSpy = spyOn(appController, 'setFormElements');
            const setFormChangeHandlersSpy = spyOn(appController, 'setFormChangeHandlers');
            const showFormSpy = spyOn(appController, 'showForm');

            appController.handleForm(0);

            expect(replaceFormSpy).toHaveBeenCalled();
            expect(resetFormElementsSpy).toHaveBeenCalled();
            expect(setFormElementsSpy).toHaveBeenCalled();
            expect(setFormChangeHandlersSpy).toHaveBeenCalled();
            expect(showFormSpy).toHaveBeenCalled();
        });
    });

    describe('renderPizzasInOrder()',() => {
        let orderElem, formElem;

        beforeEach(() => {
           orderElem = document.createElement('div');
           formElem = document.createElement('form');
           formElem.classList.add('pizza-editor');
           orderElem.classList.add('order');
           document.body.appendChild(formElem);
           document.body.appendChild(orderElem);
        });

        afterEach(() => {
           orderElem.parentNode.removeChild(orderElem);
        });

        it('should render pizza-card', () => {
            appController.renderPizzasInOrder();

            const pizza = document.querySelectorAll('.order .pizza')[0];
            const size = pizza.querySelector('.size').textContent;
            const toppings = document.querySelector('.toppings').textContent;
            const price = document.querySelector('.price').textContent;

            expect(size).toBe('small');
            expect(toppings).toBe('ham');
            expect(price).toBe('0.5$');
        });

        it('should render no-pizza card when no pizza in order', () => {
            const appController2 = new AppController();
            appController2.renderPizzasInOrder();

            const noPizzaCard = document.querySelectorAll('.order .is-size-3');

            expect(noPizzaCard).toBeDefined();
        });

        it('should render empty fields if pizza dont have them', () => {
            const appController3 = new AppController();
            appController3.order.pizzas.push({
                size: null,
                toppings: null,
                price: null
            });

            appController3.renderPizzasInOrder();

            const pizza = document.querySelectorAll('.order .pizza')[0];
            const size = pizza.querySelector('.size').textContent;
            const toppings = document.querySelector('.toppings').textContent;
            const price = document.querySelector('.price').textContent;

            expect(size).toBe('');
            expect(toppings).toBe('');
            expect(price).toBe('$');
        });

        describe('hideForm()', () => {
            it('should hide form if pizza dont selected', () => {
                appController.renderPizzasInOrder();
                appController.hideForm();

                const form = document.querySelector('.pizza-editor');

                expect(form.style.display).toBe('none');
            });
        });

        describe('showForm()', () => {
            it('should show form if pizza selected', () => {
                appController.renderPizzasInOrder();
                appController.showForm();

                const form = document.querySelector('.pizza-editor');

                expect(form.style.display).toBe('block');
            });
        });

        describe('replaceForm()', () => {
            it('should replace form after reselect pizza', () => {
                appController.renderPizzasInOrder();
                appController.showForm();
                const form = document.querySelector('.pizza-editor');

                appController.replaceForm();

                const form1 = document.querySelector('.pizza-editor');

                expect(form).not.toBe(form1);
            });
        });

        describe('renderTotalPriceInOrder()', () => {
            it('should render total price', () => {
                window.appController = new AppController();
                window.appController.order.addPizza(new Pizza(['ham'], 'small'));
                window.appController.order.addPizza(new Pizza(['ham'], 'small'));
                window.appController.renderTotalPriceInOrder();

                const totalPrice = document.querySelector('.is-size-2').textContent;
                expect(totalPrice).toBe('Total Price: 1$');
            });
        });
    });
});
