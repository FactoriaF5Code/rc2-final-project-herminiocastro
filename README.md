# Upside Down World

Una app para gestionar colecciones de Stranger Things

- Catálogo : Registrar mis figuras, juegos, accesorios, ropa y más.
- Organización : Crear categorías y poder encontrar los articulos de mi coleccion con imagenes y una breve descrippcion del articulo.

### Planificación y diseño
- [Mural](https://app.mural.co/t/personal2568/m/personal2568/1710841856974/e21aef3d13715555b77a39f86f7b38e55318206c?sender=u08685b71ed5a8f53509b3340)
- [Figma](https://www.figma.com/file/vsCtLEA2bF8wE5FcWhEB0R/Upside-Down-world?type=design&node-id=0%3A1&mode=design&t=BbIf8jtFqe7qrign-1)

## Cómo lanzar el proyecto

### Frontend

```
cd frontend
npm install 
npm run dev
```

### Backend

```
cd backend 
mvn spring-boot:run 
```

Docker instalado: https://docs.docker.com/engine/install/
DBeaver instalado: https://dbeaver.io/download/
Pasos:

1. Iniciar la base de datos con Docker:

Comando Docker:
docker run -it --rm -p 5432:5432 postgres:latest
Explicación:

-it: Inicia el contenedor en modo interactivo.
--rm: Elimina el contenedor al cerrarlo.
-p 5432:5432: Exporta el puerto 5432 del contenedor al puerto 5432 del host.
postgres:latest: Imagen de PostgreSQL a utilizar.

2. Conectarse a la base de datos con DBeaver:

Abrir DBeaver:

Inicie DBeaver.
Crear nueva conexión:

Seleccione "MySQL" como tipo de base de datos.
Introduzca la siguiente información:
Host: localhost
Puerto: 5432
Base de datos: postgres
Usuario: postgres
Contraseña: postgres
Haga clic en "Probar conexión" para verificar la conexión.
Haga clic en "Aceptar" para guardar la conexión.

3. Crear las tablas:

Abrir la base de datos:

En el panel izquierdo de DBeaver, expanda la conexión "postgres".
Haga doble clic en la base de datos "postgres".