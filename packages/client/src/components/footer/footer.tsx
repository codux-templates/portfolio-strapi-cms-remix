import { useRouteLoaderData } from '@remix-run/react';
import styles from './footer.module.scss';
import cx from 'classnames';
import { loader } from '~/app/root';

export interface FooterProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Footer = ({ className }: FooterProps) => {
  const rootData = useRouteLoaderData<typeof loader>('root');
  const about = rootData?.about;
  return (
    <div id="footer" className={cx(styles.root, className)}>
      <div className={styles.contact}>
        <a href={`mailto:${about?.attributes.email}`}>{about?.attributes.email}</a>
        <br />
        <span>{about?.attributes.phone}</span>
      </div>
      <div className={styles.social}>
        <a href={about?.attributes.instagram || '/'} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href={about?.attributes.facebook || '/'} target="_blank" rel="noreferrer">
          Facebook
        </a>
        <a href={about?.attributes.pinterest || '/'} target="_blank" rel="noreferrer">
          Pinterest
        </a>
      </div>
      <span className={styles.copyright}>© 2020 Career Karma and some more</span>
    </div>
  );
};
