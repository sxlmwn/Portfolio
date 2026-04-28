import { useEffect, useState } from "react";
import { X, Shuffle, RotateCcw, Check } from "lucide-react";

const STORAGE_KEY = "salman_avatar_config_v1";

// ---------- Palettes ----------
const SKIN_TONES = ["#f5d6c0", "#f1c9a5", "#e0ac82", "#c68863", "#a06a44", "#7a4a2d", "#4d2e1c"];
const HAIR_COLORS = ["#1a1a1a", "#3b2417", "#6b3a1f", "#a0522d", "#d2a86a", "#e8d18c", "#9b8aa6", "#6a5acd", "#c0392b"];
const SHIRT_COLORS = ["#1a1a1a", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#f1f5f9"];
const BG_COLORS = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#475569", "#0f172a"];
const GLASSES_COLORS = ["#1a1a1a", "#3b2417", "#6b7280", "#0ea5e9", "#dc2626"];

// ---------- Options ----------
const HAIR_STYLES = ["short", "buzz", "curly", "long", "messy", "fade", "bald"] as const;
const FACIAL_HAIR = ["none", "stubble", "mustache", "goatee", "beard"] as const;
const GLASSES = ["none", "round", "square", "aviator"] as const;
const EYEBROWS = ["normal", "raised", "serious"] as const;
const MOUTHS = ["smile", "smirk", "neutral", "grin"] as const;

export type AvatarConfig = {
  skin: string;
  hairColor: string;
  hairStyle: typeof HAIR_STYLES[number];
  facialHair: typeof FACIAL_HAIR[number];
  facialHairColor: string;
  glasses: typeof GLASSES[number];
  glassesColor: string;
  eyebrows: typeof EYEBROWS[number];
  mouth: typeof MOUTHS[number];
  shirt: string;
  bg: string;
};

const defaultConfig: AvatarConfig = {
  skin: SKIN_TONES[2],
  hairColor: HAIR_COLORS[0],
  hairStyle: "short",
  facialHair: "stubble",
  facialHairColor: HAIR_COLORS[0],
  glasses: "none",
  glassesColor: GLASSES_COLORS[0],
  eyebrows: "normal",
  mouth: "smirk",
  shirt: SHIRT_COLORS[1],
  bg: BG_COLORS[0],
};

export const loadAvatarConfig = (): AvatarConfig | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {
    return null;
  }
};

const saveAvatarConfig = (cfg: AvatarConfig) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
};

const randomFrom = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

