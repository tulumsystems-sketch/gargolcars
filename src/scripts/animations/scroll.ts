import { gsap } from './setup';

interface ScrollAnimationOptions {
  mobile: boolean;
}

export function animateScrollContent({
  mobile,
}: ScrollAnimationOptions): void {
  const sectionHeadings = gsap.utils.toArray<HTMLElement>(
    '[data-section-heading]',
  );

  sectionHeadings.forEach((heading) => {
    gsap.from(heading, {
      y: mobile ? 18 : 26,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 86%',
        once: true,
      },
    });
  });

  const vehicleGrid = document.querySelector<HTMLElement>(
    '[data-vehicle-grid]',
  );
  const vehicleCards = gsap.utils.toArray<HTMLElement>(
    '[data-vehicle-card]',
  );

  if (vehicleGrid && vehicleCards.length > 0) {
    gsap.from(vehicleCards, {
      y: mobile ? 18 : 34,
      opacity: 0,
      duration: mobile ? 0.55 : 0.7,
      ease: 'power3.out',
      stagger: mobile ? 0.06 : 0.1,
      scrollTrigger: {
        trigger: vehicleGrid,
        start: 'top 84%',
        once: true,
      },
    });
  }

  const video = document.querySelector<HTMLElement>(
    '[data-video-reveal]',
  );

  if (video) {
    gsap.from(video, {
      y: mobile ? 18 : 28,
      scale: mobile ? 1 : 0.985,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: video,
        start: 'top 86%',
        once: true,
      },
    });
  }

  if (mobile) {
    const finalCta = document.querySelector<HTMLElement>(
      '[data-animation-target="final-cta"]',
    );

    if (finalCta) {
      gsap.from(finalCta, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.85,
        ease: 'power3.out',
      });
    }
  }
}
