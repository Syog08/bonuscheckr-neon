export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="mx-auto max-w-[680px] px-4 py-12 sm:px-6">
      <h1 className="mb-4 text-[28px] font-bold tracking-[-0.02em]">
        Guide: {slug}
      </h1>
      <p className="text-fg-muted">
        Guide template coming in step 3. Route is wired so the 301 redirect and
        homepage links resolve.
      </p>
    </div>
  );
}
