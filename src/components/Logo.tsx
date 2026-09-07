export default function Logo({ size = 40 }: { size?: number }) {
  const h = size * 1.17;
  const w = size * 1.2;

  return (
    <img
      src="/logo.jpg"
      alt="TraceFake TraceVision"
      style={{
        height: h,
        width: w,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}
