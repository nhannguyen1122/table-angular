import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SentenceService } from 'src/app/service/sentence.service';
import { LoadPath, WordsDefinition } from 'src/app/app.constant';
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

  @Output() dataEmitter = new EventEmitter<any>();

  ngOnInit(): void {
    console.log('WordsDefinition', WordsDefinition);

    this.senetenceService.forkAllfile().subscribe((res: any) => {
      this.dataState = {
        [WordsDefinition[LoadPath.DAI_TU]]: this.mapData(res[LoadPath.DAI_TU]),
        [WordsDefinition[LoadPath.DAI_TU_CHI_DINH]]: this.mapData(
          res[LoadPath.DAI_TU_CHI_DINH]
        ),
        [WordsDefinition[LoadPath.DANH_TU]]: this.mapData(
          res[LoadPath.DANH_TU]
        ),
        [WordsDefinition[LoadPath.DANH_TU_CHI_DVDL]]: this.mapData(
          res[LoadPath.DANH_TU_CHI_DVDL]
        ),
        [WordsDefinition[LoadPath.DANH_TU_TONG_LUONG]]: this.mapData(
          res[LoadPath.DANH_TU_TONG_LUONG]
        ),
        [WordsDefinition[LoadPath.DANH_TU_LOAI_THE]]: this.mapData(
          res[LoadPath.DANH_TU_LOAI_THE]
        ),
        [WordsDefinition[LoadPath.DINH_TU_CHI_SO_LUONG]]: this.mapData(
          res[LoadPath.DINH_TU_CHI_SO_LUONG]
        ),
        [WordsDefinition[LoadPath.DONG_TU]]: this.mapData(
          res[LoadPath.DONG_TU]
        ),
        [WordsDefinition[LoadPath.PHO_TU_DUNG_SAU]]: this.mapData(
          res[LoadPath.PHO_TU_DUNG_SAU]
        ),
        [WordsDefinition[LoadPath.PHO_TU_DUNG_TRUOC]]: this.mapData(
          res[LoadPath.PHO_TU_DUNG_TRUOC]
        ),
        [WordsDefinition[LoadPath.QUAN_HE_TU]]: this.mapData(
          res[LoadPath.QUAN_HE_TU]
        ),
        [WordsDefinition[LoadPath.SO_TU_CHI_SO_LUONG]]: this.mapData(
          res[LoadPath.SO_TU_CHI_SO_LUONG]
        ),
        [WordsDefinition[LoadPath.THAN_TU]]: this.mapData(
          res[LoadPath.THAN_TU]
        ),
        [WordsDefinition[LoadPath.TINH_THAI_TU]]: this.mapData(
          res[LoadPath.TINH_THAI_TU]
        ),
        [WordsDefinition[LoadPath.TINH_THAI_TU_CAU_KHIEN]]: this.mapData(
          res[LoadPath.TINH_THAI_TU_CAU_KHIEN]
        ),
        [WordsDefinition[LoadPath.TINH_THAI_TU_NGHI_VAN]]: this.mapData(
          res[LoadPath.TINH_THAI_TU_NGHI_VAN]
        ),
        [WordsDefinition[LoadPath.TINH_TU]]: this.mapData(
          res[LoadPath.TINH_TU]
        ),
        [WordsDefinition[LoadPath.TINH_TU_CACH_THUC_MUC_DO]]: this.mapData(
          res[LoadPath.TINH_TU_CACH_THUC_MUC_DO]
        ),
      };
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
    console.log('dataState', this.dataState);
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
      //find all words entered in type
      const classifiedWords = this.senetenceService.setTypeWordsInSentence(
        this.keywords,
        this.dataState
      );

      const phases =
        this.senetenceService.arrangeWordsIntoPhases(classifiedWords);
      const subject = this.senetenceService.arrangeIntoSubject(phases);
      const sentence =
        this.senetenceService.arrangeThePhraseIntoSentences(subject);
      this.dataEmitter.emit(sentence);
    }
  }

  private validator() {
    let isValid = true;
    const MAXWORDS = 5;
    if (this.keywords.length === 0) {
      this.displayError(
        'Bạn chưa thêm dữ liệu, vui lòng nhập và ấn enter để thêm từ!'
      );
      return false;
    }

    if (!this.handleCheckValidTypingWords().isValid) {
      this.displayError(
        `Không tìm thấy dữ liệu về từ: ${this.handleCheckValidTypingWords()
          .invalidWordsArr.map((i) => i.value)
          .filter((i) => i)
          .join(', ')}`
      );
      return false;
    }

    if (this.handleCheckDuplicate()) {
      this.displayError(`Các từ không được trùng nhau quá 3 lần`);
      return false;
    }

    if (this.keywords.length > MAXWORDS) {
      this.displayError('Không được nhập quá 5 từ, vui lòng nhập lại!');
      return false;
    }

    return isValid;
  }

  private mapData(data: string) {
    return data.trim().split(', ');
  }

  //check more than 3 words
  private handleCheckDuplicate() {
    let isValid = true;
    for (let i = 0; i < this.keywords.length; i++) {
      if (this.keywords.filter((x) => x === this.keywords[i]).length > 3) {
        return false;
      }
    }
    return isValid;
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

    return {
      ...validateConfig,
      isValid:
        validateConfig.invalidWordsArr.filter((i) => !i.isValid && i.value)
          .length === 0,
    };
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
