/* eslint-disable @typescript-eslint/no-explicit-any */
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
