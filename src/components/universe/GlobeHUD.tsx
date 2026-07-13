import { motion } from "framer-motion";

export function GlobeHUD() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 300,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute right-[-12%] top-[48%] h-[720px] w-[720px] -translate-y-1/2 opacity-[.75]"
    >
      <svg
        viewBox="0 0 560 560"
        className="h-full w-full"
        fill="none"
      >
        {/* Outer Sphere */}
        <circle
          cx="280"
          cy="280"
          r="230"
          stroke="#F97316"
          strokeWidth="1"
          opacity="0.18"
        />

        {/* Horizontal */}
        {[60, 120, 180, 240, 300].map((y, i) => (
          <ellipse
            key={i}
            cx="280"
            cy="280"
            rx="230"
            ry={230 - y / 2}
            stroke="#FB923C"
            strokeWidth="0.8"
            opacity={0.14}
          />
        ))}

        {/* Vertical */}
        {[50, 90, 140, 190].map((x, i) => (
          <ellipse
            key={i}
            cx="280"
            cy="280"
            rx={x}
            ry="230"
            stroke="#F97316"
            strokeWidth="0.8"
            opacity={0.15}
          />
        ))}

        {/* Center Ring */}
        <circle
          cx="280"
          cy="280"
          r="95"
          stroke="#FB923C"
          strokeWidth="0.8"
          opacity="0.18"
        />

        {/* Small Ring */}
        <circle
          cx="280"
          cy="280"
          r="45"
          stroke="#FB923C"
          strokeWidth="0.8"
          opacity="0.25"
        />
      </svg>

      {/* Floating Points */}

      {[15, 70, 150, 220, 310].map((deg) => (
        <motion.div
          key={deg}
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            transform: `rotate(${deg}deg)`,
          }}
        >
          <div
            className="absolute left-1/2 top-[38px] h-2 w-2 -translate-x-1/2 rounded-full bg-orange-300"
            style={{
              boxShadow: "0 0 10px #fb923c",
            }}
          />
          <motion.div
  animate={{ rotate: 360 }}
  transition={{
    repeat: Infinity,
    duration: 60,
    ease: "linear",
  }}
  className="absolute right-[-10%] top-[42%]
             h-[760px]
             w-[760px]
             -translate-y-1/2
             rounded-full
             border
             border-orange-500/10"
/>
        </motion.div>
        
      ))}
    </motion.div>
  );
}