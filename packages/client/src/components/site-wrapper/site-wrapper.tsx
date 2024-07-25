import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import SiteWrapper_module from './site-wrapper.module.scss';
import cx from 'classnames';

export interface SiteWrapperProps {
    children?: React.ReactNode;
}

export function SiteWrapper({ children }: SiteWrapperProps) {
    return (
        <div className={cx(SiteWrapper_module.root)}>
            <Header className={SiteWrapper_module.header} />
            <div className={SiteWrapper_module.content}>{children}</div>
            <Footer />
        </div>
    );
}
