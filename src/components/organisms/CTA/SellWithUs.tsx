import { LinkBtn, LinkBtnTheme } from '@/components/atoms/buttons/LinkBtn';

const SellWithUs = () => {
    return (
        <section className="py-28">
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl space-y-3 md:mx-auto">
                    <h3 className="text-primarytheme font-semibold">Become a service Provider</h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Turn your skills into cash.
                    </p>
                    <p className="text-gray-600">
                        Share your expertise by becomming a Homygig service provider now. on our
                        platform, you are not confined to a fixed location for work. your job is to
                        list you services ours is to source and provide clients for you.
                    </p>
                </div>
                <div className="mt-4">
                    <LinkBtn
                        title={'Start Now'}
                        path={'/workspace'}
                        theme={LinkBtnTheme.themeColor}
                    />
                </div>
            </div>
        </section>
    );
};

export default SellWithUs;
