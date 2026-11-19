export type Slide = {
  id: string;
  kind: "compete" | "prizes" | "stay";
  eyebrow: string;
  title: string;
  description: string;
};

export const onboardingData: Slide[] = [
  {
    id: "1",
    kind: "compete",
    eyebrow: "COMPETE",
    title: "Swim with us, whatever your age",
    description: "Palmabeach hosts swimming competitions for kids, teens and adults. Pick your category and dive in.",
  },
  {
    id: "2",
    kind: "prizes",
    eyebrow: "WIN",
    title: "Medals, trophies and gifts",
    description: "Great swims deserve recognition. Compete for rewards and meet people who love the water as much as you do.",
  },
  {
    id: "3",
    kind: "stay",
    eyebrow: "RELAX",
    title: "More than a competition",
    description: "Spa treatments, fine dining, water sports and events. Explore everything Palmabeach has to offer.",
  },
];
