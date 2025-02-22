"use client";

import { Suspense } from "react";
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
  wardrobe: {
    position: [number, number, number];
  };
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

function ProductModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} dispose={null} />;
}

// Preload models
useGLTF.preload("/models/sofa.glb");
useGLTF.preload("/models/chair.glb");
useGLTF.preload("/models/table.glb");
useGLTF.preload("/models/lamp.glb");
useGLTF.preload("/models/wardrobe.glb");

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  // Type guard to check if id is a valid ProductId
  const isValidProduct = (id: string): id is ProductId => {
    return Object.keys(modelPaths).includes(id);
  };

  if (!id || !isValidProduct(id)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-600">Product not found.</p>
      </main>
    );
  }

  const modelPath = modelPaths[id];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
        <Canvas camera={position[id]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <Suspense fallback={<Loader />}>
            <ProductModel modelPath={modelPath} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enablePan={true} enableZoom={true} />
        </Canvas>
      </div>
      <div className="mt-6">
        <Link href="/" className="text-indigo-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
