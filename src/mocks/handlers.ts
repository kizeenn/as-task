import { rest } from "msw";

export interface Event {
  title: string;
  date: Date;
  description: string;
  image: string;
  category: "sport" | "culture" | "health";
  phoneNumber: number;
  email: string;
  place: string;
  id: string;
}

export interface DB {
  events: Event[];
}

const db: DB = {
  events: [
    {
      title: "New Year's Day",
      date: new Date(2023, 1, 1, 0, 0, 0),
      description:
        "New Year's Day is a festival observed in most of the world on 1 January, the first day of the year in the modern Gregorian calendar.",
      image:
        "https://images.unsplash.com/photo-1546271876-af6caec5fae5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
      category: "culture",
      phoneNumber: 123456789,
      email: "xyz@example.com",
      place: "worldwide",
      id: crypto.randomUUID(),
    },
    {
      title: "UEFA Champions League Final",
      date: new Date(2023, 6, 10, 21, 0, 0),
      description:
        "The grand final 68th season of Europe's elite club competition, the 31st since it was renamed the UEFA Champions League, begins on 21 June 2022 and runs to 10 June 2023.",
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "sport",
      phoneNumber: 123456789,
      email: "xyz@example.com",
      place: "Atatürk Olympic Stadium, Istanbul",
      id: crypto.randomUUID(),
    },
  ],
};

export const handlers = [
  rest.get("/api/events", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ events: db.events }));
  }),
];
