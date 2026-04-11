const GalleryPage = () => (
  <section>
    <h2>Gallery</h2>
    <div className="grid four">
      {Array.from({ length: 8 }).map((_, i) => <div key={i} className="thumb">Media {i + 1}</div>)}
    </div>
  </section>
);
export default GalleryPage;
