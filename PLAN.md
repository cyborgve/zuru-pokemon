# PLAN - zuru-pokemon

## Resumen ejecutivo

### Fase 1 — Base técnica
- Inicializar Angular 21.
- Definir estructura del proyecto.
- Implementar capa de servicios para PokéAPI.

### Fase 2 — MVP núcleo
- Búsqueda por nombre/ID.
- Ficha de Pokémon.
- Matchups.
- Evoluciones.
- Comparador 1v1.
- Favoritos locales.

### Fase 3 — Cierre
- Pruebas mínimas.
- Ajustes de rendimiento.
- Publicación en GitHub Pages.

---

## Plan detallado

## 1) Objetivo

Construir una herramienta táctica para consulta rápida de información Pokémon durante gameplay, con enfoque en utilidad real y ejecución autónoma.

## 2) Alcance funcional

### MVP
1. Búsqueda por nombre/ID.
2. Ficha de Pokémon (tipo, stats, habilidades).
3. Matchups (debilidades, resistencias, inmunidades).
4. Evoluciones y condiciones.
5. Comparador 1v1.
6. Favoritos locales.

### No-MVP
- Login/cuentas.
- Funciones sociales.
- Simulador de combate completo.
- Integraciones no esenciales.

## 3) Fase 1 — Base técnica (detallada)

### Tareas
1. Crear proyecto Angular 21 y configuración base.
2. Definir arquitectura de carpetas por dominio.
3. Crear capa de servicios de consumo PokéAPI.
4. Implementar manejo de errores base.
5. Implementar cache local inicial.

### Entregables
- Proyecto Angular inicial funcional.
- Servicio central de datos PokéAPI.
- Convenciones y estructura documentadas.

### Criterios de salida
- App corre local.
- Servicio de datos responde correctamente.
- Errores de red controlados sin romper UI.

## 4) Fase 2 — MVP núcleo (detallada)

### Tareas
1. Implementar buscador.
2. Implementar ficha de Pokémon.
3. Implementar vista de matchups.
4. Implementar módulo de evoluciones.
5. Implementar comparador 1v1.
6. Implementar favoritos locales.

### Entregables
- MVP completo navegable.
- Flujos principales funcionales en móvil y escritorio.

### Criterios de salida
- Cada módulo MVP cumple su criterio de aceptación.
- Navegación clara y estable.

## 5) Fase 3 — Cierre (detallada)

### Tareas
1. Pruebas funcionales mínimas.
2. Ajustes de rendimiento y carga.
3. Revisión final de errores críticos.
4. Publicación en GitHub Pages.

### Entregables
- Versión funcional publicada.
- Lista corta de pendientes post-lanzamiento (si aplica).

### Criterios de salida
- Flujo MVP estable.
- Publicación activa en GitHub Pages.

## 6) DoD global

Se considera completo cuando:
- [ ] MVP implementado según alcance.
- [ ] No-MVP respetado.
- [ ] Errores críticos resueltos.
- [ ] Publicación en GitHub Pages realizada.
- [ ] Aprobación final de Richard.

## 7) Criterios de aceptación del MVP

1. Búsqueda en máximo 3 pasos.
2. Ficha completa en una vista.
3. Matchups claros y legibles.
4. Evoluciones con condición visible cuando exista.
5. Comparador funcional entre 2 Pokémon.
6. Favoritos locales persistentes.

## 8) Operación autónoma

Ciclo de trabajo:
1. plan corto,
2. implementación incremental,
3. pruebas mínimas,
4. reporte de avance.

Escalar solo en:
- cambio de alcance,
- decisión de producto,
- bloqueo crítico o riesgo alto.

## 9) Reunión de análisis (15 min)

Duración total: 15 minutos.

Distribución del tiempo definida por Vegeta para:
- investigación,
- síntesis,
- priorización,
- cierre.

### Roles
- Ray: producto y utilidad para gameplay.
- Lucy: consistencia técnica y operativa.
- Vegeta: consolidación final.

### Salida obligatoria
1. 3-5 mejoras concretas.
2. 1-3 ideas nuevas (si aportan valor real).
3. Priorización alta/media/baja.
4. Recomendación final para README y PLAN.

## 10) Publicación

GitHub Pages.
