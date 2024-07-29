import React from 'react';
import styles from './project-not-found.module.scss';
import { Link } from '@remix-run/react';
import { ROUTES } from '~/router/config';

export const ProjectNotFound: React.FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.message}>Project not found</div>
            <Link to={ROUTES.projects.to()} className={styles['overlay-button']}>
                Back to all projects {'->'}
            </Link>
        </div>
    );
};
