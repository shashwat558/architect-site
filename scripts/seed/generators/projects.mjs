/** Projects seed generator for AD.RS Design Studio */

const heroImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1400&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1400&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1400&q=80',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1400&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1400&q=80',
  'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1400&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
];

const projects = [
  { id:'demo-pj-01', title:'Asha Residence',       subtitle:'A Home That Listens',            category:'Residential',    location:'Bhopal, MP',    client:'Asha Kapoor Family', year:'2024', area:'5,200 sq.ft', status:'completed', featured:true,  brief:'Nestled along the Kerwa reservoir, this private residence was conceived as a meditation on interiority — a home that turns its back on urban noise and faces inward toward a courtyard of water and sky.', approach:'We used a double-skin façade of locally-sourced kota stone to modulate heat and create a textured surface that changes character with the shifting light. The plan is organized around a central courtyard that acts as the climate engine of the house.' },
  { id:'demo-pj-02', title:'Vriksha Corporate HQ', subtitle:'The Office as a Living Canopy',  category:'Commercial',     location:'Indore, MP',    client:'Vriksha Technologies', year:'2023', area:'22,000 sq.ft', status:'completed', featured:true, brief:'Vriksha asked us to design a headquarters that would attract and retain top engineering talent. The brief was clear: the workspace must feel inspiring, not institutional.', approach:'We introduced a six-storey atrium wrapped in cascading planters and timber louvers, creating a literal forest within the building envelope. Biophilic design principles guided every decision, from desk orientation to the location of informal collaboration nodes.' },
  { id:'demo-pj-03', title:'Aranya Chalet',        subtitle:'Where Stone Meets Snowfall',     category:'Hospitality',    location:'Manali, HP',    client:'Aranya Retreats Ltd.', year:'2024', area:'8,400 sq.ft', status:'completed', featured:true, brief:'A boutique mountain retreat for 12 guests, designed to disappear into the landscape while offering every modern comfort. The client wanted a property that felt discovered, not built.', approach:'We used rubble masonry from the site itself alongside structural timber and expansive double-glazed screens. The 12 suites are arranged along the ridge like geological strata, each with an unobstructed view of the Beas valley below.' },
  { id:'demo-pj-04', title:'Kala Loft',            subtitle:'Industrial Memory, Gentle Life', category:'Renovation',     location:'Mumbai, MH',    client:'Kala Arts Collective', year:'2023', area:'3,800 sq.ft', status:'completed', featured:false, brief:'A disused mill warehouse in Lower Parel was transformed into a live-work loft for a young art collective. The challenge was to honour the industrial memory of the space while welcoming light and softness.', approach:'Original trusses and brick walls were exposed and stabilised. We inserted a floating mezzanine in polished micro-topping and wove natural fibre curtains throughout to soften acoustics and diffuse the harsh Bombay sun.' },
  { id:'demo-pj-05', title:'Saheli Community Hub', subtitle:'Design as Social Infrastructure',category:'Commercial',     location:'Bhopal, MP',    client:'Saheli NGO Trust', year:'2022', area:'6,100 sq.ft', status:'completed', featured:false, brief:"A women's empowerment centre in a dense urban neighbourhood, designed to be maximally welcoming, maximally safe, and maximally inspiring — all on a deeply constrained budget.", approach:'We used low-cost compressed earth blocks produced on site by local women trained as part of the project itself. The building becomes a testament to the very skills it was built to celebrate.' },
  { id:'demo-pj-06', title:'Nilgiri Villa',        subtitle:'A House Made of Mist',           category:'Residential',    location:'Ooty, TN',      client:'Nilgiri Estate Trust', year:'2023', area:'4,600 sq.ft', status:'completed', featured:true, brief:'Set amid tea estates at 7,200 feet, this villa is designed for the cool, misty climate of the Nilgiris. The brief called for a house that felt like a natural extension of the hillside.', approach:'Sloped copper roofs echo the silhouette of the surrounding eucalyptus canopy. Inside, a series of reading alcoves, window seats, and fireplaces make the cold an invited guest rather than a challenge to defeat.' },
  { id:'demo-pj-07', title:'Yatra Hotel Lobby',    subtitle:'The Journey Begins at the Door', category:'Hospitality',    location:'Jaipur, RJ',    client:'Yatra Heritage Hotels', year:'2022', area:'12,000 sq.ft', status:'completed', featured:false, brief:'A five-star heritage hotel in the old walled city needed a lobby that could serve as both arrival spectacle and quiet refuge within the same volume.', approach:'We worked with local block-printers and jharokha craftsmen to create a bespoke screen system that filters the Rajasthani afternoon light into dappled patterns. The stone floors are hand-chiselled, and every piece of furniture is a commission from regional artisans.' },
  { id:'demo-pj-08', title:'Urja Energy Office',   subtitle:'Powering Work, Powering People',  category:'Sustainable',    location:'Pune, MH',      client:'Urja Renewables', year:'2024', area:'18,500 sq.ft', status:'completed', featured:false, brief:'An office campus for a solar energy company — the client wanted a building that embodied its values, achieving IGBC Platinum certification while remaining architecture, not engineering-diagram.', approach:"A rooftop PV array provides 80% of the building's energy needs. Passive ventilation shafts eliminate the need for mechanical cooling for 7 months of the year. The exposed thermal mass of the concrete structure is left beautiful rather than covered." },
  { id:'demo-pj-09', title:'Sampan Houseboat',     subtitle:'Living on the Water',             category:'Residential',    location:'Alleppey, KL',  client:'Nair Family', year:'2023', area:'1,800 sq.ft', status:'completed', featured:false, brief:'A permanent houseboat residence for a retired couple on the Kerala backwaters — neither fully house nor fully boat, but genuinely both.', approach:'The hull is traditional wooden boat construction. The superstructure uses bamboo composite panels and rattan screens. Solar panels, a rainwater collection system, and composting toilets make the boat fully off-grid.' },
  { id:'demo-pj-10', title:'Dharitri Spa Resort',  subtitle:'The Body as Landscape',           category:'Hospitality',    location:'Coorg, KA',     client:'Dharitri Wellness', year:'2022', area:'24,000 sq.ft', status:'completed', featured:false, brief:'A 20-villa wellness resort built within an existing coffee estate. The brief required that not a single tree above 20cm diameter be felled during construction.', approach:'All structures were positioned around the root zones of mature trees using GPS mapping. The villas are elevated on pilotis where necessary, threading between trunks. The coffee estate remains fully productive alongside the resort.' },
  { id:'demo-pj-11', title:'Ankur School',         subtitle:'Space That Teaches',              category:'Sustainable',    location:'Bhopal, MP',    client:'Ankur Education Trust', year:'2021', area:'9,200 sq.ft', status:'completed', featured:false, brief:'An experimental primary school where the building itself is a pedagogical tool — children understand how it works because it is designed to be readable.', approach:'Rainwater harvesting tanks are visible through glass walls. The solar array is at eye level in the courtyard. Structural elements are exposed and labeled. The school teaches sustainability by demonstration.' },
  { id:'demo-pj-12', title:'Shilp Gallery',        subtitle:'Architecture of Display',         category:'Commercial',     location:'Delhi, DL',     client:'Shilp Art Foundation', year:'2023', area:'7,400 sq.ft', status:'completed', featured:false, brief:'A contemporary art gallery in South Delhi required spaces that would serve demanding curatorial programmes while also functioning as an event venue for 300 guests.', approach:'A flexible wall system of movable panels allows the gallery to transform from a single large hall to 12 intimate rooms within 4 hours. Lighting is entirely track-based and fully programmable.' },
  { id:'demo-pj-13', title:'Vedant Farmhouse',     subtitle:'The City Forgotten',              category:'Residential',    location:'Nashik, MH',    client:'Vedant Winery', year:'2024', area:'7,800 sq.ft', status:'completed', featured:false, brief:'A weekend retreat and winery estate house set among vineyards outside Nashik. The owners wanted to feel the land they cultivate — to wake up inside it.', approach:'Rammed earth walls use soil from the vineyard itself. The main living pavilion opens entirely on two sides, dissolving the boundary between interior and the vine rows beyond.' },
  { id:'demo-pj-14', title:'Flow Yoga Studio',     subtitle:'Breath, Space, Light',            category:'Interior Design',location:'Bengaluru, KA', client:'Flow Studio', year:'2024', area:'2,200 sq.ft', status:'completed', featured:false, brief:'A yoga and meditation studio in Indiranagar required a sensory environment calibrated for inner stillness — no clutter, no distraction, only considered proportion and material.', approach:'Japanese washi paper panels create a layered, luminous backdrop. The floor is raw untreated teak. A single water feature provides the only sound in the space beside breath.' },
  { id:'demo-pj-15', title:'Akash Tower Concept',  subtitle:'The Vertical Village',            category:'Urban Planning', location:'Hyderabad, TS', client:'Akash Developers', year:'2025', area:'4,20,000 sq.ft', status:'concept', featured:false, brief:'A 42-storey mixed-use tower in Hi-Tech City that proposes a radical rethinking of the residential tower typology — not a slab of stacked apartments but a vertical community with public space at every fifth floor.', approach:'Sky gardens at levels 10, 20, 30, and 40 function as micro-neighbourhoods with shops, libraries, and play areas. The building section is designed so every unit has a view of at least one sky garden.' },
  { id:'demo-pj-16', title:'Prithvi Community Park',subtitle:'The Commons, Reclaimed',        category:'Landscape',      location:'Bhopal, MP',    client:'BDA Urban Parks Division', year:'2023', area:'18 acres', status:'completed', featured:false, brief:'A neglected urban park was redesigned as an active community commons serving four surrounding neighbourhoods with very different demographics.', approach:'Rather than imposing a single landscape vision, we ran a year-long community consultation process. The resulting park has four distinct characters — formal gardens, a forest walk, a children\'s play meadow, and a fitness zone — stitched together by a single water trail.' },
  { id:'demo-pj-17', title:'Rishi House',          subtitle:'A Room for Every Season',         category:'Residential',    location:'Shimla, HP',    client:'Rishi Kapoor Family', year:'2022', area:'3,200 sq.ft', status:'completed', featured:false, brief:'A family home in old Shimla, built among existing apple trees on a steep hillside plot. The constraint was to build without disturbing the roots of three large trees that the family refused to lose.', approach:'The house is built on a frame of slender steel columns that thread between root zones. The result is a house that appears to float above the hillside, with the apple trees growing through and around it.' },
  { id:'demo-pj-18', title:'Tatva Wellness Clinic', subtitle:'Healing Architecture',           category:'Interior Design',location:'Chennai, TN',   client:'Tatva Health', year:'2023', area:'4,100 sq.ft', status:'completed', featured:false, brief:'A multi-speciality wellness clinic that needed to feel radically different from a conventional hospital — calming, hopeful, and human.', approach:'We replaced clinical white with warm plaster and terracotta, used natural lighting throughout, and introduced a planted courtyard visible from every treatment room. The waiting experience becomes part of the treatment.' },
  { id:'demo-pj-19', title:'Kite Cultural Centre',  subtitle:'Where Community Gathers',        category:'Commercial',     location:'Vadodara, GJ',  client:'Kite Arts Society', year:'2021', area:'11,200 sq.ft', status:'completed', featured:false, brief:'A multipurpose cultural centre for a Baroda arts society requiring a 400-seat auditorium, rehearsal rooms, workshops, and a café — all within a modest budget and on a compact urban site.', approach:'We stacked functions vertically and used the roof as a performance terrace accessible from both the auditorium level and the street. The building becomes a social condenser, with the café drawing street life in and the terrace projecting cultural life out.' },
  { id:'demo-pj-20', title:'Vayu Passive House',   subtitle:'Zero Energy, Maximum Life',       category:'Sustainable',    location:'Auroville, PY', client:'Vayu Collective', year:'2022', area:'2,600 sq.ft', status:'completed', featured:false, brief:'A certified passive house demonstration project in Auroville — proving that net-zero energy living in tropical India is not only possible but beautiful.', approach:'The design achieves net-zero without solar panels through exceptional insulation, earth-tube heat exchange, and careful solar orientation. The result consumes 90% less energy than a conventional house of similar size.' },
];

