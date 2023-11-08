import { ReactNode } from 'react';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.container}>{children}</div>;
};
