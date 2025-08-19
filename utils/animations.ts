import { Variants } from 'framer-motion';

// Fade animations
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Scale animations
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 }
};

// Slide animations
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

// Stagger children animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const hoverLift = {
  whileHover: { 
    y: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: "0 20px 30px rgba(78, 68, 86, 0.15)",
    transition: { duration: 0.3 }
  }
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: {
      duration: 0.2
    }
  }
};

// Card animations
export const cardAnimation: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    y: -2,
    scale: 1.01,
    boxShadow: "0 12px 24px rgba(78, 68, 86, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

// Loading animation
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Skeleton loading animation
export const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Spring configurations
export const springConfig = {
  default: { type: "spring", stiffness: 300, damping: 20 },
  gentle: { type: "spring", stiffness: 200, damping: 30 },
  wobbly: { type: "spring", stiffness: 180, damping: 15 },
  stiff: { type: "spring", stiffness: 400, damping: 25 },
  slow: { type: "spring", stiffness: 100, damping: 20 }
};

// Transition presets
export const transitionPresets = {
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  default: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  smooth: { duration: 0.4, ease: "easeInOut" }
};

// Utility function to create custom animations
export const createAnimation = (
  from: Record<string, any>,
  to: Record<string, any>,
  transition?: any
): Variants => ({
  initial: from,
  animate: { ...to, transition: transition || transitionPresets.default },
  exit: from
});

// Responsive animations (reduce motion for accessibility)
export const getResponsiveAnimation = (animation: Variants): Variants => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      initial: {},
      animate: {},
      exit: {}
    };
  }
  return animation;
};