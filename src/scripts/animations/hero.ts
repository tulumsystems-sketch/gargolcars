import { gsap, ScrollTrigger } from './setup';

interface HeroAnimationOptions {
  desktop: boolean;
}

export function animateHeaderAndHero({
  desktop,
}: HeroAnimationOptions): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');

  if (!hero) {
    return;
  }

  const headerItems = header?.firstElementChild
    ? Array.from(header.firstElementChild.children)
    : [];
  const heroCopy = [
    hero.querySelector('[data-hero-eyebrow]'),
    hero.querySelector('[data-hero-title]'),
    hero.querySelector('[data-hero-description]'),
    hero.querySelector('[data-hero-capabilities]'),
  ].filter((element): element is Element => element !== null);
  const searchPanel = hero.querySelector<HTMLElement>('[data-search-panel]');
  const leftVehicle = hero.querySelector<HTMLElement>(
    '[data-hero-media="left"]',
  );
  const rightVehicle = hero.querySelector<HTMLElement>(
    '[data-hero-media="right"]',
  );
  const watermark = hero.querySelector<HTMLElement>(
    '[data-hero-watermark]',
  );

  const intro = gsap.timeline({
    defaults: {
      duration: 0.75,
      ease: 'power3.out',
    },
  });

  if (headerItems.length > 0) {
    intro.from(headerItems, {
      y: -14,
      opacity: 0,
      stagger: 0.08,
      duration: 0.55,
    });
  }

  if (desktop) {
    if (leftVehicle) {
      intro.from(
        leftVehicle,
        {
          xPercent: -6,
          opacity: 0.35,
          duration: 1.15,
        },
        0.12,
      );
    }

    if (rightVehicle) {
      intro.from(
        rightVehicle,
        {
          xPercent: 6,
          opacity: 0.35,
          duration: 1.15,
        },
        0.12,
      );
    }
  } else if (rightVehicle) {
    intro.from(
      rightVehicle,
      {
        scale: 1.025,
        opacity: 0.45,
        duration: 0.9,
      },
      0.1,
    );
  }

  intro.from(
    heroCopy,
    {
      y: 24,
      opacity: 0,
      stagger: 0.09,
    },
    0.28,
  );

  if (searchPanel) {
    intro.from(
      searchPanel,
      {
        y: 30,
        opacity: 0,
        duration: 0.85,
      },
      0.58,
    );
  }

  if (header) {
    const solidHeader = gsap.to(header, {
      backgroundColor: 'rgba(9, 10, 11, 0.94)',
      borderColor: 'rgba(255, 255, 255, 0.11)',
      duration: 0.3,
      ease: 'power2.out',
      paused: true,
    });

    ScrollTrigger.create({
      trigger: hero,
      start: 'top -24px',
      onEnter: () => {
        header.dataset.headerState = 'solid';
        solidHeader.play();
      },
      onLeaveBack: () => {
        header.dataset.headerState = 'transparent';
        solidHeader.reverse();
      },
    });
  }

  if (!desktop) {
    return;
  }

  if (leftVehicle) {
    gsap.to(leftVehicle, {
      yPercent: 3,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  if (rightVehicle) {
    gsap.to(rightVehicle, {
      yPercent: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  if (watermark) {
    gsap.to(watermark, {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.4,
      },
    });
  }
}
