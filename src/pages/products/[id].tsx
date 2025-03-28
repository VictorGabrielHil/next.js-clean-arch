import { Product } from "@/src/models/models";
import { http } from "@/src/utils/http";
import { GetStaticPaths, GetStaticProps, NextPage} from "next";

type ProductDetailPageProps = {
  product: Product;
};

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({product}) => {
    return <div>
      <h3>{product.name}</h3>
      <label>Preço</label> {product.price}
      <button>Adicionar no carrinho</button>
    </div>; 
} 

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
   return {     
     paths: [],
      fallback: 'blocking', 
   };
 };

 export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};
  const {data: product } = await http.get(`/products/${id}`);
   return {
     props: { product},
   };
 }    