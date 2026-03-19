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
}

export interface BrandLogo {
    id: number;
    name: string;
    logo: ImageMetadata;
}

// Project Images - Meubles
import bureauMobile from "../assets/realisations/meubles/bureau-mobile.png";
import commode from "../assets/realisations/meubles/commode.png";
import borneArcade from "../assets/realisations/meubles/borne-arcade.png";
import meubleRedBull from "../assets/realisations/meubles/meuble-redbull-1.jpg";
import redbullGym from "../assets/realisations/meubles/redbull-gym.jpg";

// Project Images - Spectacle
import grosseEnceinte from "../assets/realisations/spectacle/GrosseEnceinte.jpeg";
import stationPioneer from "../assets/realisations/spectacle/station-pioneer-dj.jpg";

// Project Images - Evenementiel
import platineVinyl from "../assets/realisations/evenementiel/PlatineVinyl.jpeg";
import evenementielWS from "../assets/realisations/evenementiel/WhatsApp Image 2026-03-07 at 11.04.50(2).jpeg";

// Project Images - Autres
import jsp1 from "../assets/realisations/autres/jsp1.jpg";
import jsp2 from "../assets/realisations/autres/jsp2.jpg";

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
    { id: "meubles", label: "Meubles", featured: true, gridClass: "md:col-span-2" },
    { id: "spectacle", label: "Spectacle", featured: true, gridClass: "md:col-span-1" },
    { id: "industrie", label: "Industrie", featured: true, gridClass: "md:col-span-1" },
    { id: "audiovisuel", label: "Audiovisuel", featured: true, gridClass: "md:col-span-2" },
    { id: "evenementiel", label: "Événementiel", featured: true, gridClass: "md:col-span-2" },
    { id: "valise-resine", label: "Valise résine", featured: true, gridClass: "md:col-span-1" },
    { id: "autres", label: "Autres", featured: true, gridClass: "md:col-span-1" },
];



const projectsData: Project[] = [
    // Meubles
    { title: "Vestiaire mobile", category: "meubles", description: "Vestiaire mobile professionnel personnalisé", image: bureauMobile },
    { title: "Meuble télévision", category: "meubles", description: "Meuble télévision sur mesure", image: commode },
    { title: "Borne Arcade", category: "meubles", description: "Borne arcade rétro personnalisée", image: borneArcade },
    { title: "Meuble Red Bull", category: "meubles", description: "Mobilier évènementiel Red Bull", image: meubleRedBull },
    { title: "Équipement de sport", category: "meubles", description: "Flight case de rangement pour équipement sportif", image: redbullGym },
    
    // Spectacle
    { title: "Protection Enceinte", category: "spectacle", description: "Flight case de protection pour enceinte acoustique", image: grosseEnceinte },
    { title: "Station DJ Pioneer", category: "spectacle", description: "Régie DJ complète sur mesure", image: stationPioneer },
    
    // Evenementiel
    { title: "Platine Vinyle", category: "evenementiel", description: "Flight case pour platine vinyle professionnelle", image: platineVinyl },
    { title: "Flight case Évènementiel", category: "evenementiel", description: "Solution de transport pour matériel évènementiel", image: evenementielWS },
    
    // Autres
    { title: "Projet Spécial 1", category: "autres", description: "Réalisation sur mesure pour besoins spécifiques", image: jsp1 },
    { title: "Projet Spécial 2", category: "autres", description: "Solution de protection personnalisée", image: jsp2 },
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
];

