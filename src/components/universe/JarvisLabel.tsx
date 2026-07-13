import { motion } from "framer-motion";

type Props = {
  hovered: boolean;
  open: boolean;
  thinking: boolean;
};

export function JarvisLabel({
  hovered,
  open,
  thinking,
}: Props) {
  return (
    <motion.div
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="pointer-events-none fixed bottom-10 right-28 z-[100] text-right"
    >
      {/* JARVIS Header */}
      <div className="flex items-center justify-end gap-2">
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400"
        />

        <div className="font-mono text-[11px] font-semibold tracking-[0.35em] text-orange-300">
          JARVIS
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
            }}
          >
            █
          </motion.span>
        </div>
      </div>

      {/* Assistant State */}
      <motion.div
        animate={{ opacity: 1 }}
        className="mt-2 text-[9px] tracking-[0.35em] text-white/70"
      >
        {thinking
          ? "PROCESSING..."
          : open
          ? "CONNECTED"
          : hovered
          ? "CLICK TO TALK"
          : "AI ASSISTANT"}
      </motion.div>

      {/* Status */}
      <motion.div
        animate={{ opacity: 1 }}
        className="mt-2 flex items-center justify-end gap-2 text-[9px] tracking-[0.25em]"
      >
        <span
          className={`h-2 w-2 rounded-full animate-pulse ${
            thinking
              ? "bg-yellow-400"
              : open
              ? "bg-green-400"
              : "bg-orange-400"
          }`}
        />

        <span className="text-orange-300">
          {thinking
            ? "BUSY"
            : open
            ? "ONLINE"
            : "READY"}
        </span>
      </motion.div>
    </motion.div>
  );
}