import Client from '../database';

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
    try {

        const conn = await Client.connect();
        const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';

        const result = await conn.query(sql);

        conn.release();

        return result.rows;
    } catch (err) {
        throw new Error(`unable get all products and orders: ${err}`);
    } 
  }
    
// Get all users that have made orders
  async usersWithOrders(): Promise<{user_name: string}[]> {
    try {
      
        const conn = await Client.connect();
        const sql = 'SELECT user_name FROM users INNER JOIN orders ON users.id = orders.user_id';

        const result = await conn.query(sql);

        conn.release();

        return result.rows;
    } catch (err) {
        throw new Error(`unable get users with orders: ${err}`);
    } 
  }

 // get the 5 most expensive products
  async fiveMostExpensive(): Promise<{name: string, price: number}[]> {
    try {
    
      const conn = await Client.connect();
      const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    } 
  }
  //Get Top 5 most popular products
  async topProducts(): Promise<{name: string, category: string, quantities: string}[]> {
    try {

      const conn = await Client.connect();
      
      const sql = 'SELECT name, category, SUM(order_products.quantity) AS quantities FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY products.id ORDER BY quantities DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;

    } catch (err) {
        throw new Error(`unable get top products: ${err}`);
    } 
  }
}
