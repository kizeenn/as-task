import { db } from "./db";

db.events.create();
db.events.create();

export const handlers = [...db.events.toHandlers("rest", "https://api.server.test")];
