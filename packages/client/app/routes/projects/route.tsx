import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { ProjectsGallery } from '~/components/projects-gallery/projects-gallery';
import * as theme from '~/styles/theme.module.scss';
import styles from './projects.module.scss';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: new URL(request.url).origin };
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
    return [
        { title: 'Portfolio App' },
        {
            name: 'description',
            content: 'Welcome to the Portfolio App',
        },
        {
            name: 'author',
            content: 'Codux',
        },
        { tagName: 'link', rel: 'canonical', href: data!.canonicalUrl },
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
        {
            rel: 'canonical',
            href: 'https://portfolio-app.com',
        },
    ];
};
