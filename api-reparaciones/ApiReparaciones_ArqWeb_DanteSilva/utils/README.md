# TP Arquitectura Web - API de Reparaciones

Esta es una API REST desarrollada en Node.js y Express para la gestión de reparaciones de máquinas eléctricas. No utiliza base de datos; la persistencia de datos se maneja a través de archivos `.json`.

## Alcance y Objetivos
### La API permitirá:

* Consultar el listado de máquinas existentes, con opción de filtrado.
* Consultar una máquina específica por su ID.
* Registrar, consultar, modificar y eliminar reparaciones (CRUD completo).
* Validar que las reparaciones solo se asocien a máquinas existentes.
* Obtener estadísticas de costos (costo total global y costo total por máquina)

### 🗄️ Modelo de Datos

La API gestiona dos entidades principales con la siguiente estructura:

**[Máquina]**
* `id` (int, PK)
* `marca` (string)
* `modelo` (string)

**[Reparación]**
* `id_reparacion` (int, PK)
* `id_maquina` (int, FK → Máquina.id)
* `fecha` (string ISO YYYY-MM-DD)
* `descripcion` (string)
* `costo` (number)

### Criterios de Calidad de la API
La API se construyó siguiendo criterios de calidad:

* **Validaciones y Errores:** Se devuelven códigos HTTP coherentes (200, 201, 204, 400, 404) y mensajes de error claros para el cliente (ej: `La máquina con id 99 no existe.`).
* **Diseño RESTful:** Se respeta el uso de métodos HTTP (GET, POST, PUT, DELETE) y se utilizan URLs anidadas para expresar relaciones (ej: `/api/maquinas/:id/reparaciones`).
* **Filtrado:** La API soporta filtrado básico en listados a través de *query params* (ej: `/api/maquinas?marca=...`).

## Instalación y Ejecución
### Requisitos:

* **Node.js** (v18.x, v20.x o superior)
* **npm** (v9.x o superior)

### Pasos:
1.  **Clonar/Descargar el proyecto.**
2.  **Instalar dependencias:**
    (Asegúrate de estar en la raíz del proyecto en tu terminal)
    ```bash
    npm install
    ```
3.  **Ejecutar el servidor:**

    ```bash
    node server.js
    ```

    El servidor estará corriendo en `http://localhost:3000`.

## 🧪 Casos de Prueba (Postman)
Aquí hay 9 endpoints para probar la funcionalidad de la API.

### 1. CRUD: Crear Reparación (CREATE)
-   **Método:** `POST`
-   **URL:** `http://localhost:3000/api/reparaciones`
-   **Body (raw/json):**
    ```json
    {
      "id_maquina": 2,
      "fecha": "2025-11-16",
      "descripcion": "Cambio de rulemán",
      "costo": 3000
    }
    ```
-   **Respuesta (Éxito):** `201 Created` con el objeto de la nueva reparación.
-   **Validación:** Si se usa un `id_maquina` que no existe (ej: 99), la API devuelve un error:
-   **Respuesta (Error):** `404 Not Found` - `{"message": "La máquina con id 99 no existe."}`

### 2. CRUD: Leer Reparación (READ)
-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/reparaciones/1`
-   **Respuesta:** `200 OK` con los datos de la reparación ID 1.

### 3. CRUD: Actualizar Reparación (UPDATE)
-   **Método:** `PUT`
-   **URL:** `http://localhost:3000/api/reparaciones/1`
-   **Body (raw/json):**
    ```json
    {
      "costo": 2000
    }
    ```
-   **Respuesta:** `200 OK` con el objeto completo actualizado.

### 4. CRUD: Eliminar Reparación (DELETE)
-   **Método:** `DELETE`
-   **URL:** `http://localhost:3000/api/reparaciones/2`
-   **Respuesta:** `204 No Content`.
---
### 5. Avanzado: Listar Máquinas (con Filtro)
-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/maquinas?marca=Hilti`
-   **Respuesta:** `200 OK` con un array de máquinas que coinciden con la marca "Hilti".

### 6. Básico: Leer Máquina por ID
-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/maquinas/1`
-   **Respuesta:** `200 OK` con los datos de la máquina ID 1.

### 7. Avanzado: Listar Reparaciones de una Máquina (Anidado)
-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/maquinas/1/reparaciones`
-   **Respuesta:** `200 OK` con un array de todas las reparaciones asociadas a la máquina ID 1.

### 8. Avanzado: Obtener Estadísticas por Máquina (¡NUEVO!)
-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/maquinas/1/stats`
-   **Respuesta:** `200 OK` con un objeto JSON que calcula el total de reparaciones y el costo total **solo para esa máquina**.
    ```json
    {
      "id_maquina": 1,
      "total_reparaciones": 3,
      "costo_total_maquina": 10000
    }
    ```

### 9. Avanzado: Obtener Estadísticas Globales
-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/reparaciones/stats/costo-total`
-   **Respuesta:** `200 OK` con un objeto JSON que calcula el costo total de **todas** las reparaciones.
    ```json
    {
      "total_reparaciones": 5,
      "costo_total": 20700
    }
    ```