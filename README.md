# API REST - Flexus prueba tecnica Backend

## Descripción

Esta es una API REST donde podemos acceder, crear, modificar y dar de baja articulos.


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

tambien debemos asegurarnos de que la tabla roles contenga por lo menos estos 2 registros

```
INSERT INTO `flexxus_prueba_tecnica`.`roles` (`id_rol`, `nombre_rol`) VALUES ('1', 'usuario');
INSERT INTO `flexxus_prueba_tecnica`.`roles` (`id_rol`, `nombre_rol`) VALUES ('2', 'administrador');
```

## INFORMACION GENERAL

Base URL
> http://localhost:3000/api/v1/

Version: 1.0.0
Autenticacion: Bearer Token (JWT)

## RUTAS AUTENTICACION

Registrar usuario

URL
> auth/register

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
  "succes": false,
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
  "succes": true,
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
> auth/login

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

Autenticacion: Requerida

Status: 200 OK
````
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

obtener todos los articulos

URL
> /articulos

Metodo: GET

Autenticacion: Requerida
queries

isActivo - opcional - Acepta 1 o 0 , si no la especificamos obtendremos tanto activos como inactivos.

nombre - opcional - devuelve articulos por coicidencia en nombre.


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

````
let headersList = {
 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGluYXNtYXRpYXNpdEBnbWFpbC5jb20iLCJpZF9yb2wiOjEsImlhdCI6MTc0ODcxNDU4OCwiZXhwIjoxNzQ4NzIxNzg4fQ.Cn_vXsAdDepy9CQnFyXIidKgFqr9iKWYnnlNCI24Y14",
 "Content-Type": "application/json"
}

let response = await fetch("http://localhost:3000/api/v1/articulos?isActivo=1&nombre=iphone", { 
  method: "GET",
  headers: headersList
});

```
