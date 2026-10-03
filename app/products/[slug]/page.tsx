import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CallToActionSection from "../../components/CallToActionSection";
import { ALL_PRODUCTS, DOORS, FRAMES_PRODUCTS, type DoorProduct, type FrameProduct } from "@/app/data/products";
import styles from "./page.module.css";
import ContactFormSection from "@/app/components/ContactFormSection";

// Generate static params for all product slugs
export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

// Generate per-page metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found | Micasa Doors" };
  return {
    title: `${product.seo.title} | Micasa Doors`,
    description: product.seo.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) return notFound();

  const isDoor = product.isDoor;
  const p = product as DoorProduct | FrameProduct;

  // Related: 3 others in same category
  const related = isDoor
    ? DOORS.filter((d) => d.slug !== slug).slice(0, 3)
    : FRAMES_PRODUCTS.filter((f) => f.slug !== slug).slice(0, 3);

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <Image
            src={p.image}
            alt={p.name}
            fill
            className={styles.heroImage}
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>
              {isDoor
                ? `Wooden Doors  ${(p as DoorProduct).wood}`
                : `Door Frames  ${(p as FrameProduct).kind}`}
            </p>
            <h1 className={styles.heroTitle}>{p.name}</h1>
            <p className={styles.heroTagline}>{p.tagline}</p>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link href="/products" className={styles.breadcrumbLink}>Products</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{p.name}</span>
        </nav>

        {/* Main Content */}
        <section className={styles.contentSection}>
          <div className={styles.contentGrid}>
            {/* Left: Image + Description */}
            <div className={styles.leftCol}>
              <div className={styles.imageWrapper}>
                <Image
                  src={p.image}
                  alt={`${p.name}  manufactured by Micasa Doors Solutions`}
                  width={1200}
                  height={900}
                  className={styles.productImage}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className={styles.descriptionCard}>
                <p className={styles.productDescription}>{p.description}</p>
              </div>
            </div>

            {/* Right: Spec Panel */}
            <div>
              <div className={styles.specPanel}>
                {isDoor ? (
                  <>
                    {([
                      ["Wood Type", (p as DoorProduct).wood],
                      ["Appearance", (p as DoorProduct).appearance],
                      ["Recommended Applications", (p as DoorProduct).applications.join(" · ")],
                      ["Available Finishes", (p as DoorProduct).finishes.join(" · ")],
                      ["Customisation", (p as DoorProduct).customisation],
                      ["Recommended Frames", (p as DoorProduct).frames.join(" · ")],
                      ["Project Suitability", (p as DoorProduct).suitability],
                    ] as [string, string][]).map(([key, value]) => (
                      <div key={key} className={styles.specRow}>
                        <p className={styles.specKey}>{key}</p>
                        <p className={styles.specValue}>{value}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className={styles.specRow}>
                      <p className={styles.specKey}>Frame Type</p>
                      <p className={styles.specValue}>{(p as FrameProduct).kind}</p>
                    </div>
                    <div className={styles.specRow}>
                      <p className={styles.specKey}>Key Points</p>
                      <ul className={styles.pointsList}>
                        {(p as FrameProduct).points.map((pt) => (
                          <li key={pt} className={styles.pointItem}>
                            <span className={styles.pointDot} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <Link
                href={`/contact?product=${encodeURIComponent(p.name)}`}
                className={styles.quoteBtn}
              >
                Request a Quote for {p.name}
              </Link>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <p className={styles.relatedLabel}>Also in this range</p>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/${r.slug}`}
                  className={styles.relatedCard}
                >
                  <p className={styles.relatedName}>{r.name}</p>
                  <p className={styles.relatedTagline}>{r.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ContactFormSection/>
      </main>
      <Footer />
    </div>
  );
}
