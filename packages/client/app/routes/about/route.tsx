import cx from 'classnames';
import Markdown from 'markdown-to-jsx';
import { getImageUrl } from '~/api/strapi-connection';
import styles from './about-page.module.scss';
import { useRouteLoaderData } from '@remix-run/react';
import { loader } from '~/app/root';

export default function AboutPage() {
  const rootData = useRouteLoaderData<typeof loader>('root');
  const about = rootData?.about;
  if (!about) return null;

  return (
    <div className={cx(styles.root, 'page')}>
      <div className={cx(styles.rectangle, styles.text)}>
        <h3 className={styles.title}>{about.attributes.title}</h3>
        <div className={cx('markdown', styles.description)}>
          <Markdown>{about.attributes.richtext || ''}</Markdown>
        </div>
      </div>
      <div className={styles.rectangle}>
        {about.attributes.image && <img src={getImageUrl(about.attributes.image)} />}
      </div>
    </div>
  );
}
