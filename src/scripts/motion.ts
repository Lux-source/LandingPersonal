import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Declarative motion for the whole site. Three attributes, all optional:
 *
 *   data-entrance            a block that plays once on load: its children stack in,
 *                            and any [data-draw] path inside draws itself.
 *   data-reveal              fades up when it scrolls into view.
 *   data-reveal-list="y|x"   its direct children stagger in when the list scrolls into
 *                            view (y: rise, x: slide from the left). data-stagger tunes
 *                            the gap in seconds.
 *
 * Everything is visible without JS and nothing runs under prefers-reduced-motion.
 */
export function initMotion(root: ParentNode = document) {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	gsap.registerPlugin(ScrollTrigger);
	const ease = "power3.out";

	// entrance
	root.querySelectorAll<HTMLElement>("[data-entrance]").forEach((block) => {
		const children = [...block.children].filter((c) => !(c instanceof SVGElement));
		const paths = block.querySelectorAll<SVGPathElement>("[data-draw] path");
		const tl = gsap.timeline({ defaults: { ease } });
		tl.from(children, { y: 22, autoAlpha: 0, duration: 0.65, stagger: 0.1 }, 0);
		paths.forEach((path) => {
			const length = path.getTotalLength();
			tl.fromTo(
				path,
				{ strokeDasharray: length, strokeDashoffset: length },
				{ strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
				0.3,
			);
		});
	});

	// single reveals
	const singles = root.querySelectorAll<HTMLElement>("[data-reveal]");
	if (singles.length) {
		gsap.set(singles, { y: 18, autoAlpha: 0 });
		ScrollTrigger.batch(singles, {
			start: "top 90%",
			once: true,
			onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease, overwrite: true }),
		});
	}

	// list reveals
	root.querySelectorAll<HTMLElement>("[data-reveal-list]").forEach((list) => {
		const axis = list.dataset.revealList === "x" ? "x" : "y";
		const stagger = Number(list.dataset.stagger ?? (axis === "x" ? 0.12 : 0.08));
		const items = [...list.children];
		if (!items.length) return;
		gsap.set(items, { [axis]: axis === "x" ? -20 : 24, autoAlpha: 0 });
		ScrollTrigger.batch(items, {
			start: "top 88%",
			once: true,
			onEnter: (batch) =>
				gsap.to(batch, { x: 0, y: 0, autoAlpha: 1, duration: 0.65, stagger, ease, overwrite: true }),
		});
	});
}
