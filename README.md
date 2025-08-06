# Tripleten web_project_api_full
# AroundUs EC

Welcome to **AroundUs EC**, a full-stack web application for sharing and liking places, built with React (frontend) and Node.js/Express/MongoDB (backend).  
Access the live site: [https://aroundus-ec.mooo.com/](https://aroundus-ec.mooo.com/)

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Infrastructure](#infrastructure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)
- [Contacto](#contacto)

---

## Features

- User registration and authentication (JWT)
- Secure login and protected routes
- Create, view, like, and delete cards (places)
- Edit user profile and avatar
- Responsive design for mobile and desktop
- Professional UI/UX

---

## Technologies

**Frontend:**
- React
- CSS Modules
- Fetch API

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Celebrate/Joi validation
- Winston logger

---

## Infrastructure

- **Production server:** Ubuntu Linux (cloud VPS)
- **Database:** MongoDB (local or Atlas)
- **Domain:** [https://aroundus-ec.mooo.com/](https://aroundus-ec.mooo.com/)
- **HTTPS:** Enabled via Let's Encrypt
- **Environment variables:** Managed with `.env` (not included in repo)

---

## Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Create your .env file and set JWT_SECRET, NODE_ENV, etc.
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Usage

1. Register a new account or log in.
2. Create new cards (places) with images and descriptions.
3. Like or unlike cards.
4. Edit your profile and avatar.
5. Delete your own cards.

Access the live site: [https://aroundus-ec.mooo.com/](https://aroundus-ec.mooo.com/)

---

## API Endpoints

### Auth & Users

- `POST /signup` — Register new user
- `POST /signin` — Login and get JWT
- `GET /users/me` — Get current user profile (protected)
- `PATCH /users/me` — Update profile (protected)
- `PATCH /users/me/avatar` — Update avatar (protected)

### Cards

- `GET /cards` — Get all cards
- `POST /cards` — Create new card (protected)
- `DELETE /cards/:id` — Delete own card (protected)
- `PUT /cards/:id/like` — Like a card (protected)
- `DELETE /cards/:id/like` — Remove like (protected)

---

## Environment Variables

Create a `.env` file in the backend folder with:

```
NODE_ENV=production
JWT_SECRET=your_super_secret_key
PORT=3000
```

**Note:** Never commit `.env` to your repository.

---

## License

This project is licensed under the MIT License.

---

## Contacto

- **Sitio web:** [https://aroundus-ec.mooo.com/](https://aroundus-ec.mooo.com/)
- **Autor:** Edwin

---

# AroundUs EC

## 🌎 Proyecto profesional de galería web

Bienvenido a **AroundUs EC**, una aplicación web full-stack para compartir y dar "me gusta" a lugares, desarrollada con React (frontend) y Node.js/Express/MongoDB (backend).  
Accede al sitio en vivo: [https://aroundus-ec.mooo.com/](https://aroundus-ec.mooo.com/)

---

## Tabla de contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Infraestructura](#infraestructura)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Variables de entorno](#variables-de-entorno)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Características

- Registro y autenticación de usuarios (JWT)
- Inicio de sesión seguro y rutas protegidas
- Crear, ver, dar "me gusta" y eliminar tarjetas (lugares)
- Editar perfil y avatar de usuario
- Diseño responsivo para móvil y escritorio
- Interfaz profesional y amigable

---

## Tecnologías

**Frontend:**
- React
- CSS Modules
- Fetch API

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- Autenticación JWT
- Validación Celebrate/Joi
- Logger Winston

---

## Infraestructura

- **Servidor de producción:** Ubuntu Linux (VPS en la nube)
- **Base de datos:** MongoDB (local o Atlas)
- **Dominio:** [https://aroundus-ec.mooo.com/](https://aroundus-ec.mooo.com/)
- **HTTPS:** Activado con Let's Encrypt
- **Variables de entorno:** Gestionadas con `.env` (no incluido en el repositorio)

---

## Instalación

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Crea tu archivo .env y configura JWT_SECRET, NODE_ENV, etc.
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Uso

1. Regístrate o inicia sesión.
2. Crea nuevas tarjetas (lugares) con imágenes y descripciones.
3. Da "me gusta" o quita "me gusta" a las tarjetas.
4. Edita tu perfil y avatar.
5. Elimina tus propias tarjetas.

Accede al sitio en vivo: [https://aroundus-ec.mooo.com/](https://aroundus-ec.mooo.com/)

---

## Endpoints de la API

### Auth y Usuarios

- `POST /signup` — Registrar nuevo usuario
- `POST /signin` — Iniciar sesión y obtener JWT
- `GET /users/me` — Obtener perfil del usuario actual (protegido)
- `PATCH /users/me` — Actualizar perfil (protegido)
- `PATCH /users/me/avatar` — Actualizar avatar (protegido)

### Tarjetas

- `GET /cards` — Obtener todas las tarjetas
- `POST /cards` — Crear nueva tarjeta (protegido)
- `DELETE /cards/:id` — Eliminar tu propia tarjeta (protegido)
- `PUT /cards/:id/like` — Dar "me gusta" a una tarjeta (protegido)
- `DELETE /cards/:id/like` — Quitar "me gusta" (protegido)

---

## Variables de entorno

Crea un archivo `.env` en la carpeta backend con:

```
NODE_ENV=production
JWT_SECRET=tu_clave_super_secreta
PORT=3000
```

**Nota:** Nunca subas el archivo `.env` al repositorio.

---

## Licencia

Este proyecto está bajo la licencia MIT.

---

## Contacto

- **Sitio web:** [https://aroundus-ec.mooo.com/](https://aroundus-ec.mooo.com/)
-