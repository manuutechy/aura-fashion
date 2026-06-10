import React from "react";
import { useStore } from "../store/useStore";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 md:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          let bgColor = "bg-bg-secondary border-accent-primary text-text-main";
          let Icon = Info;
          
          if (toast.type === "error") {
            bgColor = "bg-red-50 border-error text-error";
            Icon = AlertCircle;
          } else if (toast.type === "success") {
            bgColor = "bg-bg-secondary border-accent-primary text-text-main";
            Icon = CheckCircle;
          }

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3 p-4 border-l-2 shadow-lg ${bgColor} backdrop-blur-md`}
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium font-sans leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 text-text-muted hover:text-text-main transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
