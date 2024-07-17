import styles from './header.module.scss';
import { SiteMenu } from '../site-menu/site-menu';
import cx from 'classnames';

export interface HeaderProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Header = ({ className }: HeaderProps) => {
  return (
    <div className={cx(styles.root, className)}>
      <span className={styles.logo}>KOLINJ</span>
      <SiteMenu className={styles.menu} />
    </div>
  );
};
