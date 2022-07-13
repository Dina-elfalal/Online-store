import { Product, ProductStore } from '../../models/product';


describe("Product Model", () => {

    const store = new ProductStore();

    const productTest: Product = {
        name: 'Hershman HD LED TV 24 inch',
        description: 'These items are shipped from and sold by different sellers',
        price: '250.00',
        category: 'TV'
    }
    let product: Product;

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a show category method', () => {
        expect(store.showCategory).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        product = await store.create(productTest);
        expect(product).toEqual({id: product.id,...productTest});
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toContain({id: product.id,...productTest});
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(product.id as number);
        expect(result).toEqual(product);
    });
    
    it('show category method should return products by category', async () => {
        const result = await store.showCategory(`${product.category as string}`);
        expect(result).toContain({name: product.name, price: productTest.price});
    });

    it('update method should update product', async () => {
        const result = await store.update({...product, category:'Mobile'});
        expect(result).toEqual({...product, category:'Mobile'});
    });

    it('delete method should delete product by id', async () => {
        await store.delete(product.id as number );
        const result = await store.index();
        expect(result.includes(product)).toBeFalse();
    });
});