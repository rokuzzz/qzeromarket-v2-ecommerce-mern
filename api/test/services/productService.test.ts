import { productReviews1, productReviews2 } from './../fixtures/productReviews';
import ProductReview from '../../src/models/ProductReview';
import { product1, product2, product3, product4 } from './../fixtures/products';
import Product from "../../src/models/Product";
import ProductService from '../../src/services/productService';

import connect, { MongodHelper } from '../db-helper';
import { category1, category2, category3 } from './../fixtures/category';
import Category from '../../src/models/Category';

let mongodHelper: MongodHelper 

beforeAll(async () => {
  mongodHelper = await connect()
})

beforeEach(async () => {
  await Product.insertMany([product1, product2, product3, product4])
  await ProductReview.insertMany([productReviews1, productReviews2])
  await Category.insertMany([category1, category2, category3])
})

afterEach(async () => {
  await mongodHelper.clearDatabase()
})

afterAll(async () => {
  await mongodHelper.closeDatabase()
})

describe('test product service', () => {
  test('test findAll with pagination and sorting', async() => {
    const products = await ProductService.getAll(0, 3, 'price')
    expect(products.length).toBe(3)
    // console.log(products)
    expect(products[0].title).toEqual(product3.title)
    expect(products[1].title).toEqual(product1.title)
    expect(products[2].title).toEqual(product2.title)
  })
  test('find product reviews',async () => {
    const product = await ProductService.findProductReviews(product1._id)
    // console.log(product)
    expect(product.reviews.length).toBe(2)
  })
  test('test findAllPipeline', async () => {
    const products = await ProductService.findAllPipeline(0, 4, 'price', [category1._id, category3._id])
    expect(products.length).toBe(3)
  })
})