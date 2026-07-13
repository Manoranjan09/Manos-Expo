import { motion } from "framer-motion";

const lines = [
  "MANORANJAN OS",
  "AI ENGINEER",
  "FULL STACK DEVELOPER",
  "OPEN SOURCE",
  "BUILDING THE FUTURE",
];

export function LocationHUD() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.55, 0.85, 0.55],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute right-[9%] top-[10%] text-right select-none"
    >
      {lines.map((line, index) => (
        <div key={line}>
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              delay: index * 0.3,
              repeat: Infinity,
            }}
            className={`tracking-[0.42em] uppercase ${
              index === 0
                ? "text-[12px] font-semibold text-orange-300"
                : "text-[10px] text-white/80"
            }`}
          >
            {line}
          </motion.div>

          {index !== lines.length - 1 && (
            <div className="my-1 flex justify-end">
              <div className="h-6 w-px bg-orange-400/20" />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}