import { motion } from "framer-motion";

const particles = [
  { x: "72%", y: "16%", size: 3, delay: 0 },
  { x: "82%", y: "24%", size: 2, delay: 1 },
  { x: "91%", y: "32%", size: 4, delay: 2 },
  { x: "74%", y: "45%", size: 2, delay: 3 },
  { x: "95%", y: "52%", size: 3, delay: 4 },
  { x: "80%", y: "64%", size: 2, delay: 5 },
  { x: "90%", y: "76%", size: 4, delay: 6 },
  { x: "76%", y: "88%", size: 2, delay: 7 },
];

export function FloatingParticles() {
  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.15 }}
          animate={{
            y: [-6, 6, -6],
            x: [-3, 3, -3],
            opacity: [0.08, 0.25, 0.08],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 6 + p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-orange-300"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 10px rgba(251,146,60,.35)",
          }}
        />
      ))}
    </>
  );
}