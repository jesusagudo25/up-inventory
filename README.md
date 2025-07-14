# 🖥️ up-inventory – Aplicación Web para Gestión de Inventario

Este proyecto es una **aplicación web desarrollada en React** que forma parte del sistema de inventario distribuido. Su propósito es proporcionar una interfaz gráfica amigable que permita a los usuarios consultar productos, registrar pedidos y gestionar devoluciones.

## 🚀 Tecnologías y Herramientas

- React 18+
- Vite o Create React App
- React Router
- Axios (para llamadas HTTP)
- TailwindCSS o Bootstrap (para estilos)
- Formik / React Hook Form (para formularios)
- SweetAlert2 / Toastify (notificaciones)
- ESLint + Prettier

## 🎯 Objetivos Funcionales

La app se comunica exclusivamente a través del **Cloud Gateway**, el cual enruta las solicitudes hacia los microservicios correspondientes. No hay comunicación directa con `ms-buscador` o `ms-operador`.

### Funciones disponibles:

#### 🧾 Productos (vía `ms-buscador`)
- Ver listado de productos.
- Buscar productos por nombre, categoría, fabricante u otros filtros.
- Crear nuevos productos.
- Editar productos existentes (total o parcialmente).
- Eliminar productos.

#### 📦 Pedidos (vía `ms-operador`)
- Crear nuevos pedidos seleccionando múltiples productos.
- Validar existencia y stock antes de registrar.
- Consultar pedido por ID.

#### ♻️ Devoluciones
- Registrar una devolución basada en un pedido existente.
- Ver impacto reflejado en el stock de los productos.

## 📡 Configuración del Entorno

Asegúrate de tener corriendo el backend y que el **Cloud Gateway** esté accesible desde la app (por ejemplo, en `http://localhost:8080`).

## 📁 Estructura del Proyecto

```
up-inventory/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/       # Axios y llamadas a la API
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── package.json
└── vite.config.js
```

## 📄 Autor

Desarrollado por: jagudo2514@gmail.com.
