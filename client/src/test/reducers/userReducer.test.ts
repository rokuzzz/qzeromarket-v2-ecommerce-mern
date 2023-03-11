import { login } from "../../redux/slices/userSlice";
import createTestStore from "../utils/testStore";

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('test user reducers', () => {
  test('login user with correct username and password', async () => {
    await store.dispatch(login({
      username: 'romanku',
      password: 'mypassword'
    }))
    // console.log('current user is: ', store.getState().userReducer.currentUser)
    expect(store.getState().userReducer.currentUser).toBeDefined()
  })
  test('login with wrong credentials (should not log in)', async () => {
    await store.dispatch(login({
      username: 'romanku',
      password: 'notmypassword'
    }))
    expect(store.getState().userReducer.currentUser).toBeUndefined()
  })
})
