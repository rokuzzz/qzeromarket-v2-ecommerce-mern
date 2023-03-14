import { getAllUsers } from './../../redux/slices/userSlice';
import { login, loginByToken, register } from "../../redux/slices/userSlice";
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
  
  test('login with JWT token', async () => {
    // token expires in 3 days
    await store.dispatch(loginByToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODc4NzczNCwiZXhwIjoxNjc5MDQ2OTM0fQ.QAbE59pMINrMPZsyQMD06DdHuXWCWRXrG2BQlbDviC8'))
    // console.log(store.getState().userReducer.currentUser)
    expect(store.getState().userReducer.currentUser).toBeDefined()
  })

  // // commented out because it creates the actual user in the database
  // test('register a new user', async () => {
  //   await store.dispatch(register({
  //     firstname: 'test',
  //     lastname: 'test',
  //     username: 'test',
  //     email: 'test@email.com',
  //     password: 'test'
  //   }))
  //   // console.log(store.getState().userReducer.currentUser)
  //   expect(store.getState().userReducer.currentUser).toBeDefined()
  // })

  test('get all users', async () => {
    await store.dispatch(getAllUsers('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODc4NzczNCwiZXhwIjoxNjc5MDQ2OTM0fQ.QAbE59pMINrMPZsyQMD06DdHuXWCWRXrG2BQlbDviC8'))
    expect(store.getState().userReducer.listOfUsers.length).toBeGreaterThan(1)
  })
})
