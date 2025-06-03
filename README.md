# API REST - Flexus prueba técnica Backend
Salinas Matias 
Organicé el proyecto en carpetas
routes 
models 
controllers
services
utils
interfaces

valide los datos utilizando zod.

centralicé el manejo de errores.

![Store Procedures](docs/store_procedures.png)

pase las consultas a procedimientos almacenados en MySQL.

No se que se consideraria como features que haria un senior como se me menciono en la entrevista, sin embargo podria investigar y completar los siguientes Issues.

[Ver issue #1](https://github.com/MatiSalinas/flexxus-pt-matias-salinas/issues/1)

[Ver issue #2](https://github.com/MatiSalinas/flexxus-pt-matias-salinas/issues/2)

[Ver issue #3](https://github.com/MatiSalinas/flexxus-pt-matias-salinas/issues/3)


## requisitos

-node 
-mysql 
-mysql workbench

## Descripción

Esta es una API REST donde podemos acceder, crear, modificar y dar de baja articulos.

Validando tanto Request como Response.


## Tecnologías utilizadas

- Node.js
- Express.js
- TypeScript
- Tsx
- MySQL2
- JWT 
- Bcryptjs 
- Zod
- cors

---

## Instalación

```bash
git clone https://github.com/usuario/repositorio.git
cd repositorio
npm install
cp .env.example .env
```

## Como levantar y asegurarnos de que todo funcione
en src/connection tenemos un modelo que usando MySQL Workbench 8.0 podemos construir el schema y las tablas necesarias


![Diagrama entidad relación](docs/EER.PNG)

para abrir el modelo debemos ir a la pestaña de archivo y seleccionar abrir modelo

![Abrir modelo en Workbench](docs/open-model.png)

luego debemos hacer un forward engineer para crear la base de datos y las tablas


![Forward engineer](docs/forward-engineer.png)



tambien debemos asegurarnos de que la tabla roles contenga por lo menos estos 2 registros

```
INSERT INTO `flexxus_prueba_tecnica`.`roles` (`id_rol`, `nombre_rol`) VALUES ('1', 'usuario');
INSERT INTO `flexxus_prueba_tecnica`.`roles` (`id_rol`, `nombre_rol`) VALUES ('2', 'administrador');
```

una vez hecho esto podemos levantar la API

```
npm run dev 
```

Luego debemos crear un usuario y modificar su rol_id a 2 para poder acceder a todas las funcionalidades de la API.

## INFORMACION GENERAL

Base URL
> http://localhost:3000/api/v1/

Version: 1.0.0
Autenticación: Bearer Token (JWT)

## RUTAS AUTENTICACIÓN

Registrar usuario

URL
> /auth/register

Metodo: POST


Body

```
{
"email":"email@gmail.com",
"password":"12345" // validacion simple minimo 4 caracteres
}
```

Respuestas

Status: 409 Conflict
```
{
  "success": false,
  "message": "email already in use"
}
```

Status: 400 Bad Request

```
{
  "success": false,
  "message": "Error validating request body",
  "error": [
    {
      "code": "too_small",
      "minimum": 4,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "Password must be at least 4 characters long",
      "path": [
        "password"
      ]
    }
  ]
}
```

Status: 201 Created

```
{
  "success": true,
  "message": "user created succesfully"
}
```

### Ejemplo de uso

```
let headersList = {
 "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({
"email":"example@email.com",
"password":"12345"
});

let response = await fetch("http://localhost:3000/api/v1/auth/register", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

```

login usuario

URL
> /auth/login

Metodo: POST

Body

```
{
"email":"email@gmail.com",
"password":"12345" // validacion simple minimo 4 caracteres
}
```

Status: 200 OK
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGluYXNtYXRpYXNkc3NkaXRAZ21haWwuY29tIiwiaWRfcm9sIjoxLCJpYXQiOjE3NDg3MTcwMjAsImV4cCI6MTc0ODcyNDIyMH0.MA8vnxG9Qm7Pelqwqq4n8Z3KLW4JA2GDsG2Yn4blXQo",
  "user": {
    "id_usuario": 6,
    "email": "email@gmail.com",
    "password": "$2b$10$7N29U26hWANjj.Hsb3PA5exf9EcdiH9t9hPSvXYvDTBtfyO5iVtBC",
    "rol_id": 1
  }
}
```

Status: 400 Bad Request
```
{
  "success": false,
  "message": "Error validating request body",
  "error": [
    {
      "validation": "email",
      "code": "invalid_string",
      "message": "Invalid email format",
      "path": [
        "email"
      ]
    },
    {
      "code": "too_small",
      "minimum": 4,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "Password must be at least 4 characters long",
      "path": [
        "password"
      ]
    }
  ]
}
```


### Ejemplo de uso

```
let headersList = {
 "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({
"email":"example@email.com",
"password":"12345"
});

let response = await fetch("http://localhost:3000/api/v1/auth/login", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

```

## RUTAS ARTICULOS
(Todas estan protegidas por JWT)

Obtener exactamente 1 articulo
URL
> /articulos/id

METODO: GET

Autenticación: Requerida

Status: 200 OK
```
{
  "success": true,
  "data": {
    "id_articulos": 1,
    "nombre": "mouse gamer led",
    "marca": "genius gx",
    "activo": 1,
    "fecha_modificacion": "2025-05-30T23:46:56.000Z"
  }
}
```
Status: 404 Not Found
```
{
  "message": "Article not found",
  "success": false
}
```

Status: 400 Bad Request
```
{
  "success": false,
  "message": "Error validating request parameters",
  "error": [
    {
      "validation": "regex",
      "code": "invalid_string",
      "message": "ID must be a valid number",
      "path": [
        "id"
      ]
    }
  ]
}
```
###Ejemplo de uso

```
let headersList = {
 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGluYXNtYXRpYXNpdEBnbWFpbC5jb20iLCJpZF9yb2wiOjEsImlhdCI6MTc0ODcxNDU4OCwiZXhwIjoxNzQ4NzIxNzg4fQ.Cn_vXsAdDepy9CQnFyXIidKgFqr9iKWYnnlNCI24Y14",
 "Content-Type": "application/json"
}

let response = await fetch("http://localhost:3000/api/v1/articulos/1", { 
  method: "GET",
  headers: headersList
});

```

obtener todos los articulos

URL
> /articulos

Metodo: GET

Autenticación: Requerida
queries

isActivo - opcional - Acepta 1 o 0 , si no la especificamos obtendremos tanto activos como inactivos.

nombre - opcional - devuelve articulos por coincidencia en nombre.

limit - opcional - devuelve la cantidad de articulos que queremos, por defecto devuelve 20.

offset - opcional - devuelve el número de artículos a omitir, por defecto devuelve 0.

Status: 200 OK
```
{
  "success": true,
  "data": [
    {
      "id_articulos": 1,
      "nombre": "mouse gamer led",
      "marca": "genius gx",
      "activo": 1,
      "fecha_modificacion": "2025-05-30T23:46:56.000Z"
    },
    {
      "id_articulos": 2,
      "nombre": "teclado",
      "marca": "genius gx",
      "activo": 1,
      "fecha_modificacion": "2025-05-30T21:51:03.000Z"
    },
    {
      "id_articulos": 3,
      "nombre": "monitor 22",
      "marca": "lenovo",
      "activo": 1,
      "fecha_modificacion": "2025-05-30T21:51:03.000Z"
    },
    {
      "id_articulos": 4,
      "nombre": "monitor 24",
      "marca": "samsung",
      "activo": 1,
      "fecha_modificacion": "2025-05-30T21:51:03.000Z"
    }
  ],
  "message": "4 articles found"
}
```

Status: 400 Bad Request
```
{
  "success": false,
  "message": "Error validating request body",
  "error": [
    {
      "received": "false",
      "code": "invalid_enum_value",
      "options": [
        "1",
        "0"
      ],
      "path": [
        "isActivo"
      ],
      "message": "Invalid enum value. Expected '1' | '0', received 'false'"
    }
  ]
}
```

### Ejemplo de uso

```
let headersList = {
 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGluYXNtYXRpYXNpdEBnbWFpbC5jb20iLCJpZF9yb2wiOjEsImlhdCI6MTc0ODcxNDU4OCwiZXhwIjoxNzQ4NzIxNzg4fQ.Cn_vXsAdDepy9CQnFyXIidKgFqr9iKWYnnlNCI24Y14",
 "Content-Type": "application/json"
}

let response = await fetch("http://localhost:3000/api/v1/articulos?isActivo=1&nombre=iphone", { 
  method: "GET",
  headers: headersList
});

```

METODO: POST
Autenticación: Requerida rol id 2 (admin)

Body

```
{
"nombre":"horno", // máximo 80 chars
"marca":"Gafa", // máximo 80 chars
"activo":"1" //opcional tiene que ser string "1" o "0" default "1"
}
```


Status: 403 Forbidden

```
{
  "success": false,
  "message": "Unauthorized"
}
```

400 Bad Request
```
{
  "success": false,
  "message": "Error validating request body",
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "nombre"
      ],
      "message": "Required"
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "marca"
      ],
      "message": "Required"
    }
  ]
}
```

Status: 201 Created

```
{
  "message": "Article created successfully",
  "success": true,
  "data": {
    "id_articulos": 12,
    "nombre": "horno",
    "marca": "Gafa",
    "activo": 1,
    "fecha_modificacion": "2025-05-31T19:48:28.000Z"
  }
}
```

### Ejemplo de uso

```
let headersList = {
 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlkX3JvbCI6MiwiaWF0IjoxNzQ4NzIwMzU4LCJleHAiOjE3NDg3Mjc1NTh9.ciYZABNSpnsbAJT_7l9YTU9Kb6kA--lgQ5rZ1yYaSjQ",
 "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({
"nombre":"estufa",
"marca":"Gafax",
"activo":"1"

});

