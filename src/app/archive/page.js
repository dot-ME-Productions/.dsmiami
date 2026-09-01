'use client';
import { motion } from 'framer-motion';
import soundEngine from '@/lib/SoundEngine';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Image from 'next/image';

const archiveData = [
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/ritz-carlton-residences-dining-room-oval-table-ocean-view-highres.webp",
    "title": "RITZ CARLTON RESIDENCES DINING...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/silva-02.webp",
    "title": "SILVA 02",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/residences-by-armani-casa-terrace-panoramic-ocean-view.webp",
    "title": "RESIDENCES BY ARMANI CASA TERR...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/sls_lux_brickell_living_room.webp",
    "title": "SLS LUX BRICKELL LIVING ROOM",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/trump-towers-interior.webp",
    "title": "TRUMP TOWERS INTERIOR",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/oceana_bal_harbor_clean.webp",
    "title": "OCEANA BAL HARBOR CLEAN",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/ChatGPT-Image-26-de-mai.-de-2026-08_39_08.png",
    "title": "CHATGPT IMAGE 26 DE MAI",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/turnberry-ocean-club-living-room-circular-niche-artwork-close.webp",
    "title": "TURNBERRY OCEAN CLUB LIVING RO...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/great-room-round-mirror-suede-armchairs-gallery-wall-scaled.webp",
    "title": "GREAT ROOM ROUND MIRROR SUEDE ...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/eighty_01_hero.png",
    "title": "EIGHTY 01 HERO",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/optimized_interior_image.webp",
    "title": "OPTIMIZED INTERIOR IMAGE",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/modern-living-room-high-resolution.webp",
    "title": "MODERN LIVING ROOM HIGH RESOLU...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/fendi_chateau_art_living_room.webp",
    "title": "FENDI CHATEAU ART LIVING ROOM",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/continuum-south-beach-master-bedroom-neutral-tones-black-lamps.webp",
    "title": "CONTINUUM SOUTH BEACH MASTER B...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/optimized_modern_kitchen_livingroom-scaled.webp",
    "title": "OPTIMIZED MODERN KITCHEN LIVIN...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/Interior-design-tratata.png",
    "title": "INTERIOR DESIGN TRATATA",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/merrick-park-highres.webp",
    "title": "MERRICK PARK HIGHRES",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/luxury-living-room-restored-highres-1.webp",
    "title": "LUXURY LIVING ROOM RESTORED HI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/oceanfront-armani-casa-terrace-lounge-chairs.webp",
    "title": "OCEANFRONT ARMANI CASA TERRACE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/key-biscayne-house-living-room-red-artwork-wood-shelving-garden.webp",
    "title": "KEY BISCAYNE HOUSE LIVING ROOM...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/murano-portofino.png",
    "title": "MURANO PORTOFINO",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/new-build-cocoplum-home-living-tv-sectional.webp",
    "title": "NEW BUILD COCOPLUM HOME LIVING...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Bhalla-Residence_14-scaled.webp",
    "title": "DESIGN SOLUTIONS BHALLA RESIDE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/ds-living-room-wood-wall-art-1.webp",
    "title": "DS LIVING ROOM WOOD WALL ART 1",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/ds-entrance-hall-wood-panels-1.webp",
    "title": "DS ENTRANCE HALL WOOD PANELS 1",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/living_room_tv_panel_optimized.webp",
    "title": "LIVING ROOM TV PANEL OPTIMIZED",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Ponce-Davis-Residence_10.webp",
    "title": "DESIGN SOLUTIONS PONCE DAVIS R...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/Hi-Res-DS-Dilido-1.png",
    "title": "HI RES DS DILIDO 1",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/living-room-highres1.webp",
    "title": "LIVING ROOM HIGHRES1",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/03-LIVING-ROOM-2.webp",
    "title": "03 LIVING ROOM 2",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/oceanfront_living_room_highres.webp",
    "title": "OCEANFRONT LIVING ROOM HIGHRES",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/asia-brickell-key-curved-wood-lounge-chairs-city-view.webp",
    "title": "ASIA BRICKELL KEY CURVED WOOD ...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/ChatGPT-Image-26-de-mai.-de-2026-08_35_07.png",
    "title": "CHATGPT IMAGE 26 DE MAI",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/full-remodeling-coconut-grove-home-living-room-tv-wall-full-view.webp",
    "title": "FULL REMODELING COCONUT GROVE ...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/shaugnessy-residence-garden-fire-pit.webp",
    "title": "SHAUGNESSY RESIDENCE GARDEN FI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/project-one-thousand-museum.png",
    "title": "PROJECT ONE THOUSAND MUSEUM",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/fisher_08_left_kitchen.jpg",
    "title": "FISHER 08 LEFT KITCHEN",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/oceanview-living-room-highres.webp",
    "title": "OCEANVIEW LIVING ROOM HIGHRES",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Nagumo-Residence-Armani-Casa_02.webp",
    "title": "DESIGN SOLUTIONS NAGUMO RESIDE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/trump-towers-living-tv-grasscloth-wall-ocean-view.webp",
    "title": "TRUMP TOWERS LIVING TV GRASSCL...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/oceanfront-murano-portofino-balcony-terrace-skyline-port-view-scaled.webp",
    "title": "OCEANFRONT MURANO PORTOFINO BA...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/tequesta_02_left_dining.jpg",
    "title": "TEQUESTA 02 LEFT DINING",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/continuum-south-beach.webp",
    "title": "CONTINUUM SOUTH BEACH",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/ritz-carlton-residences-integrated-living-dining-kitchen-full-view-highres.webp",
    "title": "RITZ CARLTON RESIDENCES INTEGR...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Bhalla-Residence_04.webp",
    "title": "DESIGN SOLUTIONS BHALLA RESIDE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/Design-Solutions-Hasen-Residence-Foyer_01B.jpg",
    "title": "DESIGN SOLUTIONS HASEN RESIDEN...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/projet-tequesta.png",
    "title": "PROJET TEQUESTA",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/modern_house_optimized-scaled.webp",
    "title": "MODERN HOUSE OPTIMIZED SCALED",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/bayfront_park_grove_living_room.webp",
    "title": "BAYFRONT PARK GROVE LIVING ROO...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/shaugnessy-residence-front-door-arched.webp",
    "title": "SHAUGNESSY RESIDENCE FRONT DOO...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/02-LIVING-ROOM-1.webp",
    "title": "02 LIVING ROOM 1",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Siddons-Residence_21.webp",
    "title": "DESIGN SOLUTIONS SIDDONS RESID...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/optimized_modern_hallway-scaled.webp",
    "title": "OPTIMIZED MODERN HALLWAY SCALE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/merrick-bedroom-grey-headboard-pendant-lights.webp",
    "title": "MERRICK BEDROOM GREY HEADBOARD...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Hasen-Residence_19.webp",
    "title": "DESIGN SOLUTIONS HASEN RESIDEN...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/outdoor_lounge_optimized.webp",
    "title": "OUTDOOR LOUNGE OPTIMIZED",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Peretsman-Residence_06B.webp",
    "title": "DESIGN SOLUTIONS PERETSMAN RES...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/oceana_bal_harbor_hallway.webp",
    "title": "OCEANA BAL HARBOR HALLWAY",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/turnberry-ocean-club-living-room-white-sofas-1.webp",
    "title": "TURNBERRY OCEAN CLUB LIVING RO...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/kirstein-residence-family-room-shelving.webp",
    "title": "KIRSTEIN RESIDENCE FAMILY ROOM...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/gran_paraiso_residences_living_reduced.webp",
    "title": "GRAN PARAISO RESIDENCES LIVING...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Peretsman-Residence_05.webp",
    "title": "DESIGN SOLUTIONS PERETSMAN RES...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/key-biscayne-house-restored-highres.webp",
    "title": "KEY BISCAYNE HOUSE RESTORED HI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/modern-lounge-restored-highres.webp",
    "title": "MODERN LOUNGE RESTORED HIGHRES",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/MIB_1774-scaled.jpg",
    "title": "MIB 1774 SCALED",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/eighty_02_left.jpg",
    "title": "EIGHTY 02 LEFT",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/turnberry-ocean-club-integrated-living-dining-room.webp",
    "title": "TURNBERRY OCEAN CLUB INTEGRATE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/hyde_midtown_miami_living.webp",
    "title": "HYDE MIDTOWN MIAMI LIVING",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/MIB_0794-scaled.jpg",
    "title": "MIB 0794 SCALED",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Nagumo-Residence-Armani-Casa_06.webp",
    "title": "DESIGN SOLUTIONS NAGUMO RESIDE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/modern_hallway_highres.webp",
    "title": "MODERN HALLWAY HIGHRES",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/interior_scene.webp",
    "title": "INTERIOR SCENE",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/wide_modern_living_room_interior_scene_with_a_bri.webp",
    "title": "WIDE MODERN LIVING ROOM INTERI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/Hi-Res-DS-Dilido-2-1.png",
    "title": "HI RES DS DILIDO 2 1",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/imagem_02.jpg",
    "title": "IMAGEM 02",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/ds-bayview-dining-room-city-view.webp",
    "title": "DS BAYVIEW DINING ROOM CITY VI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/jade-ocean-condo.webp",
    "title": "JADE OCEAN CONDO",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/museum_02_left_living.jpg",
    "title": "MUSEUM 02 LEFT LIVING",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/murano_02_left_living.jpg",
    "title": "MURANO 02 LEFT LIVING",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/fendi_chateau_living_room.webp",
    "title": "FENDI CHATEAU LIVING ROOM",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/bayfront-venetian-islands.webp",
    "title": "BAYFRONT VENETIAN ISLANDS",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/hyde_midtown_tv_room_optimized.webp",
    "title": "HYDE MIDTOWN TV ROOM OPTIMIZED",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/Design-Solutions-Chaoul-Residence_27-1.webp",
    "title": "DESIGN SOLUTIONS CHAOUL RESIDE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/4-bedroom-apartment-park-grove-dining-room-marble-pendant-lights-1.webp",
    "title": "4 BEDROOM APARTMENT PARK GROVE...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/echo_aventura_livingroom.webp",
    "title": "ECHO AVENTURA LIVINGROOM",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/residences-by-armani-casa-kitchen-dining-room-island-ocean-view.webp",
    "title": "RESIDENCES BY ARMANI CASA KITC...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/trump-towers-console-table-black-wall-sculpture-rattan-stools.webp",
    "title": "TRUMP TOWERS CONSOLE TABLE BLA...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/modern_apartment_interior_optimized-1.webp",
    "title": "MODERN APARTMENT INTERIOR OPTI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/paraiso_bayviews_livingroom.webp",
    "title": "PARAISO BAYVIEWS LIVINGROOM",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/04/silva-15.webp",
    "title": "SILVA 15",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/artefacto-model-armani-casa-dining-room-rattan-chairs-ocean-view.webp",
    "title": "ARTEFACTO MODEL ARMANI CASA DI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/north_bay_road_villa_exterior.webp",
    "title": "NORTH BAY ROAD VILLA EXTERIOR",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/artefacto-model-armani-casa-foyer-wood-door-close-up.webp",
    "title": "ARTEFACTO MODEL ARMANI CASA FO...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/bayfront_asia_brickell_key_optimized.webp",
    "title": "BAYFRONT ASIA BRICKELL KEY OPT...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-[50%]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/modern_open_living_optimized.webp",
    "title": "MODERN OPEN LIVING OPTIMIZED",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/bayfront-asia-brickell-key-dining-orange-chairs.webp",
    "title": "BAYFRONT ASIA BRICKELL KEY DIN...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-b-full"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/luxury_living_room_ocean_view.webp",
    "title": "LUXURY LIVING ROOM OCEAN VIEW",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-tr-[250px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/06/asia-brickell-key-living-room-figurative-art-glass-shelving.webp",
    "title": "ASIA BRICKELL KEY LIVING ROOM ...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-tl-[100px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/modern_living_room.webp",
    "title": "MODERN LIVING ROOM",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/fendi_chateau_living_room_optimized.webp",
    "title": "FENDI CHATEAU LIVING ROOM OPTI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-square rounded-[30px]"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/turnberry-ocean-club-dining-living-room-panoramic-ocean-view.webp",
    "title": "TURNBERRY OCEAN CLUB DINING LI...",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[16/9] rounded-none"
  },
  {
    "url": "https://ds-miami.com/wp-content/uploads/2026/05/projet-fisher.png",
    "title": "PROJET FISHER",
    "award": "DS MIAMI PORTFOLIO ARCHIVE",
    "category": "Residential",
    "description": "An exclusive look into the materials, textures, and bespoke architecture defining this interior space.",
    "shapeClass": "aspect-[4/5] rounded-t-[200px]"
  }
];

