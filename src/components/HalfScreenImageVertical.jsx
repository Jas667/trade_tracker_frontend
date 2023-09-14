export function HalfScreenImageVertical({ src, alt }) {
  return (
    <div className="hidden sm:block">
      <img className="w-full h-full object-cover" src={src} alt={alt} />
    </div>
  );
}
