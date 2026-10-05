import {
  ShieldCheck,
  CreditCard,
  BadgeCheck,
  Zap,
} from "lucide-react";

const badges = [
  {
    label: "Compra segura",
    icon: ShieldCheck,
  },
  {
    label: "Pagamento protegido",
    icon: CreditCard,
  },
  {
    label: "Satisfação garantida",
    icon: BadgeCheck,
  },
  {
    label: "Acesso imediato",
    icon: Zap,
  },
];

export function TrustBadges() {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground md:gap-x-8">
      {badges.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Icon
            className="h-4 w-4 shrink-0 text-cta"
            strokeWidth={2}
            aria-hidden
          />

          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}