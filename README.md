# 🌐 MoisesGJ Links

![MoisesGJ Links](https://img.shields.io/badge/Proyecto-MoisesGJ_Links-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-v22.6.0-blue)

**MoisesGJ Links** es un servicio de acortamiento de URL que permite a los usuarios crear y gestionar enlaces acortados. Este proyecto se integra con MongoDB para el almacenamiento de datos y proporciona rutas esenciales para la gestión de enlaces.

## 🚀 Características

- **Crear y Usar Hipervínculos**: Genera URLs acortadas y rastrea su uso.
- **Integración con MongoDB**: Almacena y gestiona URLs y sus equivalentes acortados.
- **API RESTful**: Accede a las principales rutas para la creación y gestión de enlaces.
- **Preparado para el Futuro**: Arquitectura limpia preparada para futuras características.

## 🛠 Instalación

Para comenzar con **MoisesGJ Links**, sigue estos pasos:

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/MoisesGJ/moisesgj-links.git
   cd moisesgj-links
   ```

2. **Instalar Dependencias**:

   Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados. Luego, ejecuta:

   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno:**:

   Crea un archivo .env en el directorio raíz del proyecto y añade tu URI de MongoDB (puedes seguir también la estructura del archivo .env.example):

   ````bash
    PORT=
    DB_URI=mongodb://localhost:27017
    DB_NAME=moisesgj-links
    BASE_URL=http://localhost:3001
    ```
   Asegúrate de reemplazar mongodb://localhost:27017/moisesgj-links con la URI adecuada para tu base de datos MongoDB, si es diferente.

   ````

4. **Iniciar la Aplicación:**:

   Para iniciar la aplicación en modo de desarrollo, ejecuta:

   ````bash
    npm run dev
    ```

   Para iniciar la aplicación en modo producción, ejecuta:

   ```bash
    npm start
    ```
   Esto iniciará el servidor en el puerto especificado en el archivo .env. Puedes acceder a la aplicación en http://localhost:3000 o en el puerto que hayas configurado.

   ````

5. **Verificar el Funcionamiento:**:

   Para verificar el funcionamiento, puedes usar herramientas como Postman, Insomnia o cURL para probar las rutas de la API. Haz una peticion GET a http://localhost:3000 para verificar que la aplicación está funcionando correctamente.

## 📚 Rutas de la API

### **POST** `api/links`

Crea un nuevo enlace acortado.

- **Descripción**: Permite a los usuarios crear un nuevo enlace acortado.
- **Cuerpo de la Solicitud**:

  ```json
  {
    "url": ""http://ejemplo.com"
    "shortUrl": "acortado",
  }
  ```

- **Respuesta exitosa**:

  ```json
  {
    "shortLink": "http://ejemplo.com/acortado"
  }
  ```

- **Códigos de estado**:
  - **200**: Creado
  - **400**: Error

### **GET** `/:shortUrl`

Hace la redirección a la URL original.

- **Descripción**: Permite a los usuarios obtener la redirección de la URL original a partir de un enlace acortado.
- **Parámetros de Ruta:**: `shortUrl` (string): El enlace acortado que se desea consultar.

- **Códigos de estado**:
  - **302**: Redireccionado
  - **404**: No se ha encontrado el enlace proporcionado
