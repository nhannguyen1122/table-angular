/* tslint:disable */
export enum LoadPath {
  DAI_TU = 'daitu',
  DAI_TU_CHI_DINH = 'daituchidinh',
  DANH_TU = 'danhtu',
  DANH_TU_CHI_DVDL = 'danhtuchidonvidoluong',
  DANH_TU_LOAI_THE = 'danhtuloaithe',
  DANH_TU_TONG_LUONG = 'danhtuchitongluong',
  DINH_TU_CHI_SO_LUONG = 'dinhtuchisoluong',
  DONG_TU = 'dongtu',
  PHO_TU_DUNG_SAU = 'photudungsau',
  PHO_TU_DUNG_TRUOC = 'photudungtruoc',
  QUAN_HE_TU = 'quanhetu',
  SO_TU_CHI_SO_LUONG = 'sotuchisoluong',
  THAN_TU = 'thantu',
  TINH_THAI_TU = 'tinhthaitu',
  TINH_THAI_TU_CAU_KHIEN = 'tinhthaitucaukhien',
  TINH_THAI_TU_NGHI_VAN = 'tinhthaitunghivan',
  TINH_TU = 'tinhtu',
  TINH_TU_CACH_THUC_MUC_DO = 'tinhtuchicachthucmucdo',
  CUM_DANH_TU = 'CUM_DANH_TU',
  CUM_TINH_TU = 'CUM_TINH_TU',
  CUM_DONG_TU = 'CUM_DONG_TU',
}

export const WordsDefinition = {
  [LoadPath.DAI_TU]: Object.keys(LoadPath)[0],
  [LoadPath.DAI_TU_CHI_DINH]: Object.keys(LoadPath)[1],
  [LoadPath.DANH_TU]: Object.keys(LoadPath)[2],
  [LoadPath.DANH_TU_CHI_DVDL]: Object.keys(LoadPath)[3],
  [LoadPath.DANH_TU_TONG_LUONG]: Object.keys(LoadPath)[4],
  [LoadPath.DANH_TU_LOAI_THE]: Object.keys(LoadPath)[5],
  [LoadPath.DINH_TU_CHI_SO_LUONG]: Object.keys(LoadPath)[6],
  [LoadPath.DONG_TU]: Object.keys(LoadPath)[7],
  [LoadPath.PHO_TU_DUNG_SAU]: Object.keys(LoadPath)[8],
  [LoadPath.PHO_TU_DUNG_TRUOC]: Object.keys(LoadPath)[9],
  [LoadPath.QUAN_HE_TU]: Object.keys(LoadPath)[10],
  [LoadPath.SO_TU_CHI_SO_LUONG]: Object.keys(LoadPath)[11],
  [LoadPath.THAN_TU]: Object.keys(LoadPath)[12],
  [LoadPath.TINH_THAI_TU]: Object.keys(LoadPath)[13],
  [LoadPath.TINH_THAI_TU_CAU_KHIEN]: Object.keys(LoadPath)[14],
  [LoadPath.TINH_THAI_TU_NGHI_VAN]: Object.keys(LoadPath)[15],
  [LoadPath.TINH_TU]: Object.keys(LoadPath)[16],
  [LoadPath.TINH_TU_CACH_THUC_MUC_DO]: Object.keys(LoadPath)[17],
  [LoadPath.CUM_DANH_TU]: Object.keys(LoadPath)[18],
  [LoadPath.CUM_TINH_TU]: Object.keys(LoadPath)[19],
  [LoadPath.CUM_DONG_TU]: Object.keys(LoadPath)[20],
};

export const PhasesRules: { [key: string]: WordTypes[] } = {
  [WordsDefinition[LoadPath.CUM_DANH_TU]]: [
    {
      types: [WordsDefinition[LoadPath.DANH_TU_TONG_LUONG]],
      value: '',
    },
    {
      types: [
        WordsDefinition[LoadPath.DINH_TU_CHI_SO_LUONG],
        WordsDefinition[LoadPath.SO_TU_CHI_SO_LUONG],
      ],
      value: '',
    },
    {
      types: [
        WordsDefinition[LoadPath.DANH_TU_LOAI_THE],
        WordsDefinition[LoadPath.DANH_TU_CHI_DVDL],
      ],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.DANH_TU]],
      value: '',
    },
    {
      types: [
        WordsDefinition[LoadPath.TINH_TU],
        WordsDefinition[LoadPath.DONG_TU],
      ],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.DAI_TU_CHI_DINH]],
      value: '',
    },
  ],
  [WordsDefinition[LoadPath.CUM_DONG_TU]]: [
    {
      types: [WordsDefinition[LoadPath.PHO_TU_DUNG_TRUOC]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.TINH_TU]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.DONG_TU]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.PHO_TU_DUNG_SAU]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.TINH_THAI_TU]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.DANH_TU]],
      value: '',
    },
  ],
  [WordsDefinition[LoadPath.CUM_TINH_TU]]: [
    {
      types: [WordsDefinition[LoadPath.DANH_TU]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.DONG_TU]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.PHO_TU_DUNG_TRUOC]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.TINH_TU]],
      value: '',
    },
    {
      types: [WordsDefinition[LoadPath.PHO_TU_DUNG_SAU]],
      value: '',
    },
  ],
};

