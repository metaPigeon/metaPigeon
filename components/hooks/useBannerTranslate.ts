import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type ScrollPosition = { scrollX: number; scrollY: number };

export function useDynamicCallback<T extends (...args: never[]) => unknown>(
  callback: T
): T {
  const ref = useRef<T>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  // @ts-expect-error: TS is right that this callback may be a supertype of T,
  // but good enough for our use
  return useCallback<T>((...args) => ref.current(...args), []);
}
const getScrollPosition = (): ScrollPosition => ({
  scrollX: window.pageXOffset,
  scrollY: window.pageYOffset,
});

export function useScrollPosition(
  effect: (
    position: ScrollPosition,
    lastPosition: ScrollPosition | null
  ) => void,
  deps: unknown[] = []
): void {
  // const {scrollEventsEnabledRef} = useScrollController();
  const lastPositionRef = useRef<ScrollPosition | null>(null);

  const dynamicEffect = useDynamicCallback(effect);

  useEffect(() => {
    const handleScroll = () => {
      // if (!scrollEventsEnabledRef.current) {
      //   return;
      // }

      const currentPosition = getScrollPosition()!;

      if (dynamicEffect) {
        dynamicEffect(currentPosition, lastPositionRef.current);
      }

      lastPositionRef.current = currentPosition;
    };

    const opts: AddEventListenerOptions & EventListenerOptions = {
      passive: true,
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, opts);

    return () => window.removeEventListener("scroll", handleScroll, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicEffect, ...deps]);
}

const useBannerTranslate = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [navCollapse, setNavCollpase] = useState(false);
  const [translate, setTranslate] = useState(0);
  useScrollPosition(({ scrollY }, lastPosition) => {
    if (!bannerRef.current) return;
    const translate = scrollY / 5;
    if (translate >= 64) {
      bannerRef.current.style["transform"] = `translate3d(0px, 64, 0px)`;
      setTranslate(64);
    } else {
      bannerRef.current.style[
        "transform"
      ] = `translate3d(0px, ${translate}px, 0px)`;
      setTranslate(translate);
    }
    if (scrollY > 50) {
      setNavCollpase(true);
    } else {
      setNavCollpase(false);
    }
  });

  return { bannerRef, navCollapse, translate };
};

export default useBannerTranslate;
