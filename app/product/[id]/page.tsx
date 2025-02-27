// 'use client';

// import { Suspense, useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   Environment,
//   Html,
//   useProgress,
//   useGLTF,
// } from "@react-three/drei";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import CustomizationPanel from "@/components/CustomizationPanel";
// import { productCustomizations } from "@/lib/productCustomizations";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import * as THREE from "three";

// type ProductId = "sofa" | "chair" | "table" | "lamp" | "wardrobe";

// interface CameraPosition {
//   position: [number, number, number];
//   fov?: number;
// }

// interface PositionConfig {
//   sofa: CameraPosition;
//   chair: CameraPosition;
//   table: CameraPosition;
//   lamp: CameraPosition;
//   wardrobe: CameraPosition;
// }

// const modelPaths: Record<ProductId, string> = {
//   sofa: "/models/sofa.glb",
//   chair: "/models/chair.glb",
//   table: "/models/table.glb",
//   lamp: "/models/lamp.glb",
//   wardrobe: "/models/wardrobe.glb",
// };

// const position: PositionConfig = {
//   sofa: { position: [0, 2, -2], fov: 40 },
//   chair: { position: [0, 2, -2], fov: 50 },
//   table: { position: [0, 3, -3], fov: 40 },
//   lamp: { position: [0, 1, 1], fov: 30 },
//   wardrobe: { position: [0, 1, 8], fov: 60 },
// };

// function Loader() {
//   const { progress } = useProgress();
//   return <Html center>{progress.toFixed(0)}% loaded</Html>;
// }

// export interface MaterialCustomizationValues {
//   color?: string;
//   roughness?: number;
//   metalness?: number;
//   texture?: string;
// }

// export interface CustomizationsState {
//   [materialName: string]: MaterialCustomizationValues;
// }

// interface ProductModelProps {
//   modelPath: string;
//   productId: string;
//   customizations: CustomizationsState;
// }

// function ProductModel({ modelPath, productId, customizations }: ProductModelProps) {
//   const { scene, materials } = useGLTF(modelPath);
//   const productConfig = productCustomizations[productId];

//   useEffect(() => {
//     if (productConfig) {
//       productConfig.materials.forEach(({ materialName, properties }) => {
//         const targetMat = materials[materialName];
//         // Ensure targetMat is a MeshStandardMaterial before updating
//         if (targetMat && targetMat instanceof THREE.MeshStandardMaterial) {
//           const clonedMat = targetMat.clone();
//           const opts = customizations[materialName];
//           if (opts) {
//             if (properties.color && opts.color) {
//               clonedMat.color = new THREE.Color(opts.color);
//             }
//             if (properties.roughness && opts.roughness !== undefined) {
//               clonedMat.roughness = opts.roughness;
//             }
//             if (properties.metalness && opts.metalness !== undefined) {
//               clonedMat.metalness = opts.metalness;
//             }
//             // Additional properties (e.g., texture) can be handled here
//           }
//           clonedMat.needsUpdate = true;
//           scene.traverse((child: THREE.Object3D) => {
//             if (child instanceof THREE.Mesh) {
//               // Optionally, check for an array of materials if your meshes use them.
//               if (
//                 child.material &&
//                 !(child.material instanceof Array) &&
//                 (child.material as THREE.MeshStandardMaterial).name === materialName
//               ) {
//                 child.material = clonedMat;
//               }
//             }
//           });
//         }
//       });
//     }
//   }, [customizations, productConfig, materials, scene]);
  

//   return <primitive object={scene} dispose={null} />;
// }

// // Moved preloading to inside a client-side component
// function ModelPreloader() {
//   useEffect(() => {
//     // Preload models only in the browser
//     useGLTF.preload("/models/sofa.glb");
//     useGLTF.preload("/models/chair.glb");
//     useGLTF.preload("/models/table.glb");
//     useGLTF.preload("/models/lamp.glb");
//     useGLTF.preload("/models/wardrobe.glb");
//   }, []);
  
//   return null;
// }

// export default function ProductPage() {
//   const params = useParams();
//   const id = params?.id as string;

//   // Unconditionally declare hooks first.
//   const [customizations, setCustomizations] = useState<CustomizationsState>({});
//   const [showCustomizer, setShowCustomizer] = useState(false);

//   // Validate the product id
//   const isValidProduct = (id: string): id is ProductId =>
//     Object.keys(modelPaths).includes(id);

//   if (!id || !isValidProduct(id)) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-xl text-red-600">Product not found.</p>
//       </main>
//     );
//   }

//   const modelPath = modelPaths[id];

