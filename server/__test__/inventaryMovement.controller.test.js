import { describe, expect, jest } from "@jest/globals";
import { populate } from "dotenv";

beforeEach(() => {
  jest.clearAllMocks;
});

jest.unstable_mockModule("../models/inventoryMovement.js", () => ({
  default: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    populate: jest.fn(),
  },
}));

const inventoryMovementController = await import(
  "../controllers/inventoryMovementController.js"
);
const InventoryMovement = (await import("../models/inventoryMovement.js"))
  .default;

describe("getInventoryMovements", () => {
  it("should return all inventory movements", async () => {
    const mockMovements = [
      {
        _id: "1",
        codigoTRX: "TRX001",
        fecha: "2023-10-01",
        tipoMovimiento: "Venta",
        producto: "64b0c3f1e1d3e9a5f0e12345",
        cantidad: 10,
        descripcion: "Entrada de producto",
        usuario: "64b0c3f1e1d3e9a5f0e67890",
      },
    ];

    const mockPopulate = jest.fn().mockReturnThis();

    InventoryMovement.find.mockReturnValue({
      populate: mockPopulate,
      exec: jest.fn().mockResolvedValue([mockMovements]),
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await inventoryMovementController.getInventoryMovements(req, res);

    expect(mockPopulate).toHaveBeenCalledTimes(2);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return an error with status 500", async () => {
    const mockSecondPopulate = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));

    const mockFirstPopulate = jest.fn().mockReturnValue({
      populate: mockSecondPopulate,
    });

    InventoryMovement.find.mockReturnValue({ populate: mockFirstPopulate });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await inventoryMovementController.getInventoryMovements(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error al obtener los movimientos de inventario",
    });
  });
});
