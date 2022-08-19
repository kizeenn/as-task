export interface Event {
  title: string;
  date: Date;
  description: string;
  image: string;
  category: "sport" | "culture" | "health";
  phoneNumber: string;
  email: string;
  place: string;
  id: string;
}

export async function getEvents(): Promise<Event[]> {
  const response = await fetch("https://api.server.test/events");
  return response.json();
}

export async function getEvent(id: string): Promise<Event> {
  const response = await fetch(`https://api.server.test/events/${id}`);
  return response.json();
}

export async function createEvent(event: Event): Promise<Event> {
  const response = await fetch("https://api.server.test/events", {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
}
