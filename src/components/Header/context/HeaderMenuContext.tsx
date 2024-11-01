import { createContext, ReactNode } from "react";

interface HeaderMenuContextValue {
  buttons: ReactNode;
  setButtons: (buttons?: ReactNode) => void;
  setDefaultButtons: (buttons: ReactNode) => void;
}

const HeaderMenuContext = createContext<HeaderMenuContextValue>({
  buttons: null,
  setButtons: () => {},
  setDefaultButtons: () => {},
});

export default HeaderMenuContext;
