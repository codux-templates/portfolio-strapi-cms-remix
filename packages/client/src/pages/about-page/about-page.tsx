import { apiHooks } from '../../api';
import { getImageUrl } from '../../api/strapi-connection';
import styles from './about-page.module.scss';
import Markdown from 'markdown-to-jsx';
import cx from 'classnames';

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const AboutPage = () => {
  const { data: aboutItem } = apiHooks.useAbout();

  if (!aboutItem) return null;

  return (
    <div className={cx(styles.root, 'page')}>
      <div className={cx(styles.rectangle, styles.text)}>
        <h3 className={styles.title}>{aboutItem.data.attributes.title}</h3>
        <div className={cx('markdown', styles.description)}>
          <Markdown>{aboutItem.data.attributes.richtext || ''}</Markdown>
        </div>
      </div>
      <div className={styles.rectangle}>
        {aboutItem.data.attributes.image && <img src={getImageUrl(aboutItem?.data.attributes.image)} />}
      </div>
    </div>
  );
};
