export interface MaterialCustomization {
    materialName: string;
    properties: {
      color?: boolean;
      roughness?: boolean;
      metalness?: boolean;
      texture?: boolean;
    };
  }
  
  export interface ProductCustomizationConfig {
    materials: MaterialCustomization[];
  }
  
  export const productCustomizations: Record<string, ProductCustomizationConfig> = {
    sofa: {
      materials: [
        { materialName: "mat16", properties: { color: true, roughness: true } },
        { materialName: "mat17", properties: { color: true } },
        { materialName: "mat20", properties: { color: true, roughness: true } },
        { materialName: "mat23", properties: { color: true } },
      ],
    },
    chair: {
      materials: [
        { materialName: "Black", properties: { color: true, roughness: true } },
        { materialName: "Chair", properties: { color: true, roughness: true } },
        { materialName: "Grey", properties: { color: true, roughness: true } },

      ],
    },
    table: {
      materials: [
        { materialName: "BlackCoatSteel", properties: { color: true, roughness: true, texture: true } },
        { materialName: "BlackPlastic", properties: { color: true, roughness: true, texture: true } },
        { materialName: "BlackWood", properties: { color: true, roughness: true, texture: true } },
      ],
    },
    lamp: {
      materials: [
        { materialName: "lamp", properties: { color: true, metalness: true } },
        { materialName: "metal", properties: { color: true, metalness: true } },

      ],
    },
    wardrobe: {
      materials: [
        { materialName: "lambert2SG", properties: { color: true, roughness: true } },
        { materialName: "lambert3SG", properties: { color: true, roughness: true } },
        { materialName: "lambert4SG", properties: { color: true, roughness: true } },
      ],
    },
  };
  