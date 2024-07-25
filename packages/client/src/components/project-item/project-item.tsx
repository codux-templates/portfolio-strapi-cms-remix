import { StrapiImage } from '../../api';
import { getImageUrl } from '../../api/strapi-connection';
import styles from './project-item.module.scss';
import { motion } from 'framer-motion';
import cx from 'classnames';

export interface ProjectItemProps {
    className?: string;
    title?: string;
    description?: string;
    image?: StrapiImage;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const ProjectItem = ({ className, title, description, image }: ProjectItemProps) => {
    return (
        <motion.div
            className={cx(styles.root, className)}
            initial={{ opacity: 0.2, marginTop: 100 }}
            whileInView={{ opacity: 1, marginTop: 0, transition: { duration: 1 } }}
            viewport={{ once: true, margin: '20px' }}
        >
            <img
                src={getImageUrl(image)}
                alt=""
                style={{ width: image?.data.attributes.width }}
                className={styles.img}
            />
            <h3 className={styles.itemTitle}>{title}</h3>
            <p className={styles.itemDesc}>{description}</p>
        </motion.div>
    );
};
