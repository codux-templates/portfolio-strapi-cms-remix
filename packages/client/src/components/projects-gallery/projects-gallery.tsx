import { Link, useRouteLoaderData } from '@remix-run/react';
import cx from 'classnames';
import { Fragment, useRef } from 'react';
import { loader } from '~/app/root';
import { getImageUrl } from '../../api/strapi-connection';
import { ROUTES } from '../../router/config';
import styles from './projects-gallery.module.scss';
export interface ProjectsGalleryProps {
    className?: string;
    headerHeight?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const ProjectsGallery = ({ className, headerHeight }: ProjectsGalleryProps) => {
    const rootData = useRouteLoaderData<typeof loader>('root');
    const projects = rootData?.projects;
    const rootRef = useRef<HTMLDivElement>(null);

    const _headerHeight = headerHeight || '0px';

    /**
     * the idea behind this strange accordion is that each project description box has
     * position sticky and top = bottom of the project description box before it.
     *
     * in addition the height of the project description boxes is dynamic so it will behave well
     * on a smaller screen / more projects.
     * otherwise if you have a lot of items the last ones aren't reachable
     *
     * so, since the top and height of the projects depends on the amount of the projects we have to do it
     * with inline style.
     */
    const boxHeight = `min(calc((100vh - ${_headerHeight}) / ${projects?.length}), 4rem)`;
    return (
        <div className={cx(styles.root, className)} ref={rootRef}>
            {projects?.map((project, index) => (
                <Fragment key={index}>
                    <Link
                        to={ROUTES.project.to(index)}
                        key={`link_${index}`}
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
                        key={`img_${index}`}
                        alt={project.attributes.title}
                        src={getImageUrl(project.attributes.coverImage)}
                        style={{
                            top: `calc(${index + 1} * ${boxHeight} + ${_headerHeight})`,
                            position: 'sticky',
                        }}
                    />
                </Fragment>
            ))}
        </div>
    );
};
