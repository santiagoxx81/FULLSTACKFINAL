// src/app/pages/admin/vinculos/admin-vinculos.component.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VinculosService,
  TurmaDTO,
  AlunoDTO,
  VinculoDTO
} from '../../../../services/vinculos.service'; // << caminho corrigido
import { firstValueFrom } from 'rxjs'; // << use isto no lugar de toPromise()

@Component({
  selector: 'app-admin-vinculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-vinculos.component.html',
  styleUrls: ['./admin-vinculos.component.css']
})
export class AdminVinculosComponent implements OnInit {
  turmas: TurmaDTO[] = [];
  alunos: AlunoDTO[] = [];
  vinculos: VinculoDTO[] = [];

  turmaSelecionadaId: number | null = null;
  alunoSelecionadoId: number | null = null;
  matriculaInput = '';

  carregando = false;
  erro = '';

  // filtro simples para alunos pelo nome/matrícula
  filtro = signal('');
  alunosFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.alunos;
    return this.alunos.filter(a =>
      a.nome.toLowerCase().includes(f) ||
      (a.matricula || '').toLowerCase().includes(f)
    );
  });

  constructor(private svc: VinculosService) {}

  async ngOnInit() {
    this.carregando = true;
    this.erro = '';
    try {
      this.turmas = await firstValueFrom(this.svc.listarTurmas());
      this.alunos = await firstValueFrom(this.svc.listarAlunos());
    } catch (e: any) {
      this.erro = e?.error?.message || 'Falha ao carregar dados.';
    } finally {
      this.carregando = false;
    }
  }

  async onSelecionarTurma() {
    if (!this.turmaSelecionadaId) {
      this.vinculos = [];
      return;
    }
    this.carregando = true;
    try {
      this.vinculos = await firstValueFrom(this.svc.listarVinculos(this.turmaSelecionadaId));
    } catch (e: any) {
      this.erro = e?.error?.message || 'Falha ao listar vínculos.';
    } finally {
      this.carregando = false;
    }
  }

  async vincularPorAluno() {
    if (!this.turmaSelecionadaId || !this.alunoSelecionadoId) return;
    this.carregando = true;
    this.erro = '';
    try {
      await firstValueFrom(this.svc.vincularPorAlunoId(this.turmaSelecionadaId, this.alunoSelecionadoId));
      await this.onSelecionarTurma();
      this.alunoSelecionadoId = null;
    } catch (e: any) {
      this.erro = e?.error?.message || 'Erro ao vincular por aluno.';
    } finally {
      this.carregando = false;
    }
  }

  async vincularPorMatricula() {
    if (!this.turmaSelecionadaId || !this.matriculaInput?.trim()) return;
    this.carregando = true;
    this.erro = '';
    try {
      await firstValueFrom(this.svc.vincularPorMatricula(this.turmaSelecionadaId, this.matriculaInput.trim()));
      await this.onSelecionarTurma();
      this.matriculaInput = '';
    } catch (e: any) {
      this.erro = e?.error?.message || 'Erro ao vincular por matrícula.';
    } finally {
      this.carregando = false;
    }
  }

  async remover(alunoId: number) {
    if (!this.turmaSelecionadaId) return;
    this.carregando = true;
    this.erro = '';
    try {
      await firstValueFrom(this.svc.remover(this.turmaSelecionadaId, alunoId));
      await this.onSelecionarTurma();
    } catch (e: any) {
      this.erro = e?.error?.message || 'Erro ao remover vínculo.';
    } finally {
      this.carregando = false;
    }
  }
}
