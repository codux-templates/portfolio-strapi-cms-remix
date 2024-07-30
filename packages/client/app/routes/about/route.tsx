import cx from 'classnames';
import Markdown from 'markdown-to-jsx';
import { MetaFunction, useRouteLoaderData } from '@remix-run/react';
import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { getImageUrl } from '~/api/strapi-connection';
import { loader as rootLoader } from '~/app/root';
import { getUrlOriginWithPath } from '~/utils';
import styles from './about-page.module.scss';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: getUrlOriginWithPath(request.url) };
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
    const title = 'Portfolio App - About Page';
    const description = 'Welcome to the Portfolio App About Page';
    const imageUrl = 'https://my-portfolio/image.png';

    return [
        { title },
        {
            name: 'description',
            content: description,
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
            content: title,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            property: 'og:image',
            content: imageUrl,
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
            content: imageUrl,
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
