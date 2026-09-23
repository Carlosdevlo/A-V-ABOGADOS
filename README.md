A&V ABOGADOS - Profesionales en Seguros y Responsabilidad Civil
===========================================================

Sitio web corporativo para la firma de abogados A&V Abogados, especializada en
representación jurídica para víctimas de accidentes de tránsito en Colombia.

 Requisitos
------------

- Node.js >= 18.0.0
- npm

 Instalación
------------

```bash
npm install
```

 Desarrollo
-----------

```bash
npm run dev
```

El servidor se iniciará en http://localhost:3000

 Producción
-----------

```bash
npm start
```

 Configuración
--------------

Copiar el archivo `.env.example` a `.env` y ajustar las variables según
el entorno:

```bash
cp .env.example .env
```

Variables de entorno principales:

| Variable              | Descripción                            |
|-----------------------|----------------------------------------|
| WHATSAPP_NUMBER       | Número de WhatsApp (sin +, con código país) |
| PHONE                 | Teléfono de oficina                    |
| EMAIL                 | Correo electrónico                     |
| ADDRESS               | Dirección de la oficina                |
| PORT                  | Puerto del servidor (default 3000)     |

 Arquitectura MVC
----------------

```
src/
├── controllers/    # Lógica de negocio
├── models/         # Modelos de datos
├── routes/         # Definición de rutas
├── services/       # Servicios externos (WhatsApp, etc.)
├── config/         # Configuración
├── utils/          # Utilidades y validadores
├── views/          # Plantillas EJS
│   ├── partials/   # Componentes reutilizables
│   └── pages/      # Vistas completas
└── public/         # Archivos estáticos
    ├── css/
    ├── js/
    └── images/
```

 Extensiones futuras
-------------------

El proyecto está preparado para agregar fácilmente:

- Blog (CRUD de artículos)
- Casos de estudio
- Equipo de abogados
- Panel administrativo
- Base de datos (MongoDB / PostgreSQL)
- Integración con CRM

 Licencia
--------

Desarrollado específicamente para A&V Abogados.
