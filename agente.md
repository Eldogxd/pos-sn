Actúa como un Arquitecto de Software Principal. Tu misión es auditar la totalidad de este workspace de inicio a fin para diagnosticar errores, deuda técnica y problemas de arquitectura antes de realizar cualquier cambio en el código.

### FASE 1: Exploración Autónoma del Repositorio
1. Inspecciona la estructura completa del proyecto ignorando explícitamente carpetas de dependencias y compilados (`vendor/`, `node_modules/`, `.git/`, `storage/`, `dist/`, `public/build/`).
2. Lee los archivos de manifiesto y configuración (`composer.json`, `package.json`, `.env.example`, `vite.config.*`, archivos de configuración en `config/` y `routes/`).
3. Recorre de forma sistemática toda la lógica de negocio, controladores, modelos, migraciones, middlewares, servicios y vistas/componentes del frontend. No te limites a leer solo los archivos principales; asegúrate de mapear todas las dependencias entre módulos.

### FASE 2: Generación del Artefacto de Auditoría (Implementation Plan)
Genera un **Artifact (Plan de Implementación)** estructurado que contenga exactamente estas 4 secciones:

1. **Mapa de Arquitectura Real:** Stack exacto, versiones, flujo completo de peticiones (Request $\rightarrow$ Middleware $\rightarrow$ Controller/Service $\rightarrow$ Model/DB $\rightarrow$ Response/Frontend) y puntos de acoplamiento crítico.
2. **Inventario de Fallos y Deuda Técnica:** Lista detallada con **ruta de archivo y número de línea** dividida en:
   - *Bugs activos y lógica rota* (excepciones no controladas, rutas rotas, consultas N+1, errores de tipado o contratos).
   - *Brechas de seguridad* (validaciones faltantes, exposición de datos, fallos de autorización/CSRF/XSS).
   - *Problemas estructurales* (lógica de negocio dentro de controladores o vistas, código duplicado, conflictos de configuración).
3. **Dependencias y Entorno:** Conflictos detectados entre paquetes, scripts de compilación o variables de entorno faltantes.
4. **Hoja de Ruta de Refactorización (Por Fases):** Secuencia exacta y ordenada de archivos a intervenir para corregir el sistema sin romper funcionalidades actuales, indicando qué pruebas o verificaciones ejecutar después de cada fase.

### Reglas Estrictas de Ejecución:
- **MODO SOLO LECTURA EN ESTE TURNO:** Tienes estrictamente prohibido crear, modificar o eliminar archivos de código fuente durante esta auditoría. Solo puedes usar herramientas de lectura y búsqueda (`grep`, lectura de directorios/archivos).
- **NO ejecutes comandos destructivos ni migraciones en la terminal.**
- Detente al finalizar el Artifact de diagnóstico y espera mi revisión y aprobación explícita antes de ejecutar la Fase 1 de correcciones.