// ---------- SVG Avatar ----------
export const StyledAvatar = ({ config, size = 256 }: { config: AvatarConfig; size?: number }) => {
  const { skin, hairColor, hairStyle, facialHair, facialHairColor, glasses, glassesColor, eyebrows, mouth, shirt, bg } = config;

  return (
    <svg viewBox="0 0 256 256" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor={bg} stopOpacity="1" />
          <stop offset="100%" stopColor={bg} stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="skinShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skin} />
          <stop offset="100%" stopColor={skin} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" fill="url(#bgGrad)" />

      {/* Shirt / shoulders */}
      <path d="M 30 256 Q 30 190 128 180 Q 226 190 226 256 Z" fill={shirt} />
      <path d="M 90 200 Q 128 215 166 200 L 166 256 L 90 256 Z" fill={skin} opacity="0.4" />

      {/* Neck */}
      <rect x="108" y="158" width="40" height="30" rx="10" fill="url(#skinShade)" />

      {/* Head */}
      <ellipse cx="128" cy="115" rx="55" ry="62" fill="url(#skinShade)" />

      {/* Ears */}
      <ellipse cx="73" cy="120" rx="8" ry="12" fill={skin} />
      <ellipse cx="183" cy="120" rx="8" ry="12" fill={skin} />

      {/* Hair */}
      {hairStyle === "short" && (
        <path d="M 75 95 Q 75 55 128 50 Q 181 55 181 95 Q 181 80 175 75 Q 160 60 128 60 Q 96 60 81 75 Q 75 82 75 95 Z" fill={hairColor} />
      )}
      {hairStyle === "buzz" && (
        <path d="M 80 90 Q 80 65 128 60 Q 176 65 176 90" fill="none" stroke={hairColor} strokeWidth="14" strokeLinecap="round" />
      )}
      {hairStyle === "curly" && (
        <g fill={hairColor}>
          <circle cx="90" cy="75" r="14" />
          <circle cx="110" cy="62" r="15" />
          <circle cx="128" cy="55" r="16" />
          <circle cx="146" cy="62" r="15" />
          <circle cx="166" cy="75" r="14" />
          <circle cx="78" cy="90" r="12" />
          <circle cx="178" cy="90" r="12" />
        </g>
      )}
      {hairStyle === "long" && (
        <path d="M 70 110 Q 65 50 128 45 Q 191 50 186 110 Q 186 145 178 160 L 175 95 Q 160 70 128 68 Q 96 70 81 95 L 78 160 Q 70 145 70 110 Z" fill={hairColor} />
      )}
      {hairStyle === "messy" && (
        <path d="M 72 95 Q 70 55 100 50 Q 115 40 128 48 Q 145 38 160 50 Q 188 58 184 95 Q 178 70 165 72 Q 150 55 135 65 Q 120 50 105 65 Q 88 60 78 78 Q 72 85 72 95 Z" fill={hairColor} />
      )}
      {hairStyle === "fade" && (
        <>
          <path d="M 78 90 Q 78 60 128 55 Q 178 60 178 90 L 178 75 Q 165 65 128 65 Q 91 65 78 75 Z" fill={hairColor} />
          <path d="M 78 90 Q 78 105 80 115 L 75 118 Q 73 100 78 90" fill={hairColor} opacity="0.5" />
          <path d="M 178 90 Q 178 105 176 115 L 181 118 Q 183 100 178 90" fill={hairColor} opacity="0.5" />
        </>
      )}

      {/* Eyebrows */}
      {eyebrows === "normal" && (
        <g fill={hairColor}>
          <rect x="95" y="100" width="22" height="4" rx="2" />
          <rect x="139" y="100" width="22" height="4" rx="2" />
        </g>
      )}
      {eyebrows === "raised" && (
        <g fill={hairColor}>
          <path d="M 95 102 Q 106 96 117 100 L 117 104 Q 106 100 95 106 Z" />
          <path d="M 139 100 Q 150 96 161 102 L 161 106 Q 150 100 139 104 Z" />
        </g>
      )}
      {eyebrows === "serious" && (
        <g fill={hairColor}>
          <path d="M 95 105 L 117 100 L 117 104 L 95 109 Z" />
          <path d="M 139 100 L 161 105 L 161 109 L 139 104 Z" />
        </g>
      )}

      {/* Eyes */}
      <g>
        <ellipse cx="106" cy="118" rx="6" ry="7" fill="white" />
        <ellipse cx="150" cy="118" rx="6" ry="7" fill="white" />
        <circle cx="107" cy="119" r="3.2" fill="#1a1a1a" />
        <circle cx="151" cy="119" r="3.2" fill="#1a1a1a" />
        <circle cx="108" cy="117.5" r="1" fill="white" />
        <circle cx="152" cy="117.5" r="1" fill="white" />
      </g>

      {/* Nose */}
      <path d="M 128 125 Q 124 138 122 145 Q 125 148 128 148 Q 131 148 134 145 Q 132 138 128 125" fill={skin} stroke={skin} strokeOpacity="0.3" strokeWidth="1" opacity="0.85" />

      {/* Glasses */}
      {glasses === "round" && (
        <g fill="none" stroke={glassesColor} strokeWidth="3">
          <circle cx="106" cy="120" r="14" />
          <circle cx="150" cy="120" r="14" />
          <line x1="120" y1="120" x2="136" y2="120" />
          <line x1="92" y1="120" x2="80" y2="118" />
          <line x1="164" y1="120" x2="176" y2="118" />
        </g>
      )}
      {glasses === "square" && (
        <g fill="none" stroke={glassesColor} strokeWidth="3">
          <rect x="91" y="108" width="30" height="22" rx="3" />
          <rect x="135" y="108" width="30" height="22" rx="3" />
          <line x1="121" y1="118" x2="135" y2="118" />
          <line x1="91" y1="118" x2="80" y2="116" />
          <line x1="165" y1="118" x2="176" y2="116" />
        </g>
      )}
      {glasses === "aviator" && (
        <g fill="none" stroke={glassesColor} strokeWidth="3">
          <path d="M 90 112 Q 90 132 106 132 Q 122 132 122 115 Q 122 110 118 110 L 94 110 Q 90 110 90 112 Z" />
          <path d="M 134 112 Q 134 132 150 132 Q 166 132 166 115 Q 166 110 162 110 L 138 110 Q 134 110 134 112 Z" />
          <line x1="122" y1="115" x2="134" y2="115" />
        </g>
      )}

      {/* Mustache */}
      {(facialHair === "mustache" || facialHair === "beard") && (
        <path d="M 108 150 Q 118 154 128 152 Q 138 154 148 150 Q 145 158 128 158 Q 111 158 108 150 Z" fill={facialHairColor} />
      )}

      {/* Goatee */}
      {(facialHair === "goatee" || facialHair === "beard") && (
        <path d="M 118 162 Q 128 175 138 162 Q 134 172 128 174 Q 122 172 118 162 Z" fill={facialHairColor} />
      )}

      {/* Stubble */}
      {facialHair === "stubble" && (
        <g fill={facialHairColor} opacity="0.35">
          <ellipse cx="128" cy="160" rx="32" ry="10" />
        </g>
      )}

      {/* Full beard */}
      {facialHair === "beard" && (
        <path d="M 78 130 Q 80 165 100 175 Q 128 185 156 175 Q 176 165 178 130 Q 170 150 155 158 Q 128 168 101 158 Q 86 150 78 130 Z" fill={facialHairColor} opacity="0.95" />
      )}

      {/* Mouth */}
      {mouth === "smile" && (
        <path d="M 112 158 Q 128 172 144 158" fill="none" stroke="#3a1f1f" strokeWidth="2.5" strokeLinecap="round" />
      )}
      {mouth === "smirk" && (
        <path d="M 114 160 Q 128 166 144 158" fill="none" stroke="#3a1f1f" strokeWidth="2.5" strokeLinecap="round" />
      )}
      {mouth === "neutral" && (
        <line x1="116" y1="160" x2="140" y2="160" stroke="#3a1f1f" strokeWidth="2.5" strokeLinecap="round" />
      )}
      {mouth === "grin" && (
        <>
          <path d="M 110 156 Q 128 174 146 156 Q 128 168 110 156 Z" fill="#3a1f1f" />
          <path d="M 114 158 Q 128 162 142 158" fill="white" opacity="0.6" />
        </>
      )}
    </svg>
  );
};

// ---------- Editor ----------
type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (cfg: AvatarConfig) => void;
  initial?: AvatarConfig | null;
};

