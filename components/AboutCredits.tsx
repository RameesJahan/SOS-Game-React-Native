import React from 'react';
import { ScrollView, StyleSheet, Text, View, Linking } from 'react-native';

const Credits = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Credits</Text>

        <Text style={styles.sectionTitle}>Game Images</Text>
        <Text style={styles.paragraph}>
          - <Text style={styles.link} onPress={() => Linking.openURL('https://www.freepik.com')}>Freepik</Text>
          {'\n'}- License: Free for personal and commercial use, with attribution required.
        </Text>

        <Text style={styles.sectionTitle}>Background Music</Text>
        <Text style={styles.paragraph}>
          - <Text >Flush Why</Text>
          {'\n'}- License: Free to use, with attribution required.
        </Text>

        <Text style={styles.paragraph}>
          We appreciate the work of these creators and thank them for providing high-quality resources.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Credits;