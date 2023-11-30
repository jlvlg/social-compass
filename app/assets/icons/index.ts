import article from "@assets/icons/article.svg";
import at from "@assets/icons/at.svg";
import bell from "@assets/icons/bell.svg";
import calendar from "@assets/icons/calendar.svg";
import coin from "@assets/icons/coin.svg";
import dna from "@assets/icons/dna.svg";
import fingerprint from "@assets/icons/fingerprint.svg";
import globe from "@assets/icons/globe.svg";
import id from "@assets/icons/id.svg";
import image from "@assets/icons/image.svg";
import indent from "@assets/icons/indent.svg";
import lock from "@assets/icons/lock.svg";
import mappin from "@assets/icons/mappin.svg";
import phone from "@assets/icons/phone.svg";
import shield from "@assets/icons/shield.svg";
import user from "@assets/icons/user.svg";

const Icons = {
  article,
  at,
  bell,
  calendar,
  coin,
  dna,
  fingerprint,
  globe,
  id,
  image,
  indent,
  lock,
  mappin,
  phone,
  shield,
  user,
};

export type IconType = keyof typeof Icons;

export default function getIcon(icon: IconType) {
  return typeof icon === "string" ? Icons[icon] : icon;
}
