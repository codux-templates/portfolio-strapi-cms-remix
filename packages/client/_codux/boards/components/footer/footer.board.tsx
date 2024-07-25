import { createBoard } from '@wixc3/react-board';
import { Footer } from '~/components/footer/footer';
import ComponentWrapper from '../../../wrappers/component-wrapper';

export default createBoard({
    name: 'Footer',
    Board: () => {
        return (
            <ComponentWrapper
                loaderData={{
                    root: {
                        about: {
                            attributes: {
                                email: 'user@gmail.com',
                                phone: '1234567890',
                                instagram: 'https://www.instagram.com/',
                                facebook: 'https://www.facebook.com/',
                                pinterest: 'https://www.pinterest.com/',
                            },
                        },
                    },
                }}
            >
                <Footer />
            </ComponentWrapper>
        );
    },

    isSnippet: false,
});
