import { User } from "../../src/users/user.entity";
import {faker} from '@faker-js/faker';

export const completeUser: Partial<User> = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
}

export const missingFirstNameUser: Partial<User> = {
    // firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
}

export const missingLastNameUser: Partial<User> = {
    firstName: faker.person.firstName(),
    // lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
}

export const missingEmailUser: Partial<User> = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    // email: faker.internet.email(),
    password: faker.internet.password(),
}