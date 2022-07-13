import { Order, OrderStore } from '../../models/order';



describe("Order Model", () => {
    
    const store = new OrderStore();
    const orderTest: Order = {
        status: 'active',
        user_id: '1'
    }
    
    let order: Order;

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a show add Product method', () => {
        expect(store.addProduct).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have completedOrders method', () => {
        expect(store.completedOrders).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        order = await store.create(orderTest);
        expect(order).toEqual({id: order.id  ,...orderTest});
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toContain(order);
    });

    it('show method should return the correct order', async () => {
        const result = await store.show(order.id as number);
        expect(result).toEqual(order);
    });
    
    it('update method should update order', async () => {
        const result = await store.update({
            id: order.id,
            status: 'complete',
            user_id: '1'
        });
        expect(result).toEqual({id: order.id  , status: 'complete', user_id: '1'});
    });

    it('Completed Orders method should return a list of Completed orders', async () => {
        const result = await store.completedOrders(1);
        expect(result).toContain({ id: order.id as number, status:'complete'});
    });

    it('delete method should delete order by id', async () => {
        await store.delete(order.id as number);
        const result = await store.index();
        expect(result.includes(orderTest)).toBeFalse();
    });
});


