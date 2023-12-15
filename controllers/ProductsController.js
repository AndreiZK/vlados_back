import { validationResult } from "express-validator";

import { Product } from "../db/models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    console.log(products);
    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "failed to get products",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: "failed to add product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;

    console.log(product);

    Product.update(product, { where: { id: id } })
      .then((result) => {
        // if (numUpdated === 0) {
        //   return res.status(404).send({ message: "Product not found" });
        // }
        return res.json(result);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ message: error.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed to add product",
    });
  }
};
