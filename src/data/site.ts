import type { ImageMetadata } from 'astro';

import cateringManager from '../assets/projects/catering-manager.webp';
import mateMundo from '../assets/projects/mate-mundo.webp';
import kitaAdventure from '../assets/projects/kita-adventure.webp';
import whatsappClone from '../assets/projects/whatsapp-clone.webp';
import prm from '../assets/projects/prm.webp';
import notitasNadja from '../assets/projects/notitas-nadja.webp';
import beChef from '../assets/projects/be-chef.webp';
import saborLatino from '../assets/projects/sabor-latino.webp';
import stellaMaris from '../assets/projects/stella-maris.webp';
import padelAmericano from '../assets/projects/padel-americano.webp';
import saveOliver from '../assets/projects/save-oliver.webp';
import trucoCounter from '../assets/projects/truco-counter.webp';

export const profile = {
  name: 'Pablo Cigoy',
  role: 'Software Developer',
  location: 'Berlin, Germany',
  email: 'pablocigoy@gmail.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pablo-cigoy' },
    { label: 'GitHub', href: 'https://github.com/Pablo-Mdz' },
    { label: 'Medium', href: 'https://medium.com/@pablocigoy' },
  ],
};

export type Category = 'web' | 'mobile' | 'uxui' | 'ai';

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'uxui', label: 'UX/UI' },
  { id: 'ai', label: 'AI' },
];

export interface Project {
  title: string;
  kind: string;
  category: Category;
  stack: string[];
  image: ImageMetadata;
  href?: string;
}

export const projects: Project[] = [
  {
    title: 'Catering Manager',
    kind: 'iOS App',
    category: 'mobile',
    stack: ['Swift', 'Firebase', 'REST API', 'MVVM'],
    image: cateringManager,
    href: 'https://medium.com/@pablocigoy/catering-manager-a-catering-event-management-tool-developed-with-swiftui-dd5fe95964cc',
  },
  {
    title: 'Mate Mundo',
    kind: 'iOS App',
    category: 'mobile',
    stack: ['Swift', 'Firebase', 'Xcode', 'MVVM'],
    image: mateMundo,
    href: 'https://medium.com/@pablocigoy/matemundo-your-ultimate-yerba-mate-marketplace-app-for-ios-50226025e514',
  },
  {
    title: 'Kita Adventure',
    kind: 'Android App',
    category: 'mobile',
    stack: ['Kotlin', 'Android Studio', 'Figma', 'MVVM'],
    image: kitaAdventure,
    href: 'https://medium.com/@pablocigoy/case-study-abenteuer-kita-facilitating-communication-and-engagement-in-early-childhood-education-e14857209862',
  },
  {
    title: 'WhatsApp Clone',
    kind: 'Android App',
    category: 'mobile',
    stack: ['Android'],
    image: whatsappClone,
    href: 'https://github.com/Pablo-Mdz/WhatsSyntax',
  },
  {
    title: 'PRM',
    kind: 'UX/UI App Design',
    category: 'uxui',
    stack: ['Figma', 'UX Research'],
    image: prm,
    href: 'https://medium.com/@pablocigoy/project-resources-management-ein-ux-ui-designprojekt-zur-f%C3%B6rderung-der-effektiven-zusammenarbeit-3a2b3dae2836',
  },
  {
    title: 'Notitas von Nadja',
    kind: 'UX/UI App Design',
    category: 'uxui',
    stack: ['Figma', 'iOS vs Android'],
    image: notitasNadja,
    href: 'https://medium.com/@pablocigoy/ux-ui-design-comparison-android-vs-ios-9c2559f5c3d1',
  },
  {
    title: 'Be Chef',
    kind: 'Website',
    category: 'web',
    stack: ['JavaScript', 'React'],
    image: beChef,
    href: 'https://be-chef.netlify.app/',
  },
  {
    title: 'Sabor Latino',
    kind: 'Website',
    category: 'web',
    stack: ['JavaScript', 'Handlebars'],
    image: saborLatino,
  },
  {
    title: 'Stella Maris Masonic Outfitters',
    kind: 'Website',
    category: 'web',
    stack: ['JavaScript', 'React'],
    image: stellaMaris,
    href: 'https://stellamaris-masoneria.netlify.app/',
  },
  {
    title: 'Padel Americano',
    kind: 'Website',
    category: 'web',
    stack: ['JavaScript'],
    image: padelAmericano,
    href: 'https://padel-americano.netlify.app/',
  },
  {
    title: 'Save Oliver from His Fears',
    kind: 'Browser Game',
    category: 'web',
    stack: ['JavaScript', 'P5.js'],
    image: saveOliver,
    href: 'https://pablo-mdz.github.io/Game-P5-Shooting/',
  },
  {
    title: 'Truco Counter',
    kind: 'Website',
    category: 'web',
    stack: ['JavaScript'],
    image: trucoCounter,
    href: 'https://dulcet-pudding-105e47.netlify.app/',
  },
];

