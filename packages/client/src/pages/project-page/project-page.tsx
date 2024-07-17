import { useParams } from 'react-router-dom';
import styles from './project-page.module.scss';
import { RouteParams } from '../../router/config';
import { apiHooks } from '../../api';
import { ProjectItem } from '../../components/project-item/project-item';
import cx from 'classnames';
import Markdown from 'markdown-to-jsx';

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const ProjectPage = () => {
  const { id: strId } = useParams<RouteParams['/projects/:id']>();
  const id = strId ? parseInt(strId) : -1;

  const { data } = apiHooks.useProject(id);
  const { data: projectItems } = apiHooks.useProjectItems(id);

  if (!projectItems) {
    return <div>Loading...</div>;
  }
  if (!projectItems.data.length) {
    return <div>there are no items in this project</div>;
  }
  return (
    <div id="top" className={cx(styles.root, 'page')}>
      <div className={styles.gallery}>
        <div key="desc" className={cx(styles.galleryItem, styles.topDescription)} style={{ maxWidth: '100%' }}>
          <h3 className={styles.title}>{data?.attributes.title}</h3>
          <p className={styles.pageDescription}>{data?.attributes.description}</p>
        </div>
        {projectItems.data.map((item) => (
          <div key={item.id} className={styles.galleryItem}>
            <ProjectItem
              title={item.attributes.title}
              description={item.attributes.description}
              image={item.attributes.image}
            />
          </div>
        ))}
      </div>
      <div className={cx('markdown', styles.details)}>
        <Markdown>{data?.attributes.details || ''}</Markdown>
      </div>
      <div>
        <a href="#top" className={styles.backToTop}>
          Back to top
        </a>
      </div>
    </div>
  );
};
