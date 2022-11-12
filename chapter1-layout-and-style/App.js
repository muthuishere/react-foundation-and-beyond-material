import logo from './logo.svg';
import './assets/bootstrap.min.css';
import './assets/app.css';

function HelloUser(props) {
  return <h1>Hello, {props.name}</h1>;
}
// function HelloUser() {
//   return <h1>Hello User</h1>;
// }
// function HelloUser() {
//   // return "Hello"; // valid
//   // return 21; // valid
//   // return [21,34,56]; // valid
//   // return "<h1>Hello User</h1>"; // valid
//   // return {name: "Sara", age: 21}; // Error: Objects are not valid as a React child
//   //   return <h1>Hello User</h1>; // valid
//   //return JSON.stringify({name: "Sara", age: 21}); // valid
//
//   // variables in jsx will be evaluated if its within {}
//   const name = "Sara";
//   return  <h1>Hello {name}</h1>; // valid Output: Hello Sara
// }


function App() {
  return (
      <div>
      <div
          className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal"
            title='"A Company Making Everything", "American Companies Make Everything", or "American Company that Manufactures Everything.'>
          Acme Corporation</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="#">Link 1</a>
          <a className="p-2 text-dark" href="#">Link 2</a>
        </nav>
        <a className="btn btn-outline-primary" href="#">Welcome User</a>
      </div>

  <div className="container">



    <HelloUser name="Mr x" />




  </div></div>
  );
}

export default App;
