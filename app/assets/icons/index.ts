import { FC, SVGAttributes } from "react";
import arrow from "./arrow.svg";
import article from "./article.svg";
import at from "./at.svg";
import bell from "./bell.svg";
import cake from "./cake.svg";
import calendar from "./calendar.svg";
import camera from "./camera.svg";
import caret from "./caret.svg";
import clip from "./clip.svg";
import clock from "./clock.svg";
import coin from "./coin.svg";
import comment from "./comment.svg";
import dna from "./dna.svg";
import fingerprint from "./fingerprint.svg";
import globe from "./globe.svg";
import id from "./id.svg";
import image from "./image.svg";
import indent from "./indent.svg";
import like from "./like.svg";
import lock from "./lock.svg";
import mail from "./mail.svg";
import mappin from "./mappin.svg";
import mappinnegative from "./mappinnegative.svg";
import phone from "./phone.svg";
import phonenegative from "./phonenegative.svg";
import share from "./share.svg";
import shield from "./shield.svg";
import smile from "./smile.svg";
import user from "./user.svg";
import usernegative from "./usernegative.svg";

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
  clock,
  like,
  comment,
  share,
  camera,
  clip,
  smile,
  caret,
  arrow,
  usernegative,
  cake,
  mappinnegative,
  mail,
  phonenegative,
};

export type IconType = keyof typeof Icons;

export default Icons as Record<IconType, FC<SVGAttributes<SVGElement>>>;
