import { Leaf, Sparkles, HeartHandshake, MapPin } from 'lucide-react';

export const BRAND = {
  nombre: 'AromaticCol',
  tagline: 'Aromaterapia · Relajación · Since 2018',
  idea: 'Transformamos espacios cotidianos en experiencias sensoriales elegantes mediante aroma, diseño y bienestar.',
  mision:
    'Transformar los espacios cotidianos en experiencias sensoriales inolvidables, ofreciendo aromatizadores de alta calidad que mejoren el bienestar y la atmósfera en los hogares y negocios.',
  vision:
    'Ser reconocidos como líderes en el mercado de la aromatización, transformando el arte del aroma en una conexión emocional constante entre las personas y sus entornos.',
} as const;

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Productos', href: '#productos' },
  { label: 'Ferias', href: '#ferias' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const PILARES = [
  {
    icon: Leaf,
    titulo: 'Esencias naturales',
    texto:
      'Extractos concentrados de plantas, flores y frutos que cuidan tu bienestar y el de tu espacio.',
  },
  {
    icon: Sparkles,
    titulo: 'Calidad premium',
    texto:
      'Materiales, acabados y aromas seleccionados con criterio editorial. La calidad habla por sí sola.',
  },
  {
    icon: HeartHandshake,
    titulo: 'Atención cercana',
    texto:
      'Trato directo y personal por WhatsApp: te acompañamos a encontrar el aroma ideal para ti.',
  },
  {
    icon: MapPin,
    titulo: 'Hecho en Colombia',
    texto:
      'Un emprendimiento colombiano comprometido con generar oportunidades para más familias.',
  },
] as const;
