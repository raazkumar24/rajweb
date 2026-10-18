import React, { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import ProjectImage3D from "./ProjectImage3D";
import LiveSitePreview from "./LiveSitePreview";

export default function ProjectMedia({ project, onOpenModal }) {
  const [live, setLive] = useState(false);

  // Sirf https live URL wale aur embeddable: true wale projects par live option aayega
  const canEmbed =
    project.embeddable && project.liveUrl?.startsWith("https://");

  const toggle = (next) => {
    setLive(next);
    // Height badalne par ScrollTrigger ko dobara naapna padta hai
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <div>
      {/* Image mounted rehti hai (display none), taaki GSAP ke refs na tootein */}
      <div className={live ? "hidden" : "block"}>
        <ProjectImage3D
          image={project.image}
          images={project.images}
          title={project.title}
          year={project.year}
          client={project.client}
          onClick={onOpenModal}
        />
      </div>

      {live && (
        <LiveSitePreview
          url={project.liveUrl}
          title={project.title}
          onClose={() => toggle(false)}
        />
      )}

      {canEmbed && !live && (
        <button
          type="button"
          onClick={() => toggle(true)}
          className="group mt-4 mb-1 ml-1 inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#333333] shadow-[0_6px_18px_rgba(17,17,17,0.1)] transition-[border-color,color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[0_10px_24px_rgba(var(--brand-rgb),0.18)] sm:text-sm"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          Try live site
        </button>
      )}
    </div>
  );
}
