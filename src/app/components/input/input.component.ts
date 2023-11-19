import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SentenceService } from 'src/app/service/sentence.service';
import { LoadPath } from 'src/app/app.constant';
import { forkJoin } from 'rxjs';

/**
 * @title Chips with form control
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [SentenceService],
})
export class InputComponent implements OnInit {
  dataState: any = null;
  words = [];

  keywords = [];
  formControl = new FormControl(['']);

  announcer = inject(LiveAnnouncer);

  constructor(private senetenceService: SentenceService) {}

  ngOnInit(): void {
    this.senetenceService.forkAllfile().subscribe((res: any) => {
      this.dataState = {
        [LoadPath.DAI_TU]: this.mapData(res[LoadPath.DAI_TU]),
        [LoadPath.DAI_TU_CHI_DINH]: this.mapData(res[LoadPath.DAI_TU_CHI_DINH]),
        [LoadPath.DANH_TU]: this.mapData(res[LoadPath.DANH_TU]),
        [LoadPath.DANH_TU_CHI_DVDL]: this.mapData(
          res[LoadPath.DANH_TU_CHI_DVDL]
        ),
        [LoadPath.DANH_TU_LOAI_THE]: this.mapData(
          res[LoadPath.DANH_TU_LOAI_THE]
        ),
        [LoadPath.DINH_TU_CHI_SO_LUONG]: this.mapData(
          res[LoadPath.DINH_TU_CHI_SO_LUONG]
        ),
        [LoadPath.DONG_TU]: this.mapData(res[LoadPath.DONG_TU]),
        [LoadPath.PHO_TU_DUNG_SAU]: this.mapData(res[LoadPath.PHO_TU_DUNG_SAU]),
        [LoadPath.PHO_TU_DUNG_TRUOC]: this.mapData(
          res[LoadPath.PHO_TU_DUNG_TRUOC]
        ),
        [LoadPath.QUAN_HE_TU]: this.mapData(res[LoadPath.QUAN_HE_TU]),
        [LoadPath.SO_TU_CHI_SO_LUONG]: this.mapData(
          res[LoadPath.SO_TU_CHI_SO_LUONG]
        ),
        [LoadPath.THAN_TU]: this.mapData(res[LoadPath.THAN_TU]),
        [LoadPath.TINH_THAI_TU]: this.mapData(res[LoadPath.TINH_THAI_TU]),
        [LoadPath.TINH_THAI_TU_CAU_KHIEN]: this.mapData(
          res[LoadPath.TINH_THAI_TU_CAU_KHIEN]
        ),
        [LoadPath.TINH_THAI_TU_NGHI_VAN]: this.mapData(
          res[LoadPath.TINH_THAI_TU_NGHI_VAN]
        ),
        [LoadPath.TINH_TU]: this.mapData(res[LoadPath.TINH_TU]),
        [LoadPath.TINH_TU_CACH_THUC_MUC_DO]: this.mapData(
          res[LoadPath.TINH_TU_CACH_THUC_MUC_DO]
        ),
      };

      console.log('wordState', this.dataState);
    });
  }

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword as never);
    if (index >= 0) {
      this.keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value as never);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  handleSetSentence() {
    console.log('formControl.value', this.keywords);
  }
  private mapData(data: string) {
    return data.trim().split(', ');
  }
}
