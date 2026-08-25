import es from "../data/es.json";
import en from "../data/en.json";

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "es";

/** Localised URL segments, so Spanish visitors get Spanish URLs. */
export const SEGMENTS: Record<Lang, { experience: string; projects: string }> = {
	es: { experience: "experiencia", projects: "proyectos" },
	en: { experience: "experience", projects: "projects" },
};

const CONTENT = { es, en } as const;

export type Content = typeof es;
export type Experience = Content["experience"][number];
export type Project = Content["projectList"][number];

export function getContent(lang: Lang): Content {
	return CONTENT[lang] as Content;
}

export function otherLang(lang: Lang): Lang {
	return lang === "es" ? "en" : "es";
}

export function homePath(lang: Lang): string {
	return `/${lang}/`;
}

export function experiencePath(lang: Lang, slug: string): string {
	return `/${lang}/${SEGMENTS[lang].experience}/${slug}/`;
}

export function projectPath(lang: Lang, slug: string): string {
	return `/${lang}/${SEGMENTS[lang].projects}/${slug}/`;
}

/**
 * The same page in the other language. Slugs are shared across languages, so
 * only the language prefix and the localised segment change.
 */
export type PageKind =
	| { kind: "home" }
	| { kind: "experience"; slug: string }
	| { kind: "project"; slug: string };

export function alternatePath(lang: Lang, page: PageKind): string {
	const target = otherLang(lang);
	if (page.kind === "experience") return experiencePath(target, page.slug);
	if (page.kind === "project") return projectPath(target, page.slug);
	return homePath(target);
}

export function findExperience(lang: Lang, slug: string): Experience | undefined {
	return getContent(lang).experience.find((item) => item.slug === slug);
}

export function findProject(lang: Lang, slug: string): Project | undefined {
	return getContent(lang).projectList.find((item) => item.slug === slug);
}

/** Neighbouring entries, for the "before this / next project" cards. */
export function neighbours<T extends { slug: string }>(
	items: readonly T[],
	slug: string,
): { prev: T | undefined; next: T | undefined } {
	const index = items.findIndex((item) => item.slug === slug);
	return {
		prev: index > 0 ? items[index - 1] : undefined,
		next: index >= 0 && index < items.length - 1 ? items[index + 1] : undefined,
	};
}
