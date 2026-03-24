# zuru-pokemon

`zuru-pokemon` es una **herramienta de información útil para jugar cualquier juego de Pokémon**.

No busca ser solo una Pokédex visual: su objetivo es dar respuestas rápidas y accionables para tomar mejores decisiones mientras juegas.

## Objetivo del producto

Construir una base sólida y escalable para consulta táctica Pokémon, con enfoque en:
- rapidez de respuesta,
- claridad de información,
- utilidad real en gameplay,
- evolución incremental por fases.

## Problema que resuelve

Cuando un jugador necesita decidir rápido (qué tipo usar, cómo evoluciona un Pokémon, qué movimiento conviene, cómo cubrir debilidades del equipo), la información suele estar dispersa.

`zuru-pokemon` centraliza y simplifica esa información en un formato práctico.

## Principios de diseño

1. **Velocidad primero**: respuesta en 2-3 pasos.
2. **Información accionable**: menos relleno, más decisión.
3. **Mobile-first**: pensada para usar mientras se juega.
4. **Escalable**: arquitectura preparada para crecer por módulos.
5. **Fuente confiable**: PokéAPI como backend de datos inicial.

## Fuente de datos (backend)

Se usará **PokéAPI** como backend de datos en la primera etapa para reducir tiempo de implementación.

- API pública de solo lectura (GET)
- amplia cobertura de entidades Pokémon
- ideal para MVP rápido

### Consideraciones técnicas
- usar cache local para reducir latencia y consumo de requests,
- diseñar capa de servicios para desacoplar lógica de UI,
- incluir manejo de errores/fallback cuando la API externa no responda.

## Alcance del MVP

El MVP debe cubrir consultas esenciales para juego real:

1. Búsqueda rápida por nombre/ID
2. Ficha de Pokémon (tipo, stats base, habilidades)
3. Matchups de tipos (debilidades/resistencias/inmunidades)
4. Evoluciones y condiciones
5. Comparador básico entre 2 Pokémon
6. Favoritos locales para acceso rápido

## Estructura actual del repositorio

- `README.md` — definición de producto y lineamientos.
- `PLAN.md` — plan de ejecución por fases con entregables.

## Resultado esperado de Fase 1

Dejar una definición cerrada del producto y del MVP, con criterios de éxito medibles y sin ambigüedades para ejecución autónoma.