export const StyledAvatarEditor = ({ open, onClose, onSave, initial }: Props) => {
  const [cfg, setCfg] = useState<AvatarConfig>(initial || defaultConfig);

  useEffect(() => {
    if (open) setCfg(initial || defaultConfig);
  }, [open, initial]);

  if (!open) return null;

  const update = <K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) =>
    setCfg((c) => ({ ...c, [key]: value }));

  const randomize = () => {
    setCfg({
      skin: randomFrom(SKIN_TONES),
      hairColor: randomFrom(HAIR_COLORS),
      hairStyle: randomFrom(HAIR_STYLES),
      facialHair: randomFrom(FACIAL_HAIR),
      facialHairColor: randomFrom(HAIR_COLORS),
      glasses: randomFrom(GLASSES),
      glassesColor: randomFrom(GLASSES_COLORS),
      eyebrows: randomFrom(EYEBROWS),
      mouth: randomFrom(MOUTHS),
      shirt: randomFrom(SHIRT_COLORS),
      bg: randomFrom(BG_COLORS),
    });
  };

  const handleSave = () => {
    saveAvatarConfig(cfg);
    onSave(cfg);
    onClose();
  };

  const Swatches = ({ colors, value, onPick }: { colors: string[]; value: string; onPick: (c: string) => void }) => (
    <div className="flex flex-wrap gap-1.5">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onPick(c)}
          className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${value === c ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "ring-1 ring-white/20"}`}
          style={{ background: c }}
          aria-label={c}
        />
      ))}
    </div>
  );

  const Pills = <T extends string>({ options, value, onPick }: { options: readonly T[]; value: T; onPick: (v: T) => void }) => (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onPick(o)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
            value === o
              ? "bg-primary text-primary-foreground shadow-[0_4px_12px_-4px_hsl(211_100%_50%/0.5)]"
              : "glass-strong text-foreground/80 hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/70 backdrop-blur-md">
      <div className="glass-strong rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col sm:flex-row">
        {/* Preview */}
        <div className="sm:w-[42%] p-6 flex flex-col items-center justify-center gap-4 border-b sm:border-b-0 sm:border-r border-white/10">
          <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
            <StyledAvatar config={cfg} size={224} />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={randomize} className="glass-button text-xs">
              <Shuffle className="w-3.5 h-3.5 text-primary" />
              Randomize
            </button>
            <button type="button" onClick={() => setCfg(defaultConfig)} className="glass-button text-xs">
              <RotateCcw className="w-3.5 h-3.5 text-primary" />
              Reset
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-xl">Customize Avatar</h3>
            <button type="button" onClick={onClose} className="w-8 h-8 rounded-full glass-strong grid place-items-center hover:bg-white/10">
              <X className="w-4 h-4" />
            </button>
          </div>

          <Section label="Skin tone">
            <Swatches colors={SKIN_TONES} value={cfg.skin} onPick={(c) => update("skin", c)} />
          </Section>

          <Section label="Hair style">
            <Pills options={HAIR_STYLES} value={cfg.hairStyle} onPick={(v) => update("hairStyle", v)} />
          </Section>

          {cfg.hairStyle !== "bald" && (
            <Section label="Hair color">
              <Swatches colors={HAIR_COLORS} value={cfg.hairColor} onPick={(c) => update("hairColor", c)} />
            </Section>
          )}

          <Section label="Facial hair">
            <Pills options={FACIAL_HAIR} value={cfg.facialHair} onPick={(v) => update("facialHair", v)} />
          </Section>

          {cfg.facialHair !== "none" && (
            <Section label="Facial hair color">
              <Swatches colors={HAIR_COLORS} value={cfg.facialHairColor} onPick={(c) => update("facialHairColor", c)} />
            </Section>
          )}

          <Section label="Glasses">
            <Pills options={GLASSES} value={cfg.glasses} onPick={(v) => update("glasses", v)} />
          </Section>

          {cfg.glasses !== "none" && (
            <Section label="Frame color">
              <Swatches colors={GLASSES_COLORS} value={cfg.glassesColor} onPick={(c) => update("glassesColor", c)} />
            </Section>
          )}

          <Section label="Eyebrows">
            <Pills options={EYEBROWS} value={cfg.eyebrows} onPick={(v) => update("eyebrows", v)} />
          </Section>

          <Section label="Mouth">
            <Pills options={MOUTHS} value={cfg.mouth} onPick={(v) => update("mouth", v)} />
          </Section>

          <Section label="Shirt">
            <Swatches colors={SHIRT_COLORS} value={cfg.shirt} onPick={(c) => update("shirt", c)} />
          </Section>

          <Section label="Background">
            <Swatches colors={BG_COLORS} value={cfg.bg} onPick={(c) => update("bg", c)} />
          </Section>

          <div className="pt-2 flex gap-2 sticky bottom-0 bg-gradient-to-t from-background/90 to-transparent -mx-6 px-6 pb-2 pt-4">
            <button type="button" onClick={onClose} className="glass-button flex-1 justify-center">
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="glass-button-primary flex-1 justify-center">
              <Check className="w-4 h-4" />
              Save Avatar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{label}</p>
    {children}
  </div>
);
