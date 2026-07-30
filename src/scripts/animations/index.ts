import { animateHeaderAndHero } from './hero';
import { animateScrollContent } from './scroll';
import { gsap, ScrollTrigger } from './setup';

function bindMediaRefresh(): () => void {
  let refreshFrame: number | undefined;
  const cleanups: Array<() => void> = [];

  const scheduleRefresh = (): void => {
    if (refreshFrame !== undefined) {
      window.cancelAnimationFrame(refreshFrame);
    }

    refreshFrame = window.requestAnimationFrame(() => {
      refreshFrame = undefined;
      ScrollTrigger.refresh();
    });
  };

  const bindOnce = (
    element: Element,
    eventName: 'load' | 'error' | 'loadedmetadata',
  ): void => {
    element.addEventListener(eventName, scheduleRefresh, { once: true });
    cleanups.push(() => element.removeEventListener(eventName, scheduleRefresh));
  };

  document.querySelectorAll<HTMLImageElement>('main img').forEach((image) => {
    if (!image.complete) {
      bindOnce(image, 'load');
      bindOnce(image, 'error');
    }
  });

  document.querySelectorAll<HTMLVideoElement>('main video').forEach((video) => {
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      scheduleRefresh();
      return;
    }

    bindOnce(video, 'loadedmetadata');
    bindOnce(video, 'error');
  });

  if (document.readyState === 'complete') {
    scheduleRefresh();
  } else {
    window.addEventListener('load', scheduleRefresh, { once: true });
    cleanups.push(() => window.removeEventListener('load', scheduleRefresh));
  }

  return () => {
    cleanups.forEach((cleanup) => cleanup());

    if (refreshFrame !== undefined) {
      window.cancelAnimationFrame(refreshFrame);
    }
  };
}

export function initLandingAnimations(): () => void {
  const media = gsap.matchMedia();
  const removeMediaRefresh = bindMediaRefresh();

  media.add(
    {
      desktop:
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      mobile:
        '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
    },
    (mediaContext) => {
      const { desktop = false, mobile = false } =
        mediaContext.conditions ?? {};

      if (!desktop && !mobile) {
        return;
      }

      const animationContext = gsap.context(() => {
        animateHeaderAndHero({ desktop });
        animateScrollContent({ mobile });
      });

      return () => animationContext.revert();
    },
  );

  return () => {
    removeMediaRefresh();
    media.revert();
  };
}
