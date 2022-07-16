import React from "react";
import { Avatar, Icon } from "@rneui/themed";
import { Text, View, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';

export function Header() {
    const handleLogout = () => {
    auth().signOut();
  }

  const renderName = () => {
    const displayName = auth().currentUser?.displayName;
    const email = auth().currentUser?.email;

    const formattedEmail = `${email?.slice(0, 10)}...`;

    return displayName ? displayName : formattedEmail;
  }

  const renderAvatar = () => {
    const avatar = auth().currentUser?.photoURL;
    const email = auth().currentUser?.email;

    return avatar ? avatar : `https://avatars.dicebear.com/api/bottts/${email}.png`;
  }

  return (
    <View style={styles.header}>
      <View style={styles.info}>
        <Avatar
          size={64}
          rounded
          source={{uri: renderAvatar()}}
        />

        <Text style={styles.name}>
          {renderName()}
        </Text>
      </View>
      
      <Icon
      onPress={handleLogout}
        name='logout'
        color='#999999'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "600",
  }
})