function meta(label, value) {
  return { _type: 'object', _key: Math.random().toString(36).slice(2, 9), label, value };
}

function teamCredit(role, name) {
  return { _type: 'object', _key: Math.random().toString(36).slice(2, 9), role, name };
}

/**
 * @param {Function} resolveImage - async (url, label, alt) => Sanity image asset object
 */
export async function getProjectSeeds(resolveImage) {
  const seeds = [];

  for (const [i, p] of projects.entries()) {
    // Upload unique images needed for this project (results are cached by URL)
    const heroUrl     = heroImages[i % heroImages.length];
    const galleryUrls = [0,1,2,3,4,5,6].map(offset => heroImages[(i + offset) % heroImages.length]);

    const heroImage = await resolveImage(heroUrl, `hero-${p.id}`, `${p.title} hero image`);

    async function gImg(url, alt, width = 'col-span-12 md:col-span-6', aspectRatio = 'aspect-[16/10]') {
      // Use a stable label based on url hash + project index
      const urlKey = url.replace(/[^a-z0-9]/gi, '').slice(-20);
      const asset = await resolveImage(url, `gallery-${p.id}-${urlKey}`, alt);
      return { ...asset, _key: Math.random().toString(36).slice(2, 9), alt, width, aspectRatio };
    }

    seeds.push({
      _id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      slug: { _type: 'slug', current: p.id.replace('demo-pj-', 'project-') + '-' + p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
      isFeatured: p.featured,
      category: p.category,
      status: p.status,
      heroImage,
      meta: [
        meta('Location', p.location),
        meta('Client', p.client),
        meta('Year', p.year),
        meta('Area', p.area),
        meta('Scope', p.category),
      ],
      brief: p.brief,
      approach: p.approach,
      challenge: "The primary challenge was reconciling the client's desire for openness with the need for privacy from adjacent properties, while maintaining a clear structural logic that could be built within budget.",
      solution: 'A carefully positioned screen of perforated screens and strategic planting creates layers of privacy without enclosure, preserving the sense of openness at every scale.',
      materials: [
        { _type: 'object', _key: Math.random().toString(36).slice(2, 9), name: 'Kota Stone', origin: 'Rajasthan, India' },
        { _type: 'object', _key: Math.random().toString(36).slice(2, 9), name: 'Teak Wood', origin: 'Myanmar' },
        { _type: 'object', _key: Math.random().toString(36).slice(2, 9), name: 'Exposed Concrete', origin: 'Local' },
      ],
      gallery: [
        await gImg(galleryUrls[0], `${p.title} — exterior view`, 'col-span-12', 'aspect-[21/9]'),
        await gImg(galleryUrls[1], `${p.title} — living space`, 'col-span-12 md:col-span-6', 'aspect-[4/3]'),
        await gImg(galleryUrls[2], `${p.title} — detail`, 'col-span-12 md:col-span-6', 'aspect-[4/3]'),
        await gImg(galleryUrls[3], `${p.title} — courtyard`, 'col-span-12 md:col-span-8', 'aspect-[16/9]'),
        await gImg(galleryUrls[4], `${p.title} — night view`, 'col-span-12 md:col-span-4', 'aspect-[3/4]'),
      ],
      processGallery: [
        await gImg(galleryUrls[5], `${p.title} — initial massing study`, 'col-span-12 md:col-span-6', 'aspect-[4/3]'),
        await gImg(galleryUrls[6], `${p.title} — section diagram`, 'col-span-12 md:col-span-6', 'aspect-[4/3]'),
      ],
      testimonial: {
        _type: 'object',
        text: `Working with AD.RS on ${p.title} was transformative. They understood not just what we asked for but what we truly needed. The result is a space that grows with us every day.`,
        author: p.client,
        role: p.category === 'Residential' ? 'Homeowner' : 'Client',
      },
      team: [
        teamCredit('Principal Architect', 'Aditi Rawat'),
        teamCredit('Project Lead', 'Rohan Sharma'),
        teamCredit('Interior Design', 'Meera Iyer'),
        teamCredit('Technical Direction', 'Vikram Joshi'),
      ],
      seo: {
        _type: 'object',
        title: `${p.title} — ${p.category} Project | AD.RS Design Studio`,
        description: p.brief.slice(0, 155),
        keywords: [p.category, 'architecture', 'interior design', 'India', p.location.split(',')[1]?.trim() ?? 'India'],
      },
      transformation: {
        _type: 'object',
        isEnabled: false,
      },
    });
  }

  return seeds;
}
