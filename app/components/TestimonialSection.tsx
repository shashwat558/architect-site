type TestimonialData = {
  text: string;
  author: string;
  role?: string;
  eyebrow?: string;
  title?: string;
};

type TestimonialSectionProps = {
  data: TestimonialData;
};

export default function TestimonialSection({ data }: TestimonialSectionProps) {
  const { text, author, role, eyebrow = "Client Words", title = "What they said" } = data;

  return (
    <section className="py-20 md:py-32 bg-[#EDE5D8] -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-4 space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">{eyebrow}</span>
          <h3 className="font-serif text-3xl md:text-4xl text-[#3D2B1F]">{title}</h3>
          <span className="text-[10vw] md:text-[8vw] leading-none text-[#D97706] opacity-20 font-serif">“</span>
        </div>
        <div className="md:col-span-8">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#3D2B1F] leading-tight mb-8">
            {text}
          </p>
          <div>
            <p className="font-bold text-sm uppercase tracking-widest text-[#3D2B1F]">{author}</p>
            {role ? (
              <p className="text-xs text-[#6B5B4F] uppercase tracking-widest mt-1">{role}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
