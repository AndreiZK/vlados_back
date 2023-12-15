import { body } from "express-validator";

export const registerValidator = [
  body("password", "invalid password").isLength({ min: 5 }),
  body("username", "invalid username").isLength({ min: 3 }),
];

export const loginValidator = [
  body("username").isString(),
  body("password").isLength({ min: 5 }),
];

export const productValidator = [
  body("description").isString(),
  body("price").isNumeric(),
  body("image").isString(),
  body("name").isLength({ min: 3 }),
];
