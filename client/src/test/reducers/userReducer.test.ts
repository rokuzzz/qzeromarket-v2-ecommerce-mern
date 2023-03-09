import { login } from "../../redux/slices/userSlice";
import createTestStore from "../utils/testStore";

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('test user reducers', () => {
  test('login user with username and password', async () => {
    await store.dispatch(login({
      username: 'romanku',
      password: 'mypassword'
    }))
    console.log('current user is: ', store.getState().userReducer.currentUser)
    expect(store.getState().userReducer.currentUser).toBeDefined()
  })
})