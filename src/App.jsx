import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { InputComp } from './components/InputComp';
import { ButtonComp } from './components/ButtonComp';
import stormtrooperImage from './assets/unsplash_6FDXGY9J6y4.png';
import gameBoyImage from './assets/image 2.png';
import heart from './assets/image 1.png';
import logoImage from './assets/AluraGeek.png';


//nota importante, para poder hacer fetch, es necesario correr command "npm install json-server --save-dev" y "npx json-server --port 3001 db.json" 
const AppContainer = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #6a0dad;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Adjust gap as needed for spacing between images */
`;

const Footer = styled.footer`
  background-color: #6a0dad;
  padding: 30px;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const ProductListContainer = styled.div`
  flex: 2;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const ProductItemWrapper = styled.div`
  border: 2px solid #6a0dad;
  padding: 10px;
  text-align: center;
  width: 150px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const AddProductFormContainer = styled.div`
  flex: 1;
  padding: 20px;
  border-left: 2px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const productsData = [
  { name: 'Stormtrooper', price: 60.0, image: stormtrooperImage },
  { name: 'Game Boy Classic', price: 60.0, image: gameBoyImage },
];

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure an image file is selected
    if (!image) {
      alert('Please select an image.');
      return;
    }

    // Create a URL for the selected image
    const imageUrl = URL.createObjectURL(image);

    const newProduct = { name, price: parseFloat(price), image: imageUrl };
    setProducts([...products, newProduct]);
    setName('');
    setPrice('');
    setImage(null); // Reset selected image after submission
  };

  const handleReset = () => {
    setName('');
    setPrice('');
    setImage(null); // Reset selected image
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <img src={heart} alt="Heart" />
          <img src={logoImage} alt="AluraGeek Logo" />
        </HeaderContent>
      </Header>
      <Main>
        <ProductListContainer>
          <h2>MIS PRODUCTOS:</h2>
          <ProductContainer>
            {products.map((product, index) => (
              <ProductItemWrapper key={index}>
                <ProductImage src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button onClick={() => handleDelete(index)}>🗑️</button>
              </ProductItemWrapper>
            ))}
          </ProductContainer>
        </ProductListContainer>
        <AddProductFormContainer>
          <h2>AGREGAR PRODUCTO:</h2>
          <Form onSubmit={handleSubmit}>
            <InputComp
              type="text"
              placeholder="nombre..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputComp
              type="number"
              placeholder="precio..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <ButtonComp type="submit" content="Enviar" bgColor="blue" color="white" />
            <ButtonComp
              type="button"
              content="Limpiar"
              bgColor="gray"
              color="white"
              onClick={handleReset}
            />
          </Form>
        </AddProductFormContainer>
      </Main>
      <Footer>
        <HeaderContent>
          <img src={heart} alt="Heart" />
          <img src={logoImage} alt="AluraGeek Logo" />
        </HeaderContent>
        - Desarrollado Por Gildebran Ventura
      </Footer>
    </AppContainer>
  );
}

export default App;
