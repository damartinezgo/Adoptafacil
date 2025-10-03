Usar SIEMPRE este contexto al iniciar las tareas de UI del proyecto:

Contexto del proyecto (no modificar lógica, sólo UI):

App en React Native / Expo.

Usa exclusivamente la paleta definida en PALETA_COLORES.md para fondos, textos, bordes, sombras, inputs, tarjetas y botones. No inventar colores.

PALETA_COLORES

Mantener consistencia visual con login.tsx (espaciados, radios, sombras, gradiente principal).

login

Evitar “containers dobles”: no anidar vistas con mismo fondo/sombra/borde; no duplicar gradientes. Un único contenedor visual por sección/componente.

Optimizar para móvil: compacto, moderno, legible, accesible (contraste ≥ 4.5:1).

No cambiar funcionalidad ni datos, sólo estilos y estructura visual (View, StyleSheet, props de estilo).

Usar el Gradiente Principal #02d36bff → #0000c5ff en hero/headers cuando aplique; y el Secundario #68d391 → #63b3ed para acentos amplios.

PALETA_COLORES

Reutilizar patrones ya presentes en index.tsx (hero card, inputs sobre gradiente), settings.tsx (tarjetas blancas con borde #e2e8f0), y gestionar-mascotas.tsx (botones y cabeceras).

index

settings

gestionar-mascotas
