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
    expect(store.getState().userReducer.loggedInUser).toBeDefined()
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
    expect(store.getState().userReducer.loggedInUser).toBeDefined()
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
    expect(store.getState().userReducer.listOfUsers.data.length).toBeGreaterThan(1)
  })

  // test('get all users with wrong JWT token', async () => {
  //   await store.dispatch(getAllUsers('wrong token'))
  //   // console.log(store.getState().userReducer.currentUser)
  //   expect(store.getState().userReducer.listOfUsers).toBeUndefined()
  // })

  test('update current user', async () => {
    await store.dispatch(updateCurrentUser({
      updatedUserData: {
        firstname: 'Pavlik'
      },
      id: '64106300bab52b00145b1383',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODk2NTc0OSwiZXhwIjoxNjc5MjI0OTQ5fQ.Qfn3iyDnkQlI1S6S7stgRqvzKNyVRLbcUY309DQI07Y'
    }))
    // console.log('updated user: ', store.getState().userReducer.currentUser)
    expect(store.getState().userReducer.loggedInUser).toBeDefined()
  })
})