export default function Archive() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen w-full bg-[#F4F0EA] text-[#0C0F12] flex flex-col pt-32 pb-24 px-6 md:px-16 selection:bg-[#C5A880] selection:text-[#0C0F12]">
        
        <div className="w-full max-w-[1400px] mx-auto flex flex-col mt-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24 md:mb-40"
          >
            <h1 className="text-[12vw] md:text-[9vw] font-serif leading-[0.85] tracking-tighter uppercase relative z-10 mix-blend-difference text-white">
              MASTER <br/>
              <span className="italic">ARCHIVE</span>
            </h1>
          </motion.div>

          <div className="w-full flex flex-col gap-32 md:gap-48">
            {archiveData.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
              >
                
                {/* Project Image */}
                <div className="w-full md:w-1/2 relative group perspective-1000">
                  <div onMouseEnter={() => soundEngine.playSoftClick()} className={`relative overflow-hidden w-full ${project.shapeClass} will-change-transform transition-transform duration-1000 group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] shadow-2xl cursor-pointer`}>
                    <Image 
                      src={project.url} 
                      alt={project.title} 
                      fill 
                      className="object-cover scale-[1.05] group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0C0F12]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply pointer-events-none"></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className={`w-full md:w-1/2 flex flex-col ${index % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0C0F12]/40 mb-4">
                    {project.category}
                  </p>
                  
                  <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-none mb-6 group-hover:italic transition-all duration-500">
                    {project.title}
                  </h2>
                  
                  <p className={`font-light text-[#0C0F12]/70 text-sm md:text-base max-w-md mb-10 leading-relaxed ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    {project.description}
                  </p>

                  <div className="px-5 py-2 border border-[#0C0F12]/20 rounded-full font-mono text-[9px] tracking-widest uppercase text-[#0C0F12]/60 hover:bg-[#C5A880] hover:text-[#0C0F12] hover:border-[#C5A880] transition-colors duration-300 cursor-default">
                    {project.award}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </SmoothScroll>
  );
}