import auth from '@react-native-firebase/auth';

const renderAvatar = () => {
  const avatar = auth().currentUser?.photoURL;
  const email = auth().currentUser?.email;

  return avatar ? avatar : `https://avatars.dicebear.com/api/bottts/${email}.png`;
}

const renderName = () => {
  const displayName = auth().currentUser?.displayName;
  const email = auth().currentUser?.email;

  const formattedEmail = `${email?.slice(0, 10)}...`;

  return displayName ? displayName : formattedEmail;
}

export { renderName, renderAvatar };