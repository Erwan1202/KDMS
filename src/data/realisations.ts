import type { ImageMetadata } from "astro";

export interface Category {
    id: string;
    label: string;
    featured?: boolean;
    gridClass?: string;
}

export interface Project {
    title: string;
    category: string;
    description: string;
    image: ImageMetadata;
    alt?: string;
}

export interface BrandLogo {
    id: number;
    name: string;
    logo: ImageMetadata;
}

// Project Images - Meubles
import m_1 from "../assets/realisations/meubles/dressing-racing-sport-auto.png";
import m_2 from "../assets/realisations/meubles/borne-integration-console-arcade.png";
import m_3 from "../assets/realisations/meubles/comptoir-merchandising-redbull-vue-interne.jpg";
import m_4 from "../assets/realisations/meubles/comptoir-merchandising-redbull-vue-visiteur-stand.jpg";
import m_5 from "../assets/realisations/meubles/flight-trophee-competition-sport-auto.png";
import m_6 from "../assets/realisations/meubles/flight-trophee-competition-sport-equestres.png";

import m_8 from "../assets/realisations/meubles/mobilier-stand-salon-merchadising.png";
import m_9 from "../assets/realisations/meubles/rack-support-racing-sport-moto.png";
import m_10 from "../assets/realisations/meubles/mobilier-salon-stand.png";

// Project Images - Audiovisuel
import a_1 from "../assets/realisations/audiovisuel/flight-eclairage-led-tv-cine-godox.png";
import a_2 from "../assets/realisations/audiovisuel/flight-console-grandma.png";
import a_3 from "../assets/realisations/audiovisuel/rack-ableton.png";

import a_5 from "../assets/realisations/audiovisuel/console-custom-tv-broadcast-sony.png";
import a_6 from "../assets/realisations/audiovisuel/flight-lcd-samsung.png";
import a_7 from "../assets/realisations/audiovisuel/rack-console-son-yamaha.png";

// Project Images - Evenementiel
import e_1 from "../assets/realisations/evenementiel/kit-enceintes-lacoustic-wide.jpeg";
import e_2 from "../assets/realisations/evenementiel/kit-platine-pioneer-dj-set-artiste.jpg";
import e_3 from "../assets/realisations/evenementiel/rack-dj-tool-modulaire.jpeg";
import e_4 from "../assets/realisations/evenementiel/rack-rangement-cymbale-pour-showroom-et-backline.jpeg";
import e_5 from "../assets/realisations/evenementiel/kit-enceintes-lacoustic.png";
import e_6 from "../assets/realisations/evenementiel/trolley-pour-clavier-moog.png";
import e_7 from "../assets/realisations/evenementiel/flight-ampli-ampeg-basse-on-stage.png";
import e_8 from "../assets/realisations/evenementiel/flihgt-ampli-head-laney.png";
import e_9 from "../assets/realisations/evenementiel/rack-console-dt-case-ableton-deploye.png";
import e_10 from "../assets/realisations/evenementiel/rack-ampli-micro-avalon.png";
import e_11 from "../assets/realisations/evenementiel/flight-ampli-aguilar-basse-on-stage.png";
import e_12 from "../assets/realisations/evenementiel/rack-ampli-audio-db.png";
import e_13 from "../assets/realisations/evenementiel/kit-structure-scenique-rig.png";
import e_14 from "../assets/realisations/evenementiel/flight-piano-nord-stage-3-zones.png";
import e_15 from "../assets/realisations/evenementiel/kit-enceintes-lacoustic-wide-2.png";
import e_16 from "../assets/realisations/evenementiel/flight-ampli-gallien-krueger-basse-on-stage.png";
import e_17 from "../assets/realisations/evenementiel/flight-ampli-basse-on-stage-vue-connectique.png";
import e_18 from "../assets/realisations/evenementiel/kit-instrument-grosse-caisse-adams.png";

// Project Images - Industrie
import ind_1 from "../assets/realisations/industrie/mobilier-showroom-industrie-miele.png";
import ind_2 from "../assets/realisations/industrie/meuble-industriel-multi-layers.png";

// Project Images - Valise Résine
import valise_1 from "../assets/realisations/valiseResine/image.png";
import valise_2 from "../assets/realisations/valiseResine/image copy.png";
import valise_3 from "../assets/realisations/valiseResine/jsp.png";

// Project Images - Autres
import jsp1 from "../assets/realisations/autres/jsp1.jpg";
import autre_2 from "../assets/realisations/autres/image.png";

const RATIOS = [
    "aspect-square",
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-[16/9]",
    "aspect-[4/3]",
] as const;

const COLORS = [
    "bg-[#6b755a]",
    "bg-[#5c6650]",
    "bg-[#4d5744]",
    "bg-[#3e4838]",
    "bg-[#7a846a]",
    "bg-[#89937a]",
    "bg-[#525b47]",
    "bg-[#434c3b]",
] as const;

