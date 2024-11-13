// // Parent to child
// export function Childcomponent({ title="ini judul", description }) {
//   return (
//     <div>
//       <h1>{title}</h1>
//       <p>{description}</p>
//     </div>
//   );
// }
// export default function Parentscomponent() {
//   return (
//     <>
//       <Childcomponent title="ini judul" description="ini deskripsi" />
//     </>
//   );
// }
// test selesai
// tugas 1
// function Greeting(props) {
//   return (
//     <div>
//       <h1>Hello, {props.name}!</h1>
//       <p>{props.message}</p>
//     </div>
//   );
// }

// // Komponen App
// function App() {
//   return (
//     <div>
//       <Greeting name="Alice" message="Welcome to React!" />
//     </div>
//   );
// }
// export default App;
// tugas 2
function UserProfile({username, age, location}) {
  return (
    <div>
      <h1>{username}</h1>
      <p>{age}</p>
      <p>{location}</p>
    </div>
  );
}
function App(props) {
  return (
    <div>
      <UserProfile{...props}/>
    </div>
  );
}
function Declare() {
  return (
    <App username="John Doe" age="30" location="New York"/>
  )
}
export default Declare;