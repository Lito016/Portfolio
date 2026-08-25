'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Hero section — Facebook-style profile layout with cover banner */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-2">
      {/* ===== Cover Banner ===== */}
      <div className="relative overflow-hidden w-full h-48 md:h-64">
        {/* Cover photo — full image, no cropping */}
        <Image
          src={`${basePath}/cover.png`}
          alt="Cover banner"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      </div>

      {/* ===== Profile Info Area — overlaps cover ===== */}
      <div className="relative px-4 pb-16 md:pb-20 mt-8 md:mt-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative shrink-0"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-[var(--background)] shadow-xl">
                <Image
                  src={`${basePath}/profile.png`}
                  alt="Manolito Almaden Jr. profile picture"
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Status indicator */}
              <div className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full ring-3 ring-[var(--background)] shadow-lg shadow-green-500/30" title="Available for work" />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-card rounded-xl p-4 md:p-5 flex-1 min-w-0"
            >
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Passionate about building intelligent web applications, agentic AI workflows,
                and contributing to open source. Currently exploring LLM fine-tuning and RAG architectures.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
