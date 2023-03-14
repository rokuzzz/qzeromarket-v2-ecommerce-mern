import { getAllUsers, updateCurrentUser } from './../../redux/slices/userSlice';
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

  // test('login with wrong credentials (should not log in)', async () => {
  //   await store.dispatch(login({
  //     username: 'romanku',
  //     password: 'notmypassword'
  //   }))
  //   expect(store.getState().userReducer.currentUser).toBeUndefined()
  // })
  
  test('login with JWT token', async () => {
    // token expires in 3 days
    await store.dispatch(loginByToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODc5MjYzNiwiZXhwIjoxNjc5MDUxODM2fQ.9krmMDnpAPvREmuXksfL2cNd-VVwMq3Sy9zPnZAiSrU'))
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
    await store.dispatch(getAllUsers('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODc5MjYzNiwiZXhwIjoxNjc5MDUxODM2fQ.9krmMDnpAPvREmuXksfL2cNd-VVwMq3Sy9zPnZAiSrU'))
    // console.log(store.getState().userReducer.listOfUsers)
    expect(store.getState().userReducer.listOfUsers.length).toBeGreaterThan(1)
  })

  // test('get all users with wrong JWT token', async () => {
  //   await store.dispatch(getAllUsers('wrong token'))
  //   // console.log(store.getState().userReducer.currentUser)
  //   expect(store.getState().userReducer.listOfUsers).toBeUndefined()
  // })

  test('update current user', async () => {
    await store.dispatch(updateCurrentUser({
      updatedUserData: {
        firstname: 'Paul'
      },
      id: '63e657b74689b444842f672e',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTY1N2I3NDY4OWI0NDQ4NDJmNjcyZSIsInJvbGUiOiJndWVzdCIsImlhdCI6MTY3ODc5MDE2MywiZXhwIjoxNjc5MDQ5MzYzfQ.4jb80u1HVkge1bpBu1sti2t357vH2UQiTeynZ1zaWkA'
    }))
    // console.log('updated user: ', store.getState().userReducer.currentUser)
    expect(store.getState().userReducer.currentUser).toBeDefined()
  })
})
