# Glosario · Español

Los términos fijos de LastSave en español. Una vez decidido, un término se usa igual en todas las
pantallas. Si un texto pide otra palabra, se discute aquí antes de usarla.

Cada término tiene uno de tres destinos:

- **traducido**: tiene una palabra en español (Biblioteca);
- **préstamo**: se queda como lo dicen los jugadores (Clip, DLC);
- **marca**: nombre propio que no se toca (Steam).

Los términos se deciden con Miguel sobre capturas reales, sección por sección, empezando por la
estructura (menú, estados y tipos de registro). Hasta entonces la tabla de «Decididos» solo tiene
lo que ya está acordado, y la de «Candidatos» sirve de punto de partida.

## Decididos

| Inglés | Español | Destino | Notas |
|---|---|---|---|
| Shift · Enter · Ctrl · Alt · Esc · Tab | igual | préstamo | Como vienen impresos en el teclado |
| Steam · Epic Games · GOG · Xbox · PlayStation · Discord · SteamGridDB · IGDB | igual | marca | |
| Track it. Finish it. Remember it. | Juégalo. Termínalo. Recuérdalo. | marca, traducción cerrada | El eslogan se traduce por idioma, pero solo lo decide el autor: no está en el catálogo ni en el Studio, sino en `shared/constants/brand.ts` (y `apps/web/src/content/landing.ts`). Decidido 2026-10-15 |
| LastSave · Savvy | igual | marca | |
| Xbox Game Bar · NVIDIA App · AMD Adrenalin | igual | marca | Grabadores de clips (`playing:clips.recorders`) |
| Settings | Ajustes | traducido | Decidido 2026-10-13 |
| Add · Add Game | Añadir · Añadir juego | traducido | Decidido 2026-10-13: «añadir» en toda la app, nunca «agregar» («Añadir a mi biblioteca») |
| Shelves | Estanterías | traducido | Femenino: «esta estantería». Cambiado de «Estantes» el 2026-10-13 |
| Backlog (estado) | Por jugar | traducido | Cambiado de «Pendiente» el 2026-10-15: se entiende mejor. Invariable («3 Por jugar»). El backlog como idea, en prosa, sigue siendo «tus pendientes» (los quips, la descripción) |
| Wishlist (estado) | Deseado | traducido | En contadores y prosa, «Deseados» |
| Journeys | Misiones | traducido | Una misión: femenino («tu misión», «completada»). No «Aventuras»: choca con el género de IGDB |
| Completed · Dropped | Completado · Abandonado | traducido | |
| Endless | Sin fin | traducido | |
| Unstatus · No Status | Sin estado | traducido | Los dos |
| Achievement types | Reto (Challenge) · Hallazgo (Discovery) · Jefe (Boss) | traducido | Más Trofeo, Mazmorra, Tesoro, Easter egg, Récord, Rango / Nivel, Mejora, Capítulo, Otro |
| Attached content | Contenido adicional | traducido | |
| Duration | 2h 30m · 39h · 45m | formato | Compacto como en inglés |

## Usados en la sección Biblioteca (a revisar)

Regla de diseño confirmada: ningún texto ocupa más líneas en español que en inglés (una línea sigue en una, dos siguen en dos). Se reformula más corto, no se deja crecer. El audit lo mide (`longer`).


| Inglés | Español | Destino | Notas |
|---|---|---|---|
| Card | Tarjeta | traducido | |
| View · Cards · List · Board | Vista · Tarjetas · Lista · Tablero | traducido | |
| Collection (saga de IGDB) | Saga | traducido | «Colección» queda para tu colección |
| My rating | Mi puntaje | traducido | El puntaje de 0 a 10 de una reseña; chip «Puntaje 8+». Decidido 2026-10-13 |
| Play · Start (cronómetro) | Jugar · Iniciar | traducido | |
| Add Log | Anotar | traducido | Botón, título del modal, overlay. Decidido 2026-10-13: «Registrar» sonaba a trámite |
| Log (un elemento) | Entrada | traducido | «Editar entrada», «Eliminar entrada» |
| Logs (la línea de tiempo de un juego) | Historial de progreso · historial | traducido | La cabecera dice «Historial de progreso · 13» (*Progression Logs*), y el artículo de ayuda, «El historial de progreso». En el texto corrido, «historial» a secas («todo su historial: sesiones, logros…», «el historial del juego»), salvo en los avisos de borrar donde cabe la forma larga. Cambiado de «Bitácora» el 2026-10-16: sonaba a barco o a blog. Masculino: «todo su historial» |
| Journal Entry | Entrada de diario | traducido | El filtro de registros dice «Diario» |
| Moved to {{status}} | Pasó a {{status}} | traducido | Vale para cualquier estado |
| Contained · Separated (DLC) | Agrupado · Separado | traducido | |
| Launcher | Launcher | préstamo | |
| Shortcut | Acceso directo | traducido | El nombre de Windows |
| Auto-sync | Autosincronización | traducido | |
| Publisher | Distribuidor | traducido | |
| Timer | Cronómetro | traducido | Solo el *timer*: «Solo el cronómetro», «Iniciar (solo cronómetro)», el modal de sesión con cronómetro |
| Track (a game / a session) · Tracking | Detectar · Detección | traducido | «Detectar el juego», «Detecta tus sesiones», «Inicio y detección avanzados». Decidido 2026-10-13: nunca «cronometrar» (eso es el *timer*) ni «registrar» (las entradas se anotan) |

