import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Reveal a list's items as they scroll into view, in batches, once. */
export function revealOnScroll(
	container: Element | null,
	from: gsap.TweenVars = { y: 28 },
	stagger = 0.09,
) {
	if (!container) return;
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	gsap.registerPlugin(ScrollTrigger);
	const items = container.querySelectorAll(":scope > li");
	gsap.set(items, { ...from, autoAlpha: 0 });
	ScrollTrigger.batch(items, {
		start: "top 88%",
		once: true,
		onEnter: (batch) =>
			gsap.to(batch, { x: 0, y: 0, autoAlpha: 1, duration: 0.7, stagger, ease: "power3.out", overwrite: true }),
	});
}
