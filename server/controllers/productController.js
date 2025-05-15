import Product from "../models/product.js";

//Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ error: 'No se encontraron productos' });
        }
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

//Obtener un producto por el codigo
export const getProductByCode = async (req, res) => {
    try {
        const { codigo } = req.params;
        const product = await Product.findOne({ codigo });
        if (!product) {
            return res.status(404).json({ error: 'No se encontró el producto' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

//Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { codigo, nombre, descripcion, marca, color, precio, stock, imagen, categoria } = req.body;
        if (!codigo || !nombre || !descripcion || !marca || !color || !precio || !imagen || !categoria) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (stock < 0) {
            return res.status(400).json({ error: 'La cantidad de stock no puede ser negativa' });
        }

        // Generar un código automático (opcional)
        //const count = await Product.countDocuments();
        //const nuevo_codigo = `PROD-${String(count + 1).padStart(4, '0')}`;

        const existingProduct = await Product.findOne({ codigo });
        if (existingProduct) {
            return res.status(400).json({ error: 'Ya existe un producto con este codigo' });
        }

        const product = new Product({ codigo, nombre, descripcion, marca, color, precio, stock, imagen, categoria });
        await product.save();
        return res.status(201).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

//Actualizar un producto por codigo
export const updateProduct = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { nombre, descripcion, marca, color, precio, stock, imagen, categoria } = req.body;
        
        if (!nombre || !descripcion || !marca || !color || !precio || !imagen || !categoria) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios para la actualizacion' });
        }

        if (stock < 0) {
            return res.status(400).json({ error: 'La cantidad de stock no puede ser negativa' });
        }
        
        const product = await Product.findOne({ codigo });

        if (!product) {
            return res.status(404).json({ error: 'No se encontró el producto' });
        }

        product.nombre = nombre;
        product.descripcion = descripcion;
        product.marca = marca;
        product.color = color;
        product.precio = precio;
        product.stock = stock;
        product.imagen = imagen;
        product.categoria = categoria;
        await product.save();
        return res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

//Actualizar algunos campos de un producto
export const updateProductField = async (req, res) => {
    const campos = ["nombre", "descripcion", "marca", "precio", "stock", "imagen", "categoria"];
    const hayCampos = campos.some((campo) => req.body[campo] !== undefined);

    if (!hayCampos) {
        return res.status(400).json({ error: 'Se debe especificar al menos un campo para la actualizacion' });
    }

    try {
        const { codigo } = req.params;
        const product = await Product.findOne({ codigo });

        if (!product) {
            return res.status(404).json({ error: 'No se encontró el producto' });
        }

        campos.forEach((campo) => {
            if (req.body[campo] !== undefined) {
                product[campo] = req.body[campo];
            }
        });

        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }   
};

//Eliminar un producto por codigo
export const deleteProduct = async (req, res) => {
    try {
        const { codigo } = req.params;
        const product = await Product.findOne({ codigo });

        if (!product) {
            return res.status(404).json({ error: 'No se encontró el producto' });
        }

        await Product.deleteOne({ codigo });
        return res.status(200).json({ message: 'Producto eliminado correctamente' });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
}

//Obtener productos por marca
export const getProductsByBrand = async (req, res) => {
    try {
        const { marca } = req.params;
        const products = await Product.find({ marca });
        if (!products) {
            return res.status(404).json({ error: 'No se encontraron productos' });
        }
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

//Obtener productos por categoria
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoria } = req.params;
        const products = await Product.find({ categoria });
        if (!products) {
            return res.status(404).json({ error: 'No se encontraron productos' });
        }
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};