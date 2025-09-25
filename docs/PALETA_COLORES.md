# 🎨 Paleta de Colores - AdoptaFácil

## Descripción

Paleta de colores suaves y elegantes utilizada en la aplicación AdoptaFácil, enfocada en transmitir confianza, calidez y profesionalismo para una app de adopción de mascotas.

## 🎯 Colores Principales

### Gradientes

| Nombre                   | Código HEX                | Descripción                    | Uso                                              |
| ------------------------ | ------------------------- | ------------------------------ | ------------------------------------------------ |
| **Gradiente Principal**  | `#02d36bff` → `#0000c5ff` | Verde brillante → Azul intenso | Login, header, barra de pestañas, secciones hero |
| **Gradiente Secundario** | `#68d391` → `#63b3ed`     | Verde esmeralda → Azul claro   | Acentos y elementos destacados                   |

## 📝 Colores de Texto

| Nombre               | Código HEX  | Descripción          | Uso                                  |
| -------------------- | ----------- | -------------------- | ------------------------------------ |
| **Texto Principal**  | `#0e0f11ff` | Azul oscuro login    | Títulos principales en login         |
| **Texto Secundario** | `#2a3038ff` | Azul medio login     | Subtítulos en login                  |
| **Texto Input**      | `#2d3748`   | Gris oscuro elegante | Texto en campos de entrada           |
| **Placeholder**      | `#718096`   | Gris claro           | Placeholder en campos de entrada     |
| **Texto Blanco**     | `#ffffffff` | Blanco puro          | Texto sobre botones y fondos oscuros |

## 🎨 Colores de Acento

| Nombre                | Código HEX | Descripción           | Uso                                |
| --------------------- | ---------- | --------------------- | ---------------------------------- |
| **Verde Principal**   | `#68d391`  | Verde esmeralda suave | Estadísticas, elementos destacados |
| **Azul Principal**    | `#63b3ed`  | Azul cielo claro      | Acentos secundarios                |
| **Púrpura Principal** | `#a78bfa`  | Lavanda suave         | Acentos terciarios                 |
| **Azul Botón**        | `#bee3f8`  | Azul pastel           | Botones secundarios, badges        |

## 🏠 Colores de Fondo

| Nombre              | Código HEX | Descripción    | Uso                                       |
| ------------------- | ---------- | -------------- | ----------------------------------------- |
| **Fondo Principal** | `#f7fafc`  | Gris muy claro | Fondo general de la app                   |
| **Fondo Secciones** | `#f8f9fa`  | Gris claro     | Secciones de contenido, campos de entrada |
| **Fondo Input**     | `#f8f9fa`  | Gris claro     | Fondo de campos de entrada                |
| **Fondo Blanco**    | `#ffffff`  | Blanco puro    | Tarjetas, elementos destacados            |
| **Fondo Footer**    | `#f7fafc`  | Gris muy claro | Footer de la aplicación                   |

## 🔘 Colores de Componentes

### Botones

| Componente           | Color de Fondo | Color de Texto | Descripción                         |
| -------------------- | -------------- | -------------- | ----------------------------------- |
| **Botón Primario**   | `#00b746bf`    | `#ffffffff`    | Botón de login, llamadas a acción   |
| **Botón Secundario** | `#ffffff`      | `#4a5568`      | Botones secundarios con borde       |
| **Botón Registro**   | `transparent`  | `#68d391`      | Botón de registro en login          |
| **Botón Olvidaste**  | `transparent`  | `#63b3ed`      | Botón de recuperación de contraseña |

### Tarjetas y Contenedores

| Componente            | Color de Fondo | Color de Borde | Descripción                         |
| --------------------- | -------------- | -------------- | ----------------------------------- |
| **Tarjetas**          | `#ffffff`      | `#e2e8f0`      | Tarjetas de categorías, información |
| **Contenedores**      | `#f8f9fa`      | N/A            | Secciones de contenido              |
| **Campos de entrada** | `#f8f9fa`      | `#e2e8f0`      | Campos de login, búsqueda           |

## 🌈 Combinaciones Recomendadas

### Para Texto sobre Fondos Claros

- Texto principal: `#0e0f11ff`
- Texto secundario: `#2a3038ff`
- Texto input: `#2d3748`
- Placeholder: `#718096`

### Para Texto sobre Gradientes

- Texto principal: `#ffffff`
- Texto secundario: `rgba(255, 255, 255, 0.8)`
- Texto auxiliar: `rgba(255, 255, 255, 0.6)`

## 📊 Estadísticas y Métricas

| Elemento            | Color                           | Tamaño | Peso   |
| ------------------- | ------------------------------- | ------ | ------ |
| **Números grandes** | `#68d391`, `#63b3ed`, `#a78bfa` | 24px   | bold   |
| **Etiquetas**       | `#718096`                       | 12px   | normal |
| **Títulos**         | `#2d3748`                       | 32px   | bold   |

## 🎯 Principios de Diseño

### Accesibilidad

- Contraste mínimo de 4.5:1 entre texto y fondo
- Colores diferenciables para usuarios con daltonismo
- Textos claros y legibles en todos los fondos

### Consistencia

- Uso consistente de colores en componentes similares
- Jerarquía visual clara con colores
- Paleta limitada para mantener coherencia

### Usabilidad

- Colores intuitivos (verde = éxito, azul = confianza)
- Estados hover/focus claramente diferenciados
- Feedback visual claro en interacciones

## 🚀 Implementación

### CSS/React Native

```javascript
// Colores principales actualizados para login
const colors = {
  gradient: ["#02d36bff", "#0000c5ff"],
  button: {
    primary: { background: "#00b746bf", text: "#ffffffff" },
    register: { background: "transparent", text: "#68d391" },
    forgot: { background: "transparent", text: "#63b3ed" },
  },
  input: {
    background: "#f8f9fa",
    border: "#e2e8f0",
    text: "#2d3748",
    placeholder: "#718096",
  },
  text: {
    title: "#0e0f11ff",
    subtitle: "#2a3038ff",
    white: "#ffffffff",
  },
  background: {
    main: "#f7fafc",
    section: "#f8f9fa",
    white: "#ffffff",
  },
  border: {
    card: "#e2e8f0",
    input: "#e2e8f0",
  },
};
```

### Variables CSS

```css
:root {
  --gradient-main-from: #02d36bff;
  --gradient-main-to: #0000c5ff;
  --color-btn-primary-bg: #00b746bf;
  --color-btn-primary-text: #ffffffff;
  --color-btn-register-text: #68d391;
  --color-btn-forgot-text: #63b3ed;
  --color-input-bg: #f8f9fa;
  --color-input-border: #e2e8f0;
  --color-input-text: #2d3748;
  --color-input-placeholder: #718096;
  --color-title: #0e0f11ff;
  --color-subtitle: #2a3038ff;
  --color-bg-main: #f7fafc;
  --color-bg-section: #f8f9fa;
  --color-bg-white: #ffffff;
  --color-border-card: #e2e8f0;
}
```

## 📝 Notas de Uso

- **Mantener consistencia**: Usar siempre la misma paleta en toda la aplicación
- **Extensibilidad**: La paleta permite agregar variaciones manteniendo la armonía
- **Accesibilidad**: Colores probados para cumplir estándares WCAG 2.1
- **Escalabilidad**: Paleta diseñada para crecer con la aplicación

---

_Paleta creada para AdoptaFácil - Conectando mascotas con hogares amorosos_ 🐾
