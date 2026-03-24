# zuru-pokemon

`zuru-pokemon` es una **herramienta táctica de información para jugar cualquier juego de Pokémon**.

Su propósito es resolver consultas de juego en segundos (tipos, evoluciones, stats y comparación), sin ruido y con foco en decisiones rápidas.

---

## Estado actual

Proyecto en **Fase 1: Definición de producto y alcance**.

> Regla activa: no se avanza a fases posteriores hasta cerrar y aprobar Fase 1.

---

## Visión

Centralizar la información táctica más útil de Pokémon en una herramienta rápida, clara y confiable, para que cualquier jugador tome mejores decisiones durante una partida.

## Problema que resuelve

La información útil para jugar está fragmentada y hace perder tiempo. `zuru-pokemon` la concentra en consultas simples, accionables y de alta velocidad.

---

## Alcance del MVP (cerrado en Fase 1)

1. Búsqueda rápida por nombre/ID.
2. Ficha de Pokémon (tipo, stats base, habilidades).
3. Matchups de tipos (debilidades/resistencias/inmunidades).
4. Evoluciones y condiciones.
5. Comparador básico entre 2 Pokémon.
6. Favoritos locales para acceso rápido.

## Fuera de alcance (No-MVP)

- Cuentas y autenticación.
- Funciones sociales/multijugador.
- Simulador de combate completo.
- Integraciones externas no críticas.
- Cualquier módulo fuera de la lista MVP.

---

## Criterios de éxito de Fase 1

Fase 1 se cierra cuando:

1. Visión del producto clara y no ambigua.
2. MVP delimitado (qué entra / qué no entra).
3. No-MVP documentado explícitamente.
4. Criterios medibles de aceptación definidos.
5. Aprobación explícita de Richard para iniciar código.

---

## Principios de producto

1. **Velocidad primero** (respuesta en 2-3 pasos).
2. **Información accionable** sobre estética.
3. **Simplicidad funcional** sobre complejidad prematura.
4. **Mobile-first** (uso en medio de partida).
5. **No adelantar fases** sin aprobación.

---

## Modo de desarrollo autónomo (después de aprobación de Fase 1)

Una vez aprobada Fase 1, el equipo opera en ciclos autónomos:

- **Plan corto → implementación → pruebas → reporte**.
- Sin bloqueos por micro-decisiones.
- Escalación solo en cambios de alcance, riesgo alto o decisiones de producto.

### Reglas de autonomía

1. No alterar alcance MVP sin aprobación.
2. Entregar incrementos pequeños y verificables.
3. Documentar decisiones técnicas relevantes en cada ciclo.
4. Mantener trazabilidad de cambios (commit + checklist de validación).

---

## Fuente de datos inicial

Se usará **PokéAPI** en la etapa inicial por velocidad de ejecución y cobertura funcional.

Requisitos de uso:
- Cache local para reducir latencia/costos de consultas.
- Manejo de errores/fallback de API externa.
- Capa de servicios para desacoplar UI de la fuente de datos.

---

## Estructura actual del repositorio

- `README.md` — definición funcional y operativa de Fase 1.
- `PLAN.md` — plan de ejecución y condiciones de cierre.
