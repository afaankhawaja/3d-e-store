'use client';
import { useState, useEffect } from "react";
import { productCustomizations, ProductCustomizationConfig } from "@/lib/productCustomizations";

export interface MaterialCustomizationValues {
  color?: string;
  roughness?: number;
  metalness?: number;
  texture?: string;
}

export interface CustomizationsState {
  [materialName: string]: MaterialCustomizationValues;
}

interface CustomizationPanelProps {
  productId: string;
  currentCustomizations: CustomizationsState;
  onApply: (customizations: CustomizationsState) => void;
}

export default function CustomizationPanel({
  productId,
  currentCustomizations,
  onApply,
}: CustomizationPanelProps) {
  const productConfig: ProductCustomizationConfig | undefined = productCustomizations[productId];

  const [localCustomizations, setLocalCustomizations] = useState<CustomizationsState>({});

  useEffect(() => {
    if (productConfig) {
      const initState: CustomizationsState = {};
      productConfig.materials.forEach(({ materialName }) => {
        initState[materialName] = {
          color: currentCustomizations[materialName]?.color || "#ffffff",
          roughness: currentCustomizations[materialName]?.roughness ?? 0.5,
          metalness: currentCustomizations[materialName]?.metalness ?? 0.5,
        };
      });
      setLocalCustomizations(initState);
    }
  }, [productConfig, currentCustomizations]);

  // Use a generic function so that when field is "roughness" or "metalness" (numbers)
  // the type is inferred correctly.
  const handleChange = <K extends keyof MaterialCustomizationValues>(
    materialName: string,
    field: K,
    value: MaterialCustomizationValues[K]
  ) => {
    setLocalCustomizations((prev) => ({
      ...prev,
      [materialName]: {
        ...prev[materialName],
        [field]: value,
      },
    }));
  };

  const handleApply = () => {
    onApply(localCustomizations);
  };

  if (!productConfig) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Customize Your Product</h2>
      {productConfig.materials.map(({ materialName, properties }) => (
        <div key={materialName} className="mb-6 border p-4 rounded">
          <h3 className="text-xl font-medium mb-2">{materialName}</h3>
          {properties.color && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Color</label>
              <input
                type="color"
                value={localCustomizations[materialName]?.color || "#ffffff"}
                onChange={(e) => handleChange(materialName, "color", e.target.value)}
                className="w-16 h-10 border"
              />
            </div>
          )}
          {properties.roughness && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Roughness</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                // Convert the number to a string since the input value must be a string.
                value={(localCustomizations[materialName]?.roughness ?? 0.5).toString()}
                onChange={(e) =>
                  handleChange(materialName, "roughness", parseFloat(e.target.value))
                }
                className="w-full"
              />
              <span>{localCustomizations[materialName]?.roughness ?? 0.5}</span>
            </div>
          )}
          {properties.metalness && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Metalness</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={(localCustomizations[materialName]?.metalness ?? 0.5).toString()}
                onChange={(e) =>
                  handleChange(materialName, "metalness", parseFloat(e.target.value))
                }
                className="w-full"
              />
              <span>{localCustomizations[materialName]?.metalness ?? 0.5}</span>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleApply}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
      >
        Apply Customizations
      </button>
    </div>
  );
}
