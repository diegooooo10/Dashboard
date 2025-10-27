# 🛍️ E-Commerce Dashboard

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-blueviolet?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-teal?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-🔥-orange?logo=firebase)](https://firebase.google.com/)

## Descripción
Dashboard de e-commerce moderno construido con **React**, **Vite** y **Tailwind CSS 4.0**, con autenticación y roles dinámicos usando **Firebase**.  
Permite gestionar productos, usuarios y ver estadísticas según el rol (User, Manager, Admin).

---

## 🚀 Características

### 🔐 Autenticación
- Registro e inicio de sesión con Firebase Auth.
- Persistencia de sesión y manejo de errores.

### 📊 Dashboard
- Vista personalizada según el rol del usuario.
- Estadísticas con **Chart.js**: productos más vendidos, compras recientes.

### 🛒 Funcionalidades de Usuario
- Catálogo de productos con filtros dinámicos.
- Carrito de compras persistente.
- Historial de compras.
- Perfil: cambio de contraseña, tema claro/oscuro, eliminar cuenta.

### 🧩 Roles
| Rol         | Permisos                                    |
|-------------|---------------------------------------------|
| **User**    | Comprar, historial, perfil, configuraciones |
| **Manager** | Gestión de productos                        |
| **Admin**   | Control total: usuarios, roles y productos  |

---

## 🛠 Tecnologías
- **React**
- **Vite**
- **Tailwind CSS**
- **Firebase (Auth + Firestore)**
- **React Hook Form + Zod**
- **Chart.js + React Chart.js 2**
- **Zustand**
- **React Hot Toast**
- **React Router DOM**

---

## ⚙️ Instalación y configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/diegooooo10/Dashboard.git
cd nombre-del-repo
```

### 2. Instala dependencias

```bash
bun install
```

### 3. Configura variables de entorno en .env
```bash

VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""
```

### 4. Ejecuta en desarrollo
```bash
bun run dev
```
El proyecto estará disponible en:
👉 http://localhost:5173

## 🌐 Deploy
El proyecto está alojado en una página web:
🔗 https://react-e-commerce-dashboard.netlify.app/