let response = await fetch("http://localhost:3000/api/v1/articulos/", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

```

METODO: PUT

URL 
> /articulos/id

Autorización: Requerida rol id 2 (admin)

Body

```
{
"nombre":"horno", // opcional maximo 80 chars
"marca":"Gafa", //opcional maximo 80 chars
"activo":"1" //opcional tiene que ser string "1" o "0" default "1"
}
```


Status: 400 Bad Request

```
{
  "success": false,
  "message": "Error validating request body",
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": [
        "nombre"
      ],
      "message": "Expected string, received number"
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": [
        "marca"
      ],
      "message": "Expected string, received number"
    },
    {
      "expected": "'0' | '1'",
      "received": "number",
      "code": "invalid_type",
      "path": [
        "activo"
      ],
      "message": "Expected '0' | '1', received number"
    }
  ]
}
```

Status: 200 OK
```
{
  "message": "Article updated successfully",
  "success": true,
  "data": {
    "id_articulos": 12,
    "nombre": "microondas",
    "marca": "Gafa",
    "activo": 0,
    "fecha_modificacion": "2025-05-31T20:15:18.000Z"
  }
}
```
###  Ejemplo de uso
```
let headersList = {
 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlkX3JvbCI6MiwiaWF0IjoxNzQ4NzIwMzU4LCJleHAiOjE3NDg3Mjc1NTh9.ciYZABNSpnsbAJT_7l9YTU9Kb6kA--lgQ5rZ1yYaSjQ",
 "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({
  "nombre":"microondas"
  
});

