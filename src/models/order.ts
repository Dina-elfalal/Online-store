import Client from '../database';

export type Order = {
    id?: number;
    status: 'active' | 'complete';
    user_id: number | string;
}

export class OrderStore {

    async index(): Promise<Order[]> {
        try {
            
          const conn = await Client.connect();
    
          const sql = 'SELECT * FROM orders';
    
          const result = await conn.query(sql);
    
          conn.release();
    
          return result.rows;
    
        } catch (err) {
          throw new Error(`Could not get orders. Error: ${err}`);
        }
      }
      
      async show(id: number): Promise<Order> {
        try {
            
          const sql = 'SELECT * FROM orders WHERE id=($1)';
          
          const conn = await Client.connect();
      
          const result = await conn.query(sql, [id]);
      
          conn.release();
      
          return result.rows[0];
    
        } catch (err) {
          throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
      }
      
      async create(o: Order): Promise<Order> {
        try {
          const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      
          const conn = await Client.connect();
      
          const result = await conn.query(sql, [o.status, o.user_id]);
      
          const order = result.rows[0];
      
          conn.release();
      
          return order;
    
        } catch (err) {
          throw new Error(`Could not add new order ${o}. Error: ${err}`);
        }
      }
    
    
      async update(o: Order): Promise<Order> {
            
        try {
    
            const connection = await Client.connect();
            
            const sql =
                'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';
        
            const result = await connection.query(sql, [ o.id, o.status]);
            
            connection.release();
            
            return result.rows[0];
            
        } catch (error) {
            throw new Error(`Failed to update order with the following error: ${error}`);
        }
    }


    async addProduct(quantity: number, order_id: number, product_id: number): Promise<{}> {
        
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
        
            const conn = await Client.connect();
    
            const result = await conn.query(ordersql, [order_id]);
    
            const order = result.rows[0];
    
            if (order.status === 'complete') {
                throw new Error(`Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`);
            }
    
            conn.release();
            
        } catch (err) {
            throw new Error(`${err}`);
        }
    
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

            const conn = await Client.connect();
    
            const result = await conn.query(sql, [quantity, order_id, product_id]);
    
            const order = result.rows[0];
    
            conn.release();
    
            return order;
        } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
        }
    }

  async completedOrders(user_id: number): Promise<{id: number, status: string}[]> {
      try {
          
        const conn = await Client.connect();
  
        const sql = "SELECT id,status FROM orders WHERE status='complete' AND user_id=($1)";
  
        const result = await conn.query(sql,[user_id]);
  
        conn.release();
  
        return result.rows;
  
      } catch (err) {
        throw new Error(`Could not get orders. Error: ${err}`);
      }
    }

  async delete(id: number): Promise<Order> {
        try {
          const sql = "DELETE FROM orders WHERE id=($1) AND status='complete'";
      
          const conn = await Client.connect();
    
          const result = await conn.query(sql, [id]);
    
          const order = result.rows[0];
    
          conn.release();
        
        } catch (err) {
          throw new Error(`Could not delete order ${id} because it active or not found. Error: ${err}`);
        }
    
        try {
          const ordersql = 'DELETE FROM order_products WHERE order_id=($1) RETURNING *';
      
          const conn = await Client.connect();

          const result = await conn.query(ordersql, [id]);

          const deletedOrder = result.rows[0];
          
          conn.release();

          return deletedOrder;

        } catch (err) {
          throw new Error(`${err}`);
        }
  }
}