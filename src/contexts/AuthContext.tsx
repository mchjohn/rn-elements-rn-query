import React,
{
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { IUser } from '../constants/user';

type AuthProviderProps = {
  children: ReactNode;
}

type IAuthContextData = {
  user: IUser;
  isLoading: boolean;
  errorMessage: string;
  currentUser: FirebaseAuthTypes.User | null;

  signOut(): void;
  signInWithGoogle(): Promise<void>;
  signInWithEmail(email: string, password: string): Promise<void>;
}

type User = Pick<IUser, 'uid' | 'displayName' | 'email' | 'photoURL'>

const { WEB_CLIENT_Id } = process.env;

GoogleSignin.configure({
  webClientId: WEB_CLIENT_Id,
});

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<IUser>({} as IUser);

  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        setErrorMessage('Verifique sua senha e tente novamente');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMessage('Verifique seu e-mail e tente novamente');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      const { user } = await auth().signInWithCredential(googleCredential);

      const data: User = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email!,
        photoURL: user.photoURL,
      }
      
      saveUserInFirestore(data);
      // console.log(user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Cadastra o usuário no firestore
  const saveUserInFirestore = async (user: User) => {
    try {
      // Verifica se o usuário já está cadastrado no firestore
      const { exists } = await firestore().collection('Users').doc(user.uid).get();

      if (exists) return;

      await firestore().collection('Users')
        .doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      console.log('Usuário cadastrado com sucesso');
    } catch (error) {
      console.log(error);
    }
  }

  const signOut = () => {
    auth().signOut();
  }

  const currentUser = auth().currentUser;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        const userInfo = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }

        setUser(userInfo);
      } else {
        setUser({} as IUser);
      }
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        isLoading,
        errorMessage,
        signOut,
        signInWithEmail,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };