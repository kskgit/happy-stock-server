import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
import { Hono } from 'hono';

async function main() {
    const user: typeof usersTable.$inferInsert = {
        name: 'John',
        age: 30,
        email: 'john@example.com',
    };

    await db.insert(usersTable).values(user);
    console.log('New user created!')

    const users = await db.select().from(usersTable);
    console.log('Getting all users from the database: ', users)
    /*
    const users: {
      id: number;
      name: string;
      age: number;
      email: string;
    }[]
    */

    await db
        .update(usersTable)
        .set({
            age: 31,
        })
        .where(eq(usersTable.email, user.email));
    console.log('User info updated!')

    await db.delete(usersTable).where(eq(usersTable.email, user.email));
    console.log('User deleted!')
}

main();

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();
const db = drizzle(process.env.DATABASE_URL!);

app.post("/users", async (c) => {
    const params = await c.req.json<typeof usersTable.$inferSelect>();

    const result = await db.insert(usersTable).values(params);
    return c.json(result);
});

export default app;