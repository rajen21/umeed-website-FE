import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, BookOpen } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useSiteContent } from "../../contexts/SiteContentContext";
import { cn } from "../../lib/utils";

function HeroCarousel({
  className,
  imageClassName,
  overlayClassName,
  images,
}: {
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  images: { src: string; alt: string }[];
}) {
  return (
    <Carousel
      className={cn("w-full h-full", className)}
      plugins={[Autoplay({ delay: 6000 }), Fade()]}
    >
      <CarouselContent className="h-full ml-0">
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-full pl-0 relative">
            {overlayClassName && (
              <div className={cn("absolute inset-0 z-10", overlayClassName)} />
            )}
            <div className="w-full h-full overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  "w-full h-full object-cover",
                  imageClassName,
                )}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

type HeroContentProps = {
  variant: "mobile" | "desktop";
  tagline: string;
  title: string;
  titleHighlight: string;
  description: string;
  stats: {
    studentsCount: string;
    studentsLabel: string;
    volunteersCount: string;
    volunteersLabel: string;
    sessionsCount: string;
    sessionsLabel: string;
  };
};

function HeroContent({
  variant,
  tagline,
  title,
  titleHighlight,
  description,
  stats,
}: HeroContentProps) {
  const isMobile = variant === "mobile";

  const statItems = [
    {
      icon: Users,
      value: stats.studentsCount,
      label: stats.studentsLabel,
      iconClass: "text-umeed-sky",
    },
    {
      icon: Heart,
      value: stats.volunteersCount,
      label: stats.volunteersLabel,
      iconClass: "text-red-500",
    },
    {
      icon: BookOpen,
      value: stats.sessionsCount,
      label: stats.sessionsLabel,
      iconClass: "text-umeed-sage",
    },
  ];

  return (
    <div
      className={cn(
        "max-w-4xl mx-auto text-center",
        isMobile ? "text-foreground" : "text-white",
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-4 border",
            isMobile
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-white/10 backdrop-blur-md text-white border-white/20",
          )}
        >
          <Heart
            className={cn(
              "w-3.5 h-3.5",
              isMobile ? "text-red-500 fill-red-500" : "text-red-400 fill-red-400",
            )}
          />
          {tagline}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        className={cn(
          "font-fredoka font-bold leading-tight tracking-tight mb-4",
          isMobile
            ? "text-3xl"
            : "text-4xl md:text-6xl lg:text-7xl mb-6 drop-shadow-lg",
        )}
      >
        {title}{" "}
        <span
          className={cn(
            isMobile ? "text-primary dark:text-umeed-yellow" : "text-umeed-yellow",
          )}
        >
          {titleHighlight}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className={cn(
          "max-w-2xl mx-auto leading-relaxed mb-6",
          isMobile
            ? "text-sm text-muted-foreground"
            : "text-base md:text-xl text-white/95 mb-10 drop-shadow-md",
        )}
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className={cn("mb-8", !isMobile && "md:mb-12")}
      >
        <Button
          size="lg"
          className={cn(
            "text-base px-8 shadow-lg bg-umeed-sky hover:bg-umeed-sky/90 text-white",
            isMobile ? "w-full" : "w-full sm:w-auto",
          )}
          asChild
        >
          <Link to="/volunteer#application-form">
            Become a Volunteer
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={cn(
          "grid grid-cols-3 gap-3 max-w-2xl mx-auto",
          !isMobile && "sm:gap-6 md:gap-8",
        )}
      >
        {statItems.map(({ icon: Icon, value, label, iconClass }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <div
              className={cn(
                "inline-flex items-center justify-center rounded-xl mb-2",
                isMobile
                  ? "w-11 h-11 bg-muted"
                  : "w-10 h-10 sm:w-12 sm:h-12 bg-white/15 backdrop-blur-sm shadow-lg sm:mb-3",
              )}
            >
              <Icon className={cn("w-5 h-5", iconClass)} />
            </div>
            <div
              className={cn(
                "font-display font-bold leading-none",
                isMobile
                  ? "text-2xl text-foreground"
                  : "text-xl sm:text-3xl md:text-4xl text-white drop-shadow-md",
              )}
            >
              {value}
            </div>
            <div
              className={cn(
                "text-[11px] sm:text-sm mt-1 leading-tight",
                isMobile ? "text-muted-foreground" : "text-white/90 drop-shadow-md",
              )}
            >
              {label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { getContent } = useSiteContent();

  const tagline = getContent("hero", "tagline", "Every Sunday, We Light Up Futures");
  const title = getContent("hero", "title", "Turning Hope into");
  const titleHighlight = getContent("hero", "title_highlight", "Opportunity");
  const description = getContent(
    "hero",
    "description",
    "UMEED Children Foundation empowers underprivileged children through free education every Sunday. Join our community of volunteers making a difference, one child at a time.",
  );

  const stats = {
    studentsCount: getContent("stats", "students_count", "200+"),
    studentsLabel: getContent("stats", "students_label", "Students Taught"),
    volunteersCount: getContent("stats", "volunteers_count", "50+"),
    volunteersLabel: getContent("stats", "volunteers_label", "Volunteers"),
    sessionsCount: getContent("stats", "sessions_count", "100+"),
    sessionsLabel: getContent("stats", "sessions_label", "Sunday Sessions"),
  };

  const heroImages = [
    { src: getContent("hero", "image_1", "/hero1.jpg"), alt: "Umeed team photo 1" },
    { src: getContent("hero", "image_2", "/hero2.jpg"), alt: "Umeed team photo 2" },
    { src: getContent("hero", "image_3", "/hero3.jpg"), alt: "Umeed team photo 3" },
  ].filter((img) => img.src);

  const contentProps = {
    tagline,
    title,
    titleHighlight,
    description,
    stats,
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Mobile: bright image banner + solid content panel ── */}
      <div className="md:hidden">
        <div className="relative h-[44vh] min-h-[260px] max-h-[340px]">
          <HeroCarousel
            images={heroImages}
            overlayClassName="bg-gradient-to-b from-black/10 via-transparent to-black/20"
            imageClassName="object-[50%_55%]"
          />
        </div>

        <div className="relative z-10 -mt-5 rounded-t-[1.75rem] bg-background px-5 pt-8 pb-10 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
          <HeroContent variant="mobile" {...contentProps} />
        </div>
      </div>

      {/* ── Desktop: full-bleed overlay hero ── */}
      <div className="hidden md:block relative min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <HeroCarousel
            images={heroImages}
            overlayClassName="bg-black/30"
            imageClassName="object-[50%_75%] brightness-105"
          />
        </div>

        <div className="absolute inset-0 z-[5] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(0,0,0,0.45)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/70 to-transparent z-10 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-20 flex items-center min-h-[90vh] py-20">
          <HeroContent variant="desktop" {...contentProps} />
        </div>
      </div>
    </section>
  );
}
