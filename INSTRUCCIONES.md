# VozTask — Instrucciones de Instalación

## Lo que necesitas (todo gratis)

| Servicio | Para qué | Link |
|---|---|---|
| HuggingFace | Transcripción de voz (Whisper) | huggingface.co |
| Google AI Studio | IA para organizar tareas (Gemini) | aistudio.google.com |
| Google Sheets | Base de datos | sheets.google.com |
| GitHub Pages o Netlify | Publicar la app | github.com / netlify.com |

---

## PASO 1 — Obtener API Key de HuggingFace (Whisper)

1. Ve a **huggingface.co** → Registrarte gratis
2. Clic en tu avatar → **Settings** → **Access Tokens**
3. Clic **New token** → Name: `voztask` → Role: `Read` → **Generate**
4. Copia el token (empieza con `hf_...`)

---

## PASO 2 — Obtener API Key de Gemini

1. Ve a **aistudio.google.com** → Iniciar sesión con Google
2. Clic en **Get API key** → **Create API key in new project**
3. Copia la key (empieza con `AIza...`)

---

## PASO 3 — Configurar Google Sheets (Base de datos)

### 3a. Crear la hoja
1. Ve a **sheets.google.com** → Crear nueva hoja
2. Nómbrala **VozTask**
3. Copia la URL de la hoja (la necesitarás para el Apps Script)

### 3b. Agregar el Apps Script
1. En Google Sheets → menú **Extensiones** → **Apps Script**
2. Borra el código que aparece
3. Copia y pega todo el contenido del archivo **Code.gs** que está en esta carpeta
4. Clic en el ícono de guardar (💾) → nómbralo `VozTask`
5. Clic en **Implementar** → **Nueva implementación**
6. Tipo: **Aplicación web**
7. Descripción: `VozTask v1`
8. Ejecutar como: **Yo**
9. Quién tiene acceso: **Cualquier usuario** ← MUY IMPORTANTE
10. Clic **Implementar** → Autorizar permisos → **Permitir**
11. **Copia la URL de implementación** (algo como `https://script.google.com/macros/s/AKfycb.../exec`)

---

## PASO 4 — Configurar la app (index.html)

Abre el archivo **index.html** con cualquier editor de texto (Notepad, VS Code, etc.)

Busca esta sección al inicio del archivo:

```javascript
const CONFIG = {
  HF_TOKEN:   'hf_TU_TOKEN_AQUI',
  GEMINI_KEY: 'AIza_TU_KEY_AQUI',
  SHEETS_URL: 'https://script.google.com/macros/s/TU_ID_AQUI/exec',
  WHISPER_MODEL: 'openai/whisper-large-v3-turbo',
};
```

Reemplaza:
- `hf_TU_TOKEN_AQUI` → tu token de HuggingFace del Paso 1
- `AIza_TU_KEY_AQUI` → tu key de Gemini del Paso 2
- `TU_ID_AQUI` → la URL completa del Apps Script del Paso 3b

Guarda el archivo.

---

## PASO 5 — Publicar la app (elige una opción)

### Opción A: GitHub Pages (recomendado)
1. Ve a **github.com** → Crear cuenta gratis si no tienes
2. Clic **+** → **New repository** → Nombre: `voztask` → Public → **Create**
3. Arrastra los archivos de esta carpeta al repositorio
4. Ve a **Settings** → **Pages** → Source: **main** → **Save**
5. Tu app estará en: `https://TU_USUARIO.github.io/voztask/`

### Opción B: Netlify (más fácil)
1. Ve a **netlify.com** → Crear cuenta gratis
2. Arrastra la carpeta completa `voztask-app` a netlify.com/drop
3. Tu app tendrá una URL automática como `voztask-abc123.netlify.app`

---

## PASO 6 — Instalar en iPhone

1. Abre la URL de tu app en **Safari** (debe ser Safari, no Chrome en iPhone)
2. Toca el botón de **Compartir** (□↑) en la barra inferior
3. Desplaza hacia abajo → toca **"Agregar a pantalla de inicio"**
4. Nombre: **VozTask** → toca **Agregar**
5. La app aparecerá en tu pantalla de inicio como una app nativa
6. **Primera vez**: al abrir, Safari pedirá permiso para el micrófono → toca **Permitir**

---

## PASO 7 — Instalar en laptop (Chrome)

1. Abre la URL en Chrome
2. Aparecerá un banner "Instalar VozTask" en la app → clic **INSTALAR**
3. O en Chrome → ícono de instalación (⊕) en la barra de URL

---

## Cómo usar

| Acción | Cómo |
|---|---|
| Dictar tarea | Toca el micrófono 🎤 → habla → toca ■ para detener |
| Modo IA | Clasifica, prioriza y detecta fechas automáticamente |
| Modo Rápido | Guarda sin análisis profundo (más veloz) |
| Agregar fecha límite | Dí "antes del viernes" o "para el 5 de mayo" |
| Tarea recurrente | Dí "todos los lunes" o "cada semana" |
| Editar | Pasa el dedo sobre la tarjeta → toca ✎ |
| Completar | Toca el cuadro □ a la izquierda de la tarea |
| Eliminar varias | Toca "☐ Seleccionar" → marca tarjetas → "🗑 Eliminar" |
| Limpiar completadas | Toca "🗑 Completadas (N)" en la barra de filtros |

---

## Notas importantes

- La primera vez que uses Whisper puede tardar 10-20 segundos (el modelo se está cargando). Después es más rápido.
- Si no tienes internet, las tareas se guardan localmente y se sincronizan al reconectar.
- Los datos se almacenan en tu Google Sheet. Puedes verlos y editarlos directamente desde Sheets.
- Nunca compartas tu `index.html` con las API keys a otras personas.

---

## Solución de problemas

| Problema | Solución |
|---|---|
| "Sin conexión" aunque hay internet | Revisa que la URL del Apps Script sea correcta |
| Whisper tarda mucho | Cambia a `openai/whisper-base` en CONFIG |
| No detecta fecha límite | Usa modo IA (✦), habla claro: "para el viernes 2 de mayo" |
| iPhone no pide instalar | Debe abrirse en Safari (no Chrome ni otro browser) |
| Micrófono no funciona | Ajustes iPhone → Safari → Micrófono → Permitir |
