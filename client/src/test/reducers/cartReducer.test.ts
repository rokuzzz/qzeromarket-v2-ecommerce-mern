import { getUsersShoppingCart } from './../../redux/slices/cartSlice';
import createTestStore from "../utils/testStore"

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('test cart reducer', () => {
  test('should get users shopping cart', async () => {
    await store.dispatch(getUsersShoppingCart({
      userId: '63dbbd12e9364652e4de037f',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3OTQxODkzMywiZXhwIjoxNjc5Njc4MTMzfQ.FP_RbciK-xcJ8kXXPSAj6Nq01ultU8bp8b93MMGDB88'
    }))
    // console.log(store.getState().cartReducer.usersShoppingCart.products[0].productId.title)
    expect(store.getState().cartReducer.usersShoppingCart.products[0].productId.title).toBe('Designer Shoes')
  })
})