let response = await fetch("http://localhost:3000/api/v1/articulos/12", { 
  method: "PUT",
  body: bodyContent,
  headers: headersList
});

```

METODO: DELETE

Autorización: Requerida rol id 2 (admin)

URL 
> /articulos/id

Status: 200 OK
```
{
  "message": "Article deleted successfully",
  "success": true
}
```


Status: 404 Not Found
```
{
  "message": "Article not found",
  "success": false
}
```


Status: 400 Bad Request
```
{
  "success": false,
  "message": "Error validating request parameters",
  "error": [
    {
      "validation": "regex",
      "code": "invalid_string",
      "message": "ID must be a valid number",
      "path": [
        "id"
      ]
    }
  ]
}
```

### Ejemplo de uso

```
let headersList = {
 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlkX3JvbCI6MiwiaWF0IjoxNzQ4NzIwMzU4LCJleHAiOjE3NDg3Mjc1NTh9.ciYZABNSpnsbAJT_7l9YTU9Kb6kA--lgQ5rZ1yYaSjQ",
 "Content-Type": "application/json"
}


let response = await fetch("http://localhost:3000/api/v1/articulos/122", { 
  method: "DELETE",
  headers: headersList
});
```
//TODO

scripts para buildear con tsx / pkgroll
Dockerizar el proyecto
script para crear base de datos y tablas
seedear roles
sustituir zod por class-validator para cumplir con los estandares de flexxus
