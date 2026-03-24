import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private readonly http: HttpClient) {}

  getPokemonList(limit = 20, offset = 0): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonByNameOrId(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${nameOrId}`);
  }

  getSpeciesByNameOrId(nameOrId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${nameOrId}`);
  }

  getEvolutionChainByUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
