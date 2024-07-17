import { useProjects } from '../../api/api-hooks';
import styles from './projects-gallery.module.scss';
import { getImageUrl } from '../../api/strapi-connection';
import { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/config';
import cx from 'classnames';
export interface ProjectsGalleryProps {
  className?: string;
  headerHeight?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const ProjectsGallery = ({ className, headerHeight }: ProjectsGalleryProps) => {
  const { data: projects, isLoading } = useProjects();
  const rootRef = useRef<HTMLDivElement>(null);

  const _headerHeight = headerHeight || '0px';
  if (isLoading) {
    return <div>Loading..</div>;
  }
  /**
   * the idea behind this strange accordion is that each project description box has
   * position sticky and top = bottom of the project description box before it.
   *
   * in addition the height of the project description boxes is dynamic so it will behave well
   * on a smaller screen / more projects.
   * otherwise if you have a lot of items the last ones aren't reachable
   *
   * so, since the top and height of the projects depends on the amount of the projects we have to do it
   * with inlint style.
   */
  const boxHeight = `min(calc((100vh - ${_headerHeight}) / ${projects?.data.length}), 4rem)`;
  return (
    <div className={cx(styles.root, className)} ref={rootRef}>
      {projects?.data.map((project, index) => (
        <Fragment key={project.id}>
          <Link
            to={ROUTES.project.to(project.id)}
            key={`link_${project.id}`}
            className={styles.box}
            style={{
              top: `calc(${index} * ${boxHeight} + ${_headerHeight})`,
              height: boxHeight,
              position: 'sticky',
              minHeight: '1.5rem',
            }}
          >
            {project.attributes.title}
            <span>show →</span>
          </Link>
          <img
            key={`img_${project.id}`}
            src={getImageUrl(project.attributes.coverImage)}
            style={{ top: `calc(${index + 1} * ${boxHeight} + ${_headerHeight})`, position: 'sticky' }}
          />
        </Fragment>
      ))}
    </div>
  );
};
