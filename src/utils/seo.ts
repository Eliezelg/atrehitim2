export function generateMetaTags(params: {
  title: string;
  description?: string;
  image?: string;
  url: string;
}) {
  return {
    title: `${params.title} | א.ת. רהיטים`,
    description: params.description || 'חנות רהיטים איכותית עם מגוון רחב של רהיטים לבית',
    image: params.image || '/images/og-image.jpg',
    url: params.url
  };
}