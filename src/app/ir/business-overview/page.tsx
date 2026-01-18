'use client';

import { Canvas } from '@react-three/fiber';
import { DualCoreScene } from '@/components/3d/DualCore';
import { Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

export default function BusinessOverviewPage() {
  return (
    <div className="space-y-12">
      {/* 3D Header Section */}
      <div className="relative h-[300px] w-full bg-graphite rounded-xl overflow-hidden mb-8 border border-platinum shadow-lg">
        <div className="absolute inset-0 z-0">
           <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
             <ambientLight intensity={0.5} />
             <pointLight position={[10, 10, 10]} intensity={1} />
             <DualCoreScene />
             <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
             <Environment preset="city" />
           </Canvas>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-graphite/90 via-graphite/40 to-transparent z-10 pointer-events-none">
           <h1 className="text-3xl font-semibold text-white mb-2">Business Overview</h1>
           <p className="text-white/90 max-w-2xl font-medium">
             The convergence of physical structural engineering and biological computation.
           </p>
        </div>
      </div>

      <div className="space-y-12 animate-in fade-in duration-700 delay-100">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-steel-blue flex items-center justify-center text-white font-bold text-xs">01</div>
              <h2 className="text-xl font-bold text-graphite">Living Systems Intelligence (LSI)</h2>
            </div>
            <p className="text-text-body leading-relaxed">
              The LSI division focuses on the intelligent design of biological interfaces. By leveraging proprietary bio-synthetic frameworks, LSI ensures that therapeutic interactions are precisely managed at the cellular level, drastically reducing systemic toxicity and increasing efficacy.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-meta">
              <li><strong>Core Product:</strong> LSI-Matrix™ (injectable hydrogel)</li>
              <li><strong>Market:</strong> Oncology, Orthopedics</li>
              <li><strong>Status:</strong> Commercial Stage ($450M ARR)</li>
            </ul>
          </motion.div>

          <motion.div 
             initial={{ x: 20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-evergreen flex items-center justify-center text-white font-bold text-xs">02</div>
              <h2 className="text-xl font-bold text-graphite">CytosAI (Computational Biology)</h2>
            </div>
            <p className="text-text-body leading-relaxed">
              CytosAI utilizes a proprietary generative transformer model trained on 500PB of proprietary proteomic data. It predicts protein folding and interaction specifically within the LSI-Matrix environment, reducing drug discovery timelines by approximately 70%.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-meta">
              <li><strong>Core Product:</strong> Cytos-V (In-silico trial platform)</li>
              <li><strong>Market:</strong> Pharma Partnerships, Internal R&D</li>
              <li><strong>Status:</strong> High-Growth SaaS + Milestone Payments</li>
            </ul>
          </motion.div>
        </section>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-off-white border border-platinum rounded-xl p-8 mt-8 hover:border-steel-blue/30 transition-colors"
        >
          <h3 className="text-lg font-bold text-graphite mb-4">Strategic Flywheel</h3>
          <p className="text-text-body max-w-4xl">
            Data generated from LSI's physical applications feeds directly into CytosAI's training models. Conversely, CytosAI optimizes the composition of LSI matrices for specific patient profiles. This closed-loop data advantage creates a widening competitive moat.
          </p>
        </motion.div>
      </div>
    </div>
  );
}