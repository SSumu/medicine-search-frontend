import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Medicine {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  description?: string;
}

// ✅ Single correct base URL
const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api/medicines',
};

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  // ✅ FIX: do NOT append /medicines again
  private BASE_URL = API_CONFIG.BASE_URL;

  constructor(private http: HttpClient) {}

  // =====================
  // GET ALL
  // =====================
  getAllMedicines(): Observable<Medicine[]> {
    return this.http.get<any>(this.BASE_URL).pipe(
      map((res) => {
        if (Array.isArray(res)) return res;
        if (res?.data) return res.data;
        if (res?.medicines) return res.medicines;
        return [];
      }),
    );
  }

  // =====================
  // GET BY ID
  // =====================
  getMedicineById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.BASE_URL}/${id}`);
  }

  // =====================
  // ADD
  // =====================
  addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.BASE_URL, medicine);
  }

  // =====================
  // UPDATE
  // =====================
  updateMedicine(id: number, medicine: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.BASE_URL}/${id}`, medicine);
  }

  // =====================
  // DELETE
  // =====================
  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  // =====================
  // SEARCH
  // =====================
  searchMedicines(keyword: string): Observable<Medicine[]> {
    const url = `${this.BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        if (Array.isArray(res)) return res;
        if (res?.data) return res.data;
        if (res?.medicines) return res.medicines;
        return [];
      }),
    );
  }

  // =====================
  // REFRESH
  // =====================
  refreshMedicines(): Observable<Medicine[]> {
    return this.getAllMedicines();
  }
}
