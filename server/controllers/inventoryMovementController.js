import InventoryMovement from "../models/inventoryMovement.js";
import Product from "../models/product.js";

//Obtener todos los movimientos de inventario
export const getInventoryMovements = async (req, res) => {
  try {
    const inventoryMovements = await InventoryMovement.find()
      .populate("producto")
      .populate("usuario");
    if (inventoryMovements.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron movimientos de inventario" });
    }
    return res.status(200).json(inventoryMovements);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los movimientos de inventario" });
  }
};

//Obtener un movimiento de inventario por el documento de transaccion
export const getInventoryMovementById = async (req, res) => {
  try {
    const { documentoTransaccion } = req.params;
    const inventoryMovement = await InventoryMovement.findOne({
      documentoTransaccion,
    }).populate("productos.producto");
    if (!inventoryMovement) {
      return res
        .status(404)
        .json({ error: "No se encontró el movimiento de inventario" });
    }
    return res.status(200).json(inventoryMovement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener el movimiento de inventario" });
  }
};

//Crear un nuevo movimiento de inventario
export const createInventoryMovement = async (req, res) => {
  try {
    console.log(req.user);
    const {
      codigoTRX,
      fecha,
      tipoMovimiento,
      producto,
      cantidad,
      descripcion,
    } = req.body;
    const usuario = req.user.id;

    if (
      !codigoTRX ||
      !fecha ||
      !tipoMovimiento ||
      !producto ||
      !descripcion ||
      !cantidad ||
      !usuario
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const existingInventoryMovement = await InventoryMovement.findOne({
      codigoTRX,
    });
    if (existingInventoryMovement) {
      return res
        .status(400)
        .json({
          error: "Ya existe un movimiento de inventario con este codigo",
        });
    }

    //Actualizar el stock del producto

    const product = await Product.findOne({ _id: producto });

    if (!product) {
      throw new Error(`No se encontró el producto con código ${producto}`);
    }

    if (tipoMovimiento === "Ingreso Inventario") {
      product.stock += cantidad;
    } else if (
      tipoMovimiento === "Venta" ||
      tipoMovimiento === "Salida Producto Dañado"
    ) {
      if (product.stock < cantidad) {
        throw new Error(
          `No hay suficiente stock del producto ${product.nombre}`
        );
      }
      product.stock -= cantidad;
    }

    await product.save();

    const inventoryMovement = InventoryMovement.create({
      codigoTRX,
      fecha,
      tipoMovimiento,
      producto,
      cantidad,
      descripcion,
      usuario,
    });
    await inventoryMovement.save();
    return res.status(201).json(inventoryMovement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al crear el movimiento de inventario" });
  }
};

//Actualizar un movimiento de inventario por el documento de transaccion
export const updateInventoryMovement = async (req, res) => {
  try {
    const { documentoTransaccion } = req.params;
    const { fecha, tipoMovimiento, productos, descripcion, usuario } = req.body;

    if (
      !documentoTransaccion ||
      !fecha ||
      !tipoMovimiento ||
      !productos ||
      !descripcion ||
      !usuario
    ) {
      return res
        .status(400)
        .json({
          error: "Todos los campos son obligatorios para la actualizacion",
        });
    }

    const inventoryMovement = await InventoryMovement.findOne({
      documentoTransaccion,
    });
    if (!inventoryMovement) {
      return res
        .status(404)
        .json({ error: "No se encontró el movimiento de inventario" });
    }

    const tipo = tipoMovimiento.toLowerCase();

    if (tipo !== "entrada" && tipo !== "salida") {
      return res
        .status(400)
        .json({ error: 'El tipo de movimiento debe ser "entrada" o "salida"' });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
      return res
        .status(400)
        .json({ error: "Debe incluir al menos un producto en el movimiento" });
    }

    // Revertir efectos a los productos del movimiento anterior
    await Promise.all(
      inventoryMovement.productos.map(async (item) => {
        const product = await Product.findOne({ codigo: item.codigo });
        if (product) {
          if (inventoryMovement.tipoMovimiento === "entrada") {
            product.stock -= item.cantidad;
          } else if (inventoryMovement.tipoMovimiento === "salida") {
            product.stock += item.cantidad;
          }
          await product.save();
        }
      })
    );

    // Aplicar cambio a los productos del nuevo movimiento
    await Promise.all(
      productos.map(async (item) => {
        if (!item.codigo || typeof item.cantidad !== "number") {
          throw new Error(
            "Cada producto debe incluir código y cantidad válidos"
          );
        }

        const product = await Product.findOne({ codigo: item.codigo });
        if (!product) {
          throw new Error(
            `No se encontró el producto con código ${item.codigo}`
          );
        }

        if (tipo === "entrada") {
          product.stock += item.cantidad;
        } else if (tipo === "salida") {
          if (product.stock < item.cantidad) {
            throw new Error(
              `No hay suficiente stock del producto ${product.nombre}`
            );
          }
          product.stock -= item.cantidad;
        }

        await product.save();
      })
    );

    inventoryMovement.documentoTransaccion = documentoTransaccion;
    inventoryMovement.fecha = fecha;
    inventoryMovement.tipoMovimiento = tipo;
    inventoryMovement.productos = productos;
    inventoryMovement.descripcion = descripcion;
    inventoryMovement.usuario = usuario;

    await inventoryMovement.save();
    return res.status(200).json(inventoryMovement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar el movimiento de inventario" });
  }
};

//Eliminar un movimiento de inventario por el documento de transaccion
export const deleteInventoryMovement = async (req, res) => {
  try {
    const { documentoTransaccion } = req.params;
    const inventoryMovement = await InventoryMovement.findOne({
      documentoTransaccion,
    });

    if (!inventoryMovement) {
      return res
        .status(404)
        .json({ error: "No se encontró el movimiento de inventario" });
    }

    // Revertir efectos sobre el stock
    await Promise.all(
      inventoryMovement.productos.map(async (item) => {
        const product = await Product.findOne({ codigo: item.codigo });
        if (product) {
          if (inventoryMovement.tipoMovimiento === "entrada") {
            product.stock -= item.cantidad;
          } else if (inventoryMovement.tipoMovimiento === "salida") {
            product.stock += item.cantidad;
          }
          await product.save();
        }
      })
    );

    await InventoryMovement.deleteOne({
      documentoTransaccion: documentoTransaccion,
    });
    return res
      .status(200)
      .json({ message: "Movimiento de inventario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar el movimiento de inventario" });
  }
};

//Obtener movimientos por entrada o salida
export const getInventoryMovementsByType = async (req, res) => {
  try {
    const tipoMovimiento = req.params.tipoMovimiento.toLowerCase();

    if (tipoMovimiento !== "entrada" && tipoMovimiento !== "salida") {
      return res
        .status(400)
        .json({ error: 'El tipo de movimiento debe ser "entrada" o "salida"' });
    }

    const inventoryMovements = await InventoryMovement.find({
      tipoMovimiento: tipoMovimiento,
    }).populate("productos.producto");
    if (inventoryMovements.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron movimientos de inventario" });
    }

    return res.status(200).json(inventoryMovements);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los movimientos de inventario" });
  }
};
