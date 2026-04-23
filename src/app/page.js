import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative h-screen w-full bg-[radial-gradient(ellipse_120%_80%_at_50%_60%,rgba(200,210,220,0.6)_0%,transparent_60%),radial-gradient(ellipse_80%_50%_at_20%_80%,rgba(190,200,210,0.5)_0%,transparent_50%),radial-gradient(ellipse_80%_50%_at_85%_65%,rgba(195,205,215,0.5)_0%,transparent_50%),linear-gradient(180deg,#dce2e8_0%,#e4e9ee_30%,#d8dfe6_60%,#c8d2dc_100%)] overflow-hidden">
      {/* Bottom mist gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-[35%] bg-gradient-to-t from-[rgba(200,210,220,0.85)] to-transparent" />

      {/* ─── NAVBAR ─── */}
      <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-5">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground">
            <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          </div>
        </a>

        {/* Center pill nav */}
        <div className="flex items-center gap-8 rounded-full border border-card-border bg-card px-7 py-2.5 backdrop-blur-xl">
          <a
            href="#"
            className="relative text-[0.82rem] font-medium tracking-wide text-foreground/70 transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
          >
            Club
          </a>
          <a
            href="#"
            className="relative text-[0.82rem] font-medium tracking-wide text-foreground/70 transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
          >
            Membership
          </a>
          <a
            href="#"
            className="relative text-[0.82rem] font-medium tracking-wide text-foreground/70 transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
          >
            About us
          </a>
        </div>

        {/* Close button */}
        <button
          className="flex h-9 w-9 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </nav>

      {/* ─── HERO HEADLINE (behind island) ─── */}
      <div className="inset-0 z-[2] flex items-center justify-center mt-25 ">
        <h1 className="select-none text-center font-serif text-[clamp(3rem,8vw,8rem)] font-bold uppercase leading-[0.90] tracking-wide text-foreground">
          BEST GOLF
          <br />
          EXPERIENCE
        </h1>
      </div>

      {/* ─── FLOATING 3D ISLAND (in front of text) ─── */}
      <div className="pointer-events-none absolute bottom-[-1%]  z-[3] w-[700px] animate-float -ml-[200px] ml-155 mt-10">
        <Image
          src="/3d2.png"
          alt="Floating golf island with ball"
          width={1050}
          height={1050}
          className="h-auto w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.12)]"
          priority
        />
      </div>

      {/* ─── MID-ROW: Lookout Event label (left) + Rating (right) ─── */}
      <div className="absolute left-10 right-10 top-[37%] z-[2] flex items-center gap-6 mt-20">
        {/* Left: dot + label */}
        <div className="flex items-center gap-2.5">
          <span className="whitespace-nowrap text-[0.9rem] font-bold uppercase tracking-[0.18em] text-foreground/50 ml-5">
            Lookout Upcoming Event
          </span>
        </div>

        {/* Center: The Connecting Line (passing behind the island) */}
        <div className="h-px flex-1 bg-foreground/10" />

        {/* Right: rating */}
        <div className="flex items-center gap-2">
          <span className="text-[0.9rem] font-bold text-foreground">5.00</span>
          <div className="flex gap-0.5 text-[0.9rem] text-foreground">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── LEFT: Event Card ─── */}
      <div className="absolute bottom-8 left-10 z-20 w-[320px]">
        <div className="border-card-border p-5 backdrop-blur-2xl transition-all duration-300">
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-foreground/35">
            SEP 24 TH–25TH
          </p>
          <h3 className="mt-1.5 font-serif text-[1.15rem] font-bold leading-tight text-foreground whitespace-nowrap">
            Lookout <br></br>Upcoming Event
          </h3>
          <p className="mt-1 text-[0.62rem] text-foreground/40">
            The Ultimate Golf Show Down
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-[0.7rem] font-bold tracking-wide text-foreground backdrop-blur-xl border border-white/45 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/35 hover:shadow-xl hover:shadow-black/10 whitespace-nowrap"
          >
            Rectify Your Biggest Oversight
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>

      {/* ─── RIGHT: Tutorial Card + Description + Socials ─── */}
      <div className="absolute bottom-8 right-10 z-20 flex w-[250px] flex-col gap-3.5">
        {/* Tutorial Image Card */}
        <div className="group overflow-hidden rounded-[32px] border border-card-border bg-card/60 p-4 shadow-lg shadow-black/[0.03] backdrop-blur-2xl transition-all duration-300 hover:bg-white/70">
          <div className="mb-3.5 flex items-start justify-between px-1">
            <div>
              <h4 className="text-[1rem] font-semibold text-foreground leading-tight">
                Unleash Your Talent
              </h4>
              <p className="mt-1 text-[0.7rem] text-foreground/50">Tutorial</p>
            </div>
            <a
              href="#"
              className="text-foreground/40 transition-colors hover:text-foreground"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
          <div className="relative h-[115px] overflow-hidden rounded-[24px]">
            <Image
              src="/golfground.png"
              alt="Golf course aerial view"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-right text-[0.6rem] leading-relaxed text-foreground/45">
          At Masterful Swing, golf is more than just a game; it&apos;s a passion
          that connects to us all. Whether you&apos;re a pro or just starting
          out, our top-notch facilities.
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-end gap-2">
          {/* Instagram */}
          <a href="#" aria-label="Instagram" className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-foreground/15 text-foreground/50 transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-white">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {/* Facebook */}
          <a href="#" aria-label="Facebook" className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-foreground/15 text-foreground/50 transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-white">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          {/* X */}
          <a href="#" aria-label="Twitter" className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-foreground/15 text-foreground/50 transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" aria-label="YouTube" className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-foreground/15 text-foreground/50 transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-white">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
