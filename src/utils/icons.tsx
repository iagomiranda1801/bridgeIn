import React from 'react';
import { SvgXml } from 'react-native-svg';
import { View } from 'react-native';

// Definição dos tipos
export type IconName = 
  | 'caneta'
  | 'chat'
  | 'corneta'
  | 'exit'
  | 'handshake'
  | 'house'
  | 'lamp'
  | 'maleta'
  | 'maleta2'
  | 'martelo'
  | 'profile'
  | 'star';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

// XML strings dos ícones SVG
const iconXmlStrings: Record<IconName, string> = {
  caneta: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
  chat: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`,
  corneta: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9h5v6H4V9zm12 0v6c0 1.1-.9 2-2 2H9V7h5c1.1 0 2 .9 2 2z"/></svg>`,
  exit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>`,
  handshake: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.9 5c-.17 0-.32.09-.41.23l-.07.15-5.18 11.65c-.16.29-.26.61-.26.96 0 1.11.9 2.01 2.01 2.01.96 0 1.77-.68 1.96-1.59l.01-.03L16.4 5.5c0-.28-.22-.5-.5-.5zM1 9l2 2c2.88-2.88 6.79-4.08 10.53-3.62l1.19-2.68C9.89 3.84 4.74 5.27 1 9zm20 1l2-2c-1.64-1.64-3.55-2.82-5.59-3.57l-.53 2.82c1.5.62 2.9 1.53 4.12 2.75zm-4 0l2-2c-.8-.8-1.7-1.42-2.66-1.89l-.55 2.92c.42.27.83.59 1.21.97zM5 11l2 2c1.13-1.13 2.56-1.79 4.03-2l1.28-2.88c-2.63-.08-5.3.87-7.31 2.88z"/></svg>`,
  house: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  lamp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/></svg>`,
  maleta: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
  maleta2: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>`,
  martelo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.21 1l-3.93 3.93 2.5 2.5 3.93-3.93L13.21 1zm-2.43 6.36l-7.5 7.5 2.5 2.5 7.5-7.5-2.5-2.5zm10.15 10.15l-3.93 3.93 2.5 2.5 3.93-3.93-2.5-2.5z"/></svg>`,
  profile: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`
};

/**
 * Componente Icon que renderiza um SVG baseado no nome fornecido
 * @param props - Propriedades do ícone (nome, tamanho, cor, etc)
 * @returns Componente SVG
 */
export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  const xml = iconXmlStrings[name];
  
  if (!xml) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }
  
  return (
    <View style={style}>
      <SvgXml xml={xml} width={size} height={size} color={color} />
    </View>
  );
};

/**
 * Função para obter o XML de um ícone específico
 * @param name - Nome do ícone
 * @returns String XML do ícone
 */
export const getIconXml = (name: IconName): string => {
  return iconXmlStrings[name] || '';
};

export default Icon;
