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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  keywords = [] as string[];
  formControl = new FormControl(['']);

  announcer = inject(LiveAnnouncer);

  constructor(
    private senetenceService: SentenceService,
    private snackbar: MatSnackBar
  ) {}

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
    console.log('data state', this.dataState);

    console.log('formControl.value', this.keywords);
    if (this.validator()) {
      console.log('vao day');
    }
  }

  private validator() {
    let isValid = true;

    if (this.keywords.length === 0) {
      this.displayError(
        'Bạn chưa thêm dữ liệu, vui lòng nhập và ấn enter để thêm từ!'
      );
      return false;
    }

    if (!this.handleCheckValidTypingWords().isValid) {
      this.displayError(
        `Không tìm thấy dữ liệu về từ: ${this.handleCheckValidTypingWords()
          .invalidWordsArr.filter((i) => i)
          .map((i) => i.value)
          .join(', ')}`
      );
      return false;
    }

    if (!this.handleCheckDuplicate().isValid) {
      this.displayError(
        `Các từ không được trùng nhau quá 3 lần:${this.handleCheckDuplicate().invalidWordsArr.join(
          ','
        )}`
      );
      return false;
    }

    return isValid;
  }

  private mapData(data: string) {
    return data.trim().split(', ');
  }

  //check more than 3 words
  private handleCheckDuplicate() {
    let validateConfig = {
      invalidWordsArr: [] as string[],
    };

    this.keywords.some((keyword: string, index: number) => {
      if (this.keywords.indexOf(keyword) !== index) {
        validateConfig.invalidWordsArr.push(keyword);
      }
    });
    console.log('validateConfig', {
      isValid: validateConfig.invalidWordsArr.length < 3,
      invalidWordsArr: validateConfig.invalidWordsArr,
    });

    return {
      isValid: validateConfig.invalidWordsArr.length < 3,
      invalidWordsArr: validateConfig.invalidWordsArr,
    };
  }

  //check all words enter have in txt file
  private handleCheckValidTypingWords() {
    let validateConfig = {
      isValid: true,
      invalidWordsArr: [] as {
        isValid: boolean;
        value: string | null;
      }[],
    };
    for (
      let typingWordIndex = 0;
      typingWordIndex < this.keywords.length;
      typingWordIndex++
    ) {
      validateConfig.invalidWordsArr.push({
        value: !this.isExistedWord(this.keywords[typingWordIndex])
          ? this.keywords[typingWordIndex]
          : null,
        isValid: this.isExistedWord(this.keywords[typingWordIndex]),
      });
    }

    return (validateConfig = {
      ...validateConfig,
      isValid:
        validateConfig.invalidWordsArr.filter((i) => !i.isValid && i.value)
          .length === 0,
    });
  }

  //check each word is in txt file
  private isExistedWord(typingword: string) {
    let isExisted = false;
    for (let property in this.dataState) {
      if (this.dataState[property].indexOf(typingword) > -1) {
        isExisted = true;
      }
    }
    return isExisted;
  }

  private displayError(msg: string) {
    this.snackbar.open(msg, 'Lỗi', {
      duration: 2000,
      direction: 'ltr',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
