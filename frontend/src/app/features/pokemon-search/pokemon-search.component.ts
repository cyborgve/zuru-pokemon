import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../../core/services/pokeapi.service';
import { Pokemon } from '../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="panel">
      <header class="hero">
        <h2>Zuru Pokédex Táctica</h2>
        <p>Consulta rápida para gameplay en español.</p>
      </header>

      <div class="row row-search">
        <input [(ngModel)]="query" placeholder="Nombre o ID (ej: pikachu o 25)" (keyup.enter)="search()" />
        <button [disabled]="loading()" (click)="search()">Buscar</button>
        <button class="btn-soft" (click)="clearSearch()">Limpiar</button>
      </div>

      <p *ngIf="loading()" class="estado">Cargando datos...</p>
      <p *ngIf="error()" class="error">{{ error() }}</p>

      <section class="inicial" *ngIf="!pokemon() && initialList().length">
        <h3>Explorar rápido</h3>
        <div class="grid">
          <button class="poke-chip" *ngFor="let item of initialList()" (click)="loadFavorite(item)">
            {{ capitalize(item) }}
          </button>
        </div>
      </section>

      <article *ngIf="pokemon() as p" class="card" [style.border-color]="typeColor(primaryType(p))">
        <header class="head">
          <h3>#{{ p.id }} {{ capitalize(p.name) }}</h3>
          <button class="fav" (click)="toggleFavorite(p.name)">
            {{ isFavorite(p.name) ? '★ Quitar favorito' : '☆ Agregar favorito' }}
          </button>
        </header>

        <img *ngIf="p.sprites.front_default" [src]="p.sprites.front_default" [alt]="p.name" />

        <p>
          <strong>Tipos:</strong>
          <span *ngFor="let t of p.types" class="badge" [style.background]="typeColor(t.type.name)">
            {{ capitalize(t.type.name) }}
          </span>
        </p>
        <p><strong>Altura:</strong> {{ p.height }}</p>
        <p><strong>Peso:</strong> {{ p.weight }}</p>

        <h4>Stats base</h4>
        <ul class="stats">
          <li *ngFor="let s of p.stats">
            <div class="stat-row">
              <span>{{ translateStat(s.stat.name) }}</span>
              <strong>{{ s.base_stat }}</strong>
            </div>
            <div class="stat-bar"><span [style.width.%]="statPercent(s.base_stat)"></span></div>
          </li>
        </ul>

        <h4>Habilidades</h4>
        <ul>
          <li *ngFor="let a of p.abilities">{{ capitalize(a.ability.name) }} <span *ngIf="a.is_hidden">(oculta)</span></li>
        </ul>

        <h4>Matchups</h4>
        <p><strong>Débil a:</strong> {{ weaknesses().join(', ') || '—' }}</p>
        <p><strong>Resiste:</strong> {{ resistances().join(', ') || '—' }}</p>
        <p><strong>Inmune a:</strong> {{ immunities().join(', ') || '—' }}</p>

        <h4>Evoluciones</h4>
        <p>{{ evolutions().map(capitalize).join(' → ') || 'Sin datos de evolución' }}</p>
      </article>

      <section *ngIf="pokemon()" class="compare">
        <h4>Comparador 1v1</h4>
        <div class="row">
          <input [(ngModel)]="compareQuery" placeholder="Nombre o ID rival" (keyup.enter)="compare()" />
          <button (click)="compare()">Comparar</button>
        </div>
        <p *ngIf="compareError()" class="error">{{ compareError() }}</p>
        <div *ngIf="comparePokemon() as cp" class="mini-card">
          <p><strong>{{ capitalize(pokemon()?.name || '') }}</strong> vs <strong>{{ capitalize(cp.name) }}</strong></p>
          <p>Total base: {{ baseTotal(pokemon()!) }} vs {{ baseTotal(cp) }}</p>
          <p><strong>Ventaja sugerida:</strong> <span class="winner">{{ winnerText() }}</span></p>
        </div>
      </section>

      <section class="favorites" *ngIf="favorites().length">
        <h4>Favoritos</h4>
        <div class="chips">
          <button *ngFor="let f of favorites()" (click)="loadFavorite(f)">{{ capitalize(f) }}</button>
        </div>
      </section>
    </section>
  `,
  styles: [`
    .panel { padding: 1rem; border: 1px solid #e2e8f0; border-radius: 14px; background: #fff; }
    .hero { margin-bottom: .75rem; }
    .hero h2 { margin: 0 0 .25rem; }
    .hero p { margin: 0; color: #475569; }
    .row { display: flex; gap: .5rem; margin-bottom: .75rem; }
    .row-search button { min-width: 96px; }
    input { flex: 1; padding: .65rem; border: 1px solid #cbd5e1; border-radius: 10px; }
    button { padding: .6rem .85rem; border: 0; border-radius: 10px; background: #1d4ed8; color: #fff; }
    button[disabled] { opacity: .7; cursor: not-allowed; }
    .btn-soft { background: #64748b; }
    .estado { color: #334155; }
    .error { color: #b00020; }
    .inicial h3 { margin: .5rem 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(120px,1fr)); gap: .5rem; }
    .poke-chip { background: #f1f5f9; color: #0f172a; border: 1px solid #e2e8f0; }
    .card, .mini-card { padding: .85rem; background: #f8fafc; border-radius: 12px; margin-top: .75rem; border: 2px solid #cbd5e1; }
    img { width: 110px; height: 110px; image-rendering: pixelated; background: #fff; border-radius: 10px; }
    ul { margin: .25rem 0 .75rem; }
    .head { display: flex; justify-content: space-between; align-items: center; gap: .5rem; }
    .fav { white-space: nowrap; background: #0f766e; }
    .chips { display: flex; flex-wrap: wrap; gap: .5rem; }
    .chips button { background: #f59e0b; color: #111827; }
    .compare, .favorites { margin-top: 1rem; }
    .badge { display: inline-block; margin-left: .35rem; color: #fff; padding: .1rem .45rem; border-radius: 999px; font-size: .78rem; }
    .stats { list-style: none; padding: 0; }
    .stat-row { display: flex; justify-content: space-between; margin-bottom: .15rem; }
    .stat-bar { height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-bottom: .4rem; }
    .stat-bar span { display: block; height: 100%; background: #2563eb; }
    .winner { color: #166534; }
    @media (max-width: 600px) { .row { flex-direction: column; } }
  `]
})
export class PokemonSearchComponent implements OnInit {
  private readonly api = inject(PokeApiService);
  private readonly http = inject(HttpClient);

  query = '';
  compareQuery = '';

  loading = signal(false);
  error = signal<string | null>(null);
  pokemon = signal<Pokemon | null>(null);
  initialList = signal<string[]>([]);

  comparePokemon = signal<Pokemon | null>(null);
  compareError = signal<string | null>(null);

  evolutions = signal<string[]>([]);

  typeDamageMap = signal<Record<string, { double_damage_from: string[]; half_damage_from: string[]; no_damage_from: string[] }>>({});

  favorites = signal<string[]>(this.readFavorites());

  weaknesses = computed(() => this.calcDamage().weak);
  resistances = computed(() => this.calcDamage().resist);
  immunities = computed(() => this.calcDamage().immune);

  ngOnInit(): void {
    this.loadInitial();
    this.query = 'pikachu';
    this.search();
  }

  clearSearch(): void {
    this.query = '';
    this.error.set(null);
    this.compareError.set(null);
    this.comparePokemon.set(null);
    this.pokemon.set(null);
  }

  private loadInitial(): void {
    this.api.getPokemonList(12, 0).subscribe({
      next: (res) => this.initialList.set(res.results.map(x => x.name)),
      error: () => this.initialList.set([])
    });
  }

  search(): void {
    const value = this.query.trim().toLowerCase();
    if (!value) {
      this.error.set('Ingresa un nombre o ID');
      this.pokemon.set(null);
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.comparePokemon.set(null);
    this.compareError.set(null);

    this.api.getPokemonByNameOrId(value).subscribe({
      next: (p) => {
        this.pokemon.set(p);
        this.loadTypeDamage(p);
        this.loadEvolutions(p.id);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se encontró el Pokémon');
        this.pokemon.set(null);
        this.loading.set(false);
      }
    });
  }

  compare(): void {
    const base = this.pokemon();
    const rival = this.compareQuery.trim().toLowerCase();

    if (!base) {
      this.compareError.set('Busca primero un Pokémon base');
      return;
    }
    if (!rival) {
      this.compareError.set('Ingresa un rival para comparar');
      return;
    }

    this.compareError.set(null);
    this.api.getPokemonByNameOrId(rival).subscribe({
      next: p => this.comparePokemon.set(p),
      error: () => this.compareError.set('No se encontró el rival')
    });
  }

  winnerText(): string {
    const a = this.pokemon();
    const b = this.comparePokemon();
    if (!a || !b) return '—';
    const ta = this.baseTotal(a);
    const tb = this.baseTotal(b);
    if (ta === tb) return 'Empate técnico';
    return ta > tb ? `${this.capitalize(a.name)} (por stats base)` : `${this.capitalize(b.name)} (por stats base)`;
  }

  baseTotal(p: Pokemon): number {
    return p.stats.reduce((acc, s) => acc + s.base_stat, 0);
  }

  statPercent(base: number): number {
    return Math.min(100, Math.round((base / 255) * 100));
  }

  capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  toggleFavorite(name: string): void {
    const normalized = name.toLowerCase();
    const set = new Set(this.favorites());
    if (set.has(normalized)) set.delete(normalized);
    else set.add(normalized);
    const next = Array.from(set);
    this.favorites.set(next);
    localStorage.setItem('zp_favorites', JSON.stringify(next));
  }

  isFavorite(name: string): boolean {
    return this.favorites().includes(name.toLowerCase());
  }

  loadFavorite(name: string): void {
    this.query = name;
    this.search();
  }

  typeNames(p: Pokemon): string {
    return p.types.map(t => this.capitalize(t.type.name)).join(', ');
  }

  primaryType(p: Pokemon): string {
    return p.types[0]?.type?.name ?? 'normal';
  }

  typeColor(type: string): string {
    const map: Record<string, string> = {
      fire: '#ef4444', water: '#3b82f6', grass: '#22c55e', electric: '#facc15',
      psychic: '#ec4899', ice: '#67e8f9', dragon: '#7c3aed', dark: '#374151',
      fairy: '#f9a8d4', normal: '#94a3b8', fighting: '#b45309', flying: '#60a5fa',
      poison: '#a855f7', ground: '#a16207', rock: '#78716c', bug: '#65a30d',
      ghost: '#6366f1', steel: '#64748b'
    };
    return map[type] ?? '#94a3b8';
  }

  translateStat(stat: string): string {
    const map: Record<string, string> = {
      hp: 'PS', attack: 'Ataque', defense: 'Defensa',
      'special-attack': 'At. Especial', 'special-defense': 'Def. Especial', speed: 'Velocidad'
    };
    return map[stat] ?? stat;
  }

  private loadTypeDamage(p: Pokemon): void {
    const types = p.types.map(t => t.type.name);
    const requests = types.map(type => this.http.get<any>(`https://pokeapi.co/api/v2/type/${type}`));

    if (!requests.length) {
      this.typeDamageMap.set({});
      return;
    }

    let pending = requests.length;
    const map: Record<string, { double_damage_from: string[]; half_damage_from: string[]; no_damage_from: string[] }> = {};

    requests.forEach(req => {
      req.subscribe({
        next: (r) => {
          map[r.name] = {
            double_damage_from: r.damage_relations.double_damage_from.map((x: any) => x.name),
            half_damage_from: r.damage_relations.half_damage_from.map((x: any) => x.name),
            no_damage_from: r.damage_relations.no_damage_from.map((x: any) => x.name)
          };
        },
        error: () => {},
        complete: () => {
          pending -= 1;
          if (pending === 0) this.typeDamageMap.set(map);
        }
      });
    });
  }

  private calcDamage(): { weak: string[]; resist: string[]; immune: string[] } {
    const p = this.pokemon();
    if (!p) return { weak: [], resist: [], immune: [] };

    const map = this.typeDamageMap();
    const weak = new Set<string>();
    const resist = new Set<string>();
    const immune = new Set<string>();

    for (const t of p.types.map(x => x.type.name)) {
      const rel = map[t];
      if (!rel) continue;
      rel.double_damage_from.forEach(x => weak.add(x));
      rel.half_damage_from.forEach(x => resist.add(x));
      rel.no_damage_from.forEach(x => immune.add(x));
    }

    immune.forEach(x => {
      weak.delete(x);
      resist.delete(x);
    });

    return {
      weak: Array.from(weak).sort(),
      resist: Array.from(resist).sort(),
      immune: Array.from(immune).sort()
    };
  }

  private loadEvolutions(pokemonId: number): void {
    this.api.getSpeciesByNameOrId(pokemonId).subscribe({
      next: species => {
        const url = species?.evolution_chain?.url;
        if (!url) {
          this.evolutions.set([]);
          return;
        }
        this.api.getEvolutionChainByUrl(url).subscribe({
          next: chain => this.evolutions.set(this.flattenChain(chain?.chain)),
          error: () => this.evolutions.set([])
        });
      },
      error: () => this.evolutions.set([])
    });
  }

  private flattenChain(node: any): string[] {
    if (!node) return [];
    const result: string[] = [];
    let current: any = node;
    while (current) {
      if (current.species?.name) result.push(current.species.name);
      current = current.evolves_to?.[0];
    }
    return result;
  }

  private readFavorites(): string[] {
    try {
      const raw = localStorage.getItem('zp_favorites');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
