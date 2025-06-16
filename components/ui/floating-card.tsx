import React from "react";
import { motion } from "framer-motion";

const FloatingCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-8, 8, -8] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FloatingCard;
