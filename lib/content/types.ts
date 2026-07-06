export type Locale = "en" | "tr";

export type ModuleItem = {
  title: string;
  desc: string;
  icon: string;
};

export type EvolutionItem = {
  era: string;
  year: string;
  active?: boolean;
};

export type ArchitectureLayer = {
  label: string;
  sub: string;
  highlight?: boolean;
};

export type CommandEvent = {
  time: string;
  type: string;
  msg: string;
};

export type MetricItem = {
  value: number;
  suffix: string;
  label: string;
};

export type LocaleContent = {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    intelligence: string;
    ecosystem: string;
    command: string;
    architecture: string;
    requestAccess: string;
  };
  hero: {
    eyebrow: string;
    titleGold: string;
    titlePlatinum: string;
    subtitleLine1: string;
    subtitleLine2: string;
    speakCta: string;
    requestCta: string;
  };
  intelligence: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    metrics: MetricItem[];
    bullets: string[];
  };
  ecosystem: {
    eyebrow: string;
    title: string;
    description: string;
    modules: ModuleItem[];
  };
  command: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    liveLabels: string[];
    liveTag: string;
    terminalLabel: string;
    events: CommandEvent[];
  };
  globalReach: {
    eyebrow: string;
    title: string;
    description: string;
    stats: { value: string; label: string }[];
    mapCaption: string;
  };
  architecture: {
    eyebrow: string;
    title: string;
    layers: ArchitectureLayer[];
  };
  security: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  evolution: {
    eyebrow: string;
    title: string;
    steps: EvolutionItem[];
    footer: string;
  };
  access: {
    title: string;
    description: string;
    emailPlaceholder: string;
    submit: string;
  };
  footer: {
    tagline: string;
    manifesto: string;
    architecture: string;
    enterpriseContact: string;
    globalPartnerships: string;
    requestAccess: string;
    copyright: string;
  };
  voicePrompts: string[];
};

export type SiteContent = Record<Locale, LocaleContent>;
