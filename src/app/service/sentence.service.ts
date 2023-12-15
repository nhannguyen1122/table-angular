import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CFirst,
  LoadPath,
  PhasesRules,
  Point,
  VFirst,
  WordTypes,
} from '../app.constant';

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
      [LoadPath.DANH_TU_TONG_LUONG]: this.loadFile(LoadPath.DANH_TU_TONG_LUONG),
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

  processWordsIntoPhases(TYPE_PHRASE, words, ans) {
    if (ans.length) {
      words.length = 0;
      ans.forEach((elm) => {
        elm.forEach((elm2) => {
          if (elm2.types) {
            words.push(elm2);
          }
        });
      });
      ans.forEach((elm) => {
        elm.filter((e) => !e.types);
      });
    }
    let list = [] as any[];
    for (let i = 0; i < words.length; ++i) {
      list.push(words[i]?.types.map((ele) => ele + ', ' + words[i]?.value));
    }
    let permus = this.permutation(list) as any[]; // Sinh hoán vị array 2D
    console.log('permus', permus);

    const rules = PhasesRules;
    const addV = [] as any[]; // Xóa phần tử trùng sau khi tạo cụm từ
    permus.forEach((permu) => {
      let arrHasValue = [] as any[]; // Mảng chứa những value đã được push vào trong array ans để sau đó thêm lại những value không thẻ ghép thành cụm từ
      let couple = [] as any[];
      let f = false;
      let f5 = false; // Cờ đánh dấu hoán vị này có được push dữ liệu vào mảng kết quả hay không
      permu.forEach((elm) => {
        let i = elm.split(', ');
        couple.push({ type: i[0], value: i[1] });
      });
      // console.log('couple', couple);

      couple.forEach((elm) => {
        if (elm.type === TYPE_PHRASE.slice(4, TYPE_PHRASE.length)) f = true;
      });
      // f đánh dấu nếu có một từ thuộc loại danh từ thì mới xét xếp vào cụm danh từ, tương tự với động từ và tính từ
      if (f) {
        let result = { type: '', point: 0, values: {} };
        let arrF = [] as any[]; // Mảng đánh dấu value đã được thêm vào result chưa
        rules[TYPE_PHRASE].forEach((elm, index) => {
          couple.forEach((haf) => {
            if (
              elm.types.includes(haf.type) &&
              !arrF.includes(haf.value) &&
              !result.hasOwnProperty(haf.type)
            ) {
              arrF.push(haf.value);
              result.type = TYPE_PHRASE;
              result.values[haf.type] = { value: haf.value, index: index };
            }
          });
        });
        console.log('result', result);

        console.log('Object.keys(result.values)', Object.keys(result.values));

        // Loại bỏ những cụm từ chỉ được tạo bởi một từ
        if (Object.keys(result.values).length > 1) {
          const addI = new Array(10).fill(0);
          let f2 = true;
          for (let property in result.values) {
            console.warn('property', result.values);

            addI[result.values[property].index]++;
            if (addI[result.values[property].index] > 1) f2 = false;
          }
          console.log('addI sau khi thực hiện logic check', addI);

          if (f2) {
            // Loại bỏ những cụm từ giống nhau về value + point
            let tmp = '' as any;
            for (let property in result.values) {
              tmp = tmp + result.values[property].value + '-';
            }
            console.log('tmp', tmp);

            if (!addV.includes(tmp)) {
              f5 = true;
              ans.push([result]);
              // thêm những value được push vào result array into arrHasvalue
              for (let property in result.values) {
                arrHasValue.push(result.values[property].value);
              }
              let point = 0;
              for (let property in result.values) {
                point += Point[property];
              }
              result.point = point;
              addV.push(tmp);
            }
          }
        }
      }

      if (f5) {
        words.forEach((word) => {
          if (!arrHasValue.includes(word.value)) {
            ans[ans.length - 1].push(word);
          }
        });
      }
    });

    console.log('ans', ans);

    ans.forEach((elm) => {
      elm.forEach((elm2) => {
        if (
          elm2.type === 'CUM_DANH_TU' ||
          elm2.type === 'CUM_DONG_TU' ||
          elm2.type === 'CUM_TINH_TU'
        ) {
          const a = elm2.values;
          const flatArr = Object.entries(a) as any;
          console.log('object.entries', flatArr);

          flatArr.sort((v1, v2) => v2[1].index - v1[1].index);
          const resObj = {};
          const arr = [] as any[];
          const arrKey = [] as any[];
          for (let i = 0; i < flatArr.length; i++) {
            const key = flatArr[i][0];
            const val = flatArr[i][1];
            resObj[key] = val;
            arr.push(val);
            arrKey.push(key);
          }
          const objAns = [] as any[];
          for (let i = arr.length - 1; i >= 0; --i) {
            objAns.push({ ...arr[i], key: arrKey[i] });
          }
          // elm2.values = objAns
          elm2.values = objAns;
        }
      });
    });
    console.log('final ans', ans);

    return ans;
  }

  arrangeThePhraseIntoSentences(data) {
    let ans = [] as any[];
    // { value: "...", point: 0 }
    data.forEach((elm) => {
      let tmp = { value: '', point: 0 } as any;
      elm.forEach((elm2) => {
        if (elm2['CHU_NGU']) {
          tmp.value += elm2['CHU_NGU'].value + ' ';
          tmp.point += elm2['CHU_NGU'].point;
        }
      });
      elm.forEach((elm2) => {
        if (elm2.value === 'là') {
          tmp.value += elm2.value + ' ';
          tmp.point += 7;
        }
      });
      elm.forEach((elm2) => {
        if (elm2['VI_NGU']) {
          tmp.value += elm2['VI_NGU'].value + ' ';
          tmp.point += elm2['VI_NGU'].point;
        }
      });
      elm.forEach((elm2) => {
        if (!elm2['VI_NGU'] && !elm2['CHU_NGU'] && elm2.value !== 'là') {
          tmp.value += elm2.value + ' ';
          tmp.point += elm2.point;
        }
      });
      tmp.value = tmp.value.trim();
      ans.push(tmp);
    });
    function compare(a, b) {
      if (a.point > b.point) {
        return -1;
      }
      if (a.point < b.point) {
        return 1;
      }
      return 0;
    }
    ans = ans.sort(compare);
    return ans;
  }

  arrangeIntoSubject(phrase) {
    console.error('arrangeIntoSubject', phrase);

    let ans = [] as any[];
    phrase.forEach((elm) => {
      let couple = [] as any[];
      elm.forEach((e) => {
        console.log('phrase ', elm);

        let valueOfPhrase = '';
        let valueOfword = '';
        if (!e.types) {
          e.values.forEach((k) => {
            valueOfPhrase += k.value + ' ';
          });
        }
        console.log('valueOfPhrase', valueOfPhrase);

        if (e.types) {
          valueOfword = e.value;
        }
        if (e.types) {
          let tmp = [] as any[];
          e.types.forEach((lm) => {
            tmp.push(`${lm}, ${valueOfword}`);
          });
          couple.push(tmp);
        } else couple.push([`${e.type}, ${valueOfPhrase}, ${e.point}`]);

        console.log('couple', couple);
      });
      // chuyển thành dạng mảng string để sinh hoán vị
      couple = this.permutation(couple);
      console.log('couple permu', couple);

      const b = couple.map((elm) => {
        return elm.map((elm2) => {
          const i = {} as any;
          const a = elm2.split(', ');
          // console.log('a', a);

          i.type = a[0];
          i.value = a[1].trim();
          i.point = +a[2];
          return i;
        });
      });
      console.log('b', b);

      // sinh xong hoán vị trả về kiểu mảng object
      ans = [...ans, ...CFirst(b), ...VFirst(b)];
    });
    console.log('ans', ans);

    return ans;
  }

  arrangeWordsIntoPhases(wordTypeds: WordTypes[]) {
    let result = [] as any[];
    for (let property in PhasesRules) {
      result = this.processWordsIntoPhases(property, wordTypeds, result);
    }
    return result;
  }

  setTypeWordsInSentence(
    wordsInsentence: string[],
    dataState: { [key: string]: string[] }
  ) {
    let result = [] as any[];
    for (let i = 0; i < wordsInsentence.length; i++) {
      result.push(this.setTypeWord(wordsInsentence[i], dataState));
    }

    return result;
  }

  private setTypeWord(value: string, dataState: { [key: string]: string[] }) {
    let typeOfWord = {
      value,
      types: [] as string[],
    };
    for (let property in dataState) {
      if (dataState[property].indexOf(value) > -1) {
        typeOfWord.types.push(property);
      }
    }

    return typeOfWord;
  }

  private permutation(list: any[], n = 0, result: any = [], current: any = []) {
    if (n === list.length) result.push(current);
    else
      list[n].forEach((item) =>
        this.permutation(list, n + 1, result, [...current, item])
      );
    return result;
  }

  //dont read this
  private handleTrarnsformPermus(permus: string[][], typePhases: any) {
    let couples = [] as { type: string; value: string }[];

    permus.forEach((permu) => {
      permu.forEach((stringOfpermu) => {
        let ele = stringOfpermu.split(', ');
        couples.push({
          type: ele[0],
          value: ele[1],
        });
      });
    });
    return couples;
  }

  private isPhasesType(
    couples: { type: string; value: string }[],
    typePhases: string
  ) {
    let isCurrentPhaseType = false;
    couples.forEach((elm) => {
      if (elm.type === typePhases.slice(4, typePhases.length))
        isCurrentPhaseType = true;
    });
    return isCurrentPhaseType;
  }

  private handleTransformList(wordsArr: WordTypes[]) {
    let result = [] as any[];
    for (let i = 0; i < wordsArr.length; i++) {
      result.push(
        wordsArr[i].types.map((type) => `${type}, ${wordsArr[i].value}`)
      );
    }
    return result;
  }
}
