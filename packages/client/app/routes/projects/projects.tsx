import styles from './projects.module.scss';
import * as theme from '~/styles/theme.module.scss';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { ProjectsGallery } from '~/components/projects-gallery/projects-gallery';

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Projects = () => {
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
};
