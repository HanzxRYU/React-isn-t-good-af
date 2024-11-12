// Parent to child
export function Childcomponent({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export default function Parentscomponent() {
  return (
    <>
      <Childcomponent title="ini judul" description="ini deskripsi" />
    </>
  );
}
// tambah value props
