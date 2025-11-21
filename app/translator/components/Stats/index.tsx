"use client";

import { motion } from "motion/react";
import StatsCard from "./StatsCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Stats = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <StatsCard color="blue" />
      <StatsCard color="green" />
      <StatsCard color="purple" />
      <StatsCard color="orange" />
    </motion.div>
  );
};

export default Stats;
