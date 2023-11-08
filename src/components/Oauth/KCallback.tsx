import { useEffect } from "react";

import { issuedAuthCode } from "@/api/kakao";

export default function KCallback() {
  useEffect(() => {
    const data = async () => {
      await issuedAuthCode();
    };
    data();
  }, []);

  return null;
}
