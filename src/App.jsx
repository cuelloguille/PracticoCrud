import React, { useState, useEffect } from "react";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos"));

    if (productosGuardados && productosGuardados.length > 0) {
      setProductos(productosGuardados);
    } else {
      // Si no hay productos en localStorage, usa los valores predeterminados
      const productosIniciales = [
        { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
        { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
        { id: 3, nombre: "Mouse", precio: 30, stock: 40 },
      ];
      setProductos(productosIniciales);
      localStorage.setItem("productos", JSON.stringify(productosIniciales));
    }
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      localStorage.setItem("productos", JSON.stringify(productos));
    }
  }, [productos]);

  const agregarProducto = () => {
    if (!nombre || !precio || !stock) return;

    if (editando !== null) {
      setProductos(productos.map(p => p.id === editando ? { id: editando, nombre, precio: Number(precio), stock: Number(stock) } : p));
      setEditando(null);
    } else {
      const nuevoProducto = {
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        nombre,
        precio: Number(precio),
        stock: Number(stock),
      };
      setProductos([...productos, nuevoProducto]);
    }
    setNombre("");
    setPrecio("");
    setStock("");
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const eliminarTodos = () => {
    setProductos([]);
    localStorage.removeItem("productos");
  };

  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setStock(producto.stock);
    setEditando(producto.id);
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
      <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
      <button onClick={agregarProducto}>{editando ? "Guardar Cambios" : "Agregar"}</button>
      <button onClick={eliminarTodos}>Eliminar Todos</button>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio} - Stock: {producto.stock}
            <button onClick={() => editarProducto(producto)}>Editar</button>
            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
