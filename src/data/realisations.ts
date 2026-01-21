// Types pour la page Réalisations

export interface Category {
    id: string;
    label: string;
}

export interface Project {
    title: string;
    category: string;
    description: string;
}

export interface BrandLogo {
    id: number;
    name: string;
    logo: ImageMetadata;
}

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
    { id: "meubles", label: "Meubles" },
    { id: "spectacle", label: "Spectacle" },
    { id: "industrie", label: "Industrie" },
    { id: "audiovisuel", label: "Audiovisuel" },
    { id: "evenementiel", label: "Evenementiel" },
    { id: "pelicase", label: "Pelicase" },
];


const projectsData: Project[] = [
    { title: "Bureau Mobile", category: "meubles", description: "Poste de travail déployable" },
    { title: "Régie Tournée", category: "spectacle", description: "Protection console grand format" },
    { title: "Valise Drone", category: "audiovisuel", description: "Calage haute précision" },
    { title: "Armoire Serveur", category: "industrie", description: "Rack 19 pouces amorti" },
    { title: "Commode Costumes", category: "spectacle", description: "Tiroirs et penderie intégrée" },
    { title: "Kitchen Set", category: "meubles", description: "Cuisine mobile pour catering" },
    { title: "Lentilles Cinéma", category: "audiovisuel", description: "Set complet d'optiques" },
    { title: "Moteur Avion", category: "industrie", description: "Transport sécurisé pièce critique" },
    { title: "Backline Guitares", category: "spectacle", description: "Vault pour 6 guitares" },
    { title: "Bar Evénementiel", category: "meubles", description: "Station cocktail mobile" },
    { title: "Écran Géant LED", category: "spectacle", description: "Modules LED tiles" },
    { title: "Station Médicale", category: "industrie", description: "Unité de soin projetable" },
    { title: "Pelicase 1", category: "pelicase", description: "Protection équipements" },
    { title: "Pelicase 2", category: "pelicase", description: "Protection équipements" },
    { title: "Pelicase 3", category: "pelicase", description: "Protection équipements" },
];

export const projects = projectsData.map((p, i) => ({
    id: i + 1,
    ...p,
    ratio: RATIOS[i % RATIOS.length],
    color: COLORS[i % COLORS.length],
}));

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
