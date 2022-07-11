import React from "react";
import { Avatar } from "@rneui/themed";
import { Text, View, StyleSheet } from "react-native";

export function Header() {
  return (
    <View style={styles.header}>
      <Avatar
        size={64}
        rounded
        source={{uri: "https://github.com/mchjohn.png"}}
      />

      <Text style={styles.name}>
        Michel John
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  name: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "600",
  }
})