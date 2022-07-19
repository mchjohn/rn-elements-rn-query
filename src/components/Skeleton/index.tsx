import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from '@rneui/themed';

export function SkeletonView() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Skeleton circle height={80} width={80} />
        <Skeleton height={32} width={160} style={styles.name} />
      </View>

      <Skeleton style={styles.item} height={68} />
      <Skeleton style={styles.item} height={68} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    marginTop: 16,
  },
  name: {
    marginLeft: 16,
  },
});
