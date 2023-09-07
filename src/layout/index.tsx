import Header from './header';
import Body from './body';
import Footer from './footer';
import { LayoutProps } from './types';
import s from './index.module.css';

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={s.container}>
      <div className={s.layout}>
        <Header />
        <Body>{children}</Body>
        <Footer />
      </div>
    </div>
  );
}