export interface WordTypes {
  value: string;
  types: string[];
}

export const Point = {
  DANH_TU: 1,
  TINH_TU: 1,
  DONG_TU: 1,
  DANH_TU_CHI_DON_VI_DO_LUONG: 2,
  DANH_TU_CHI_DINH: 2,
  PHO_TU: 1,
  PHO_TU_DUNG_SAU: 1,
  PHO_TU_DUNG_TRUOC: 1,
  SO_TU_CHI_SO_LUONG: 2,
  DANH_TU_LOAI_THE: 2,
  DANN_TU_CHI_TONG_LUONG: 2,
  DINH_TU_CHI_SO_LUONG: 1,
  TINH_THAI_TU: 1,
  DAI_TU: 2,
  THAN_TU: 1,
  TINH_TU_CHI_CACH_THUC_MUC_DO: 2,
  TINH_THAI_TU_CAU_KHIEN: 2,
  TINH_THAI_TU_NGHI_VAN: 2,
  QUAN_HE_TU: 1,
  DAI_TU_CHI_DINH: 1,
};

export const RulesOfC = [
  {
    type: 'DANH_TU',
    point: 5,
  },
  {
    type: 'CUM_DANH_TU',
    point: 5,
  },
  {
    type: 'DAI_TU',
    point: 2,
  },
  {
    type: 'TINH_TU',
    point: 3,
  },
  {
    type: 'CUM_TINH_TU',
    point: 3,
  },
  {
    type: 'DONG_TU',
    point: 3,
  },
  {
    type: 'CUM_DONG_TU',
    point: 3,
  },
  {
    types: ['SO_TU'],
    point: 3,
  },
];

export const RulesOfV = [
  {
    prevWord: '',
    type: 'DANH_TU',
    value: '',
    point: 3,
  },
  {
    prevWord: '',
    type: 'CUM_DANH_TU',
    value: '',
    point: 3,
  },
  {
    prevWord: 'là',
    type: 'DANH_TU',
    value: '',
    point: 7,
  },
  {
    prevWord: 'là',
    type: 'CUM_DANH_TU',
    value: '',
    point: 7,
  },
  {
    prevWord: 'là',
    type: 'TINH_TU',
    value: '',
    point: 7,
  },
  {
    prevWord: '',
    type: 'CUM_TINH_TU',
    value: '',
    point: 5,
  },
  {
    prevWord: '',
    type: 'TINH_TU',
    value: '',
    point: 5,
  },
  {
    prevWord: 'là',
    type: 'CUM_TINH_TU',
    value: '',
    point: 7,
  },
  {
    prevWord: '',
    type: 'DONG_TU',
    value: '',
    point: 5,
  },
  {
    prevWord: '',
    type: 'CUM_DONG_TU',
    value: '',
    point: 5,
  },
  {
    type: 'SO_TU',
    value: '',
    point: 3,
  },
];

const ruleC = RulesOfC;
const ruleV = RulesOfV;

