import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { ProjectsGallery } from '~/components/projects-gallery/projects-gallery';
import * as theme from '~/styles/theme.module.scss';
import styles from './projects.module.scss';
import { getUrlOriginWithPath } from '~/utils';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: getUrlOriginWithPath(request.url) };
};

export default function ProjectsPage() {
    const marqueeVariants = {
        animate: {
            x: [0, '-50%'],
            transition: {
                x: {
                    repeat: Infinity,
                    duration: 20,
                    ease: 'linear',
                },
            },
        },
    };

    const text = 'Desert Oasis • Urban Charm • Palm Elegance • Ranch Comfort • Beachside Dining  •';

    return (
        <div className={cx(styles.root, 'page')}>
            <div className={cx(styles.rectangle, styles.textWrapper)}>
                <h3 className={styles.text}>Sophistication in Design, Excellence in Execution</h3>
            </div>
            <div className={cx(styles.rectangle, styles.img)}></div>
            <div className={styles.logoWrapper}>
                <h1 className={styles.logo}>KOLINJ</h1>
            </div>
            <div className={styles.marquee}>
                <motion.div
                    className={styles.marqueeContent}
                    variants={marqueeVariants}
                    animate="animate"
                >
                    <span>{text}</span>
                    <span>{text}</span>
                </motion.div>
            </div>
            <ProjectsGallery className={styles.gallery} headerHeight={theme.headerHeight} />
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = 'Portfolio App';
    const description = 'Welcome to the Portfolio App';
    const imageUrl = 'https://my-portfolio/og-image.png';

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
