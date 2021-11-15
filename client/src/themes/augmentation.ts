export interface CardTagPalette {
  [key: string]: string | undefined;
  white?: string;
  green?: string;
  red?: string;
  yellow?: string;
  blue?: string;
  purple?: string;
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    tags: CardTagPalette;
  }
  interface PaletteOptions {
    tags: CardTagPalette;
  }
}
