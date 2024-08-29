import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { FaFacebook } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

type PropTypes = {
  url: string;
  title: string;
  imageUrl: string;
};

export default function SocialShare({ title = 'Homygig', ...props }: PropTypes) {
  return (
    <div className="flex justify-center items-center gap-4 p-2">
      <FacebookShareButton
        title=""
        url={'http://localhost:3000/service-details/555c1e35-56a6-446b-975e-e34594437a81'}
      >
        <FaFacebook className="text-blue-500 " size={24} />
      </FacebookShareButton>

      <WhatsappShareButton title={title} url={props.url}>
        <IoLogoWhatsapp className="text-green-500 " size={24} />
      </WhatsappShareButton>
    </div>
  );
}