export const categories: Category[] = [
    { id: "all", label: "Tout Voir" },
    { id: "evenementiel", label: "Événementiel", featured: true, gridClass: "md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]" },
    { id: "meubles", label: "Meubles", featured: true, gridClass: "md:col-span-2 md:row-span-1 h-[280px] md:h-[290px]" },
    { id: "audiovisuel", label: "Audiovisuel", featured: true, gridClass: "md:col-span-1 md:row-span-1 h-[280px] md:h-[290px]" },
    { id: "valise-resine", label: "Valise résine", featured: true, gridClass: "md:col-span-1 md:row-span-1 h-[280px] md:h-[290px]" },
    { id: "industrie", label: "Industrie", featured: true, gridClass: "md:col-span-1 md:row-span-1 h-[280px] md:h-[290px]" },
    { id: "autres", label: "Autres", featured: true, gridClass: "md:col-span-1 md:row-span-1 h-[280px] md:h-[290px]" },
];

const AI_DISCLAIMER = "Décor généré par IA à titre illustratif";

const projectsData: Project[] = [
    // Meubles
    { title: "Dressing racing sport auto", category: "meubles", description: "", image: m_1, alt: "Dressing racing sport auto" },
    { title: "Borne intégration console arcade", category: "meubles", description: "", image: m_2, alt: "Borne intégration console arcade" },
    { title: "Comptoir merchandising RedBull vue interne", category: "meubles", description: "", image: m_3, alt: "Comptoir merchandising RedBull vue interne" },
    { title: "Comptoir merchandising RedBull vue visiteur stand", category: "meubles", description: "", image: m_4, alt: "Comptoir merchandising RedBull vue visiteur stand" },
    { title: "Flight Trophée compétition sport auto", category: "meubles", description: "", image: m_5, alt: "Flight Trophée compétition sport auto" },
    { title: "Flight Trophée compétition sport équestres", category: "meubles", description: "", image: m_6, alt: "Flight Trophée compétition sport équestres" },

    { title: "Mobilier stand salon merchadising", category: "meubles", description: "", image: m_8, alt: "Mobilier stand salon merchadising" },
    { title: "Rack support racing sport moto", category: "meubles", description: "", image: m_9, alt: "Rack support racing sport moto" },
    { title: "Mobilier salon stand", category: "meubles", description: "", image: m_10, alt: "Mobilier salon stand" },

    // Audiovisuel
    { title: "Flight éclairage LED TV Ciné - GODOX", category: "audiovisuel", description: "", image: a_1, alt: "Flight éclairage LED TV Ciné - GODOX" },
    { title: "Flight console GrandMa", category: "audiovisuel", description: "", image: a_2, alt: "Flight console GrandMa" },
    { title: "Rack / Ableton", category: "audiovisuel", description: "", image: a_3, alt: "Rack / Ableton" },

    { title: "Console custom TV Broadcast – SONY", category: "audiovisuel", description: "", image: a_5, alt: "Console custom TV Broadcast – SONY" },
    { title: "Flight LCD – Samsung", category: "audiovisuel", description: "", image: a_6, alt: "Flight LCD – Samsung" },
    { title: "Rack console son Yamaha", category: "audiovisuel", description: "", image: a_7, alt: "Rack console son Yamaha" },

    // Evenementiel
    { title: "Kit enceintes LAcoustic Wide", category: "evenementiel", description: "", image: e_1, alt: "Kit enceintes LAcoustic Wide" },
    { title: "Kit Platine Pioneer DJ Set Artiste", category: "evenementiel", description: "", image: e_2, alt: "Kit Platine Pioneer DJ Set Artiste" },
    { title: "Rack DJ Tool modulaire", category: "evenementiel", description: "", image: e_3, alt: "Rack DJ Tool modulaire" },
    { title: "Rack rangement cymbale pour showroom et backline", category: "evenementiel", description: "", image: e_4, alt: "Rack rangement cymbale pour showroom et backline" },
    { title: "Kit enceintes LAcoustic", category: "evenementiel", description: "", image: e_5, alt: "Kit enceintes LAcoustic" },
    { title: "Trolley pour clavier Moog", category: "evenementiel", description: "", image: e_6, alt: "Trolley pour clavier Moog" },
    { title: "Flight ampli AMPEG Basse on stage", category: "evenementiel", description: "", image: e_7, alt: "Flight ampli AMPEG Basse on stage" },
    { title: "Flihgt ampli Head LANEY", category: "evenementiel", description: "", image: e_8, alt: "Flihgt ampli Head LANEY" },
    { title: "Rack console DT Case / ABLETON déployé", category: "evenementiel", description: "", image: e_9, alt: "Rack console DT Case / ABLETON déployé" },
    { title: "Rack ampli micro Avalon", category: "evenementiel", description: "", image: e_10, alt: "Rack ampli micro Avalon" },
    { title: "Flight ampli AGUILAR Basse on stage", category: "evenementiel", description: "", image: e_11, alt: "Flight ampli AGUILAR Basse on stage" },
    { title: "Rack ampli audio D&B", category: "evenementiel", description: "", image: e_12, alt: "Rack ampli audio D&B" },
    { title: "Kit structure scénique & RIG", category: "evenementiel", description: "", image: e_13, alt: "Kit structure scénique & RIG" },
    { title: "Flight piano Nord Stage 3 zones", category: "evenementiel", description: "", image: e_14, alt: "Flight piano Nord Stage 3 zones" },
    { title: "Kit enceintes LAcoustic Wide", category: "evenementiel", description: "", image: e_15, alt: "Kit enceintes LAcoustic Wide" },
    { title: "Flight ampli Gallien Krueger Basse on stage", category: "evenementiel", description: "", image: e_16, alt: "Flight ampli Gallien Krueger Basse on stage" },
    { title: "Flight ampli Basse on stage vue Connectique", category: "evenementiel", description: "", image: e_17, alt: "Flight ampli Basse on stage vue Connectique" },
    { title: "Kit Instrument Grosse caisse Adams", category: "evenementiel", description: "", image: e_18, alt: "Kit Instrument Grosse caisse Adams" },

    // Industrie
    { title: "Mobilier showroom industrie MIELE", category: "industrie", description: "", image: ind_1, alt: "Mobilier showroom industrie MIELE" },
    { title: "Meuble industriel multi layers", category: "industrie", description: "", image: ind_2, alt: "Meuble industriel multi layers" },

    // Valise Résine
    { title: "1", category: "valise-resine", description: `Valise technique en résine ultra-résistante. ${AI_DISCLAIMER}`, image: valise_1, alt: `Valise technique en résine ultra-résistante. ${AI_DISCLAIMER}` },
    { title: "2", category: "valise-resine", description: `Protection étanche et antichoc. ${AI_DISCLAIMER}`, image: valise_2, alt: `Protection étanche et antichoc. ${AI_DISCLAIMER}` },
    { title: "3", category: "valise-resine", description: "Protection pour matériel sensible.", image: valise_3, alt: `Protection pour matériel sensible.` },

    // Autres
    { title: "Réalisation sur mesure pour besoins spécifiques", category: "autres", description: "", image: jsp1 },
    { title: "2", category: "autres", description: `Solution de protection personnalisée. ${AI_DISCLAIMER}`, image: autre_2, alt: `Solution de protection personnalisée. ${AI_DISCLAIMER}` },
];

