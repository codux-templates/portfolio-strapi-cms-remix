import cx from 'classnames';
import Markdown from 'markdown-to-jsx';
import { MetaFunction, useRouteLoaderData } from '@remix-run/react';
import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { getImageUrl } from '~/api/strapi-connection';
import { loader as rootLoader } from '~/app/root';
import { ROUTES } from '~/router/config';
import styles from './about-page.module.scss';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const requestOrigin = new URL(request.url).origin;

    return { canonicalUrl: new URL(ROUTES.about.path, requestOrigin).toString() };
};

export default function AboutPage() {
    const rootData = useRouteLoaderData<typeof rootLoader>('root');
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
                {about.attributes.image && (
                    <img src={getImageUrl(about.attributes.image)} alt="About section" />
                )}
            </div>
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    return [
        { title: 'Portfolio App - About' },
        {
            name: 'description',
            content: 'Welcome to the Portfolio App',
        },
        {
            tagName: 'link',
            rel: 'canonical',
            href: data?.canonicalUrl,
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:title',
            content: 'Portfolio App',
        },
        {
            property: 'og:description',
            content: 'Welcome to the Portfolio App',
        },
        {
            property: 'og:image',
            content: 'https://my-portfolio/og-image.png',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: 'Portfolio App',
        },
        {
            name: 'twitter:description',
            content: 'Welcome to the Portfolio App',
        },
        {
            name: 'twitter:image',
            content: 'https://my-portfolio/twitter-image.png',
        },
    ];
};

export const links: LinksFunction = () => {
    return [
        {
            rel: 'icon',
            href: '/favicon.ico',
            type: 'image/ico',
        },
    ];
};
