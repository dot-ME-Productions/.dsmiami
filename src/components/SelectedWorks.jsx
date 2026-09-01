'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: "Villa Venetian", location: "Miami Beach", img: "https://ds-miami.com/wp-content/uploads/2026/06/new-build-cocoplum-home-living-tv-sectional.webp