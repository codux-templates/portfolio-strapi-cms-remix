import { Link } from '@remix-run/react';
import { ROUTES } from '~/router/config';
import styles from './error-component.module.scss';

const unknownErrorTitle = 'Ooops, something went wrong';

export interface ErrorProps {
    title: string | undefined | null;
    message: string | undefined | null;
}

export const ErrorComponent = ({ title, message }: ErrorProps) => {
    return (
        <div className={styles.root}>
            <h1>{title ?? unknownErrorTitle}</h1>
            {message && <div>{message}</div>}
            <Link to={ROUTES.home.to()}>Navigate to Home Page {'->'}</Link>
        </div>
    );
};
