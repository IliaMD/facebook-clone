import albert from "../assets/1albert.jpg";
import drphil from "../assets/1drphil.webp";
import elon from "../assets/1elon.webp";
import miketyson from "../assets/1miketyson.jpg";
import rihana from "../assets/1rihana.jpg";
import therock from "../assets/therock.jpg";
import therock20 from "../assets/therock20.jpg";
import mike from "../assets/1miketyson.jpg";
import mikeprofile from "../assets/mikeprofile.webp";
import mrbeastbackground from "../assets/mrbeastbackground.webp";
import mrbeast from "../assets/1mrbeast.jpg";
import kobebackground from "../assets/kobebackground.jpg";
import kobe from "../assets/1kobe.webp";
import arnoldbackground from "../assets/arnoldbackground.webp";
import arnold from "../assets/1arnold.jpg";

import { ProfilesType, StoriesType } from "../types/types";

export const profiles: ProfilesType[] = [
  { name: "Albert E.", photo: albert },
  { name: "Arnold S.", photo: arnold },
  { name: "Dr Phill", photo: drphil },
  { name: "Elon Musk", photo: elon },
  { name: "Kobe Briant", photo: kobe },
  { name: "Mike Tyson", photo: miketyson },
  { name: "Mr Beast", photo: mrbeast },
  { name: "Rihana", photo: rihana },
  { name: "The Rock", photo: therock },
];

export const stories: StoriesType[] = [
  { profile: therock, background: therock20 },
  { profile: mikeprofile, background: mike },
  { profile: mrbeast, background: mrbeastbackground },
  { profile: kobe, background: kobebackground },
  { profile: arnold, background: arnoldbackground },
];
