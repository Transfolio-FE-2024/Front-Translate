/* eslint-disable @typescript-eslint/no-explicit-any */

import { preDefinedFontFamily } from "./const";

// util
export const SessionStorageManager = (() => {
  function get(window: Window, key: string) {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.sessionStorage.getItem(key);
  }

  function set(window: Window, key: string, value: any) {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.sessionStorage.setItem(key, value);
  }

  function remove(window: Window, key: string) {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.sessionStorage.removeItem(key);
  }

  return {
    get,
    set,
    remove,
  };
})();

export const LocalStorageManager = (() => {
  function get(window: Window, key: string) {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.localStorage.getItem(key);
  }

  function set(window: Window, key: string, value: any) {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.localStorage.setItem(key, value);
  }

  function remove(window: Window, key: string) {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.localStorage.removeItem(key);
  }

  return {
    get,
    set,
    remove,
  };
})();

export const CookieManager = (() => {
  function get(document: Document, name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      c = c.trimStart();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function set(
    document: Document,
    name: string,
    value: string,
    expireHours?: number
  ) {
    let expires: string = "";
    if (expireHours) {
      const date = new Date();
      date.setTime(date.getTime() + expireHours * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function remove(document: Document, name: string) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  return {
    get,
    set,
    remove,
  };
})();

export const ValidationUtil = (() => {
  /**
   * @description 비밀번호 유효성 체크
   */
  function validatePassword(password: string): boolean {
    const lengthCheck = /.{8,}/;
    const upperCaseCheck = /[A-Z]/;
    const lowerCaseCheck = /[a-z]/;
    const numberCheck = /[0-9]/;
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      lengthCheck.test(password) &&
      upperCaseCheck.test(password) &&
      lowerCaseCheck.test(password) &&
      numberCheck.test(password) &&
      specialCharCheck.test(password)
    );
  }

  /**
   * @description 이메일 유효성 체크
   */
  function validateEmail(email: string): boolean {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailCheck.test(email);
  }

  /**
   * @description 빈 값 여부 체크
   */
  function isBlank(
    ...targets: {
      onError?: (key: string) => void;
      value: string;
      key: string;
    }[]
  ) {
    return targets.every((target) => {
      const isBlank = !target.value;

      if (isBlank) {
        if (target.onError && typeof target.onError === "function") {
          target.onError(target.key);
        }
        return false;
      }

      return true;
    });
  }

  /**
   * @description 빈 값 및 공백 여부 체크
   */
  function isWhiteSpace(
    ...targets: {
      onError?: (key: string) => void;
      value: string;
      key: string;
    }[]
  ) {
    return targets.every((target) => {
      const isWhiteSpace = !target.value || !target.value.trim();

      if (isWhiteSpace) {
        if (target.onError && typeof target.onError === "function") {
          target.onError(target.key);
        }
        return false;
      }

      return true;
    });
  }

  return {
    validatePassword,
    validateEmail,
    isBlank,
    isWhiteSpace,
  };
})();

export type CategoryColor = "orange" | "green" | "gray";
export function getCategoryColor(category: string): CategoryColor {
  if (!category) return "gray";

  return ["언어", "문학"].includes(category)
    ? "orange"
    : ["전공", "기업"].includes(category)
    ? "green"
    : "gray";
}

export function className(...args: string[]) {
  return args.join(" ").trim();
}

/**
 * displayName을 값으로 갖는 key를 반환한다. (e.g. "Nanum Myeangjo" 대입 시, "NanumMyeangjo" 반환)
 * 존재하지 않는 경우, 기본 폰트 타입인 "Pretendard"를 반환한다.
 * @param displayName 서버에 저장되는 폰트 타입이자, 사용자에게 표시되는 폰트명
 */
export function getFontFamilyByDisplayName(displayName: string): string {
  return (
    Object.keys(preDefinedFontFamily).find(
      (key) => String(preDefinedFontFamily[key]) === displayName
    ) || preDefinedFontFamily[0]
  );
}

/**
 * 날짜 객체를 지정된 포맷 형식 문자열로 변환한다.
 * @param date - 변환할 대상인 Date 객체
 * @param format - 날짜를 변환할 형식 (예: "YYYY.MM.DD HH:mm:ss") `ISO-8601`
 *   - **YYYY** : 연도 (4자리)
 *   - **MM**   : 월 (2자리, 빈자리 0 채움)
 *   - **DD**   : 일 (2자리, 빈자리 0 채움)
 *   - **HH**   : 24시간제 형식의 시각 (2자리, 빈자리 0 채움)
 *   - **hh**   : 12시간제 형식의 시각 (2자리, 빈자리 0 채움)
 *   - **mm**   : 분 (2자리, 빈자리 0 채움)
 *   - **ss**   : 초 (2자리, 빈자리 0 채움)
 *
 * @returns 포맷에 맞춰 변환된 날짜 문자열
 *
 * @createdAt - 2024.11.12
 * @modifiedAt - 2024.11.12
 */
export function formatDate(date: Date, format: string): string {
  const pad = (num: number, size: number = 2) =>
    num.toString().padStart(size, "0");

  const hours24 = date.getHours();
  const hours12 = hours24 % 12;
  const replacements: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(hours24),
    hh: pad(hours12),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  };

  return format.replace(
    /YYYY|MM|DD|HH|hh|mm|ss/g,
    (match) => replacements[match]
  );
}
