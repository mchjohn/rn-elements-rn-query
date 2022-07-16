import React from "react";
import { Avatar, Icon } from "@rneui/themed";
import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

import { renderName, renderAvatar } from '../../utils/userInfoHeader';

export function Header() {
  const { signOut } = useAuth();

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
      onPress={signOut}
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