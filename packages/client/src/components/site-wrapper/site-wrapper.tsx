import { Outlet } from 'react-router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import SiteWrapper_module from './site-wrapper.module.scss';
import { ScrollRestoration } from 'react-router-dom';
import cx from 'classnames';

export function SiteWrapper() {
  return (
    <div className={cx(SiteWrapper_module.root)}>
      <ScrollRestoration />
      <Header className={SiteWrapper_module.header} />
      <Outlet />

      <Footer />
    </div>
  );
}
