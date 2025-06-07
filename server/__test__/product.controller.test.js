import { describe, expect, it, jest } from "@jest/globals";

beforeEach(() => {
  jest.clearAllMocks;
});

jest.unstable_mockModule("../models/Product.js", () => ({
  default: {
    find: jest.fn(),
    findOne: jest.fn(),
  },
}));

const productController = await import("../controllers/productController.js");
const Product = (await import("../models/product.js")).default;

describe("getAll Products", () => {
  it("should return all products", async () => {
    const mockProducts = [
      {
        _id: "1",
        codigo: "P001",
        nombre: "Producto 1",
        descripcion: "Descripcion del producto 1",
        precio: 100,
        stock: 50,
        marca: "Marca A",
        categoria: "Categoria X",
        estado: "Nuevo",
        color: "Rojo",
        imagen: "http://example.com/image1.jpg",
      },
    ];
    Product.find.mockResolvedValue(mockProducts);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  it("should return an error with status 500", async () => {
    Product.find.mockRejectedValue(new Error("Database error"));
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await productController.getProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error al obtener los productos",
    });
  });
});

describe("update Product", () => {
  it("should modify a product", async () => {
    const mockReqProducts = {
      params: { codigo: "P001" },
      body: {
        _id: "1",
        nombre: "Producto 1",
        descripcion: "Descripcion del producto 1",
        precio: 100,
        stock: 50,
        marca: "Marca A",
        categoria: "Categoria X",
        estado: "Nuevo",
        color: "Rojo",
      },
    };
    const mockProduct = {
      _id: "1",
      codigo: "P001",
      nombre: "Producto 1",
      descripcion: "Descripcion del producto 1",
      precio: 100,
      stock: 50,
      marca: "Marca A",
      categoria: "Categoria X",
      estado: "Nuevo",
      color: "Azul",
      imagen: "http://example.com/image1.jpg",
    };

    const mockProdcutFinal = {
      _id: "1",
      codigo: "P001",
      nombre: "Producto 1",
      descripcion: "Descripcion del producto 1",
      precio: 100,
      stock: 50,
      marca: "Marca A",
      categoria: "Categoria X",
      estado: "Nuevo",
      color: "Rojo",
      imagen: "http://example.com/image1.jpg",
    };

    const mockInstance = { save: jest.fn() };

    Product.findOne
      .mockReturnValue({ push: jest.fn().mockResolvedValue(mockProduct) })
      .mockResolvedValueOnce(mockInstance);

    const req = mockReqProducts;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(mockProdcutFinal);
  });

  it("should return an error with status 500", async () => {
    const mockReqProducts = {
      params: { codigo: "P001" },
      body: {
        _id: "1",
        nombre: "Producto 1",
        descripcion: "Descripcion del producto 1",
        precio: 100,
        stock: 50,
        marca: "Marca A",
        categoria: "Categoria X",
        estado: "Nuevo",
        color: "Rojo",
      },
    };

    Product.findOne.mockRejectedValue(new Error("Database error"));

    const req = mockReqProducts;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error al actualizar el producto",
    });
  });
});
