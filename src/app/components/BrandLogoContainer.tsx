import React from "react";
import imgAnimalPlanet from "@/assets/images/brand logos/animal planet.png";
import imgBeano from "@/assets/images/brand logos/beano.png";
import imgCommonwealthGames from "@/assets/images/brand logos/commonwealth games.png";
import imgDcThomson from "@/assets/images/brand logos/dc thomson.png";
import imgDandy from "@/assets/images/brand logos/dandy.png";
import imgEfwd from "@/assets/images/brand logos/efwd.png";
import imgEnergyVoice from "@/assets/images/brand logos/energy voice.png";
import imgEveningExpress from "@/assets/images/brand logos/eveningexpress.png";
import imgEveningTelegraph from "@/assets/images/brand logos/evening telegraph.png";
import imgHealthAndWellbeing from "@/assets/images/brand logos/health and wellbeing.png";
import imgJaguarLandRover from "@/assets/images/brand logos/jaguar landrover.png";
import imgNaturalHealth from "@/assets/images/brand logos/natural health.png";
import imgNesta from "@/assets/images/brand logos/nesta.png";
import imgPressAndJournal from "@/assets/images/brand logos/press and journal.png";
import imgScotsMagazine from "@/assets/images/brand logos/scots magazine.png";
import imgSundayPost from "@/assets/images/brand logos/sunday post.png";
import imgTheCourier from "@/assets/images/brand logos/the courier.png";
import imgThePeoplesFriend from "@/assets/images/brand logos/the peoples friend.png";
import imgThunderbirdsAreGo from "@/assets/images/brand logos/thunderbirds are go.png";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const FONT_RUBIK = "font-['Rubik',sans-serif]";
const CONTAINER = "max-w-[1200px] mx-auto";
const CONTAINER_X_PAGE = "px-[20px] min-[600px]:px-[52px]";

function LogoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center px-4 py-2.5 rounded-[4px] w-[180px] h-[120px] shrink-0">
      {children}
    </div>
  );
}

const LOGOS = [
  { key: "the-peoples-friend", alt: "The People's Friend", src: imgThePeoplesFriend },
  { key: "evening-express", alt: "Evening Express", src: imgEveningExpress },
  { key: "dc-thomson", alt: "DC Thomson", src: imgDcThomson },
  { key: "natural-health", alt: "Natural Health", src: imgNaturalHealth },
  { key: "scots-magazine", alt: "The Scots Magazine", src: imgScotsMagazine },
  { key: "nesta", alt: "Nesta", src: imgNesta },
  { key: "commonwealth-games", alt: "Commonwealth Games", src: imgCommonwealthGames },
  { key: "evening-telegraph", alt: "Evening Telegraph", src: imgEveningTelegraph },
  { key: "animal-planet", alt: "Animal Planet", src: imgAnimalPlanet },
  { key: "efwd", alt: "E-FWD", src: imgEfwd },
  { key: "jaguar-land-rover", alt: "Jaguar Land Rover", src: imgJaguarLandRover },
  { key: "the-courier", alt: "The Courier", src: imgTheCourier },
  { key: "beano", alt: "Beano", src: imgBeano },
  { key: "energy-voice", alt: "Energy Voice", src: imgEnergyVoice },
  { key: "press-and-journal", alt: "The Press and Journal", src: imgPressAndJournal },
  { key: "sunday-post", alt: "The Sunday Post", src: imgSundayPost },
  { key: "health-and-wellbeing", alt: "Health and Wellbeing", src: imgHealthAndWellbeing },
  { key: "the-dandy", alt: "The Dandy", src: imgDandy },
  { key: "thunderbirds-are-go", alt: "Thunderbirds Are Go", src: imgThunderbirdsAreGo },
];

const LOGO_IMAGE_CLASS = "max-h-[70px] max-w-[150px] w-auto h-auto object-contain";

export default function BrandLogoContainer() {
  return (
    <section
      id="social-proof"
      className={cn(CONTAINER, CONTAINER_X_PAGE, "pb-[60px] min-[600px]:pb-[100px]")}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <h2
            className={cn(
              FONT_RUBIK,
              "font-bold text-[#171617]",
              "text-[32px] leading-[38px] tracking-[-0.64px] text-center max-w-[768px] mx-auto",
              "min-[600px]:text-[40px] min-[600px]:leading-[46px] min-[600px]:tracking-[-0.8px]"
            )}
          >
            Long-term collaboration with growing teams
          </h2>
          <p className="max-w-[768px] mx-auto text-center">
            I’ve worked with product, engineering, and leadership teams across a range of
            organisations to deliver accessible, user-centred digital products.
          </p>
        </div>

        <div className="hidden md:flex flex-wrap gap-x-4 gap-y-[6px] items-start justify-between">
          {LOGOS.map(({ key, alt, src }) => (
            <LogoCard key={key}>
              <img alt={alt} src={src} className={LOGO_IMAGE_CLASS} />
            </LogoCard>
          ))}
        </div>

        <div className="md:hidden overflow-x-auto">
          <div className="grid grid-flow-col auto-cols-max grid-rows-3 gap-2 pb-4">
            {LOGOS.map(({ key, alt, src }) => (
              <LogoCard key={`mobile-${key}`}>
                <img alt={alt} src={src} className={LOGO_IMAGE_CLASS} />
              </LogoCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