//   return (
//     <main className="p-3 min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
//       {/* Preloader component only runs in browser */}
//       <ModelPreloader />
//       <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
//         <Canvas camera={position[id]}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
//           <Suspense fallback={<Loader />}>
//             <ProductModel modelPath={modelPath} productId={id} customizations={customizations} />
//             <Environment preset="city" />
//           </Suspense>
//           <OrbitControls enablePan enableZoom />
//         </Canvas>
//         <button
//           onClick={() => setShowCustomizer(true)}
//           className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition"
//         >
//           Customize
//         </button>
//       </div>
//       {showCustomizer && (
//         <div className="mt-6">
//           <CustomizationPanel
//             productId={id}
//             currentCustomizations={customizations}
//             onApply={(newCustomizations) => {
//               setCustomizations(newCustomizations);
//               setShowCustomizer(false);
//             }}
//           />
//         </div>
//       )}
//       <div className="mt-6">
//         <Link href="/" className="text-indigo-600">
//           <div className="flex gap-x-2 justify-center items-center hover:scale-105 hover:font-bold">
//             <div className="rotate-180 transition-all duration-300"><ArrowForwardIcon/></div> 
//             <p>Back to Home</p>
//           </div>  
//         </Link>
//       </div>
//     </main>
//   );
// }
'use client';
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useProgress,
  useGLTF,
} from "@react-three/drei";
import Link from "next/link";
import { useParams } from "next/navigation";
import CustomizationPanel from "@/components/CustomizationPanel";
import { productCustomizations } from "@/lib/productCustomizations";
import * as THREE from "three";

type ProductId = "sofa" | "chair" | "table" | "lamp" | "wardrobe";

interface CameraPosition {
  position: [number, number, number];
  fov?: number;
}

interface PositionConfig {
  sofa: CameraPosition;
  chair: CameraPosition;
  table: CameraPosition;
  lamp: CameraPosition;
  wardrobe: { position: [number, number, number] };
}

const modelPaths: Record<ProductId, string> = {
  sofa: "/models/sofa.glb",
  chair: "/models/chair.glb",
  table: "/models/table.glb",
  lamp: "/models/lamp.glb",
  wardrobe: "/models/wardrobe.glb",
};

const position: PositionConfig = {
  sofa: { position: [0, 2, -2], fov: 40 },
  chair: { position: [0, 2, -2], fov: 40 },
  table: { position: [0, 3, -3], fov: 40 },
  lamp: { position: [0, 1, 1], fov: 30 },
  wardrobe: { position: [0, 0, 450] },
};

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

export interface MaterialCustomizationValues {
  color?: string;
  roughness?: number;
  metalness?: number;
  texture?: string;
}

export interface CustomizationsState {
  [materialName: string]: MaterialCustomizationValues;
}

interface ProductModelProps {
  modelPath: string;
  productId: string;
  customizations: CustomizationsState;
}

function ProductModel({ modelPath, productId, customizations }: ProductModelProps) {
  const { scene, materials } = useGLTF(modelPath);
  const productConfig = productCustomizations[productId];

  useEffect(() => {
    if (productConfig) {
      productConfig.materials.forEach(({ materialName, properties }) => {
        const targetMat = materials[materialName];
        if (targetMat && targetMat instanceof THREE.MeshStandardMaterial) {
          const clonedMat = targetMat.clone();
          const opts = customizations[materialName];
          if (opts) {
            if (properties.color && opts.color) {
              clonedMat.color = new THREE.Color(opts.color);
            }
            if (properties.roughness && opts.roughness !== undefined) {
              clonedMat.roughness = opts.roughness;
            }
            if (properties.metalness && opts.metalness !== undefined) {
              clonedMat.metalness = opts.metalness;
            }
          }
          clonedMat.needsUpdate = true;
          scene.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              if (
                child.material &&
                !(child.material instanceof Array) &&
                (child.material as THREE.MeshStandardMaterial).name === materialName
              ) {
                child.material = clonedMat;
              }
            }
          });
        }
      });
    }
  }, [customizations, productConfig, materials, scene]);

  return <primitive object={scene} dispose={null} />;
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  // Declare hooks unconditionally.
  const [customizations, setCustomizations] = useState<CustomizationsState>({});
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Validate product id.
  const isValidProduct = (id: string): id is ProductId =>
    Object.keys(modelPaths).includes(id);

  if (!id || !isValidProduct(id)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-600">Product not found.</p>
      </main>
    );
  }

  const modelPath = modelPaths[id];

  return (
    <main className="p-3 min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
        <Canvas camera={position[id]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <Suspense fallback={<Loader />}>
            <ProductModel modelPath={modelPath} productId={id} customizations={customizations} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enablePan enableZoom />
        </Canvas>
        <button
          onClick={() => setShowCustomizer(true)}
          className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition"
        >
          Customize
        </button>
      </div>
      {showCustomizer && (
        <div className="mt-6">
          <CustomizationPanel
            productId={id}
            currentCustomizations={customizations}
            onApply={(newCustomizations) => {
              setCustomizations(newCustomizations);
              setShowCustomizer(false);
            }}
          />
        </div>
      )}
      <div className="mt-6">
        <Link href="/" className="text-indigo-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
