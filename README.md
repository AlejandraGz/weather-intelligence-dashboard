![Angular](https://img.shields.io/badge/Angular-21-red?logo=angular)
![RxJS](https://img.shields.io/badge/RxJS-reactive-blue?logo=reactivex)
![Chart.js](https://img.shields.io/badge/Chart.js-4-orange?logo=chartdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

# 🌤️ Panel de Inteligencia Climática

Aplicación web desarrollada en Angular que permite visualizar y analizar el pronóstico del tiempo de forma interactiva. Presenta información climática mediante vistas diarias, detalle por intervalos de 3 horas y gráficos dinámicos.

---

## 🚀 Características

* 📅 Visualización del pronóstico por días
* ⏱️ Detalle del clima en intervalos de 3 horas
* 📊 Gráficos interactivos con Chart.js
* 🌙 Modo oscuro y claro adaptable al sistema
* 🎛️ Toggle manual de tema
* ⚡ Manejo de estado reactivo con RxJS
* 🔄 Sincronización entre componentes (dashboard, forecast, gráficos)
* 🎨 Diseño moderno con variables CSS

---

## 🧠 Arquitectura

El proyecto sigue buenas prácticas de desarrollo en Angular:

* Uso de **componentes standalone**
* Separación por capas:

  * `core/` → servicios globales (API, estado)
  * `features/` → lógica del dominio (weather)
  * `shared/` → reutilizables
* Manejo de estado con **BehaviorSubject + Observables**
* Optimización de datos con `shareReplay`
* Flujo reactivo entre componentes

---

## 🛠️ Tecnologías

* **Angular**
* **RxJS**
* **Chart.js**
* **TypeScript**
* **CSS (variables + theming)**

---

## 📸 Funcionalidades principales

### 📅 Selección de día

Permite seleccionar un día específico del pronóstico y actualizar automáticamente toda la información relacionada.

### ⏱️ Vista por horas

Muestra el clima segmentado cada 3 horas para un análisis más detallado.

### 📊 Gráfica de temperatura

Visualización clara de la evolución de la temperatura durante el día.

### 🌙 Sistema de temas

* Detecta automáticamente el tema del sistema
* Permite cambio manual
* Transiciones suaves entre modos

---

## ⚙️ Instalación

```bash
# Clonar repositorio
git clone https://github.com/AlejandraGz/weather-intelligence-dashboard.git


# Entrar al proyecto
cd weather-intelligence-dashboard

# Instalar dependencias
npm install

# Ejecutar proyecto
npm start

```

Abrir en navegador:

```
http://localhost:4200
```

---

## 📦 Estructura del proyecto

El proyecto sigue una arquitectura modular y escalable:
```

app/
├── core/                # Servicios globales (API, estado, tema)
├── features/
│   └── weather/         # Módulo principal del dominio
│       ├── components/  # Componentes UI
│       ├── models/      # Tipos y modelos
│       └── pages/       # Vistas principales
├── shared/              # Elementos reutilizables
```

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado como práctica para:

* Implementar **arquitectura escalable en Angular**
* Manejar estado global con **RxJS**
* Construir interfaces reactivas
* Integrar librerías externas como Chart.js
* Implementar **dark mode profesional**

---

## 🚀 Mejoras futuras

* 📍 Geolocalización automática
* 🌡️ Más métricas (humedad, viento, sensación térmica)
* 📱 Mejoras responsive
* 🔔 Alertas climáticas
* 🌎 Soporte multi-ciudad

---

## 👨‍💻 Autor

Desarrollado por **Alejandra Gonzalez Melendez**
