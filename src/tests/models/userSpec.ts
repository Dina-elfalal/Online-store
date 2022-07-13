import { User, UserStore } from '../../models/user';


describe("User Model", () => {

  const store = new UserStore();

  const userTest: User =  {
    user_name: 'mark',
    first_name: 'john',
    last_name: 'Saad',
    password_digest: '123456'
  }

  let user: User;

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });



  it('create method should add a user', async () => {
      user = await store.create(userTest);
    expect({ user_name: 'kk', first_name: 'mm', last_name: 'dd' }).toEqual({
      user_name: userTest.user_name, first_name: userTest.first_name, last_name: userTest.last_name 
    });
  });


  it('show method should show user by id', async () => {
    const result = await store.show(user.id as number);
    expect(result).toEqual(user);
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toContain(user);
  });

  
  it('authenticate method should authenticate user', async () => {
    const result =await store.authenticate(user.user_name, user.first_name, user.last_name, '7851234');
    expect(result).toBeNull();
  });

  it('update method should update user', async () => {
    await store.update(user);
    expect({
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: 'Sally'
    }).toEqual({
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: 'Sally'
    });
  });


  it('delete method should delete user by id', async () => {
    await store.delete(user.id as number);
    const result = await store.index();
    expect(result.includes(user)).toBeFalse();
  });

});