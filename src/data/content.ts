import { IconName } from "@/lib/icons";

/** Copy carried over from the Palmabeach website. */

export const services: { icon: IconName; title: string; text: string }[] = [
  { icon: "bed-outline", title: "Luxury Accommodations", text: "Comfortable, beautifully kept rooms and suites for a restful stay." },
  { icon: "flower-outline", title: "Spa and Wellness Treatments", text: "Unwind with treatments designed to refresh body and mind." },
  { icon: "restaurant-outline", title: "Fine Dining Experiences", text: "Memorable meals with fresh flavours, served with care." },
  { icon: "boat-outline", title: "Adventure and Water Sports", text: "Get active on the water with fun for every skill level." },
  { icon: "calendar-number-outline", title: "Event Hosting and Planning", text: "We help you plan and host events from start to finish." },
];

export const about = {
  title: "About Palma Beach Competition",
  intro:
    "The Palma Beach Competition is an exciting event designed to bring together individuals and teams who share a passion for creativity, innovation, and community engagement. This competition aims to foster collaboration and showcase talent in various fields.",
  purpose:
    "The competition's purpose is to inspire participants to push their boundaries, develop new skills, and contribute to the vibrant Palma Beach community.",
  benefits: [
    "Opportunities to network with like-minded individuals.",
    "Recognition and rewards for outstanding performances.",
    "Personal and professional growth through challenges.",
  ],
  howTo:
    "To participate, simply register in the app, review the competition guidelines, and submit your entry before the deadline. Stay tuned for updates and announcements!",
};

export type Announcement = {
  id: string;
  title: string;
  date: string;
  summary: string;
  body: { heading?: string; text: string }[];
};

export const announcements: Announcement[] = [
  {
    id: "special",
    title: "Special Announcement",
    date: "Latest",
    summary: "We are thrilled to share some exciting news with you! Stay tuned for upcoming events, exclusive offers, and more.",
    body: [
      { text: "We are thrilled to share some exciting news with you! Stay tuned for upcoming events, exclusive offers, and more." },
      {
        heading: "What's Happening?",
        text: "Palmabeach is hosting a grand event this season! Join us for an unforgettable experience filled with fun, relaxation, and surprises.",
      },
      { heading: "Don't Miss Out!", text: "Be part of the excitement. Contact us for more details or to reserve your spot today!" },
    ],
  },
];
