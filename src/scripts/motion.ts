import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, Flip);

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  scope.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [
  ...scope.querySelectorAll<T>(sel),
];

root.classList.add('motion-ready');

/* ------------------------------------------------------------------ smooth scroll */

let lenis: Lenis | null = null;
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

$$<HTMLAnchorElement>('[data-scroll-link]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    const target = hash ? $(hash) : null;
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', hash);
  });
});

/* ------------------------------------------------------------------ project filters */

const grid = $('[data-grid]');
if (grid) {
  const buttons = $$<HTMLButtonElement>('[data-filter]');
  const cards = $$('[data-card]', grid);

  const applyOffsets = () => {
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    let i = 0;
    cards.forEach((card) => {
      if (card.hidden) return card.classList.remove('is-offset');
      card.classList.toggle('is-offset', cols > 1 && i % cols === 1 && !card.matches('.card--soon'));
      i++;
    });
  };

  const isVisible = (card: HTMLElement, filter: string) => {
    if (card.matches('.card--soon')) return filter === 'ai';
    return filter === 'all' || card.dataset.category === filter;
  };

  const setFilter = (filter: string, animate: boolean) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
    const state = animate && !reduceMotion ? Flip.getState(cards) : null;

    cards.forEach((card) => (card.hidden = !isVisible(card, filter)));
    applyOffsets();

    // keep the filter in the URL so it can be shared and survives reloads
    const url = new URL(window.location.href);
    if (filter === 'all') url.searchParams.delete('filter');
    else url.searchParams.set('filter', filter);
    history.replaceState(null, '', url);

    if (!state) return ScrollTrigger.refresh();
    Flip.from(state, {
      duration: 0.75,
      ease: 'power3.inOut',
      absolute: true,
      stagger: 0.02,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  };

  buttons.forEach((btn) => btn.addEventListener('click', () => setFilter(btn.dataset.filter!, true)));

  const initial = new URLSearchParams(window.location.search).get('filter');
  if (initial && buttons.some((b) => b.dataset.filter === initial)) setFilter(initial, false);

  applyOffsets();
  window.addEventListener('resize', applyOffsets);
}

/* ------------------------------------------------------------------ motion (skipped for reduced motion) */

if (!reduceMotion) {
  /* hero intro */
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro
    .from('[data-hero-line]', { yPercent: 110, autoAlpha: 0, duration: 1.4, stagger: 0.12 })
    .from(
      '[data-hero-photo]',
      { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 0, duration: 1.4 },
      0.25,
    )
    .from('[data-hero-fade]', { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 }, 0.6);

  /* hero scroll-out: the name splits apart, the photo drifts up */
  const hero = $('[data-hero]');
  if (hero) {
    const out = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero__row--a > span', { xPercent: -18, ease: 'none', scrollTrigger: out });
    gsap.to('.hero__row--b > span', { xPercent: 18, ease: 'none', scrollTrigger: out });
    gsap.to('[data-hero-photo]', { yPercent: -30, scale: 0.92, ease: 'none', scrollTrigger: out });
  }

  /* "yes, I can center a div" */
  const toy = $('[data-div-toy]');
  if (toy) {
    const box = $('.div-toy__box', toy)!;
    const dot = $('.div-toy__dot', toy)!;
    const value = $('[data-div-toy-value]', toy)!;
    const pad = 8;
    const dx = (box.clientWidth - dot.offsetWidth) / 2 - pad;
    const dy = (box.clientHeight - dot.offsetHeight) / 2 - pad;
    gsap
      .timeline({ repeat: 2, repeatDelay: 1.6, delay: 1.8 })
      .to(dot, { x: dx, y: dy, duration: 0.9, ease: 'back.out(2)' })
      .call(() => (value.textContent = 'center'), [], 0.15)
      .to(dot, { rotate: 90, duration: 0.5, ease: 'power2.out' }, '+=0.2')
      .to(dot, { x: 0, y: 0, rotate: 0, duration: 0.8, ease: 'power3.inOut' }, '+=1.8')
      .call(() => (value.textContent = 'start'), [], '-=0.6');
  }

  /* manifesto: words light up as you scroll */
  const manifesto = $('[data-manifesto]');
  if (manifesto) {
    gsap.to($$('.word', manifesto), {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: manifesto, start: 'top 80%', end: 'bottom 50%', scrub: true },
    });
  }

  /* section titles */
  $$('[data-split]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, yPercent: 40, skewY: 4 },
      {
        autoAlpha: 1,
        yPercent: 0,
        skewY: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      },
    );
  });

  /* generic fade-up */
  gsap.set('[data-fade-up]', { y: 40 });
  ScrollTrigger.batch('[data-fade-up]', {
    start: 'top 90%',
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }),
  });

  /* project cards enter */
  ScrollTrigger.batch('[data-card]:not([hidden])', {
    start: 'top 92%',
    once: true,
    onEnter: (batch) =>
      gsap.from(batch, { autoAlpha: 0, y: 80, duration: 1.1, ease: 'expo.out', stagger: 0.1 }),
  });

  /* parallax images */
  $$('[data-parallax]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 0 },
      {
        yPercent: Number(el.dataset.parallax),
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  /* clip reveal */
  $$('[data-clip-reveal]').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.5,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
  });

  /* timeline line draws itself */
  $$('[data-timeline]').forEach((tl) => {
    gsap.fromTo(
      $('[data-timeline-line]', tl),
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 75%', end: 'bottom 60%', scrub: true } },
    );
  });

  /* count-up stats */
  $$('[data-count]').forEach((el) => {
    const raw = el.dataset.count!;
    const target = parseInt(raw, 10);
    const suffix = raw.replace(/^\d+/, '');
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = `${Math.round(obj.v)}${suffix}`),
    });
  });

  /* the journey: pinned horizontal scroll with floating elements */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const section = $('[data-journey]');
    const track = $('[data-journey-track]');
    const bar = $('[data-journey-bar]');
    if (!section || !track) return;

    const distance = () => track.scrollWidth - window.innerWidth;

    const scroll = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
      },
    });

    $$('[data-stage]', track).forEach((stage) => {
      const num = $('[data-depth]', stage);
      const body = $('.stage__body', stage);
      const chips = $$('[data-float]', stage);

      if (num) {
        gsap.fromTo(
          num,
          { xPercent: 40 },
          {
            xPercent: -25,
            ease: 'none',
            scrollTrigger: { containerAnimation: scroll, trigger: stage, start: 'left right', end: 'right left', scrub: true },
          },
        );
      }

      if (body) {
        gsap.fromTo(
          body,
          { autoAlpha: 0.15, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: { containerAnimation: scroll, trigger: stage, start: 'left 85%', end: 'left 35%', scrub: true },
          },
        );
      }

      chips.forEach((chip, i) => {
        gsap.fromTo(
          chip,
          { x: 120 + i * 40, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: scroll,
              trigger: stage,
              start: 'left right',
              end: 'left 30%',
              scrub: true,
            },
          },
        );
      });
    });

    return () => gsap.set(track, { clearProps: 'transform' });
  });

  mm.add('(max-width: 899px)', () => {
    $$('[data-stage]').forEach((stage) => {
      gsap.from($$('.stage__body, [data-float]', stage), {
        autoAlpha: 0,
        y: 40,
        stagger: 0.06,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: stage, start: 'top 85%' },
      });
    });
  });

  /* pointer-only niceties */
  if (finePointer) {
    // magnetic buttons
    $$('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('pointerleave', () => {
        xTo(0);
        yTo(0);
      });
    });

    // cursor label over project cards
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.append(cursor);
    const cx = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const cy = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
    const hideCursor = () => gsap.to(cursor, { scale: 0, autoAlpha: 0, duration: 0.25 });
    window.addEventListener('pointermove', (e) => {
      cx(e.clientX);
      cy(e.clientY);
    });
    // cards move under a still pointer when filtering, so pointerleave may never fire
    window.addEventListener('pointerdown', hideCursor);
    $$('[data-cursor]').forEach((el) => {
      el.addEventListener('pointerenter', () => {
        cursor.textContent = `${el.dataset.cursor} ↗`;
        gsap.to(cursor, { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(2)' });
      });
      el.addEventListener('pointerleave', hideCursor);
    });

  }

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
