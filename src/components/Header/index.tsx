import React from 'react';
import { Avatar, Icon } from '@rneui/themed';
import { Text, View, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

import { renderName, renderAvatar } from '../../utils/userInfoHeader';
import { colors } from '../../styles';

export function Header() {
  const { signOut } = useAuth();

  return (
    <View style={styles.header}>
      <View style={styles.info}>
        <Avatar size={64} rounded source={{ uri: renderAvatar() }} />

        <Text style={styles.name}>{renderName()}</Text>
      </View>

      <Icon onPress={signOut} name="logout" color={colors.gray200} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    borderBottomColor: colors.gray200,
    borderBottomWidth: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});
