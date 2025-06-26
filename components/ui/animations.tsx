"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import React from "react";

interface FadeInTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  isMargin?: boolean;
}

export default function FadeInText({
  children,
  delay = 0,
  className,
  isMargin = true,
}: FadeInTextProps) {
  // Si children est un tableau, on applique un stagger
  if (Array.isArray(children)) {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      },
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={cn(className)}
      >
        {children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Si children est un seul élément, on utilise l'animation simple
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface FadeInImageProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "x" | "y";
}

export function FadeInImage({
  children,
  delay = 0,
  className,
  direction = "x",
}: FadeInImageProps) {
  const getInitialPosition = () => {
    if (direction === "x") {
      return { opacity: 0, x: -40 };
    }
    return { opacity: 0, y: 40 };
  };

  const getAnimatePosition = () => {
    if (direction === "x") {
      return { opacity: 1, x: 0 };
    }
    return { opacity: 1, y: 0 };
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredGridProps {
  children: ReactNode[];
  stagger?: number;
  delay?: number;
  className?: string;
}

export function StaggeredGrid({
  children,
  stagger = 0.2,
  delay = 0.2,
  className,
}: StaggeredGridProps) {
  return (
    <div className={cn(className)}>
      {children.map((child, index) => {
        // Extraire les classes CSS de l'enfant si c'est un élément React valide
        let childClassName = "";
        if (
          React.isValidElement(child) &&
          typeof child.props === "object" &&
          child.props &&
          "className" in child.props
        ) {
          childClassName = child.props.className as string;
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: delay + index * stagger,
            }}
            className={childClassName}
            style={{
              transform: "translateZ(0)", // Force hardware acceleration
              willChange: "opacity, transform", // Optimise les animations
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

interface StaggeredCardsProps {
  children: ReactNode[];
  stagger?: number;
  delay?: number;
  className?: string;
}

export function StaggeredCards({
  children,
  stagger = 0.2,
  delay = 0.2,
  className,
}: StaggeredCardsProps) {
  return (
    <div className={cn(className)}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: delay + index * stagger,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
