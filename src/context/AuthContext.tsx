import { SessionStorageManager } from "@/util";
import { createContext, useState } from "react";

const KEY_AUTH_USER_USERID = "auth.user.userId";
const KEY_AUTH_USER_EMAIL = "auth.user.email";

interface AuthContextValue {
  isSignedIn: boolean;
  userId: string | undefined;
  email: string | undefined;
  login: (info: { userId?: string; email?: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isSignedIn: false,
  userId: "",
  email: "",
  login: (info) => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(
    SessionStorageManager.get(window, KEY_AUTH_USER_USERID) ?? ""
  );
  const [email, setEmail] = useState<string>(
    SessionStorageManager.get(window, KEY_AUTH_USER_EMAIL) ?? ""
  );

  function login(info: { userId?: string; email?: string }) {
    if (info.userId && info.email) {
      SessionStorageManager.set(window, KEY_AUTH_USER_USERID, info.userId);
      SessionStorageManager.set(window, KEY_AUTH_USER_EMAIL, info.email);

      setIsSignedIn(!!info.userId);
      setUserId(info.userId);
      setEmail(info.email);
    } else {
      throw new Error("[Transfolio-ERROR] Required value is empty.");
    }
  }

  function logout() {
    SessionStorageManager.remove(window, KEY_AUTH_USER_USERID);
    SessionStorageManager.remove(window, KEY_AUTH_USER_EMAIL);

    setIsSignedIn(false);
    setUserId("");
    setEmail("");
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, userId, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
