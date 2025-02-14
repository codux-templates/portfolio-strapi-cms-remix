import { LinksFunction, MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
    isRouteErrorResponse,
    json,
    useLoaderData,
    useNavigation,
    useRouteError,
} from '@remix-run/react';
import cx from 'classnames';
import Markdown from 'markdown-to-jsx';
import { getApi } from '~/api/data-api';
import { ProjectItem } from '~/components/project-item/project-item';
import { ProjectNotFound } from '~/components/project-not-found/project-not-found';
import { getUrlOriginWithPath } from '~/utils';
import styles from './project-page.module.scss';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const api = getApi();

    const projectIdParam = params.projectId;
    if (projectIdParam === undefined) {
        throw json('projectId is required', { status: 400 });
    }
    const projectId = parseInt(projectIdParam);

    try {
        const project = await api.getProject(projectId);
        const projectItems = await api.getProjectItemsByProject(projectId);

        const canonicalUrl = getUrlOriginWithPath(request.url);
        return json({ project, projectItems, canonicalUrl });
    } catch {
        throw json('Project not found', { status: 404 });
    }
};

export default function ProjectPage() {
    const { project, projectItems } = useLoaderData<typeof loader>();
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <div>Loading...</div>;
    }
    if (!projectItems.length) {
        return <div>there are no items in this project</div>;
    }
    return (
        <div id="top" className={cx(styles.root, 'page')}>
            <div className={styles.gallery}>
                <div
                    key="desc"
                    className={cx(styles.galleryItem, styles.topDescription)}
                    style={{ maxWidth: '100%' }}
                >
                    <h3 className={styles.title}>{project?.attributes.title}</h3>
                    <p className={styles.pageDescription}>{project?.attributes.description}</p>
                </div>
                {projectItems.map((item) => (
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
                <Markdown>{project?.attributes.details || ''}</Markdown>
            </div>
            <div>
                <a href="#top" className={styles.backToTop}>
                    Back to top
                </a>
            </div>
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) {
        return [];
    }

    const { title, description, coverImage } = data.project.attributes;

    return [
        { title: title },
        {
            name: 'description',
            content: description,
        },
        {
            tagName: 'link',
            rel: 'canonical',
            href: data.canonicalUrl,
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            property: 'og:image',
            content: coverImage,
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:description',
            content: description,
        },
        {
            name: 'twitter:image',
            content: coverImage,
        },
    ];
};

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return <ProjectNotFound />;
        }
    }

    throw error;
}

export const links: LinksFunction = () => {
    return [
        {
            rel: 'icon',
            href: '/favicon.ico',
            type: 'image/ico',
        },
    ];
};