export const CFirst = (couple) => {
  let ans = [] as any[];
  couple.forEach((elm, index) => {
    let tmpAnsC = {};
    let f = false; // check chỉ tìm ra một chủ ngữ
    let tmpF = [] as any[]; // các từ/ cụm từ không thể sắp xếp thành chủ ngữ
    let valueHas = [] as any[]; // mảng chứa các từ/ cụm từ đã được sắp thành chủ ngữ
    elm.forEach((elm2, index) => {
      ruleC.forEach((rule, index) => {
        if (elm2.type === rule.type) {
          let tmp = {} as any;
          tmp.index = index;
          tmp.type = elm2.type;
          tmp.value = elm2.value;
          tmp.point = elm2.point ? elm2.point : Point[elm2.type];
          if (!f) {
            f = true;
            valueHas.push(tmp.value);
            tmpAnsC['CHU_NGU'] = tmp;
            tmpAnsC['CHU_NGU'].point = tmpAnsC['CHU_NGU'].point + rule.point;
          }
        }
      });
      if (!valueHas.includes(elm2.value)) {
        elm2.point = elm2.point ? elm2.point : Point[elm2.type];
        valueHas.push(elm2.value);
        tmpF.push(elm2);
      }
    });

    // xử lý vị ngữ
    valueHas = [] as any[];
    let tmpFV = [] as any[];
    let tmpAnsV = {} as any;
    f = false;
    tmpF.forEach((elm) => {
      ruleV.forEach((rule, index) => {
        if (elm.type === rule.type) {
          let tmp = {} as any;
          tmp.index = index;
          tmp.type = elm.type;
          tmp.value = elm.value;
          tmp.point = elm.point ? elm.point : Point[elm.type];
          if (!f) {
            f = true;
            valueHas.push(tmp.value);
            tmpAnsV['VI_NGU'] = tmp;
            tmpAnsV['VI_NGU'].point = tmpAnsV['VI_NGU'].point + rule.point;
          }
        }
      });
      if (!valueHas.includes(elm.value)) {
        elm.point = elm.point ? elm.point : Point[elm.type];
        valueHas.push(elm.value);
        tmpFV.push(elm);
      }
    });
    if (tmpAnsV['VI_NGU']) ans.push([tmpAnsC, tmpAnsV, ...tmpFV]);
    else ans.push([tmpAnsC, ...tmpFV]);
  });
  return ans;
};

export const VFirst = (couple) => {
  let ans = [] as any[];
  couple.forEach((elm, index: any) => {
    let tmpAnsC = {} as any;
    let f = false;
    let tmpF = [] as any[];
    let valueHas = [] as any[];
    elm.forEach((elm2, index) => {
      ruleC.forEach((rule, index) => {
        if (elm2.type === rule.type) {
          let tmp = {} as any;
          tmp.index = index;
          tmp.type = elm2.type;
          tmp.value = elm2.value;
          tmp.point = elm2.point ? elm2.point : Point[elm2.type];
          if (!f) {
            f = true;
            valueHas.push(tmp.value);
            tmpAnsC['VI_NGU'] = tmp;
            tmpAnsC['VI_NGU'].point = tmpAnsC['VI_NGU'].point + rule.point;
          }
        }
      });
      if (!valueHas.includes(elm2.value)) {
        elm2.point = elm2.point ? elm2.point : Point[elm2.type];
        valueHas.push(elm2.value);
        tmpF.push(elm2);
      }
    });

    // xử lý chủ ngữ
    valueHas = [] as any[];
    let tmpFV = [] as any[];
    let tmpAnsV = {};
    f = false;
    tmpF.forEach((elm) => {
      ruleV.forEach((rule, index) => {
        if (elm.type === rule.type) {
          let tmp = {} as any;
          tmp.index = index;
          tmp.type = elm.type;
          tmp.value = elm.value;
          tmp.point = elm.point ? elm.point : Point[elm.type];
          if (!f) {
            f = true;
            valueHas.push(tmp.value);
            tmpAnsV['CHU_NGU'] = tmp;
            tmpAnsV['CHU_NGU'].point = tmpAnsV['CHU_NGU'].point + rule.point;
          }
        }
      });
      if (!valueHas.includes(elm.value)) {
        elm.point = elm.point ? elm.point : Point[elm.type];
        valueHas.push(elm.value);
        tmpFV.push(elm);
      }
    });
    if (tmpAnsV['CHU_NGU']) {
      let temp = {} as any;
      tmpFV.forEach((elm) => {
        if (elm.type === 'DAI_TU') {
          temp = elm;
        }
      });
      tmpFV = tmpFV.filter((elm) => elm.type !== 'DAI_TU');
      if (temp.value) ans.push([temp, tmpAnsC, tmpAnsV, ...tmpFV]);
      else ans.push([tmpAnsC, tmpAnsV, ...tmpFV]);
    } else {
      let temp = {} as any;
      tmpFV.forEach((elm) => {
        if (elm.type === 'DAI_TU') {
          temp = elm;
        }
      });
      tmpFV = tmpFV.filter((elm) => elm.type !== 'DAI_TU');
      if (temp.value) ans.push([temp, tmpAnsC, ...tmpFV]);
      else ans.push([tmpAnsC, ...tmpFV]);
      ans.push([tmpAnsC, ...tmpFV]);
    }
  });
  return ans;
};
