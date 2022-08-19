import { factory, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const db = factory({
  events: {
    id: primaryKey(() => faker.datatype.uuid()),
    title: () => faker.music.songName(),
    date: () => faker.date.future(),
    description: () => faker.commerce.productDescription(),
    image: () => faker.image.image(),
    category: () => faker.helpers.arrayElement(["sport", "culture", "health"]),
    phoneNumber: () => faker.phone.number(),
    email: () => faker.internet.email(),
    place: () => faker.address.city(),
  },
});
