import { describe, expect, jest } from "@jest/globals";

beforeEach(() => {
  jest.clearAllMocks;
});

jest.unstable_mockModule("../models/User.js", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

const userController = await import("../controllers/userController.js");
const User = (await import("../models/User.js")).default;

describe("Get All Users", () => {
  it("should return all users", async () => {
    const mockUsers = [
      {
        _id: "1",
        firstName: "Luis",
        lastName: "Lozano",
        idNumber: "124578",
        email: "l.l@gmail.com",
        role: "empleado",
        password: "Poa1452*",
        state: "activo",
        deleteAt: null,
      },
    ];
    User.find.mockResolvedValue(mockUsers);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getAll(req, res);

    expect(User.find).toHaveBeenCalledWith({ deleteAt: null });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it("should return an error with status 500", async () => {
    User.find.mockRejectedValue(new Error("Database error"));
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error getting users: Database error",
      ok: false,
    });
  });
});

describe("Create User", () => {
  it("should create a new user and return status 200", async () => {

    const mockUserReq = {
      body: {
        firstName: "Luis",
        lastName: "Lozano",
        idNumber: "124578",
        email: "l.l@gmail.com",
        role: "empleado",
        password: "Poa1452*",
        state: "activo",
      },
    };

    const mockResponse = {message:'Usuario creado'};

    User.create.mockResolvedValue(mockResponse);

    const req = mockUserReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ok:true,message:'Usuario creado'});

  });

  it("should return error and status 500", async () => {

    const mockUserReq = {
      body: {
        firstName: "Luis",
        lastName: "Lozano",
        idNumber: "124578",
        email: "l.l@gmail.com",
        role: "empleado",
        password: "Poa1452*",
        state: "activo",
      },
    };

  

    User.create.mockRejectedValue(new Error("Database error"));

    const req = mockUserReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({"message": "Database error", "ok": false});

  });
});
