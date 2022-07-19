import firestore from '@react-native-firebase/firestore';

import { IUser } from 'src/constants/user';

type User = Pick<IUser, 'uid' | 'displayName' | 'email' | 'photoURL'>;

// Salva o usuário no firestore
const saveUserInFirestore = async (user: User) => {
  try {
    // Verifica se o usuário já está salvo no firestore
    const { exists } = await firestore().collection('Users').doc(user.uid).get();

    if (exists) return;

    await firestore().collection('Users').doc(user.uid).set(
      {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  } catch (err) {
    console.log(err);
  }
};

export { saveUserInFirestore };
