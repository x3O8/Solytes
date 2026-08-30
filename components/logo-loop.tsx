import Image from 'next/image';

const logos = Array.from(
  { length: 15 },
  (_, index) => `/company-logos/${index + 1}.png`,
);

export function LogoLoop() {
  return (
    <section className="logo-loop-section" aria-labelledby="logo-loop-title">
      <div className="shell logo-loop-heading">
        <p id="logo-loop-title">Organizations that have chosen Solytes</p>
        <span>Projects · Institutions · Industry</span>
      </div>
      <div className="logo-loop-viewport">
        <div className="logo-loop-track">
          {[...logos, ...logos].map((src, index) => (
            <span
              className="logo-loop-item"
              key={`${src}-${index}`}
              aria-hidden="true"
            >
              <Image src={src} alt="" width={190} height={72} sizes="190px" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
