import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadPath } from '../app.constant';

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  constructor(private http: HttpClient) {}

  loadFile(name: LoadPath) {
    const PATH = `app/data/${name}.txt`;
    return this.http.get(PATH, { responseType: 'text' as 'json' });
  }

  forkAllfile() {
    return forkJoin({
      [LoadPath.DAI_TU]: this.loadFile(LoadPath.DAI_TU),
      [LoadPath.DAI_TU_CHI_DINH]: this.loadFile(LoadPath.DAI_TU_CHI_DINH),
      [LoadPath.DANH_TU]: this.loadFile(LoadPath.DANH_TU),
      [LoadPath.DANH_TU_CHI_DVDL]: this.loadFile(LoadPath.DANH_TU_CHI_DVDL),
      [LoadPath.DANH_TU_LOAI_THE]: this.loadFile(LoadPath.DANH_TU_LOAI_THE),
      [LoadPath.DINH_TU_CHI_SO_LUONG]: this.loadFile(
        LoadPath.DINH_TU_CHI_SO_LUONG
      ),
      [LoadPath.DONG_TU]: this.loadFile(LoadPath.DONG_TU),
      [LoadPath.PHO_TU_DUNG_SAU]: this.loadFile(LoadPath.PHO_TU_DUNG_SAU),
      [LoadPath.PHO_TU_DUNG_TRUOC]: this.loadFile(LoadPath.PHO_TU_DUNG_TRUOC),
      [LoadPath.QUAN_HE_TU]: this.loadFile(LoadPath.QUAN_HE_TU),
      [LoadPath.SO_TU_CHI_SO_LUONG]: this.loadFile(LoadPath.SO_TU_CHI_SO_LUONG),
      [LoadPath.THAN_TU]: this.loadFile(LoadPath.THAN_TU),
      [LoadPath.TINH_THAI_TU]: this.loadFile(LoadPath.TINH_THAI_TU),
      [LoadPath.TINH_THAI_TU_CAU_KHIEN]: this.loadFile(
        LoadPath.TINH_THAI_TU_CAU_KHIEN
      ),
      [LoadPath.TINH_THAI_TU_NGHI_VAN]: this.loadFile(
        LoadPath.TINH_THAI_TU_NGHI_VAN
      ),
      [LoadPath.TINH_TU]: this.loadFile(LoadPath.TINH_TU),
      [LoadPath.TINH_TU_CACH_THUC_MUC_DO]: this.loadFile(
        LoadPath.TINH_TU_CACH_THUC_MUC_DO
      ),
    });
  }
}
