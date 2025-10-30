import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Perfil } from '../../../shared/services/perfil';
import { Match } from '../match';
import { FilterService } from '../../../services/filter/filter-service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  opciones: string[] = ['Tiempo Completo', 'Medio Tiempo', 'Freelance', 'Prácticas', 'Tecnología'];
  seleccionados: any = {};
  perfil = inject(Perfil);
  match = inject(Match);
  filter = inject(FilterService);
  fb = inject(FormBuilder);

  idiomasDisponibles: Idioma[] = [];
  mostrarListaHabilidad: boolean[] = [];
  mostrarListaIdioma: boolean[] = [];

  nuevaVacante: FormGroup = this.fb.group({
    vacanteHabilidades: this.fb.array([]),
    vacantesIdiomas: this.fb.array([]),
  });

  borrarFiltros() {
    this.seleccionados = {};
  }
  // ========= GETTERS para FormArrays =========
  get habilidades(): FormArray {
    return this.nuevaVacante.get('vacanteHabilidades') as FormArray;
  }

  get idiomas(): FormArray {
    const response = this.nuevaVacante.get('vacantesIdiomas') as FormArray;
    return response;
  }

  seleccionarIdioma(index: number, idioma: Idioma) {
    this.idiomas.at(index).setValue(idioma.id_idioma);
    this.mostrarListaIdioma[index] = false;
  }

  eliminarSelectIdioma(index: number) {
    this.idiomas.removeAt(index);
    this.mostrarListaIdioma.splice(index, 1);
  }

  toggleListaIdioma(index: number) {
    this.perfil.getIdiomas().subscribe({
      next: (res: Idioma[]) => {
        this.idiomasDisponibles = res;
        console.log('Idiomas cargados:', this.idiomasDisponibles);
        this.mostrarListaIdioma[index] = !this.mostrarListaIdioma[index]; // ✅ Solo aquí
      },
      error: () => console.error('Error al cargar idiomas'),
    });
  }

  agregarIdioma() {
    this.idiomas.push(this.fb.control(''));
    this.mostrarListaIdioma.push(false);
  }

  aplicarFiltros() {
    const idsSeleccionados: number[] = this.idiomas.value.filter((id: any) => id !== '');
    console.log('✅ IDs de idiomas seleccionados:', idsSeleccionados);

    sessionStorage.setItem('idIdiomas', idsSeleccionados.toString());

    this.filter.enviarIdiomasSeleccionados(idsSeleccionados).subscribe({
      next: (res) => console.log('✅ Filtros enviados correctamente:', res),
      error: (err) => console.error('❌ Error al enviar filtros:', err),
    });
  }
}
