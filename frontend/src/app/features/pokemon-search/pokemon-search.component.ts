import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
        <input [(ngModel)]="query" placeholder="Nombre o ID" />
        <button (click)="search()">Buscar</button>
      </div>

      <p *ngIf="loading()">Cargando...</p>
      <p *ngIf="error()" class="error">{{ error() }}</p>

      <article *ngIf="pokemon() as p" class="card">
        <h3>#{{ p.id }} {{ p.name }}</h3>
        <img *ngIf="p.sprites.front_default" [src]="p.sprites.front_default" [alt]="p.name" />
        <p><strong>Tipos:</strong> {{ typeNames(p) }}</p>
        <p><strong>Altura:</strong> {{ p.height }}</p>
        <p><strong>Peso:</strong> {{ p.weight }}</p>
      </article>
    </section>
  `,
  styles: [`
    .search { padding: 1rem; border: 1px solid #ddd; border-radius: 12px; }
    .row { display: flex; gap: .5rem; margin-bottom: .75rem; }
    input { flex: 1; padding: .5rem; }
    button { padding: .5rem .75rem; }
    .error { color: #b00020; }
    .card { padding: .75rem; background: #f8f9fb; border-radius: 10px; }
    img { width: 96px; height: 96px; image-rendering: pixelated; }
  `]
})
export class PokemonSearchComponent {
  private readonly api = inject(PokeApiService);

  query = '';
  loading = signal(false);
  error = signal<string | null>(null);
  pokemon = signal<Pokemon | null>(null);

  search(): void {
    const value = this.query.trim().toLowerCase();
    if (!value) {
      this.error.set('Ingresa un nombre o ID');
      this.pokemon.set(null);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.api.getPokemonByNameOrId(value).subscribe({
      next: (p) => {
        this.pokemon.set(p);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se encontró el Pokémon');
        this.pokemon.set(null);
        this.loading.set(false);
      }
    });
  }

  typeNames(p: Pokemon): string {
    return p.types.map(t => t.type.name).join(', ');
  }
}
