# zuru-pokemon

`zuru-pokemon` es una herramienta de información para jugar Pokémon.

Su objetivo es responder rápido consultas de juego (tipos, evoluciones, stats y comparación) para ayudar a tomar decisiones durante la partida.

## Estado

Proyecto en definición de producto y alcance.

## Visión

Centralizar información táctica útil en una herramienta rápida, clara y confiable.

## Problema

La información para jugar está dispersa y hace perder tiempo. `zuru-pokemon` la reúne en consultas simples y accionables.

## MVP

1. Búsqueda por nombre/ID.
2. Ficha de Pokémon (tipo, stats base, habilidades).
3. Matchups de tipos (debilidades, resistencias, inmunidades).
4. Evoluciones y condiciones.
5. Comparador 1v1.
6. Favoritos locales.

## No-MVP

- Cuentas/autenticación.
- Funciones sociales/multijugador.
- Simulador de combate completo.
- Integraciones externas no críticas.

## Cierre de esta etapa

Se cierra cuando:

1. La visión está clara y sin ambigüedades.
2. El MVP y No-MVP están definidos.
3. Hay criterios de aceptación medibles.
4. Richard aprueba inicio de código.

## Criterios de aceptación del MVP

1. Búsqueda en máximo 3 pasos.
2. Ficha completa en una sola vista.
3. Matchups claros y legibles.
4. Evoluciones con condiciones visibles cuando existan.
5. Comparador funcional entre 2 Pokémon.
6. Guardado y listado de favoritos locales.

## Principios

1. Velocidad primero.
2. Información accionable.
3. Simplicidad funcional.
4. Mobile-first.

## Desarrollo autónomo (tras aprobación)

Ciclo de trabajo:
- plan corto,
- implementación,
- pruebas mínimas,
- reporte.

Escalación obligatoria si hay:
- cambio de alcance,
- decisión de producto,
- riesgo técnico alto o bloqueo crítico.

## Datos

Fuente inicial: PokéAPI.

Reglas:
- cache local,
- manejo de errores/fallback,
- capa de servicios para desacoplar UI y datos.

## Archivos guía

- `README.md`
- `PLAN.md`
