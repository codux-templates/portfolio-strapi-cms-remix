import { useSearchParams } from '@remix-run/react';
import { ErrorComponent } from '~/components/error-component/error-component';

export default function ErrorPage() {
    const [searchParams] = useSearchParams();

    const title = searchParams.get('title');
    const message = searchParams.get('message');

    return <ErrorComponent title={title} message={message} />;
}
