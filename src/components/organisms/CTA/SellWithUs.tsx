import { LinkBtn, LinkBtnTheme } from "@/components/atoms/buttons/LinkBtn";

const SellWithUs = () => {
  return (
    <section className="py-28">
      <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
        <div className="max-w-xl space-y-3 md:mx-auto">
          <h3 className="text-primarytheme font-semibold">
            Professional services
          </h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Build the future with us
          </p>
          <p className="text-gray-600">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur excepteur sint occaecat
            cupidatat non proident.
          </p>
        </div>
        <div className="mt-4">
          <LinkBtn
            title={"sell your service"}
            path={""}
            theme={LinkBtnTheme.themeColor}
          />
        </div>
      </div>
    </section>
  );
};

export default SellWithUs;
