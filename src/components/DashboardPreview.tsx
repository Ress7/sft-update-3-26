import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/images/preview-terminal.jpg",
    label: "Trading Terminal",
    desc: "Real-time TradingView charts with order execution",
  },
  {
    src: "/images/preview-dashboard.jpg",
    label: "Dashboard",
    desc: "Portfolio overview, watchlists & performance",
  },
  {
    src: "/images/preview-orion.jpg",
    label: "Orion AI",
    desc: "Conversational AI for market intelligence",
  },
  {
    src: "/images/preview-portfolio.jpg",
    label: "Analytics",
    desc: "Asset allocation, risk metrics & deep insights",
  },
];

const DashboardPreview = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)_/_0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary/30 mb-3 font-mono">
            Terminal
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-foreground/80">
            The{" "}
            <span className="text-gradient-primary italic font-semibold">
              Trading Terminal
            </span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground/40 max-w-md mx-auto">
            Swipe to explore the platform
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Embla viewport */}
          <div ref={emblaRef} className="overflow-hidden rounded-2xl">
            <div className="flex">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="flex-[0_0_85%] md:flex-[0_0_80%] min-w-0 pl-4 first:pl-0"
                >
                  <motion.div
                    className="relative group cursor-grab active:cursor-grabbing"
                    animate={{
                      opacity: selectedIndex === i ? 1 : 0.4,
                      scale: selectedIndex === i ? 1 : 0.92,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Image container with glass border */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/20 shadow-2xl shadow-black/40">
                      <img
                        src={slide.src}
                        alt={slide.label}
                        className="w-full aspect-[16/9] object-cover"
                        draggable={false}
                      />
                      {/* Gradient overlay at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                      {/* Label overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <AnimatePresence mode="wait">
                          {selectedIndex === i && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                            >
                              <p className="text-[10px] uppercase tracking-[0.4em] text-primary/50 font-mono mb-2">
                                {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                              </p>
                              <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground/90 mb-1">
                                {slide.label}
                              </h3>
                              <p className="text-xs text-muted-foreground/50">
                                {slide.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/80 border border-border/20 backdrop-blur-sm flex items-center justify-center text-foreground/40 hover:text-foreground/70 hover:border-primary/30 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/80 border border-border/20 backdrop-blur-sm flex items-center justify-center text-foreground/40 hover:text-foreground/70 hover:border-primary/30 transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="relative py-2"
            >
              <div
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  selectedIndex === i
                    ? "w-8 bg-primary/60"
                    : "w-4 bg-foreground/10 hover:bg-foreground/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
