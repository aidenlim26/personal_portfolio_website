import Image from "next/image";
import { RailLines } from "@/components/rail";
import { hockey } from "@/lib/content";

export default function Hockey() {
  return (
    <section id="hockey" aria-labelledby="hockey-heading" className="section">
      <div className="page-grid">
        <div className="col-head">
          <h2 id="hockey-heading" className="h2">
            {hockey.heading}
          </h2>
        </div>

        <aside className="col-rail" aria-label="Details for ice hockey">
          <div className="rail">
            <RailLines lines={hockey.rail} />
          </div>
        </aside>

        <div className="col-body mt-9">
          <p className="prose-body">{hockey.paragraph}</p>
        </div>

        <figure className="col-full mt-[7vh]">
          <Image
            src={hockey.image.src}
            alt={hockey.image.alt}
            width={hockey.image.width}
            height={hockey.image.height}
            sizes="(min-width: 78rem) 1136px, 92vw"
            quality={85}
            className="h-auto w-full"
          />
        </figure>
      </div>
    </section>
  );
}
