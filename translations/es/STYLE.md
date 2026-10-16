# Guía de estilo · Español

Cómo suena LastSave en español. Léela entera antes de traducir, y cuando una decisión se repita en
varias pantallas, apúntala aquí o en `GLOSSARY.md`. Las reglas generales (que quepa, que esté
localizado, que no rompa nada) están en la skill `lastsave-localization`. Esta guía añade lo propio
del español.

Lo marcado **(por confirmar)** es la propuesta inicial. Se fija con la primera sección revisada.

## Para quién escribimos

Un solo español, `es`, para Latinoamérica y España. Usamos palabras que se entienden en los dos
lados. Si hay que elegir entre una forma latinoamericana y una de España, gana la que se entiende en
ambos sitios. Si ninguna se entiende en los dos, se decide en `GLOSSARY.md`.

- Nada de regionalismos de un solo país: ni «computadora» ni «ordenador» (mejor «PC» o «equipo»),
  ni «celular» ni «móvil» si se puede evitar.
- Sin *voseo*: «elige», no «elegí».
- Nada de giros coloquiales de un país: «de qué trata», no «de qué va»; «principales», no «de
  cabecera». El autor los marca en la revisión aunque se entiendan.

## Tratamiento: tú

Siempre *tú*, nunca *usted*. Es lo que usan Windows, la Microsoft Store, Steam y los juegos.

- Instrucciones y descripciones en imperativo de *tú*: «Elige una carpeta», «Arrastra tus capturas
  aquí».
- **Botones y opciones de menú en infinitivo**: «Guardar», «Añadir juego», «Revisar juegos nuevos».
  Es la convención del software en español y además suele ser más corto.
- Lenguaje inclusivo sin barras ni arrobas: no «bienvenido/a» sino «Te damos la bienvenida»; no
  «¿Estás seguro?» sino «¿Seguro que quieres…?».

## Tono

El de `docs/vision.md`: cálido, cercano, con chispa y **sin culpa**. LastSave no regaña por un
backlog largo ni por un juego abandonado.

- Frases cortas. Un jugador escanea, no lee.
- Se permiten guiños gamers donde el inglés también los hace. Si el chiste inglés no funciona, se
  escribe otro en el mismo espíritu. Savvy habla como alguien que juega, no como un manual.
- Los mensajes de error dicen qué pasó y qué hacer, sin disculpas largas.

## Mayúsculas

Mayúscula solo al principio, como en una frase normal. El inglés usa *Title Case* en botones y
títulos («Add Game», «Check New Games»); en español no: «Añadir juego», «Revisar juegos nuevos».

- Los nombres propios de la app sí van con mayúscula: Modo Juego, Biblioteca (cuando nombra la
  sección), LastSave, Savvy. **(por confirmar)** qué secciones se tratan como nombres propios.
- Las etiquetas en versalitas (`uppercase` por CSS) se escriben en minúscula normal en el JSON; el
  estilo las convierte.

## Puntuación y tipografía

- Signos de apertura siempre: «¿Seguro que quieres salir?», «¡Listo!».
- Comillas: “ ” como en el texto inglés. **(por confirmar)** frente a « ».
- Porcentaje con espacio: «63 %». **(por confirmar)**
- Puntos suspensivos: el carácter «…», no tres puntos.
- Sin punto final en botones, títulos, opciones de menú ni etiquetas. Sí en frases completas de
  descripción.
- Fechas, horas y números no se escriben a mano: los formatea la app con `Intl` según el idioma.

## Lo que no se traduce

- Nombres de juegos, géneros, plataformas, compañías y eventos que vienen de IGDB.
- Marcas: Steam, Epic Games, GOG, Xbox, PlayStation, Nintendo, Microsoft Store, Discord, SteamGridDB,
  IGDB, LastSave, Savvy.
- Teclas, tal como vienen impresas en la mayoría de teclados: Shift, Enter, Ctrl, Alt, Esc, Tab, F11.
- Botones de mando, tal como los imprime la consola: A, B, X, Y, LB, RB, View, Menu.

## Lo que se escribe como lo dice Windows en español

Cuando el texto manda a una pantalla de Windows, se usan **las palabras exactas del Windows en
español**, no una traducción propia. El jugador las va a buscar en pantalla.

| Inglés en la app | Windows en español |
|---|---|
| Settings › Gaming › Captures | Configuración › Juegos › Capturas |
| Xbox Game Bar | Xbox Game Bar |

Amplía la tabla cada vez que aparezca una ruta nueva, y compruébala en un Windows en español.

## Valores que se insertan en una frase

Algunas frases reciben otra etiqueta como valor: «Moved to {{status}}» (un estado), «Sorted by
{{sort}}» (un orden del Modo Juego), «Ready to use {{recorder}}» (una marca). La frase se escribe de
modo que **cualquier** valor encaje sin concordancias de género ni número: «Estado: {{status}}»,
«Orden: {{sort}}», «Listo para usar {{recorder}}». Nunca se cambia la etiqueta para que encaje en una
sola frase.

Lo mismo con los sustitutos de un título que falta («this game», «this attached content»): ocupan el
lugar de un nombre, así que se traducen como un sintagma que funcione donde iría el título («este
juego»).

## Plurales

El español necesita tres formas: `_one`, `_many` y `_other`. `_many` solo se usa con millones
exactos («1 000 000 de juegos»). Si no hay nada especial que decir, es una copia de `_other`
(`pnpm --filter lastsave l10n:check -- --fix-plurals` lo hace solo). `_one` puede escribir el número
en letras: «Un juego».
