import React, { useCallback, useState } from 'react';
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  User,
} from './redux/usersApi';
import styles from './App.module.scss';
import ErrorPopup from './commonComponents/ErrorPopup';

const App = () => {
  const { data, isLoading, isError: getUsersError } = useGetUsersQuery();
  const [addUser, { isError: addUserError }] = useAddUserMutation();
  const [deleteUser, { isError: deleteUserError }] = useDeleteUserMutation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleAddUser = useCallback(() => {
    (async () => {
      await addUser({ name: name, email: email + '@gmail.com' });
      setName('');
      setEmail('');
    })();
  }, [name, email]);

  const handleDeleteUser = useCallback((idToDel: User['id']) => {
    (async () => {
      await deleteUser(idToDel);
    })();
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <h1>Users List</h1>
        <ul>
          {data && !isLoading ? (
            data.map((user, index) => (
              <li key={index}>
                {user.name} {user.email}{' '}
                <button onClick={() => handleDeleteUser(user.id)}>X</button>
              </li>
            ))
          ) : (
            <div>Loading ...</div>
          )}
        </ul>
      </div>

      <div className={styles.rightColumn}>
        <input
          type="text"
          value={name}
          placeholder={'Name'}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder={'Email'}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {(getUsersError || addUserError || deleteUserError) && (
        <ErrorPopup open={true} />
      )}
    </div>
  );
};

export default App;
