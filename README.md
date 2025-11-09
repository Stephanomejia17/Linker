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
    minikube start driver=docker
    ```

2. **Apuntar Docker al entorno Minikube**

    ```bash
    eval $(minikube docker-env)
    ```

3. **Construir las imágenes Docker**:

    ```bash
    cd Backend/
    docker build -t stephano21/linker-backend:latest .
    cd ../Frontend/
    docker build -t stephano21/linker-frontend:latest .
    cd ..
    ```

4. **Aplicar los manifiestos de Kubernetes** (asegúrate de tener los archivos YAML en una carpeta `kube/`):

    ```bash
    kubectl apply -f kube/
    ```

5. **Verificar que los pods estén corriendo**:

    ```bash
    kubectl get pods
    kubectl get svc
    ```

6. **Exponer los servicios a tu máquina local (port-forward)**:
    ```bash
    kubectl port-forward svc/linker-backend 31000:3000 &
    kubectl port-forward svc/linker-frontend 30080:80 &
    ```
7. **Conexión por navegador**:
    ```bash
    http://127.0.0.1:30080
    ```

Nota: Puedes interactuar con la base de datos con este comando

```bash
kubectl exec -it db-<POD-ID> -- psql -U linker -d linkerdb
```

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
        image: stephano21/linker-backend:latest
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
        image: stephano21/linker-frontend:latest
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