export const projects = projectsData.map((p, i) => ({
    id: i + 1,
    ...p,
    ratio: RATIOS[i % RATIOS.length],
    color: COLORS[i % COLORS.length],
}));

// Brand Logos
import sonyLogo from "../assets/brands/sony.png";
import yamahaLogo from "../assets/brands/yamaha.png";
import pioneerLogo from "../assets/brands/pioneer.png";
import fordLogo from "../assets/brands/ford.png";
import lgLogo from "../assets/brands/lg.png";
import fenderLogo from "../assets/brands/fender.png";
import midasLogo from "../assets/brands/midas.png";
import allenHeathLogo from "../assets/brands/allen-heath.png";
import uniluminLogo from "../assets/brands/unilumin.png";
import redbullLogo from "../assets/brands/redbull.png";
import mieleLogo from "../assets/brands/miele.png";
import lacousticsLogo from "../assets/brands/l-acoustics.png";
import abletonLogo from "../assets/brands/ableton.png";
import samsungLogo from "../assets/brands/samsung.png";
import ampegLogo from "../assets/brands/ampeg.png";
import moogLogo from "../assets/brands/moog.png";
import godoxLogo from "../assets/brands/godox.png";
import malightingLogo from "../assets/brands/ma-lighting.png";
import laneyLogo from "../assets/brands/laney.png";
import gkLogo from "../assets/brands/gallien-krueger.png";

export const brandLogos: BrandLogo[] = [
    { id: 1, name: "Sony", logo: sonyLogo },
    { id: 2, name: "Yamaha", logo: yamahaLogo },
    { id: 3, name: "Pioneer", logo: pioneerLogo },
    { id: 4, name: "Ford", logo: fordLogo },
    { id: 5, name: "LG", logo: lgLogo },
    { id: 6, name: "Fender", logo: fenderLogo },
    { id: 7, name: "Midas", logo: midasLogo },
    { id: 8, name: "Allen & Heath", logo: allenHeathLogo },
    { id: 9, name: "Unilumin", logo: uniluminLogo },
    { id: 10, name: "Red Bull", logo: redbullLogo },
    { id: 11, name: "Miele", logo: mieleLogo },
    { id: 12, name: "L-Acoustics", logo: lacousticsLogo },
    { id: 13, name: "Ableton", logo: abletonLogo },
    { id: 14, name: "Samsung", logo: samsungLogo },
    { id: 15, name: "Ampeg", logo: ampegLogo },
    { id: 16, name: "Moog", logo: moogLogo },
    { id: 17, name: "Godox", logo: godoxLogo },
    { id: 18, name: "MA Lighting", logo: malightingLogo },
    { id: 19, name: "Laney", logo: laneyLogo },
    { id: 20, name: "Gallien Krueger", logo: gkLogo },
];
