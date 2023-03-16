import { getProductByID, createProduct, deleteProduct } from './../../redux/slices/productSlice';
import { fetchAllProducts } from "../../redux/slices/productSlice"
import createTestStore from "../utils/testStore"
import { NewProductData } from '../../types/products';

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('test product reducer', () => {
  test('should get a list of products based on the query parameters', async () => {
    await store.dispatch(fetchAllProducts({
      sort: '&sort=price',
      order: '&order=asc',
      page: '&page=1',
      limit: '&limit=2',
      categories: '&categories=All'
    }))
    // console.log(store.getState().productReducer.products)
    expect(store.getState().productReducer.allProducts).toBeDefined()
  })

  test('should get product by id', async () => {
    await store.dispatch(getProductByID('6405e0093f82c42eb099c9fc'))
    // console.log(store.getState().productReducer.currentProduct)
    expect(store.getState().productReducer.currentProduct).toBeDefined()
  })

  // does not work yet

  // test('should create a new product', async () => {
  //   await store.dispatch(fetchAllProducts({}))
  //   const previousState = store.getState().productReducer.allProducts
  //   console.log('prev state: ', previousState.length)

  //   const image = new File(['test'], 'test.jpg', { type: 'image/jpg' })
  //   const testImage = new Image(1000, 1000)
  //   console.log('IMAGE IS THIS: ', testImage)

  //   const product: NewProductData = {
  //     title: 'test',
  //     description: 'test',
  //     price: 1,
  //     categories: ['All', 'New'],
  //     image: testImage
  //    }

  //   await store.dispatch(createProduct({
  //     newProduct: product,
  //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODk2NTAwNCwiZXhwIjoxNjc5MjI0MjA0fQ.Coe_U0rmhA86N4c5O1LBz12HTtdfH8hVN5NWTcCdlJQ'
  //   }))

  //   console.log('curr state: ', store.getState().productReducer.allProducts)
  //   expect(store.getState().productReducer.allProducts.length - previousState.length).toBeGreaterThanOrEqual(1)
  // })

  test('should delete the product and return updated product list', async () => {
    await store.dispatch(fetchAllProducts({}))
    const prevState = store.getState().productReducer.allProducts

    await store.dispatch(deleteProduct({
      id: '64109a5f17481300140bb28f',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODk3NDE5OCwiZXhwIjoxNjc5MjMzMzk4fQ._QRx4F3aZrQSSn-nxSJ4_SG3mJso3wzLGFlvKfFS7lQ'
    }))

    expect(prevState.length - store.getState().productReducer.allProducts.length).toBe(1)
  })
})