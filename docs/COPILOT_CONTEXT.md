**Contexto UI para AdoptaFácil**

1. **Propósito**

   - No modificar lógica, sólo UI.
   - App desarrollada en React Native / Expo.

2. **Paleta de colores**

   - Usar exclusivamente la paleta definida en `PALETA_COLORES.md` para fondos, textos, bordes, sombras, inputs, tarjetas y botones.
   - No inventar colores.

3. **Consistencia visual**

   - Mantener consistencia con `login.tsx` (espaciados, radios, sombras, gradiente principal).
   - Usar el Gradiente Principal `#02d36bff → #0000c5ff` en hero/headers cuando aplique.
   - Usar el Gradiente Secundario `#68d391 → #63b3ed` para acentos amplios.

4. **Estructura y buenas prácticas**

   - Evitar “containers dobles”: no anidar vistas con mismo fondo/sombra/borde; no duplicar gradientes.
   - Un único contenedor visual por sección/componente.
   - Optimizar para móvil: compacto, moderno, legible, accesible (contraste ≥ 4.5:1).
   - No cambiar funcionalidad ni datos, sólo estilos y estructura visual (`View`, `StyleSheet`, props de estilo).

5. **Patrones establecidos en index.tsx**

   - Hero: Inputs directos sobre gradiente (sin contenedores extra) con `rgba(255,255,255,0.2)` fondo y `rgba(255,255,255,0.4)` borde.
   - Botón primario: `#00b746bf` con texto `#ffffff`.
   - Tarjetas: fondo `#ffffff` con borde `#e2e8f0` y texto `#2d3748`.
   - Secciones: categorías `#f8f9fa`, featured `#f0fff4` (verde claro suave personalizado).
   - Estadísticas: colores de acento `#68d391`, `#63b3ed`, `#a78bfa`.

6. **Consistencia en toda la app**
   - Reutilizar estos patrones en `settings.tsx` y `gestionar-mascotas.tsx` para mantener consistencia visual.

**Patrones establecidos en index.tsx:**

- Hero: Inputs directos sobre gradiente (sin contenedores extra) con rgba(255,255,255,0.2) fondo y rgba(255,255,255,0.4) borde
- Botón primario: #00b746bf con texto #ffffff
- Tarjetas: fondo #ffffff con borde #e2e8f0 y texto #2d3748
- Secciones: categorías #f8f9fa, featured #f0fff4 (verde claro suave personalizado)
- Estadísticas: colores de acento #68d391, #63b3ed, #a78bfa

Reutilizar estos patrones en settings.tsx y gestionar-mascotas.tsx para mantener consistencia visual.
