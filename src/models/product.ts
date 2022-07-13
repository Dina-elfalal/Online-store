import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    description: string;
    price: number | string;
    category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
        
      const conn = await Client.connect();

      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;

    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }
  
  async show(id: number): Promise<Product> {
    try {
        
      const sql = 'SELECT * FROM products WHERE id=($1)';
      
      const conn = await Client.connect();
  
      const result = await conn.query(sql, [id]);
  
      conn.release();
  
      return result.rows[0];

    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  
  async create(p: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (name,description,price,category) VALUES($1, $2, $3, $4) RETURNING *';
  
      const conn = await Client.connect();
  
      const result = await conn.query(sql, [p.name, p.description, p.price, p.category]);
  
      const product = result.rows[0];
  
      conn.release();
  
      return product;

    } catch (err) {
      throw new Error(`Could not add new product ${p}. Error: ${err}`);
    }
  }


  async update(p: Product): Promise<Product> {
        
    try {

        const connection = await Client.connect();
        
        const sql =
            'UPDATE products SET name=($2),description=($3),price=($4),category=($5) WHERE id=($1) RETURNING *';
    
        const result = await connection.query(sql, [ p.id, p.name, p.description, p.price, p.category]);
        
        connection.release();
        
        return result.rows[0];
        
    } catch (error) {
        throw new Error(`Failed to update product with the following error: ${error}`);
    }
}
  
  async showCategory(c: string): Promise<{name: string, price: number | string}[]> {
    try {
      const sql = 'SELECT name, price FROM products WHERE category=($1)';
      
      const conn = await Client.connect();
  
      const result = await conn.query(sql, [c]);
  
      conn.release();
  
      return result.rows;

    } catch (err) {
      throw new Error(`Could not find product category ${c}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
  
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
    

    

