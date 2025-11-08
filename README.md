# Linker - Sistema de Matching Profesional

## Descripción del Sistema

Linker es una plataforma de matching profesional diseñada para conectar postulantes con empresas de manera eficiente. La arquitectura general del sistema se basa en una aplicación web moderna con separación de responsabilidades:

### Arquitectura General

-   **Frontend**: Desarrollado en Angular, proporciona una interfaz de usuario intuitiva para postulantes y empresas. Incluye módulos para autenticación, perfiles, matches, chat y gestión de vacantes.
-   **Backend**: Implementado con NestJS (Node.js), ofrece una API RESTful robusta. Incluye módulos para autenticación (auth), gestión de usuarios, postulantes, empresas, vacantes, habilidades, idiomas, certificados, estudios, interacciones, matches y chat.
-   **Base de Datos**: Utiliza PostgreSQL para el almacenamiento persistente de datos, con entidades relacionadas para manejar perfiles, vacantes y matches.
-   **Infraestructura**: Contenedorizado con Docker para facilitar el despliegue. Utiliza Docker Compose para entornos locales y Minikube para despliegues locales con Kubernetes.

El sistema permite a los postulantes crear perfiles detallados con habilidades, idiomas, certificados y estudios, mientras que las empresas pueden publicar vacantes y buscar candidatos compatibles mediante un algoritmo de matching.

## Instrucciones de Despliegue Local (Minikube)

Para desplegar el sistema localmente utilizando Minikube, sigue estos pasos:

### Prerrequisitos

-   Instalar [Minikube](https://minikube.sigs.k8s.io/docs/start/)
-   Instalar [kubectl](https://kubernetes.io/docs/tasks/tools/)
-   Instalar [Docker](https://docs.docker.com/get-docker/)

### Pasos de Despliegue

1. **Iniciar Minikube**:

    ```bash
    minikube start
    ```

2. **Construir las imágenes Docker**:

    ```bash
    docker build -t linker-backend ./Backend
    docker build -t linker-frontend ./Frontend
    ```

3. **Cargar imágenes en Minikube**:

    ```bash
    minikube image load linker-backend
    minikube image load linker-frontend
    ```

4. **Aplicar los manifiestos de Kubernetes** (asegúrate de tener los archivos YAML en una carpeta `k8s/`):

    ```bash
    kubectl apply -f k8s/
    ```

5. **Exponer los servicios**:

    - Backend: `minikube service backend-service`
    - Frontend: `minikube service frontend-service`
    - PgAdmin: `minikube service pgadmin-service`

6. **Acceder a la aplicación**:
    - Frontend: Utiliza la URL proporcionada por Minikube (generalmente http://localhost:puerto)
    - PgAdmin: http://localhost:puerto_pgadmin

Nota: Asegúrate de configurar las variables de entorno en los pods de Kubernetes según sea necesario.

## Docker Compose

El proyecto incluye un archivo `docker-compose.yaml` bien estructurado para facilitar el despliegue local con Docker Compose:

```yaml
version: "3.9"

services:
    db:
        image: postgres:15
        container_name: db_postgresLinker
        environment:
            POSTGRES_USER: linker
            POSTGRES_PASSWORD: linker
            POSTGRES_DB: linkerdb
        ports:
            - "5433:5432"
        volumes:
            - postgres_data:/var/lib/postgresql/data
        restart: always

    pgadmin:
        image: dpage/pgadmin4
        container_name: pgadmin_linker
        environment:
            PGADMIN_DEFAULT_EMAIL: admin@linker.com
            PGADMIN_DEFAULT_PASSWORD: admin
        ports:
            - "5050:80"
        depends_on:
            - db
        restart: always

    backend:
        container_name: backendAppLinker
        depends_on:
            - db
        build: ./Backend
        ports:
            - "3000:3000"
        environment:
            DB_HOST: db
            DB_PORT: 5432
            DB_USER: linker
            DB_PASSWORD: linker
            DB_NAME: linkerdb
        restart: always

    frontend:
        container_name: frontendAppLinker
        build: ./Frontend
        ports:
            - "8090:80"
        depends_on:
            - backend
        restart: always

volumes:
    postgres_data:
```

Para ejecutar con Docker Compose:

```bash
docker-compose up --build
```

## Enlaces

-   **Imágenes en DockerHub**:

    -   Backend: [https://hub.docker.com/r/linker/backend](https://hub.docker.com/r/linker/backend)
    -   Frontend: [https://hub.docker.com/r/linker/frontend](https://hub.docker.com/r/linker/frontend)
    -   Base de Datos: [https://hub.docker.com/\_/postgres](https://hub.docker.com/_/postgres)

-   **Documentación Técnica**: [https://docs.linker.com](https://docs.linker.com)

-   **Pipeline (GitHub Actions)**: [https://github.com/linker-project/linker/actions](https://github.com/linker-project/linker/actions)
