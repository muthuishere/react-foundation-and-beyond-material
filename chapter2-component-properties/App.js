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


function OldStarRating(props) {

  const rating = props.rating;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<span className="fa-solid fa-star checked"></span>);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<span className="fa-solid fa-star-half-stroke checked"></span>);
        } else {
            stars.push(<span className="fa-regular fa-star"></span>);
        }
    }

  return <>
    {stars}
  </>;
}

export const starStyles = {
    fullStar: "fa-solid fa-star checked",
    halfStar: "fa-solid fa-star-half-stroke checked",
    noStar: "fa-regular fa-star"
}

export function getStarStylesFor(rating) {
    const stars = [];

    const isFullStar = (i) => i <= rating;
    const isHalfStar = (i) => isFullStar(i) == false && i === Math.ceil(rating) && !Number.isInteger(rating);
    const isNoStar = (i) => isHalfStar(i) == false




    const rules = [
        {condition: isFullStar, style: starStyles.fullStar},
        {condition: isHalfStar, style: starStyles.halfStar},
        {condition: isNoStar, style: starStyles.noStar}
    ];
    const getStarStyle = (i) => {
        return rules.find(rule => rule.condition(i)).style
    }


    for (let i = 1; i <= 5; i++) {
        stars.push(getStarStyle(i));
    }
    return stars;
}

function StarRating(props) {

  const rating = props.rating;

    const stars = getStarStylesFor(rating);

    return <span title={rating}>
    {stars.map((star, index) => <span key={index} className={star}></span>)}
  </span>;
}

function ProductDetail(){

  const product  = {"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://dummyjson.com/image/i/products/1/thumbnail.jpg","images":["https://dummyjson.com/image/i/products/1/1.jpg","https://dummyjson.com/image/i/products/1/2.jpg","https://dummyjson.com/image/i/products/1/3.jpg","https://dummyjson.com/image/i/products/1/4.jpg","https://dummyjson.com/image/i/products/1/thumbnail.jpg"]};

    return <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-4">
                <img src={product.thumbnail} className="img-fluid rounded-start" alt={product.title}/>
            </div>
            <div className="col-md-8">

                <div className="card-body">
                    <h5 className="card-title">{product.title}
                        <StarRating rating={product.rating} />
                        {/*<span className="fa-solid fa-star checked"></span>*/}
                        {/*<span className="fa-solid fa-star checked"></span>*/}
                        {/*<span className="fa-solid fa-star checked"></span>*/}
                        {/*<span className="fa-solid fa-star-half-stroke checked"></span>*/}
                        {/*<span className="fa-regular fa-star"></span>*/}

                    </h5>
                    <p className="card-text">{product.description}</p>
                    <table className="table table-sm table-borderless table-hover">
                        <tbody>
                        <tr>
                            <th scope="row">Category</th>
                            <td>{product.category}</td>
                        </tr>
                        <tr>
                            <th scope="row">Brand</th>
                            <td>{product.brand}</td>
                        </tr>
                        <tr>
                            <th scope="row">Stock</th>
                            <td>{product.stock}</td>
                        </tr>
                        <tr>
                            <th scope="row">Discount Percentage</th>
                            <td>{product.discountPercentage}%</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="buy d-flex justify-content-between align-items-center">
                        <div className="price text-success"><h5 className="mt-4">${product.price}</h5></div>
                        <a href="#" className="btn btn-success mt-3"><i className="fa-solid fa-cart-plus"></i> Add to Cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>;

}
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

    <ProductDetail />


  </div></div>
  );
}

export default App;
