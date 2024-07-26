import { motion } from "framer-motion";

function Reveal({ children }: { children: JSX.Element }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
