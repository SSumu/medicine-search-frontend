import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Medicine } from '../../../models/medicine/medicine.model';
import { MedicineService } from './medicine.service';

@Component({
  selector: 'app-medicine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
})
export class MedicineComponent implements OnInit {
  medicines: Medicine[] = [];
  filteredMedicines: Medicine[] = [];
  searchText: string = '';

  constructor(private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  // =====================================================
  // LOAD ALL MEDICINES
  // =====================================================
  loadMedicines(): void {
    this.medicineService.getAllMedicines().subscribe({
      next: (data: Medicine[]) => {
        this.medicines = data ?? [];
        this.filteredMedicines = data ?? [];
      },
      error: (err) => {
        console.error('Error loading medicines:', err);
        this.medicines = [];
        this.filteredMedicines = [];
      },
    });
  }

  // =====================================================
  // SEARCH MEDICINES
  // =====================================================
  search(): void {
    const keyword = this.searchText.trim();

    if (!keyword) {
      this.filteredMedicines = [...this.medicines];
      return;
    }

    this.medicineService.searchMedicines(keyword).subscribe({
      next: (data: Medicine[]) => {
        this.filteredMedicines = data ?? [];
      },
      error: (err) => {
        console.error('Search error:', err);
        this.filteredMedicines = [];
      },
    });
  }

  // =====================================================
  // DELETE MEDICINE
  // =====================================================
  deleteMedicine(id: number): void {
    this.medicineService.deleteMedicine(id).subscribe({
      next: () => {
        this.loadMedicines();
      },
      error: (err) => {
        console.error('Delete error:', err);
      },
    });
  }
}
