export default async function CasinoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="mx-auto max-w-[680px] px-4 py-12 sm:px-6">
      <h1 className="mb-4 text-[28px] font-bold tracking-[-0.02em]">
        Casino review: {slug}
      </h1>
      <p className="text-fg-muted">
        Review template coming in step 4. Route is wired so links resolve.
      </p>
    </div>
  );
}
