
import bcrypt from 'bcrypt';

import Client from '../database';

const saltRounds = process.env.SALT_ROUNDS as unknown as string;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    password_digest: string;
}

export class UserStore {

    async index(): Promise<User[]> {
        try {
        
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
    
            const result = await conn.query(sql);
    
            conn.release();
            
            return result.rows;

        } catch (err) {
            throw new Error(`unable get users: ${err}`);
        } 
    }
    
    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
        
            const conn = await Client.connect();
    
            const result = await conn.query(sql, [id]);
    
            conn.release();
            
            return result.rows[0];

        } catch (err) {
            throw new Error(`unable show user ${id}: ${err}`);
        }
    }

    
    async create(u: User): Promise<User> {
        try {
        
            const conn = await Client.connect();

            const sql = 'INSERT INTO users (user_name, first_name, last_name, password_digest) VALUES($1,$2,$3,$4) RETURNING *';
    
            const hash = bcrypt.hashSync(u.password_digest + pepper, parseInt(saltRounds));
    
            const result = await conn.query(sql, [u.user_name, u.first_name, u.last_name, hash]);

            const user = result.rows[0];
    
            conn.release();
    
            return user;

        } catch(err) {
            throw new Error(`unable create user (${u}): ${err}`);
        } 
    }

    async update(u: User): Promise<User> {
        
        try {

            const connection = await Client.connect();
            
            const sql =
                'UPDATE users SET user_name=($2),first_name=($3),last_name=($4),password_digest=($5) WHERE id=($1) RETURNING *';
                
            
        
            const result = await connection.query(sql, [ u.id, u.user_name, u.first_name, u.last_name, u.password_digest]);
            
            connection.release();
            
            return result.rows[0];
            
        } catch (error) {
            throw new Error(`Failed to update user with the following error: ${error}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
        
            const result = await conn.query(sql, [id]);
    
            const user = result.rows[0];
    
            conn.release();
    
            return user;

        } catch(err) {
            throw new Error(`unable delete user (${id}): ${err}`);
        }
    }

    async authenticate(
        user_name: string,
        first_name: string,
        last_name: string,
        password_digest: string): Promise<User | null> {
        
        const conn = await Client.connect();

        const sql = 'SELECT * FROM users WHERE user_name=($1) AND first_name=($2) AND last_name=($3)';

        const result = await conn.query(sql, [user_name, first_name, last_name]);

        if(result.rows.length) {

            const user = result.rows[0];
            
            if (bcrypt.compareSync(password_digest + pepper, user.password_digest)) {
                return user;
            }
        }

        return null;
    }
}