import {
  BiCodeAlt,
  BiHeart,
  BiPalette,
  BiShield,
  BiBulb,
  BiTrendingUp,
  BiSun,
  BiMoon,
  BiDownload,
  BiUser,
  BiEnvelope,
  BiPhone,
  BiBook,
  BiMessageSquare,
  BiMap,
  BiCheckCircle,
  BiSend,
  BiChevronRight,
  BiUpArrowAlt,
  BiLinkExternal,
  BiWrench,
  BiServer,
} from 'react-icons/bi'
import {
  FaGithub,
  FaTelegram,
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPython,
} from 'react-icons/fa'
import {
  SiPhp,
  SiMysql,
  SiLaravel,
  SiJavascript,
  SiHtml5,
  SiReact,
} from 'react-icons/si'

const ICON_MAP = {
  'bx bx-code-alt': BiCodeAlt,
  'bx bx-heart': BiHeart,
  'bx bx-palette': BiPalette,
  'bx bx-shield-quarter': BiShield,
  'bx bx-shield': BiShield,
  'bx bx-bulb': BiBulb,
  'bx bx-trending-up': BiTrendingUp,
  'bx bx-sun': BiSun,
  'bx bx-moon': BiMoon,
  'bx bx-download': BiDownload,
  'bx bx-user': BiUser,
  'bx bx-envelope': BiEnvelope,
  'bx bx-phone': BiPhone,
  'bx bx-book-alt': BiBook,
  'bx bx-message': BiMessageSquare,
  'bx bx-map': BiMap,
  'bx bx-check-circle': BiCheckCircle,
  'bx bx-send': BiSend,
  'bx bx-chevron-right': BiChevronRight,
  'bx bx-up-arrow-alt': BiUpArrowAlt,
  'bx bx-link-external': BiLinkExternal,
  'bx bx-wrench': BiWrench,
  'bx bxl-facebook': FaFacebook,
  'bx bxl-twitter': FaTwitter,
  'bx bxl-instagram-alt': FaInstagram,
  'bx bxl-linkedin': FaLinkedin,
  'fab fa-github': FaGithub,
  'fab fa-telegram': FaTelegram,
  'fab fa-whatsapp': FaWhatsapp,
  'bx bxl-php': SiPhp,
  'bx bxl-laravel': SiLaravel,
  'bx bxl-javascript': SiJavascript,
  'bx bxl-html5': SiHtml5,
  'bx bxl-react': SiReact,
  'bx bxl-python': FaPython,
  'bx bxs-data': BiServer,
}


export default function Icon({ name, className, ...props }) {
  const Component = ICON_MAP[name]
  if (!Component) {
    return <span className={className} {...props} />
  }
  return <Component className={className} {...props} />
}