export interface TimelineItem {
  date: string;
  title: string;
  place: string;
  text: string;
}

export const experience: TimelineItem[] = [
  {
    date: 'Feb 2023 — Present',
    title: 'Freelance Software Developer',
    place: 'Self-Employed',
    text: 'Independently developed and deployed custom web and mobile applications, focusing on scalable solutions for diverse client needs. Enhanced client satisfaction through proactive communication, iterative feedback loops, and continuous improvement initiatives.',
  },
  {
    date: 'May 2023 — Present',
    title: 'Volunteer Teacher (Front-End)',
    place: 'ReDI School of Digital Integration',
    text: 'Empowered diverse students in HTML5/CSS3 fundamentals. Collaborated with a multicultural teaching team, fostering inclusive learning environments.',
  },
  {
    date: '2009 — 2021',
    title: 'Chef de Cuisine & Private Catering',
    place: 'Germany · Brazil · Mexico · France · Argentina',
    text: 'Head Chef in multicultural teams across several countries. Led diverse culinary teams, fostering collaboration and creativity, and designed menus tailored to local tastes and dietary needs.',
  },
];

export const education: TimelineItem[] = [
  {
    date: 'Sep 2024',
    title: 'Mobile Developer Certification IHK (Android & iOS)',
    place: 'IHK — Industrie- und Handelskammer',
    text: 'Official certification as a mobile developer for Android and iOS, focused on MVVM architecture, Kotlin and Swift.',
  },
  {
    date: 'Aug 2023 — Aug 2024',
    title: 'Mobile Developer Weiterbildung (Android / iOS)',
    place: 'Syntax Institut',
    text: 'One-year intensive training in mobile application development with hands-on projects and collaborative learning on both platforms.',
  },
  {
    date: 'Sep — Dec 2022',
    title: 'Full Stack Web Development Bootcamp',
    place: 'Ironhack',
    text: 'Full-stack development with the MERN stack (MongoDB, Express.js, React, Node.js) through real-world, collaborative projects.',
  },
  {
    date: 'Jul 2022',
    title: 'JavaScript Development Course',
    place: 'Udemy',
    text: 'Core JavaScript concepts, frameworks and best practices, with practical exercises and projects.',
  },
];

export const services = [
  {
    title: 'Mobile App Development',
    text: 'Certified mobile developer building intuitive, efficient apps for Android and iOS. User-centric design and seamless functionality with Kotlin and Swift.',
    tags: ['Swift', 'SwiftUI', 'Kotlin', 'MVVM'],
  },
  {
    title: 'Full Stack Web Development',
    text: 'Dynamic, responsive websites and web apps with the MERN stack, RESTful APIs and UI/UX best practices.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    title: 'UI/UX Design',
    text: 'Visually clear, user-friendly interfaces grounded in research — so people enjoy using the product and find it easy to navigate.',
    tags: ['Figma', 'Research', 'Prototyping'],
  },
  {
    title: 'AI-Powered Applications',
    text: 'Custom applications built with AI, shaped to each need — from intelligent features to automated workflows. Solid engineering fundamentals, delivered faster with AI tools.',
    tags: ['LLM integration', 'Automation', 'AI agents', 'Rapid prototyping'],
  },
];

export const articles = [
  {
    title: 'Catering Manager — an event management tool built with SwiftUI',
    meta: 'Swift · Firebase · REST API · MVVM',
    href: projects[0].href!,
  },
  {
    title: 'Mate Mundo — a yerba mate marketplace app for iOS',
    meta: 'Swift · Firebase · Xcode · MVVM',
    href: projects[1].href!,
  },
  {
    title: 'Case study: Abenteuer Kita — communication in early childhood education',
    meta: 'Kotlin · Android Studio · Figma · MVVM',
    href: projects[2].href!,
  },
  {
    title: 'Project Resources Management — a UX/UI design project',
    meta: 'UX & UI research with Figma',
    href: projects[4].href!,
  },
  {
    title: 'Notitas von Nadja — UX/UI comparison between Android and iOS',
    meta: 'Platform design guidelines',
    href: projects[5].href!,
  },
];
