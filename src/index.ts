import { drizzle } from 'drizzle-orm/d1';
import { usersTable } from './db/schema';
import { Hono } from 'hono';
import { name } from 'drizzle-orm';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();


app.get("/users", async (c) => {
    const result = { name: "test" };
    return c.json(result);
});

app.post("/users", async (c) => {
    const db = drizzle(c.env.DB);
    const params = await c.req.json<typeof usersTable.$inferSelect>();

    const result = await db.insert(usersTable).values(params);
    return c.json(result);
});

app.post("/users", async (c) => {
    const db = drizzle(c.env.DB);
    const params = await c.req.json<typeof usersTable.$inferSelect>();

    const result = await db.insert(usersTable).values(params);
    return c.json(result);
});

export default app;