// Cleaned: removed stray, unassigned array/object at the top
  export const projects = [
    {
      title: "Vistana – Mobile App Design",
      img: "portfolio/projects/vistana-1.png",
      desc: `The Vistana Signature Experiences mobile app** is designed to make planning, managing, and enjoying vacations seamless for travelers and owners alike. Users can browse destinations, explore resort amenities, and get inspired with vacation ideas, photos, and activities. The app provides access to upcoming reservations, resort details, and special offers, ensuring that members and guests stay informed and prepared for their trips. With a clean interface and imagery-driven design, the app balances inspiration with practical functionality.\n\nFor Vistana owners, the app extends further by offering access to ownership details such as benefit levels, StarOptions, and balances. Members can log in with their existing vistana.com credentials to view personalized dashboards, manage their profiles, and even share vacation photos, videos, and stories with the community. While some content is available without logging in, full functionality requires an account, making the app both a travel planning tool and an ownership companion that connects inspiration, management, and community in one platform.\n\n The project was originally designed with simple mockups and wireframes and then shipped off to an overseas development team. However, the overseas team needed more direction than mocks with generic text and images. That's where I came in. I took the initial wireframes and mockups and created a full design system with reusable components, a style guide, and a comprehensive page by page designs in photoshop and indesign. This ensured that the overseas developers had clear guidelines and assets to work with, leading to a more cohesive and efficient development process.`,
      secimg: "portfolio/projects/vistana-2.png",
      addimg: "portfolio/projects/vistana-3.png, portfolio/projects/vistana-4.png",
      deliverables: "Vistana Signature Experiences had one of the most comprehensive designs ever pushed out to a dev team resulting in true pixel perfect app development for all 3 of their brands. \n\n Deliverables were: UI/UX Design, Prototyping, User Flows, Wireframes, Visual Design, Interactive Prototype, Interaction Design.",
      featured: true,
      tech: [
        { name: "Photoshop", icon: "fab fa-photoshop" },
        { name: "Illustrator", icon: "fab fa-illustrator" },
        { name: "InDesign", icon: "fab fa-indesign" }
      ]
    },
    {
      title: "Virtued Online - Virtual Tutor Platform",
      img: "portfolio/projects/virtued-online.png",
      desc: "As Project Lead for a virtual tutoring application, I oversaw the planning, design, and development of the platform. I established the project structure using Jira for task management and Confluence for documentation.",
      featured: true,
      tech: [
        { name: "React", icon: "fab fa-react" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "Bootstrap", icon: "fab fa-bootstrap" },
        { name: "Sass", icon: "fab fa-sass" }
      ]
    },
    {
      title: "Andor Health – React Telehealth App",
      img: "portfolio/projects/andor.png",
      desc: "Cutting edge mobile app that allows timeshare owners to connect their social life along with their timeshare properties in a seamless way.",
      featured: false,
      tech: [
        { name: "Photoshop", icon: "fab fa-photoshop" },
        { name: "Illustrator", icon: "fab fa-illustrator" },
        { name: "InDesign", icon: "fab fa-indesign" }
      ]
    },
    {
      title: "Time 2 Visit – Travel Booking Site",
      img: "portfolio/projects/t2v.png",
      desc: "Cutting edge mobile app that allows timeshare owners to connect their social life along with their timeshare properties in a seamless way.",
      featured: false,
      tech: [
        { name: "Photoshop", icon: "fab fa-photoshop" },
        { name: "Illustrator", icon: "fab fa-illustrator" },
        { name: "InDesign", icon: "fab fa-indesign" }
      ]
    },
  ];

export const galleryTabs = [
  {
    key: "projects",
    label: "Mobile App Design",
    icon: "fas fa-mobile-alt",
    images: [
      "portfolio/design/IMG_0462.png",
      "portfolio/design/IMG_0463.png",
      "portfolio/design/IMG_0464.png",
      "portfolio/design/IMG_0465.png",
      "portfolio/design/IMG_0466.png",
      "portfolio/design/IMG_0467.png",
      "portfolio/design/IMG_0468.png",
      // ...add more project images
    ],
  },
  {
    key: "mockups",
    label: "Mockups",
    icon: "fas fa-desktop",
    images: [
      "portfolio/mockups/credit-card-modal-2.png",
      "portfolio/mockups/lgsociallayoutv2.jpg",
      "portfolio/mockups/package-popup.jpg",
      "portfolio/mockups/paetec-rewards-alt.jpg",
      "portfolio/mockups/paetec-rewards-form.jpg",
      "portfolio/mockups/paetec-rewards.jpg",
      "portfolio/mockups/program.jpg",
      "portfolio/mockups/t2v_confirmation-2020-revised.jpg",
      "portfolio/mockups/t2v-ad-design.jpg",
      "portfolio/mockups/t2v-package-booked.png",
      "portfolio/mockups/t2v-package-page-new.jpg",
      "portfolio/mockups/TopPackages.jpg",
      // ...add more mockup images
    ],
  },
  {
    key: "design",
    label: "Design",
    icon: "fas fa-paint-brush",
    images: [
      "portfolio/design/2-0-ball.jpg",
      "portfolio/design/amanecer-1680x1050.jpg",
      "portfolio/design/future-planet.jpg",
      "portfolio/design/glass-ball.jpg",
      "portfolio/design/green-latern-wp.jpg",
      "portfolio/design/greenwell-home-inspections-logo.png",
      "portfolio/design/land-after-time_0.jpg",
      "portfolio/design/logo.png",
      "portfolio/design/sway-palm.jpg",
      "portfolio/design/text-glow.jpg"
    ],
  },
];
// ...existing code...
// Duplicate galleryTabs export removed