## Usados en la sección Ajustes (a revisar)

| Inglés | Español | Destino | Notas |
|---|---|---|---|
| Overlay | Overlay | préstamo | Como lo dicen los jugadores (overlay de Steam, de NVIDIA) |
| Pill (el overlay compacto) | Píldora | traducido | |
| Focus mode | Modo enfoque | traducido | |

## Usados en la sección El resto (a revisar)

| Inglés | Español | Destino | Notas |
|---|---|---|---|
| Report · Bug · Feedback · Idea | Reporte · Error · Comentario · Idea | traducido | «Enviar reporte», «Reporta un error o una idea» (igual que en Ajustes) |
| Crash | Fallo | traducido | «Reportar este fallo», «Fallo: {{error}}»; *error* queda para el tipo de reporte |
| What's new | Novedades | traducido | «Novedades de la v0.6.0»; *Full changelog*, «Todos los cambios» |
| Banner · Logo | Banner · Logo | préstamo | Como en Ajustes → Arte |
| Default (arte) | Predeterminado | traducido | |
| Mark all read | Marcar todo leído | traducido | Una notificación: «Marcar como leída» |
| Caption (de una captura) | Nota | traducido | «Añadir una nota…» (decidido 2026-10-14; no «pie») |
| Keep editing (confirmaciones del Modo Juego) | Conservar | traducido | Frente a «Descartar»; en escritorio sigue «Seguir editando» |
| Playing Mode | Partida en curso | traducido | El grupo de atajos y el panel del juego abierto |
| Shortcut · Chord | Atajo · Combinación | traducido | |
| Controller | Control | traducido | Latinoamérica; «mando» queda en las palabras de búsqueda |
| System tray | Bandeja del sistema | traducido | |
| Media folder | Carpeta multimedia | traducido | Lo que guarda son «archivos» |
| Backup | Copia de seguridad · copia | traducido | «Copia» a secas cuando el contexto ya lo dice |
| Logs (diagnóstico) | Registros | traducido | Nunca para las entradas de un juego |
| Check for updates | Buscar actualizaciones | traducido | |
| Mouse | Mouse | traducido | Latinoamérica («ratón» en España) |

Las palabras clave de búsqueda (`*.keywords`) van en español, con algún término inglés que la gente
también escribe (backup, changelog, gamepad).

## Usados en la sección Importar (a revisar)

| Inglés | Español | Destino | Notas |
|---|---|---|---|
| Import · Import games | Importar · Importar juegos | traducido | |
| Source | Fuente | traducido | «Recomendadas», «Más fuentes» |
| This PC | Este equipo | traducido | El nombre de Windows |
| Set up | Configurar | traducido | El paso del asistente; el botón «Set them up» es «Configurarlas» |
| Scan · Check for new games | Buscar · Revisar juegos nuevos | traducido | *Check* es revisar (decidido 2026-10-13): el botón dice «Revisar juegos nuevos», luego «Revisando…», «Al día» o «Juegos nuevos». *Scan* sigue siendo buscar, salvo el hardware: «Escanear mi PC» (decidido 2026-10-14; el «Detect» de Editar perfil sigue como «Detectar») |
| Wishlist (la de una tienda) | Lista de deseados | traducido | En listas cortas, «Deseados»; el estado sigue siendo «Deseado» |
| Family shared | Compartido en familia | traducido | En el resumen corto, «Familia» |
| Unplayed | Sin jugar | traducido | |
| Discard · Ignored | Descartar · Ignorados | traducido | |
| Identify | Identificar | traducido | |
| Launch options · Launch path | Opciones de inicio · Ruta de inicio | traducido | |
| Core (RetroArch) | Core | préstamo | Como en RetroArch en español |
| ROM | ROM | préstamo | «las ROMs» |
| Desktop · Start Menu (carpetas de búsqueda) | Escritorio · Programas del menú Inicio | traducido | Vienen de main (`main.json`, `scanRoots`) |

## Usados en la sección Explorar (a revisar)

