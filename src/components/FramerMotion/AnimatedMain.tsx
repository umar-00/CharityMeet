import React from 'react';
import { motion, AnimationProps, Variants } from 'framer-motion';

const mainRouterChangeAnimation: Variants = {
    // initial: { opacity: 0, y: -50 },
    // animate: { opacity: 1, y: 0 },
    // exit: { opacity: 0, y: -50 },
    // initial: { opacity: 0, x: -100 },
    // animate: { opacity: 1, x: 0 },
    // exit: { opacity: 0, x: -100 },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

type Props = {
    children: JSX.Element;
};

const AnimatedMain = (props: Props) => {
    return (
        <motion.div
            variants={mainRouterChangeAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                // x: { type: 'spring', duration: 0.5, delay: 0 },
                duration: 0.4,
                // delay: 0,
            }}
            className="h-full w-full"
        >
            {props.children}
        </motion.div>
    );
};

export default AnimatedMain;
