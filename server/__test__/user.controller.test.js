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
});
