import { useState } from "react";
import { Play } from "lucide-react";
import { vslConfig, type VideoType } from "@/config/vslConfig";
import { SafeImage } from "./shared";

function toEmbed(url: string, type: VideoType) {
  if (type === "youtube") {
    const id = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : url;
  }
  if (type === "vimeo") {
    const id = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : url;
  }
  return url;
}

export function VideoPlayer() {
  const { videoUrl, videoType, videoPoster } = vslConfig;
  const [playing, setPlaying] = useState(false);

  return (
    <div className="card-glow relative aspect-video w-full overflow-hidden rounded-3xl bg-card">
      {!videoUrl ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-tech">
            <Play className="h-7 w-7 fill-current text-primary-foreground" aria-hidden />
          </span>
          <span className="text-sm">Vídeo de demonstração em breve</span>
        </div>
      ) : videoType === "mp4" ? (
        <video src={videoUrl} poster={videoPoster} controls playsInline preload="metadata" className="h-full w-full object-contain" />
      ) : playing || videoType === "embed" ? (
        <iframe
          src={toEmbed(videoUrl, videoType)}
          title={`Demonstração ${vslConfig.productName}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group relative block h-full w-full" aria-label="Reproduzir vídeo">
          <SafeImage src={videoPoster} alt="Capa do vídeo" fit="cover" className="h-full w-full" placeholderClassName="h-full rounded-none border-0" placeholderLabel=" " />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-tech shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
              <Play className="ml-1 h-8 w-8 fill-current text-primary-foreground" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
