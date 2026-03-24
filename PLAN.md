# PLAN - zuru-pokemon

## Visión

Construir una herramienta confiable y rápida para consultar información relevante de Pokémon durante gameplay, útil para cualquier jugador y cualquier entrega de la saga.

## Fase 1: Definición de producto y alcance

### Objetivo
Definir con precisión qué problema se resuelve, para quién y con qué alcance inicial.

### Entregables
- Definición formal del producto en `README.md`.
- Alcance de MVP validado.
- Lista de casos de uso prioritarios.

### Criterios de salida (DoD)
- Visión clara y no ambigua.
- MVP acotado y viable.
- Criterios de éxito definidos.

### Duración estimada
1-2 días.

---

## Fase 2: Arquitectura y base técnica

### Objetivo
Definir arquitectura inicial basada en PokéAPI, con estructura de proyecto mantenible.

### Entregables
- Selección de stack frontend.
- Capa de servicios para consumo de PokéAPI.
- Estrategia de cache local.
- Estructura de carpetas y convenciones.

### Criterios de salida (DoD)
- Proyecto base ejecutable.
- Servicios de API abstraídos.
- Manejo básico de errores y estados de carga.

### Riesgos y mitigación
- Riesgo: latencia o caída de API externa.
- Mitigación: cache + fallback de UI.

### Duración estimada
2-4 días.

---

## Fase 3: Implementación MVP (núcleo funcional)

### Objetivo
Construir funcionalidades clave para consulta útil en juego real.

### Módulos MVP
1. **Buscador rápido** por nombre/ID.
2. **Ficha de Pokémon** (tipo, stats, habilidades).
3. **Matchups de tipos** (debilidades/resistencias/inmunidades).
4. **Evoluciones y condiciones**.
5. **Comparador básico** 1v1.
6. **Favoritos locales**.

### Criterios de salida (DoD)
- Flujo completo usable en móvil y escritorio.
- Tiempo de respuesta aceptable para consulta rápida.
- Datos coherentes y validados contra PokéAPI.

### Duración estimada
5-8 días.

---

## Fase 4: Stabilización y mejoras tácticas

### Objetivo
Aumentar confiabilidad y utilidad en escenarios reales de uso.

### Entregables
- Pruebas funcionales de módulos críticos.
- Optimización de rendimiento percibido.
- Documentación técnica y de uso.
- Backlog priorizado para v2.

### Criterios de salida (DoD)
- Errores críticos corregidos.
- Experiencia de consulta rápida y estable.
- Roadmap de evolución definido.

### Duración estimada
2-4 días.

---

## Métricas de éxito (MVP)

1. Usuario encuentra info clave en menos de 3 pasos.
2. Tiempo de consulta percibido menor a 2-3 segundos en casos comunes.
3. Cobertura de casos de uso base (búsqueda, tipo, evolución, comparación).
4. Tasa baja de errores en consumo de API.

---

## Reglas de ejecución autónoma

1. Priorizar valor funcional sobre complejidad técnica innecesaria.
2. No ampliar alcance sin aprobación explícita.
3. Documentar decisiones relevantes al finalizar cada fase.
4. Mantener enfoque en herramienta útil para jugar, no en demo visual.
