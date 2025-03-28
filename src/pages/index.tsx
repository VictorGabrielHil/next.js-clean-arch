import { http } from "@/src/utils/http";
import type { GetServerSideProps, NextPage } from "next";
import Head from 'next/head';
import Image from 'next/image';
import { Product } from "../models/models";
import Link from "next/link";
 
type HomeProps = {
  products: Product[];  
};

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div>
      <h1>Eccomerce Full Cycle</h1> 
      <ul>
        {products.map((product, key) => (
              <li key = {key}>
              <label>Nome:</label> {product.name} |  
              <Link href={`/products/${product.id}`} passHref>
                Ver
              </Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {data: products } = await http.get('/products');
  return {
    props: {
      products,
    },
  };
}