| Inglés | Español | Destino | Notas |
|---|---|---|---|
| Explore | Explorar | traducido | |
| Time Machine | Máquina del tiempo | traducido | |
| Best of Companies · Best by Genre | Por compañía · Por género | traducido | En los títulos de diálogo: «Mejores por compañía», «Mejores por género» |
| Platform Icons | Clásicos de plataforma | traducido | Decidido en la revisión de Explorar; la tarjeta dice «Clásicos de consolas» |
| GOTY · GOTYs | GOTY | préstamo | Sin plural: «los GOTY»; «Juego del Año» al explicarlo |
| Hall of Fame | Salón de la fama | traducido | |
| User Rating · Critic Rating | Puntaje de usuarios · Puntaje de la crítica | traducido | Coherente con «Mi puntaje» |
| Time to Beat | Duración | traducido | |
| Materialize (copiar un juego de IGDB al catálogo local) | Copiar | traducido | «Copiar y editar» |
| Main Game · Standalone Expansion · Bundle | Juego principal · Expansión independiente · Paquete | traducido | Los tipos de IGDB pasan por `gameTypeLabel` |
| Livestream | Directo | traducido | |
| Add to Library (botón de tarjeta y detalle) | Añadir | traducido | «Ya añadido» al lado; «Game Details» es «Detalles» |
| Powered by IGDB | Datos de IGDB | traducido | |
| About (compañía, evento) | Información | traducido | |
| Clear search | Borrar búsqueda | traducido | En todos los buscadores (decidido 2026-10-14) |

## Usados en la sección Colecciones (a revisar)

| Inglés | Español | Destino | Notas |
|---|---|---|---|
| Pin · Pinned | Fijar · Fijadas | traducido | «Fijar en la barra lateral» |
| Your rotation | Tu rotación | traducido | |
| Active · Mains · Next (carriles) | Activos · Principales · Próximos | traducido | Decidido en la revisión de Colecciones (no «De cabecera») |
| Free slot | Hueco libre | traducido | |
| Journey complete | Misión cumplida | traducido | Las misiones terminadas son «Cumplidas» |
| On hold (misión) | En espera | traducido | No «En pausa», que es un estado de juego |
| Up next | Lo siguiente | traducido | |
| Goal: Complete them · Play them | Completarlos · Jugarlos | traducido | |

## Usados en la sección Perfil y compartir (a revisar)

| Inglés | Español | Destino | Notas |
|---|---|---|---|
| My review · Rating | Mi reseña · Puntaje | traducido | «Puntuar y reseñar»; «al reseñar» |
| PC build | Tu PC | traducido | |
| Connected accounts | Cuentas conectadas | traducido | |
| Reconnect needed | Hay que reconectar | traducido | |
| Nickname | Apodo | traducido | |
| logged with LastSave (descripción para compartir) | anotado en LastSave | traducido | Nunca «registrado»; *tracked* queda «en LastSave» |
| Card (para compartir) | Tarjeta | traducido | |
| Lossless · Compressed | Sin pérdida · Comprimida | traducido | |
| Render | Renderizar | préstamo | |

## Usados en Modo Juego y Jugando (a revisar)

| Inglés | Español | Destino | Notas |
|---|---|---|---|
| Game Mode | Modo Juego | traducido | «Entrar al Modo Juego», «Salir del Modo Juego»; en la leyenda, «Salir» |
| Controller | Control | traducido | «Control de Xbox» |
| Jump back in | Vuelve a jugar | traducido | |
| Sorted by {{sort}} | Orden: {{sort}} | traducido | Los valores en minúscula (`sortInLine`) |
| Live · Playing for | En vivo · Tiempo de juego | traducido | |
| Session over | Sesión terminada | traducido | «sin cambios» del estado queda «igual» (no cabe) |
| Detecting (modo de pantalla) | Comprobando la ventana | traducido | Para no chocar con «Detectando» (*tracking*) |
| Focus mode | Modo enfoque | traducido | |

## Candidatos (sin decidir)

| Inglés | Propuesta | Alternativas | Notas |
|---|---|---|---|
| Home | Inicio | | Steam, Xbox |
| Library | Biblioteca | | |
| Explore | Explorar | | |
| Rotation | Rotación | | |
| Profile | Perfil | | |
| Game Mode | Modo Juego | | |
| Playing · Paused · Played | Jugando · En pausa · Jugado | | |
| Session · Journal · Achievement | Sesión · Diario · Logro | Nota | «Trofeos» es de PlayStation |
| Status update | Cambio de estado | | |
| Screenshot · Clip · Recording | Captura · Clip · Grabación | | |
| Memories | Recuerdos | | |
| Reactions | Basura · Malo · OK · Genial · Maravilla | | La impresión de una sesión. *Masterpiece* es «Maravilla» (2026-10-16): «Obra maestra» se partía en dos líneas |
| Video | video | vídeo | Sin tilde, la forma de Latinoamérica (la RAE acepta las dos) |
