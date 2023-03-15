import { getProductByID } from './../../redux/slices/productSlice';
import { fetchAllProducts } from "../../redux/slices/productSlice"
import createTestStore from "../utils/testStore"

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('test product reducer', () => {
  test('fetch all products', async () => {
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

  test('get product by id', async () => {
    await store.dispatch(getProductByID('6405e0093f82c42eb099c9fc'))
    // console.log(store.getState().productReducer.currentProduct)
    expect(store.getState().productReducer.currentProduct).toBeDefined()
  })
})