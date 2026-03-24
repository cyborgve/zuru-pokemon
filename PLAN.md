# PLAN - zuru-pokemon

## Propósito de este plan

Definir y cerrar **fase actual** con precisión suficiente para iniciar desarrollo autónomo con mínima intervención humana.

---

## Fase activa: fase actual (única en ejecución)

No se diseña ni ejecuta Fase 2+ hasta completar y aprobar esta fase.

## Objetivo de la fase actual

Dejar cerrado:
1. Qué problema resuelve el producto.
2. Para quién se construye.
3. Qué entra al MVP y qué queda fuera.
4. Cómo se valida que está listo para comenzar código.

---

## Entregables obligatorios de la fase actual

1. `README.md` validado con visión, alcance y límites.
2. Lista MVP priorizada (máximo 6 funcionalidades núcleo).
3. Lista No-MVP explícita.
4. Criterios de cierre medibles (DoD).
5. Criterios de aceptación funcional del MVP definidos.
6. Acuerdo de modo autónomo post-aprobación.

---

## Lista MVP (cerrada)

1. Búsqueda rápida por nombre/ID.
2. Ficha de Pokémon (tipo, stats, habilidades).
3. Matchups de tipos (debilidades/resistencias/inmunidades).
4. Evoluciones y condiciones.
5. Comparador básico 1v1.
6. Favoritos locales.

## Lista No-MVP (cerrada)

- Login/cuentas.
- Funciones sociales.
- Simulador de combate completo.
- Integraciones no esenciales.
- Funcionalidad fuera del MVP definido.

---

## Definition of Done (DoD) de la fase actual

La fase se considera terminada cuando todo esto esté en ✅:

- [ ] Visión y problema descritos sin contradicciones.
- [ ] MVP definido y acotado.
- [ ] No-MVP explícito y comprendido.
- [ ] Criterios de éxito medibles definidos.
- [ ] Reglas de autonomía documentadas.
- [ ] Aprobación final de Richard para iniciar código.

---

## Métricas de éxito de la fase actual

1. El producto puede explicarse en 1 párrafo claro.
2. El alcance MVP cabe en 6 funcionalidades núcleo.
3. Cualquier idea nueva se clasifica inmediatamente como MVP o No-MVP.
4. El foco en utilidad real para gameplay queda explícito.
5. Cada funcionalidad MVP tiene criterio de aceptación verificable.

## Criterios de aceptación funcional del MVP

1. **Búsqueda rápida**: encontrar un Pokémon por nombre/ID en máximo 3 pasos.
2. **Ficha de Pokémon**: tipo, stats base y habilidades visibles en una sola vista.
3. **Matchups de tipos**: debilidades, resistencias e inmunidades mostradas claramente.
4. **Evoluciones**: cadena evolutiva y condición de evolución mostradas cuando existan.
5. **Comparador 1v1**: comparación funcional entre dos Pokémon en la misma pantalla.
6. **Favoritos locales**: guardar y listar favoritos sin backend propio.

---

## Modo operativo autónomo (activación post-aprobación)

Al aprobar fase actual, se activa este ciclo:

1. Plan corto (objetivo y criterios de aceptación).
2. Implementación incremental.
3. Pruebas funcionales mínimas.
4. Reporte de avance y siguiente bloque.

### Escalación obligatoria (requiere intervención humana)

- Cambio de alcance de MVP.
- Decisiones de producto que alteren visión.
- Riesgo técnico alto o bloqueo crítico.

---

## Dinámica obligatoria de análisis de equipo (nueva tarea)

### Reunión de análisis (timeboxed)
- Duración total de la tarea: **15 minutos**.
- **Vegeta decide la distribución interna del tiempo** para completar la tarea (investigación, síntesis, priorización y cierre).
- Objetivo: detectar mejoras concretas al estado actual (`README.md` + `PLAN.md`) y proponer ideas nuevas de alto valor.
- Salida obligatoria: lista priorizada de mejoras con impacto esperado.

### Responsables y foco
- **Ray**: investigación funcional y de producto (utilidad real para gameplay, claridad de MVP, vacíos de alcance).
- **Lucy**: investigación técnica y operativa (riesgos, consistencia del plan, mejoras de ejecución autónoma).
- **Vegeta (coordinación)**: consolidar hallazgos, resolver conflictos y proponer versión final integrada.

### Entregables de cada sesión de 15 minutos
1. 3-5 mejoras concretas a lo actual.
2. 1-3 ideas nuevas (solo si aportan valor real y no rompen fase actual).
3. Priorización: alta / media / baja.
4. Recomendación final para actualizar `README.md` y `PLAN.md`.

### Regla de calidad
No se cierra sesión sin propuestas accionables. Se espera investigación "decente" con argumentos claros, no opiniones vagas.

---

## Timeline de la fase actual

- Duración objetivo: **1-2 días**.
- Incluye al menos una sesión formal de análisis de **15 minutos**.
- Cierre real: cuando Richard valide DoD y autorice inicio de código.

---

## Próximo hito (solo después de aprobación)

**Ajuste final de `README.md` y `PLAN.md`** con las mejores ideas consolidadas del equipo (Ray + Lucy + coordinación Vegeta), seguido de aprobación de Richard para iniciar código MVP.
