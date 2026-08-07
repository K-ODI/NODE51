import Link from "next/link"

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumb: string
}

export function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Large background text */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none opacity-[0.02]">
        <span className="text-[30vw] font-black leading-none whitespace-nowrap">{breadcrumb}</span>
      </div>

      <div className="relative z-10 px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
            NODE 51
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-mono text-xs text-primary">{breadcrumb}</span>
        </div>

        <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter text-foreground mb-6">
          {title}
        </h1>

        {subtitle && <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  )
}
