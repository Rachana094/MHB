// ── Imports ──────────────────────────────────────────────────────────────────
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';

// ── Stage 1: Password ────────────────────────────────────────────────────────
// The user must type this exact string (case-insensitive) to unlock the site.
export const UNLOCK_PASSWORD = "appi"; // e.g. "12052020" or a nickname

// Typing-effect lines shown on the entrance screen, one after another.
export const gatekeeperLines = [
  "Some stories don't end.", // INSERT YOUR OPENING LINE
  "They just find a quieter place to live.", // INSERT YOUR SECOND LINE
  "This one was written for you.", // INSERT YOUR THIRD LINE
];

// ── Stage 2: Wishes ──────────────────────────────────────────────────────────
export const wishesData = [
  {
    id: 1,
    emoji: "✨",
    title: "A Wish for Your Joy",
    text: "May every morning greet you with the kind of warmth that no alarm clock can steal. You deserve days full of quiet magic.",
  },
  {
    id: 2,
    emoji: "🌙",
    title: "A Wish for Your Dreams",
    text: "May your biggest dreams feel less like distant stars and more like familiar friends you're walking toward, one brave step at a time.",
  },
  {
    id: 3,
    emoji: "💛",
    title: "A Wish for Your Peace",
    text: "May you always find your way back to yourself — your truest, most luminous self — no matter how far the world takes you.",
  },
];

// ── Stage 3: Photo Booth ─────────────────────────────────────────────────────
export const photoBoothData = [
  {
    id: 1,
    era: "Childhood",
    year: "Where it all began",
    photoUrl: photo1,
    photoAlt: "do you remember this day ?",
    caption: "Where it all began",
    story: "vand dina may be 3rd or 4th ansutte tht havattu school alli dance practice ge kardu irtare, and havattu nanu ninu full nedkond hogirtivi urinda bargur varguuuuu",
  },
  {
    id: 2,
    era: "The Middle Years",
    year: "Growing pains",
    photoUrl: photo2,
    photoAlt: "Middle years photo",
    caption: "Growing pains & golden afternoons",
    story: "idu nenp idy ninge vand dina havattu van bandiralla en hagirutto ast nenp illa but nav ibru gate hatra hogirtivi alli halla dalli baro nerinalli vand yedi bandirutte ninu adunna nange hedidu kottu irtiya... nangu innu nenp ide adunna idkonke havttu est baya battidde anta!!",
  },
  {
    id: 3,
    era: "Recent Chapter",
    year: "Recent",
    photoUrl: photo3,
    photoAlt: "Recent photo",
    caption: "The version of us we became",
    story: "one beautifull chapter that ended without the desination.... kelvandra runa devru aste kottirtne after tht it wil became the star in constillation ",
  },
];


// ── Stage 4: Constellation ───────────────────────────────────────────────────
// Positions are percentages (0-100) of the SVG/canvas area.
export const constellationData = [
  {
    id: 1,
    name: "First Hello",
    x: 20, y: 30,
    photoUrl: "",
    story: "its been long year first hello nenpu irde iro time inda nu we know each other!!...",
  },
  {
    id: 2,
    name: "Shree devi ",
    x: 45, y: 18,
    photoUrl: "",
    story: "Life was so good back then!!... ha samaya tumba chang ittu kano tht version of youuuuu yavglu hange kapadko .",
  },
  {
    id: 3,
    name: "Hardest Day",
    x: 70, y: 35,
    photoUrl: "",
    story: "hardest dayyy idru bagge na en helli,, probably astu nanu yargu madilla madodu illa... nam maneli phn iskond time alli i vand madyana ella malkond irtare tht eddu nan kirchbidtini , madhu anta .... havtte nange arta hagiddu ee ivrge est attach hagiidni anta.... adikke still i am paying the pain ....",
  },
  {
    id: 4,
    name: "The Turning Point",
    x: 35, y: 60,
    photoUrl: "",
    story: "nam life alli turing point hey PES!!,, extra heloke enu illa ninge ella gottu after PES,, ninu nin hagi ne illa ....  ",
  },
  {
    id: 5,
    name: "What Remains",
    x: 65, y: 68,
    photoUrl: "",
    story: "nan havttu inda ivttu vargu ankond iddu iste kano nin changi irbeku anta,,, nan yavttuu devr hatra nav ibru chang irbeku annodkinta ,, ninu life alli sucess'ed hagbeku life alli anta ne keldini ha time alli i have a confidence tht navuu changi irtivi anta eno kanooo iili idru yara jothe idru nin yavglu kushii hgi iru .... may life gives you wht you wish appa amma akkara na changi nodko ..... life alli ene hagli avrna matra nambu chang iru madhuuu i wish a very happy birthday ,, even when the whole world push away as a frnd rachana will alwazzzzzzzzz be their for you!!!!!❤️",
  },
];

// Pairs of node IDs to draw constellation lines between.
export const constellationEdges = [
  [1, 2], [2, 3], [1, 4], [4, 5], [3, 5],
];

// ── Stage 5: Trivia ──────────────────────────────────────────────────────────
export const triviaData = [
  {
    id: 1,
    question: "16-nov-2022 ",
    options: [
      "gottu ",
      "Illalla!!",
    ],
    correctIndex: 0,
    giftTitle: "Gift #1",
    giftEmoji: "🎁",
    giftText: "A playlist of every song that ever made us think of each other. 🎵",
  },
  {
    id: 2,
    question: "my fvrt food",
    options: [
      "Biryani",
      "Masala Dosa",
      "Egg rice + kabab ",
      "tandoori ",
    ],
    correctIndex: 2,
    giftTitle: "Gift #2",
    giftEmoji: "💌",
    giftText: "even in front of biryani i always choose this.....bcoz once i fixed my mind i never go for options  💌",
  },
  {
    id: 3,
    question: "my fvrt song ",
    options: [
      "ninnolage",
      "nanna preetiya devatheyu ",
      "oo kanachana ",
      "onde samane ",
    ],
    correctIndex: 1,
    giftTitle: "Gift #3",
    giftEmoji: "🌟",
    giftText: "you should know this 🌟",
  },
];

// ── Stage 7: Final Letter ─────────────────────────────────────────────────────
export const finalLetterLines = [
  "Dear MADHU,",
  "",
  "Some people arrive in your life like a season — vivid, irreplaceable, and exactly long enough. You were my favourite kind of season.",
  "",
  "Thank you for every laugh that made my sides hurt, every silence that never needed filling, and every moment we spend....",
  "",
  "That wasn't an end. i wishing you every beautiful thing the next one holds.",
  "",
  "as a final act of LOVE i want to see you HAPPY ",
  "Racchu...",
];

// The final permanent screen sign-off (one short, beautiful line)
export const closingSignoff =
  "Some stories don't end — they become constellations. ✦";
