import { Component, computed, inject, signal } from '@angular/core';
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
    <section class="search">
      <h2>Buscador Pokémon</h2>
      <div class="row">
        <input [(ngModel)]="query" placeholder="Nombre o ID" (keyup.enter)="search()" />
        <button (click)="search()">Buscar</button>
      </div>

      <p *ngIf="loading()">Cargando...</p>
      <p *ngIf="error()" class="error">{{ error() }}</p>

      <article *ngIf="pokemon() as p" class="card">
        <header class="head">
          <h3>#{{ p.id }} {{ p.name }}</h3>
          <button class="fav" (click)="toggleFavorite(p.name)">
            {{ isFavorite(p.name) ? '★ Quitar favorito' : '☆ Agregar favorito' }}
          </button>
        </header>

        <img *ngIf="p.sprites.front_default" [src]="p.sprites.front_default" [alt]="p.name" />

        <p><strong>Tipos:</strong> {{ typeNames(p) }}</p>
        <p><strong>Altura:</strong> {{ p.height }}</p>
        <p><strong>Peso:</strong> {{ p.weight }}</p>

        <h4>Stats base</h4>
        <ul>
          <li *ngFor="let s of p.stats">{{ s.stat.name }}: {{ s.base_stat }}</li>
        </ul>

        <h4>Habilidades</h4>
        <ul>
          <li *ngFor="let a of p.abilities">{{ a.ability.name }} <span *ngIf="a.is_hidden">(oculta)</span></li>
        </ul>

        <h4>Matchups</h4>
        <p><strong>Débil a:</strong> {{ weaknesses().join(', ') || '—' }}</p>
        <p><strong>Resiste:</strong> {{ resistances().join(', ') || '—' }}</p>
        <p><strong>Inmune a:</strong> {{ immunities().join(', ') || '—' }}</p>

        <h4>Evoluciones</h4>
        <p>{{ evolutions().join(' → ') || 'Sin datos de evolución' }}</p>
      </article>

      <section *ngIf="pokemon()" class="compare">
        <h4>Comparador 1v1</h4>
        <div class="row">
          <input [(ngModel)]="compareQuery" placeholder="Nombre o ID rival" (keyup.enter)="compare()" />
          <button (click)="compare()">Comparar</button>
        </div>
        <p *ngIf="compareError()" class="error">{{ compareError() }}</p>
        <div *ngIf="comparePokemon() as cp" class="mini-card">
          <p><strong>{{ pokemon()?.name }}</strong> vs <strong>{{ cp.name }}</strong></p>
          <p>Base stat total: {{ baseTotal(pokemon()!) }} vs {{ baseTotal(cp) }}</p>
          <p><strong>Ventaja sugerida:</strong> {{ winnerText() }}</p>
        </div>
      </section>

      <section class="favorites" *ngIf="favorites().length">
        <h4>Favoritos</h4>
        <div class="chips">
          <button *ngFor="let f of favorites()" (click)="loadFavorite(f)">{{ f }}</button>
        </div>
      </section>
    </section>
  `,
  styles: [`
    .search { padding: 1rem; border: 1px solid #ddd; border-radius: 12px; }
    .row { display: flex; gap: .5rem; margin-bottom: .75rem; }
    input { flex: 1; padding: .5rem; }
    button { padding: .5rem .75rem; }
    .error { color: #b00020; }
    .card, .mini-card { padding: .75rem; background: #f8f9fb; border-radius: 10px; margin-top: .5rem; }
    img { width: 96px; height: 96px; image-rendering: pixelated; }
    ul { margin: .25rem 0 .75rem; }
    .head { display: flex; justify-content: space-between; align-items: center; gap: .5rem; }
    .fav { white-space: nowrap; }
    .chips { display: flex; flex-wrap: wrap; gap: .5rem; }
    .compare, .favorites { margin-top: 1rem; }
    @media (max-width: 600px) { .row { flex-direction: column; } }
  `]
})
export class PokemonSearchComponent {
  private readonly api = inject(PokeApiService);
  private readonly http = inject(HttpClient);

  query = '';
  compareQuery = '';

  loading = signal(false);
  error = signal<string | null>(null);
  pokemon = signal<Pokemon | null>(null);

  comparePokemon = signal<Pokemon | null>(null);
  compareError = signal<string | null>(null);

  evolutions = signal<string[]>([]);

  typeDamageMap = signal<Record<string, { double_damage_from: string[]; half_damage_from: string[]; no_damage_from: string[] }>>({});

  favorites = signal<string[]>(this.readFavorites());

  weaknesses = computed(() => this.calcDamage().weak);
  resistances = computed(() => this.calcDamage().resist);
  immunities = computed(() => this.calcDamage().immune);

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
    return ta > tb ? `${a.name} (por stats base)` : `${b.name} (por stats base)`;
  }

  baseTotal(p: Pokemon): number {
    return p.stats.reduce((acc, s) => acc + s.base_stat, 0);
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
    return p.types.map(t => t.type.name).join(', ');
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
